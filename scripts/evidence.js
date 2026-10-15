const fs = require('node:fs');
const path = require('node:path');

const STATUS = {
  APPROVED: 'APROVADO',
  FAILED: 'REPROVADO',
  BLOCKED: 'BLOQUEADO',
  PENDING: 'PENDENTE'
};

function createEvidenceRun(root, group, stamp, plannedCases = []) {
  const directory = path.join(root, 'evidence', `${group}-${stamp}`);
  fs.mkdirSync(directory, { recursive: true });
  return { directory, group, stamp, root, plannedCases };
}

function finalizeEvidenceRun(evidenceRun, reportPath, sourceCollection, runnerError) {
  let executions = [];
  let failures = [];
  let reportAvailable = false;

  if (reportPath && fs.existsSync(reportPath)) {
    try {
      const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
      executions = report.run?.executions || [];
      failures = report.run?.failures || [];
      reportAvailable = true;
    } catch {
      runnerError = runnerError || 'O relatório JSON do Newman não pôde ser lido.';
    }
  }

  const observedCases = groupExecutions(executions, failures);
  const observedByKey = new Map(observedCases.map((testCase) => [scenarioKey(testCase), testCase]));
  const observedByName = new Map();
  for (const testCase of observedCases) {
    if (!observedByName.has(testCase.name)) observedByName.set(testCase.name, []);
    observedByName.get(testCase.name).push(testCase);
  }
  const matchedObserved = new Set();
  const cases = evidenceRun.plannedCases.map((planned) => {
    const exact = planned.id ? observedByKey.get(scenarioKey(planned)) : null;
    const byName = observedByName.get(planned.name)?.find((observed) => !matchedObserved.has(observed));
    const observed = exact || byName;
    if (observed) {
      matchedObserved.add(observed);
      return { ...planned, ...observed, parent: planned.parent || observed.parent };
    }
    return { ...planned, executions: [], failures: [], blockedReason: runnerError || '' };
  });
  for (const observed of observedCases) {
    if (!matchedObserved.has(observed)) cases.push(observed);
  }
  for (let index = 0; index < cases.length; index += 1) {
    const testCase = cases[index];
    if (testCase.executions.length) continue;
    const priorFailure = cases.slice(0, index).find((prior) => prior.executions.length && getCaseStatus(prior) !== STATUS.APPROVED);
    if (priorFailure) testCase.blockedReason = `Não executado porque a etapa anterior "${priorFailure.name}" terminou como ${getCaseStatus(priorFailure)}.`;
    else if (runnerError) testCase.blockedReason = runnerError;
  }
  const hasWorkbook = findExcelWorkbook(evidenceRun.root);
  const sourceNote = hasWorkbook
    ? `Planilha encontrada no repositório: \`${path.relative(path.dirname(evidenceRun.directory), hasWorkbook)}\`. O relatório Newman continua sendo a fonte do resultado automatizado.`
    : 'Nenhum arquivo Excel foi localizado no repositório. Os nomes abaixo vêm dos itens realmente executados na coleção Newman; a correspondência com o roteiro oficial do Excel ainda precisa ser confirmada.';

  const runSourceNote = hasWorkbook
    ? `Excel localizado em ${path.relative(evidenceRun.root, hasWorkbook)}. Nao ha associacao automatica com as linhas da planilha; os cenarios abaixo sao o escopo selecionado na colecao Newman, com status de execucao por item. Confira a correspondencia com o roteiro oficial.`
    : sourceNote;

  cases.forEach((testCase, index) => {
    const caseDirectory = makeCaseDirectory(evidenceRun.directory, testCase, index + 1);
    testCase.directory = caseDirectory;
    writeCaseEvidence(testCase, caseDirectory, reportPath, evidenceRun, sourceCollection);
  });

  writeRunSummary(evidenceRun, cases, runSourceNote, reportPath, runnerError, reportAvailable);
  return cases;
}

function listCollectionCases(items, folderFilter = '') {
  const cases = [];
  function visit(nodes, parents) {
    for (const item of nodes || []) {
      if (item.request) {
        const matchingFolder = !folderFilter || parents.some((parent) => parent.name === folderFilter || parent.id === folderFilter);
        if (matchingFolder) cases.push({ id: item.id || '', name: item.name || '(cenário sem nome)', item, parent: parents.map((parent) => parent.name).join(' / '), executions: [] });
      } else if (Array.isArray(item.item)) visit(item.item, [...parents, { id: item.id, name: item.name }]);
    }
  }
  visit(items, []);
  return cases;
}

function groupExecutions(executions, failures) {
  const grouped = new Map();
  for (const execution of executions) {
    const item = execution.item || {};
    const name = item.name || '(cenário sem nome)';
    const key = scenarioKey({ id: item.id || '', name });
    if (!grouped.has(key)) grouped.set(key, { id: item.id || '', name, item, executions: [], failures: [] });
    grouped.get(key).executions.push(execution);
  }
  for (const failure of failures) {
    const source = failure.source || {};
    const key = scenarioKey({ id: source.id || '', name: source.name || '' });
    const target = grouped.get(key) || [...grouped.values()].find((testCase) => testCase.name === source.name);
    if (target) target.failures.push(failure);
  }
  return [...grouped.values()];
}

