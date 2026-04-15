const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const reportsDir = path.join(process.cwd(), 'reports');
const jsonPath = path.join(reportsDir, 'eslint-accessibility.json');
const txtPath = path.join(reportsDir, 'eslint-accessibility.txt');

fs.mkdirSync(reportsDir, { recursive: true });

const command = process.platform === 'win32' ? 'npx.cmd' : 'npx';

const result = spawnSync(
  command,
  ['eslint', 'src/**/*.{ts,html}', '--config', 'eslint.config.js', '--format', 'json'],
  {
    encoding: 'utf8',
    shell: true,
  },
);

const stdout = result.stdout ? result.stdout.trim() : '';
const stderr = result.stderr ? result.stderr.trim() : '';

if (!stdout) {
  const errorMessage =
    'ESLint no devolvió salida JSON.\n\n' + (stderr || 'No hay detalles adicionales.');

  fs.writeFileSync(txtPath, errorMessage, 'utf8');
  console.error(errorMessage);
  process.exit(result.status ?? 1);
}

let data;
try {
  data = JSON.parse(stdout);
} catch (error) {
  const parseError =
    'No se pudo interpretar la salida JSON de ESLint.\n\n' +
    '--- STDOUT ---\n' +
    stdout +
    '\n\n--- STDERR ---\n' +
    stderr;

  fs.writeFileSync(txtPath, parseError, 'utf8');
  console.error(`Error al parsear el JSON de ESLint. Revisa ${txtPath}`);
  process.exit(1);
}

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');

const filesWithIssues = data.filter(
  (file) => (file.errorCount || 0) > 0 || (file.warningCount || 0) > 0,
);

const totalErrors = filesWithIssues.reduce((sum, file) => sum + (file.errorCount || 0), 0);

const totalWarnings = filesWithIssues.reduce((sum, file) => sum + (file.warningCount || 0), 0);

let output = '';
output += 'REPORTE DE ACCESIBILIDAD - ESLINT\n';
output += '=================================\n\n';
output += `Archivos analizados: ${data.length}\n`;
output += `Archivos con incidencias: ${filesWithIssues.length}\n`;
output += `Errores: ${totalErrors}\n`;
output += `Warnings: ${totalWarnings}\n\n`;

if (filesWithIssues.length === 0) {
  output += 'No se han encontrado incidencias de accesibilidad.\n';
} else {
  for (const file of filesWithIssues) {
    const relativePath = path.relative(process.cwd(), file.filePath);

    output += `${relativePath}\n`;
    output += `${'-'.repeat(relativePath.length)}\n`;

    for (const message of file.messages) {
      const level = message.severity === 2 ? 'ERROR' : 'WARNING';
      const line = message.line ?? '-';
      const column = message.column ?? '-';
      const rule = message.ruleId || 'sin-regla';

      output += `[${level}] Línea ${line}, columna ${column}\n`;
      output += `Regla: ${rule}\n`;
      output += `Mensaje: ${message.message}\n`;

      if (message.endLine && message.endColumn) {
        output += `Rango: ${line}:${column} -> ${message.endLine}:${message.endColumn}\n`;
      }

      output += '\n';
    }

    output += '\n';
  }
}

fs.writeFileSync(txtPath, output, 'utf8');

console.log(output);

if (stderr) {
  console.error(stderr);
}

process.exit(result.status ?? 0);
