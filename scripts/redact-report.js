const fs = require('node:fs');
const path = require('node:path');

function sensitiveValues(environmentFile) {
  const values = [];
  for (const file of [environmentFile, path.resolve(__dirname, '../postman/Omnidelicias-Happy-Paths.postman_collection.json')]) {
    if (!file || !fs.existsSync(path.resolve(file))) continue;
    try {
      const data = JSON.parse(fs.readFileSync(path.resolve(file), 'utf8'));
      for (const entry of [...(data.values || []), ...(data.variable || [])]) {
        const value = String(entry.value || '');
        if (value.length >= 4) values.push(value);
      }
    } catch {}
  }
  return [...new Set(values)].sort((a, b) => b.length - a.length);
}

function cleanText(text, environmentFile) {
  let clean = String(text);
  for (const value of sensitiveValues(environmentFile)) clean = clean.split(value).join('[redacted]');
  return clean;
}

function redactJsonReport(file, environmentFile) {
  if (!fs.existsSync(file)) return;
  const report = JSON.parse(fs.readFileSync(file, 'utf8'));
  const redact = (value) => {
    if (Array.isArray(value)) return value.map(redact);
    if (!value || typeof value !== 'object') return value;
    const clean = {};
    for (const [key, child] of Object.entries(value)) {
      if (/^(body|headers|auth|certificate|environment|variable|globals|stack|stacktrace)$/i.test(key)) clean[key] = '[redacted]';
      else if (/(password|username|secret|access.?token|refresh.?token|authorization|cookie)/i.test(key)) clean[key] = '[redacted]';
      else clean[key] = redact(child);
    }
    return clean;
  };
  const clean = cleanText(JSON.stringify(redact(report), null, 2), environmentFile);
  fs.writeFileSync(file, `${clean}\n`);
}

function redactHtmlReport(file, environmentFile) {
  if (!fs.existsSync(file)) return;
  fs.writeFileSync(file, cleanText(fs.readFileSync(file, 'utf8'), environmentFile));
}

module.exports = { redactJsonReport, redactHtmlReport };