function scenarioKey(testCase) {
  return `${testCase.id || ''}\u0000${testCase.name || ''}`;
}

function makeCaseDirectory(runDirectory, testCase, index) {
  const code = testCase.name.match(/^\s*\[([A-Z]{2,}-\d+)\]/)?.[1];
  const prefix = `${String(index).padStart(3, '0')}${code ? ` - ${code}` : ''} - `;
  const title = testCase.name.replace(/^\s*\[[A-Z]{2,}-\d+\]\s*/, '').trim() || 'Cenário sem título';
  const safeTitle = sanitizeSegment(title).slice(0, 110).replace(/[ .]+$/g, '') || 'Cenário';
  const base = `${prefix}${safeTitle}`;
  const directory = path.join(runDirectory, base);

  for (const child of ['video', 'prints/etapas', 'prints/resultado', 'complementares', 'resultado']) {
    fs.mkdirSync(path.join(directory, child), { recursive: true });
  }
  return directory;
}

function writeCaseEvidence(testCase, directory, reportPath, evidenceRun, sourceCollection) {
  const lastExecution = testCase.executions.at(-1);
  const status = getCaseStatus(testCase);
  const details = [
    ...testCase.executions.map(formatExecution),
    ...testCase.failures.map(formatFailure)
  ].join('\n\n');
  const item = lastExecution?.item || testCase.item || {};
  const description = getDescription(item.request?.description);
  const expected = description || 'Não informado na coleção. Consultar o resultado esperado no roteiro oficial do Excel.';
  const reportLink = reportPath ? relativeLink(directory, reportPath) : 'Relatório JSON indisponível.';
  const collectionLink = sourceCollection ? relativeLink(directory, sourceCollection) : 'Coleção indisponível.';

  fs.writeFileSync(path.join(directory, 'README.md'), [
    `# ${testCase.name}`,
    '',
    `- **Status:** ${status}`,
    `- **Identificador Newman:** ${testCase.id || 'não informado'}`,
    `- **Grupo/pasta:** ${testCase.parent || item.parent?.name || 'ver coleção'}`,
    `- **Método:** ${item.request?.method || 'não informado'}`,
    `- **Resultado esperado informado na coleção:**`,
    '',
    expected,
    '',
    `- **Coleção:** ${collectionLink}`,
    `- **Relatório da rodada:** ${reportLink}`,
    '',
    '## Evidências desta execução',
    '',
    '- Newman executa requisições HTTP; esta execução não abriu um navegador.',
    '- Não houve vídeo nem captura de tela de interface nesta suíte de API.',
    '- O relatório Newman vinculado acima contém os status e as validações, com corpos, headers e credenciais removidos.',
    '- Resultado observado e bloqueios estão descritos em resultado/resultado.md.'
  ].join('\n') + '\n', 'utf8');

  fs.writeFileSync(path.join(directory, 'resultado', 'resultado.md'), [
    `# Resultado: ${testCase.name}`,
    '',
    `**Status:** ${status}`,
    '',
    '## Resultado esperado',
    '',
    expected,
    '',
    '## Resultado observado',
    '',
    details || (testCase.blockedReason ? `Sem execução Newman nesta rodada.\n\n**Motivo do bloqueio:** ${testCase.blockedReason}` : 'Nenhum registro de execução encontrado no relatório.'),
    '',
    'Os corpos das requisições e respostas são removidos dos relatórios para evitar exposição de dados. Os arquivos complementares contêm somente metadados sanitizados desta execução.',
    '',
    '## Divergências e observações',
    '',
    '- Divergências e bloqueios estão registrados acima a partir do resultado Newman.',
    ''
  ].join('\n'), 'utf8');

  writeEvidenceRecord(path.join(directory, 'video', 'REGISTRO.md'), 'Vídeo não produzido: suíte HTTP executada por Newman, sem interação com interface.');
  writeEvidenceRecord(path.join(directory, 'prints', 'etapas', 'REGISTRO.md'), 'Capturas de interface não produzidas: suíte HTTP executada por Newman, sem navegador.');
  writeEvidenceRecord(path.join(directory, 'prints', 'resultado', 'REGISTRO.md'), 'Captura visual não produzida: resultado registrado no relatório Newman e em resultado/resultado.md.');
  writeEvidenceRecord(path.join(directory, 'complementares', 'REGISTRO.md'), 'Corpos e credenciais não são copiados; o relatório guarda somente metadados sanitizados.');
}

function writeRunSummary(evidenceRun, cases, sourceNote, reportPath, runnerError, reportAvailable) {
  const counts = Object.values(STATUS).map((status) => [status, cases.filter((testCase) => getCaseStatus(testCase) === status).length]);
  const rows = cases.map((testCase, index) => {
    const status = getCaseStatus(testCase);
    const relative = path.relative(evidenceRun.directory, testCase.directory).replaceAll(path.sep, '/');
    return `| ${index + 1} | [${escapeTable(testCase.name)}](<${relative}/resultado/resultado.md>) | ${status} |`;
  });
  const report = reportPath && fs.existsSync(reportPath)
    ? `[JSON](${relativeLink(evidenceRun.directory, reportPath)})`
    : 'JSON indisponível';

  fs.writeFileSync(path.join(evidenceRun.directory, 'RESUMO.md'), [
    `# Evidências da rodada ${evidenceRun.group}`,
    '',
    `- **Início/identificador da rodada:** ${evidenceRun.stamp}`,
    `- **Relatório Newman:** ${report}`,
    `- **Cenários registrados:** ${cases.length}`,
    `- **Relatório disponível:** ${reportAvailable ? 'sim' : 'não'}`,
    runnerError ? `- **Erro da execução:** ${runnerError}` : '',
    '',
    '## Origem do roteiro',
    '',
    sourceNote,
    '',
    '## Contagem por status',
    '',
    ...counts.map(([status, count]) => `- **${status}:** ${count}`),
    '',
    '## Cenários na ordem executada',
    '',
    '| Ordem | Cenário | Status |',
    '|---:|---|---|',
    ...(rows.length ? rows : ['| — | Nenhum cenário registrado no relatório Newman | PENDENTE |']),
    ''
  ].filter((line) => line !== '').join('\n') + '\n', 'utf8');
}

function getCaseStatus(testCase) {
  const executions = testCase.executions || [];
  if (!executions.length) return testCase.blockedReason ? STATUS.BLOCKED : STATUS.PENDING;
  if ((testCase.failures || []).some((failure) => failure.at === 'request')) return STATUS.BLOCKED;
  const statuses = executions.map((execution) => {
    if (!execution.response || execution.requestError) return STATUS.BLOCKED;
    const assertions = execution.assertions || [];
    if (assertions.some((assertion) => assertion.error)) return STATUS.FAILED;
    if (assertions.some((assertion) => !assertion.skipped)) return STATUS.APPROVED;
    return STATUS.BLOCKED;
  });
  if (statuses.includes(STATUS.FAILED)) return STATUS.FAILED;
  if (statuses.includes(STATUS.BLOCKED)) return STATUS.BLOCKED;
  return statuses.every((status) => status === STATUS.APPROVED) ? STATUS.APPROVED : STATUS.PENDING;
}

function formatFailure(failure) {
  const step = failure.at || 'execução Newman';
  const message = failure.error?.message || failure.error?.code || 'falha sem mensagem no relatório';
  return `### Falha Newman (${step})\n- ${message}`;
}

function formatExecution(execution, index) {
  const response = execution.response;
  const lines = [`### Tentativa ${index + 1}`];
  if (response) {
    lines.push(`- **HTTP:** ${response.code ?? 'sem código'} ${response.status || ''}`.trim());
    if (response.responseTime !== undefined) lines.push(`- **Tempo de resposta:** ${response.responseTime} ms`);
  } else {
    lines.push('- **HTTP:** nenhuma resposta recebida.');
  }

  if (execution.requestError?.message) lines.push(`- **Erro de transporte:** ${execution.requestError.message}`);
  const assertions = execution.assertions || [];
  if (assertions.length) {
    lines.push('- **Validações Newman:**');
    for (const assertion of assertions) {
      const marker = assertion.error ? 'FALHOU' : assertion.skipped ? 'IGNORADA' : 'PASSOU';
      const message = assertion.error?.message ? ` — ${assertion.error.message}` : '';
      lines.push(`  - ${marker}: ${assertion.assertion || 'validação sem nome'}${message}`);
    }
  } else {
    lines.push('- **Validações Newman:** nenhuma validação registrada; resultado bloqueado até haver critério verificável.');
  }
  return lines.join('\n');
}

function getDescription(description) {
  const value = typeof description === 'string' ? description : description?.content;
  return String(value || '').trim().slice(0, 4000);
}

function findExcelWorkbook(root) {
  const pending = [root];
  while (pending.length) {
    const directory = pending.pop();
    let entries = [];
    try { entries = fs.readdirSync(directory, { withFileTypes: true }); } catch { continue; }
    for (const entry of entries) {
      if (entry.isDirectory()) {
        if (!['node_modules', '.git', 'evidence', 'reports'].includes(entry.name)) pending.push(path.join(directory, entry.name));
      } else if (/\.xlsx?$/i.test(entry.name)) return path.join(directory, entry.name);
    }
  }
  return null;
}

function sanitizeSegment(value) {
  const safe = String(value).replace(/[<>:"\\|?*\x00-\x1f]/g, '_').replaceAll('/', '_').trim();
  return /^(CON|PRN|AUX|NUL|COM\d|LPT\d)(\.|$)/i.test(safe) ? `_${safe}` : safe;
}

function relativeLink(fromDirectory, target) {
  return path.relative(fromDirectory, target).replaceAll(path.sep, '/');
}

function writeEvidenceRecord(file, text) {
  fs.writeFileSync(file, `${text}\n`, 'utf8');
}

function escapeTable(text) {
  return String(text).replaceAll('|', '\\|').replaceAll('\n', ' ');
}

module.exports = { createEvidenceRun, finalizeEvidenceRun, listCollectionCases };
