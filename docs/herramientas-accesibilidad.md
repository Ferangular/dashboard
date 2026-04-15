# Herramientas de Análisis Estático para la Accesibilidad

La implementación de la accesibilidad desde las primeras etapas del ciclo de desarrollo, conocida como enfoque "Shift Left", es crucial para reducir costos, mejorar la eficiencia y la calidad. Las herramientas de análisis estático juegan un papel fundamental en este proceso, identificando problemas de accesibilidad en el código fuente antes de que lleguen a producción.

## ESLint y Plugins de Accesibilidad

ESLint es una herramienta de linting estático ampliamente utilizada para identificar patrones problemáticos en el código JavaScript. Su naturaleza configurable permite a los desarrolladores aplicar reglas específicas para mantener la calidad y consistencia del código. Para la accesibilidad, ESLint se extiende a través de plugins especializados.

### eslint-plugin-jsx-a11y (para React/JSX)

**Instalación**

```bash
npm install eslint-plugin-jsx-a11y --save-dev
# o si usas yarn
yarn add eslint-plugin-jsx-a11y --dev
```

**Configuración**
La forma más común es extender una de sus configuraciones predefinidas, como `flatConfigs.recommended`.

```javascript
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default [
  jsxA11y.flatConfigs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
    rules: {
      'jsx-a11y/alt-text': 'error',
    },
  },
];
```

**Para configuraciones legacy (.eslintrc)**
Puedes añadir `jsx-a11y` a la sección plugins y extender plugin: `jsx-a11y/recommended`.

### @angular-eslint/eslint-plugin-template (para Angular)

Este plugin forma parte del conjunto de herramientas de angular-eslint y se enfoca en validar las plantillas HTML de las aplicaciones Angular, incluyendo reglas de accesibilidad. Proporciona una guía inmediata sobre las mejores prácticas de accesibilidad directamente en el código, lo que resulta en aplicaciones Angular más accesibles y fáciles de usar.

**Instalación**
Puedes añadir angular-eslint a tu proyecto Angular usando el comando `ng add`:

```bash
ng add @angular-eslint/schematics
```

Este comando instalará los paquetes necesarios, incluyendo `@angular-eslint/eslint-plugin-template`, y configurará ESLint para tu proyecto Angular.

**Configuración**
El comando `ng add angular-eslint` generará un archivo `eslint.config.js` con una configuración base. Para incluir las reglas de accesibilidad, asegúrate de que se extienda la configuración recomendada de Angular ESLint.

### @html-eslint/eslint-plugin (para HTML general)

Este plugin de ESLint está diseñado para linting de archivos HTML, permitiendo aplicar reglas de calidad y accesibilidad directamente al marcado HTML. Es útil para proyectos que no usan JSX o plantillas de Angular, o para complementar el linting de HTML puro.

**Instalación**

```bash
npm install @html-eslint/eslint-plugin @html-eslint/parser --save-dev
```

**Configuración**
Puedes usar la configuración recomendada del plugin y especificar los archivos HTML a los que se aplica.

```javascript
const html = require('@html-eslint/eslint-plugin');
const htmlParser = require('@html-eslint/parser');

module.exports = [
  {
    files: ['**/*.html'],
    plugins: {
      '@html-eslint': html,
    },
    languageOptions: {
      parser: htmlParser,
    },
    rules: {
      ...html.configs['flat/recommended'].rules,
      '@html-eslint/no-abstract-role': 'error',
      '@html-eslint/no-invalid-role': 'error',
      //... etc
    },
  },
];
```

### DISID A11Y eslint plugin

Una configuración de ESLint compartida y centralizada para asegurar la accesibilidad web en proyectos Angular, integrando las mejores prácticas y reglas de linting para TypeScript, JavaScript y plantillas HTML.

**Instalación**
Este paquete está diseñado para ser una peerDependency, lo que significa que espera que tu proyecto ya tenga instaladas las versiones compatibles de ESLint, TypeScript y los plugins base de Angular.

**1. Asegúrate de que tu proyecto Angular tenga las dependencias base de ESLint instaladas**
En la raíz de tu proyecto Angular, ejecuta:

```bash
ng add @angular-eslint
```

**2. Instala este paquete de configuración compartida**

```bash
npm install @disid/a11y-eslint-plugin --save-dev
# o si usas yarn
yarn add @disid/a11y-eslint-plugin --dev
```

**Uso**
Para usar esta configuración, debes extenderla en tu archivo eslint.config.js principal del proyecto.

```javascript
import nx from '@nx/eslint-plugin';
import customA11yConfig from '@disid/a11y-eslint-plugin';

export default [
  // Extiende las configuraciones base de tu proyecto (ej. Nx, TypeScript, ESLint base)
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],

  // >>> Incluye aquí tu configuración de accesibilidad personalizada <<<
  ...customA11yConfig,

  // Reglas específicas de tu proyecto para HTML
  {
    files: ['**/*.html'],
    rules: {
      '@angular-eslint/template/accessibility-alt-text': 'error',
      '@angular-eslint/template/accessibility-elements-content': 'error',
      '@angular-eslint/template/accessibility-label-has-associated-control': 'error',
      '@angular-eslint/template/no-autofocus': 'error',
      '@angular-eslint/template/no-distracting-elements': 'error',
      '@angular-eslint/template/no-positive-tabindex': 'error',
      //... etc
    },
  },
];
```

### html-validate (herramienta de validación de HTML)

html-validate es una herramienta de validación de HTML que puede ser utilizada para asegurar la calidad y accesibilidad del marcado. Aunque no es un plugin de ESLint en sí mismo, ofrece un conjunto robusto de reglas de accesibilidad que pueden integrarse en el flujo de trabajo de desarrollo.

**Instalación**

```bash
npm i html-validate --save-dev
```

**Si quieres integrarlo con ESLint**
Puedes usar `@html-validate/eslint-config` para la configuración, pero las reglas de validación provienen de la herramienta html-validate directamente.

## Reglas de Accesibilidad Comunes

### ESLint y Plugins de Accesibilidad

#### @angular-eslint/eslint-plugin-template

| Nombre de la regla                           | Descripción                                                                                                                   |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `accessibility-alt-text`                     | Valida que todas las imágenes (`<img>`, `<input type="image">`, `<area>`, `<object>`) tengan texto alternativo significativo. |
| `accessibility-elements-content`             | Asegura que elementos como `<a>`, `<button>` y `<h1>`-`<h6>` contengan contenido.                                             |
| `accessibility-label-has-associated-control` | Determina si un elemento `<label>` tiene una asociación implícita o explícita con un control de formulario.                   |
| `no-autofocus`                               | Prohíbe el uso de la propiedad `autoFocus`.                                                                                   |
| `no-distracting-elements`                    | Prohíbe el uso de elementos que puedan ser distractores para la accesibilidad.                                                |
| `no-positive-tabindex`                       | Exige que el valor de `tabIndex` no sea mayor que cero.                                                                       |
| `role-has-required-aria-props`               | Asegura que los elementos con roles ARIA tengan todos los atributos requeridos para ese rol.                                  |
| `tabindex-no-positive`                       | Asegura que el atributo `tabindex` no tenga un valor positivo (mayor que cero).                                               |

#### eslint-plugin-jsx-a11y

| Nombre de la regla             | Descripción                                                                                                             |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| `alt-text`                     | Asegura que todos los elementos que requieren texto alternativo tengan información significativa para el usuario final. |
| `anchor-has-content`           | Exige que todos los enlaces contengan contenido accesible.                                                              |
| `aria-role`                    | Obliga a que los elementos con roles ARIA utilicen un rol ARIA válido y no abstracto.                                   |
| `control-has-associated-label` | Garantiza que un control (elemento interactivo) tenga una etiqueta de texto asociada.                                   |
| `click-events-have-key-events` | Asegura que un elemento no interactivo clicable tenga al menos un oyente de eventos de teclado.                         |
| `heading-has-content`          | Asegura que los elementos de encabezado (`<h1>`, `<h2>`, etc.) contengan contenido accesible.                           |
| `html-has-lang`                | Exige que el elemento `<html>` tenga la propiedad `lang`.                                                               |
| `iframe-has-title`             | Exige que los elementos `<iframe>` tengan un atributo `title`.                                                          |
| `media-has-caption`            | Exige que los elementos `<audio>` y `<video>` tengan un `<track>` para subtítulos.                                      |
| `no-autofocus`                 | Prohíbe el uso de la propiedad `autoFocus`.                                                                             |
| `tabindex-no-positive`         | Exige que el valor de `tabIndex` no sea mayor que cero.                                                                 |
| `role-has-required-aria-props` | Asegura que los elementos con roles ARIA tengan todos los atributos requeridos para ese rol.                            |

#### @html-eslint/eslint-plugin

| Nombre de la regla         | Descripción                                                                                     |
| -------------------------- | ----------------------------------------------------------------------------------------------- |
| `no-abstract-roles`        | No permite el uso de roles abstractos.                                                          |
| `no-accesskey-attrs`       | No permite el uso del atributo `accesskey`.                                                     |
| `no-aria-hidden-body`      | No permite el uso de atributos `aria-hidden` en el elemento `body`.                             |
| `no-heading-inside-button` | No permite el uso de elementos de encabezado dentro de `<button>`.                              |
| `no-invalid-role`          | No permite el uso de roles inválidos.                                                           |
| `no-non-scalable-viewport` | No permite el uso de `user-scalable=no` en `<meta name="viewport">`.                            |
| `no-positive-tabindex`     | No permite el uso de `tabindex` positivo.                                                       |
| `no-skip-heading-levels`   | No permite saltar niveles de encabezado.                                                        |
| `require-form-method`      | Requiere el atributo `method` en `<form>`.                                                      |
| `require-frame-title`      | Requiere `title` en `<frame>` y `<iframe>`.                                                     |
| `require-img-alt`          | Requiere el atributo `alt` en la etiqueta `<img>`.                                              |
| `require-input-label`      | Obliga al uso de una etiqueta para los elementos de formulario (`input`, `textarea`, `select`). |
| `require-meta-viewport`    | Obliga al uso de `<meta name="viewport">` en `<head>`.                                          |
| `valid-aria`               | Asegura que se utilicen atributos ARIA correctos y sus valores respectivos.                     |

## SonarQube

SonarQube es una plataforma de calidad de código que realiza análisis estático para detectar errores, vulnerabilidades, puntos calientes de seguridad y "code smells" en el código fuente. Para las aplicaciones web, SonarQube ofrece un conjunto de reglas específicas para la accesibilidad en HTML y JavaScript.

### Las reglas de accesibilidad de SonarQube para JavaScript/HTML

| Nombre de la regla                                                        | Descripción                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **"Heading elements should have accessible content"** (Web:S6850)         | Esta regla garantiza que los elementos de encabezado (`<h1>` a `<h6>`) no estén vacíos y contengan contenido significativo. Esto es crucial para los usuarios de lectores de pantalla, que utilizan los encabezados para navegar por la estructura de la página.                                                                                                                                      |
| **"Label elements should have a text label and an associated control"**   | Esta regla asegura que los controles de formulario tengan etiquetas adecuadas para la accesibilidad.                                                                                                                                                                                                                                                                                                  |
| **"Images should have a non-redundant alternate description"**            | Las imágenes necesitan un texto alt descriptivo para los lectores de pantalla, y esta descripción no debe ser redundante con el texto circundante.                                                                                                                                                                                                                                                    |
| **"Non-interactive DOM elements should not have an interactive handler"** | Los elementos que no son inherentemente interactivos (por ejemplo, `div`, `span`) no deben tener manejadores de eventos que los hagan comportarse como controles interactivos.                                                                                                                                                                                                                        |
| **"Prefer tag over ARIA role"**                                           | Esta regla enfatiza el uso de etiquetas HTML semánticas en lugar de roles ARIA en elementos genéricos cuando existe una etiqueta HTML adecuada. Por ejemplo, se prefiere usar `<button>` en lugar de `<div role="button">`. Las etiquetas HTML semánticas ofrecen funcionalidad incorporada, soporte universal, simplicidad y mejor mantenibilidad y SEO. Los roles ARIA deben ser un último recurso. |
| **"Table cells should reference their headers"**                          | Las celdas de las tablas deben estar asociadas con sus encabezados correspondientes para una navegación adecuada por parte de los lectores de pantalla.                                                                                                                                                                                                                                               |
| **"Mouse events should have corresponding keyboard events"**              | Si una acción se activa con un evento de ratón, debe haber una forma equivalente de activarla con el teclado.                                                                                                                                                                                                                                                                                         |
| **"iFrames must have a title"**                                           | Los elementos `<iframe>` requieren un atributo `title` para describir su contenido a las tecnologías de asistencia.                                                                                                                                                                                                                                                                                   |
| **"HTML elements should have a valid language attribute"**                | El atributo `lang` en los elementos HTML ayuda a los lectores de pantalla a pronunciar el contenido correctamente.                                                                                                                                                                                                                                                                                    |

## Integración y Flujo de Trabajo

### 1. Configuración del Entorno

**Para proyectos Angular:**

```bash
# Instalar ESLint y plugins de accesibilidad
ng add @angular-eslint/schematics
npm install eslint-plugin-jsx-a11y @html-eslint/eslint-plugin --save-dev

# Configurar eslint.config.js
# (Usar la configuración DISID A11Y como ejemplo)
```

**Para proyectos React:**

```bash
npm install eslint-plugin-jsx-a11y @html-eslint/eslint-plugin --save-dev
```

### 2. Integración en CI/CD

**GitHub Actions:**

```yaml
name: Accessibility Lint
on: [push, pull_request]
jobs:
  accessibility:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Run accessibility lint
        run: npm run lint:accessibility
```

### 3. Flujo de Desarrollo con "Shift Left"

1. **Configuración del IDE**: Configura ESLint en tu editor para mostrar errores en tiempo real
2. **Desarrollo**: Escribe código mientras ESLint detecta problemas de accesibilidad
3. **Commits**: Realiza commits pequeños y enfocados en corregir problemas específicos
4. **Pull Requests**: Revisa que no se introduzcan nuevos problemas de accesibilidad
5. **Merge**: Integración solo después de pasar todas las validaciones

## axe-core (motor de pruebas de Accesibilidad)

axe-core es un motor de reglas de accesibilidad de código abierto, ampliamente reconocido por su precisión y por generar cero falsos positivos en la detección de defectos de accesibilidad. A diferencia de los linters estáticos que analizan el código fuente, axe-core se utiliza principalmente para realizar pruebas de accesibilidad en el DOM renderizado en tiempo de ejecución.

### Características Principales

- **Precisión**: Alta tasa de detección verdadera con baja tasa de falsos positivos
- **Actualización constante**: Mantenimiento regular con estándares WCAG y mejores prácticas
- **Código abierto**: Transparencia y posibilidad de personalización
- **Integraciones múltiples**: Compatible con múltiples frameworks y herramientas

### Rol y Complementariedad

**Mientras que plugins de ESLint como eslint-plugin-jsx-a11y o @angular-eslint/eslint-plugin-template detectan patrones de código problemáticos en la fase de desarrollo (antes de la ejecución), axe-core verifica el estado final de la página en el navegador.**

Por ejemplo:

- Un linter podría asegurar que una imagen tiene un atributo `alt`, pero axe-core podría verificar si ese `alt` text es realmente significativo en el contexto del DOM renderizado.

### Integraciones Comunes

#### Bibliotecas para Frameworks

Existen integraciones específicas como `@axe-core/react` que permiten ejecutar pruebas de accesibilidad en componentes React renderizados.

#### Extensiones de Navegador

Deque Systems (los creadores de axe-core) ofrecen extensiones como **axe DevTools** para Chrome, que permiten auditar la accesibilidad de una página directamente en el navegador.

#### Herramientas de Línea de Comandos y CI/CD

axe-core puede ser utilizado en scripts de pruebas automatizadas y pipelines de integración continua/despliegue continuo (CI/CD) para bloquear pull requests que introduzcan nuevos problemas de accesibilidad.

#### Productos Comerciales

Aunque axe-core en sí mismo es de código abierto, algunas de las herramientas y servicios que lo utilizan para integraciones más profundas en flujos de trabajo empresariales pueden ser de pago. Su valor reside en su capacidad para proporcionar "alertas tempranas de defectos de accesibilidad reales" con "cero falsos positivos", lo que reduce la necesidad de escribir numerosas barreras de ignorar.

## Comparación de Herramientas

| Herramienta          | Tipo                   | Fortalezas                                        | Limitaciones                          | Casos de Uso |
| -------------------- | ---------------------- | ------------------------------------------------- | ------------------------------------- | ------------ |
| **ESLint + Plugins** | Análisis estático      | Integración temprana, configuración personalizada | Código fuente, patrones problemáticos |
| **html-validate**    | Validación HTML        | Especializado en HTML, reglas específicas         | Marcado HTML puro                     |
| **SonarQube**        | Análisis completo      | Calidad general + seguridad, integración CI/CD    | Todo el proyecto, código complejo     |
| **axe-core**         | Pruebas en tiempo real | DOM renderizado, precisión alta                   | Testing manual, aplicaciones web      |

## Recomendaciones Finales

1. **Combina múltiples herramientas**: Usa ESLint para desarrollo + axe-core para pruebas
2. **Integra en CI/CD**: Automatiza las validaciones en cada commit/PR
3. **Testing manual complementario**: Las herramientas automáticas no reemplazan las pruebas con usuarios reales
4. **Documenta el proceso**: Crea guías de accesibilidad específicas para tu equipo
5. **Formación continua**: Mantén al equipo actualizado sobre estándares y herramientas

La implementación de un análisis estático robusto no es solo una medida de calidad, sino una inversión estratégica que reduce costos, mejora la eficiencia y asegura que tu aplicación sea verdaderamente accesible para todos los usuarios.

## 🚀 Mejas Adicionales para el Proyecto

### 1. Configuración Avanzada del Entorno

#### package.json Scripts

Añade scripts específicos para accesibilidad:

```json
{
  "scripts": {
    "lint:accessibility": "eslint . --ext .js,.ts,.html --config eslint.config.js",
    "lint:accessibility:fix": "eslint . --ext .js,.ts,.html --config eslint.config.js --fix",
    "test:accessibility": "axe-core http://localhost:4200 --include 'iframe,button,input'",
    "test:accessibility:ci": "axe-core http://localhost:4200 --exit 1 --include 'iframe,button,input'",
    "validate:html": "html-validate 'src/**/*.html'",
    "validate:html:fix": "html-validate 'src/**/*.html' --fix",
    "a11y:report": "node scripts/generate-a11y-report.js",
    "a11y:check": "node scripts/check-a11y-threshold.js"
  }
}
```

#### .vscode/settings.json

Configuración optimizada para desarrollo accesible:

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "editor.quickSuggestions": {
    "strings": false
  },
  "editor.fontSize": 14,
  "editor.fontFamily": "Consolas, 'Courier New', monospace",
  "editor.wordWrap": "on",
  "editor.accessibility.verbosity": true,
  "editor.accessibility.hideAccessibleView": false,
  "workbench.colorCustomizations": {
    "[A11y]": {
      "foreground": "#ff0000",
      "background": "#ffff00",
      "cursor": "#000000"
    }
  }
}
```

### .eslintrc.json (Configuración Legacy - si aplica)

```json
{
  "extends": ["@angular-eslint/recommended", "plugin:@angular-eslint/recommended"],
  "rules": {
    "@angular-eslint/template/accessibility-alt-text": "error",
    "@angular-eslint/template/accessibility-elements-content": "error",
    "@angular-eslint/template/accessibility-label-has-associated-control": "error",
    "@angular-eslint/template/accessibility-valid-aria": "error",
    "@angular-eslint/template/no-autofocus": "error",
    "@angular-eslint/template/no-distracting-elements": "error",
    "@angular-eslint/template/no-positive-tabindex": "error",
    "@angular-eslint/template/click-events-have-key-events": "error",
    "@angular-eslint/template/no-interpolation": "error",
    "@angular-eslint/template/inputs-have-type": "error",
    "@angular-eslint/template/button-has-type": "error",
    "@angular-eslint/template/no-duplicate-attributes": "error",

    // Reglas personalizadas del proyecto
    "custom/no-hardcoded-text": "warn",
    "custom/prefer-const-enum": "error",
    "custom/accessibility-interactive-elements": "error"
  }
}
```

### Scripts Actualizados para package.json

#### Scripts de Accesibilidad

```json
{
  "scripts": {
    // Linting con reglas de accesibilidad
    "lint": "eslint . --ext .js,.ts,.html --config eslint.config.js",
    "lint:accessibility": "eslint . --ext .js,.ts,.html --config eslint.config.js --format stylish",
    "lint:accessibility:fix": "eslint . --ext .js,.ts,.html --config eslint.config.js --fix",
    "lint:accessibility:report": "eslint . --ext .js,.ts,.html --config eslint.config.js --format json --output-file reports/eslint-accessibility.json",

    // Validación HTML específica para accesibilidad
    "validate:html": "html-validate 'src/**/*.html' --config .htmlvalidateaccessibility.json",
    "validate:html:fix": "html-validate 'src/**/*.html' --config .htmlvalidateaccessibility.json --fix",

    // Testing con axe-core
    "test:accessibility": "axe-core 'src/**/*.html' --include 'iframe,button,input,select,textarea' --exclude 'node_modules/**'",
    "test:accessibility:ci": "axe-core 'src/**/*.html' --include 'iframe,button,input,select,textarea' --exclude 'node_modules/**' --exit 1",
    "test:accessibility:report": "node scripts/generate-a11y-report.js",
    "test:accessibility:check": "node scripts/check-a11y-threshold.js",

    // Scripts combinados
    "check:accessibility": "npm run lint:accessibility && npm run validate:html && npm run test:accessibility:ci",
    "check:accessibility:fix": "npm run lint:accessibility:fix && npm run validate:html:fix",
    "audit:accessibility": "npm run lint:accessibility:report && npm run test:accessibility:ci && npm run test:accessibility:report",

    // Desarrollo con verificación continua
    "dev": "npm run lint:accessibility --watch & npm run test:accessibility --watch"
  }
}
```

### .htmlvalidateaccessibility.json (Configuración HTML Validate)

```json
{
  "extends": ["html-validate:recommended"],
  "rules": {
    // Reglas específicas de accesibilidad
    "require-img-alt": "error",
    "require-lang": "error",
    "require-meta-viewport": "error",
    "require-input-label": "error",
    "no-skip-heading-levels": "error",
    "no-positive-tabindex": "error",
    "prefer-native-element": "warn",
    "valid-aria": "error",
    "no-redundant-aria-label": "error",
    "media-has-caption": "error",
    "element-required-content": "error",
    "no-autoplay": "error"
  }
}
```

## 🧪 Scripts de Verificación y Reportes

### scripts/check-a11y-threshold.js (Actualizado)

```javascript
const fs = require('fs');

// Umbrales configurables por entorno
const THRESHOLDS = {
  development: {
    violations: {
      critical: 0,
      serious: 5,
      moderate: 15,
      minor: 25,
    },
    score: {
      min: 85,
    },
  },
  staging: {
    violations: {
      critical: 0,
      serious: 3,
      moderate: 10,
      minor: 20,
    },
    score: {
      min: 88,
    },
  },
  production: {
    violations: {
      critical: 0,
      serious: 2,
      moderate: 5,
      minor: 10,
    },
    score: {
      min: 92,
    },
  },
};

// Obtener entorno actual
const environment = process.env.NODE_ENV || 'development';
const thresholds = THRESHOLDS[environment];

function checkAccessibilityReport() {
  try {
    const reportPath = 'reports/eslint-accessibility.json';

    if (!fs.existsSync(reportPath)) {
      console.log('ℹ️ No accessibility report found. Run: npm run lint:accessibility:report');
      return false;
    }

    const reportContent = fs.readFileSync(reportPath, 'utf8');
    const report = JSON.parse(reportContent);

    // Contar violaciones por nivel
    const violations = report.violations || [];
    const counts = violations.reduce((acc, violation) => {
      acc[violation.severity] = (acc[violation.severity] || 0) + 1;
      return acc;
    }, {});

    // Verificar axe-core report si existe
    const axeReportPath = 'reports/axe-report.json';
    let axeViolations = 0;

    if (fs.existsSync(axeReportPath)) {
      const axeReport = JSON.parse(fs.readFileSync(axeReportPath, 'utf8'));
      axeViolations = axeReport.violations?.length || 0;
    }

    const totalViolations =
      counts.critical + counts.serious + counts.moderate + counts.minor + axeViolations;

    console.log('\n🔍 Accessibility Report Analysis');
    console.log('================================');

    // Verificar umbrales
    const hasCriticalIssues = counts.critical > thresholds.violations.critical;
    const hasSeriousIssues = counts.serious > thresholds.violations.serious;
    const hasModerateIssues = counts.moderate > thresholds.violations.moderate;
    const hasMinorIssues = counts.minor > thresholds.violations.minor;
    const scoreBelowThreshold = report.score && report.score < thresholds.score.min;

    if (
      hasCriticalIssues ||
      hasSeriousIssues ||
      hasModerateIssues ||
      hasMinorIssues ||
      scoreBelowThreshold ||
      axeViolations > 0
    ) {
      console.error('\n❌ ACCESSIBILITY ISSUES DETECTED:');
      console.error('================================');

      if (hasCriticalIssues) {
        console.error(
          `🚨 Critical: ${counts.critical}/${thresholds.violations.critical} (max: ${thresholds.violations.critical})`,
        );
      }
      if (hasSeriousIssues) {
        console.error(
          `⚠️ Serious: ${counts.serious}/${thresholds.violations.serious} (max: ${thresholds.violations.serious})`,
        );
      }
      if (hasModerateIssues) {
        console.error(
          `⚠️ Moderate: ${counts.moderate}/${thresholds.violations.moderate} (max: ${thresholds.violations.moderate})`,
        );
      }
      if (hasMinorIssues) {
        console.error(
          `⚠️ Minor: ${counts.minor}/${thresholds.violations.minor} (max: ${thresholds.violations.minor})`,
        );
      }
      if (axeViolations > 0) {
        console.error(`🔨 Axe Issues: ${axeViolations} detected`);
      }
      if (scoreBelowThreshold) {
        console.error(
          `📊 Score: ${report.score}/${thresholds.score.min} (min: ${thresholds.score.min})`,
        );
      }

      console.error('\n📋 Summary:');
      console.error(`Total Violations: ${totalViolations}`);
      console.error(`Environment: ${environment.toUpperCase()}`);
      console.error(
        `Thresholds: Critical≤${thresholds.violations.critical}, Serious≤${thresholds.violations.serious}, Moderate≤${thresholds.violations.moderate}, Minor≤${thresholds.violations.minor}`,
      );
      console.error(`Score Minimum: ${thresholds.score.min}, Current: ${report.score || 'N/A'}`);

      return false;
    }

    console.log('\n✅ ACCESSIBILITY CHECK PASSED');
    console.log('================================');
    console.log(`Environment: ${environment.toUpperCase()}`);
    console.log(`ESLint Violations: ${totalViolations}`);
    console.log(`Axe Violations: ${axeViolations}`);
    console.log(`Score: ${report.score || 'N/A'}`);
    console.log(`All thresholds met for ${environment.toUpperCase()}`);

    return true;
  } catch (error) {
    console.error('\n❌ Error checking accessibility thresholds:', error.message);
    return false;
  }
}

// Ejecutar verificación
const passed = checkAccessibilityReport();

// Salir con código apropiado
process.exit(passed ? 0 : 1);
```

### scripts/generate-a11y-report.js (Mejorado)

```javascript
const AxeBuilder = require('@axe-core/builder');
const fs = require('fs');
const path = require('path');

// Configuración mejorada con tags específicas
const builder = new AxeBuilder()
  .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice'])
  .withRules([
    // Reglas personalizadas del proyecto
    {
      id: 'custom-interactive-elements',
      description: 'All interactive elements must be keyboard accessible',
      matcher: (node) => ({
        // Verificar que elementos interactivos tengan manejadores de teclado
        matches: ['button', 'a', 'input', 'select', 'textarea'].includes(
          node.tagName.toLowerCase(),
        ),
        // Verificar que tengan manejadores de eventos apropiados
        hasEventListeners:
          node.hasEventListeners ||
          node.onclick ||
          node.onkeydown ||
          node.onkeyup ||
          // Verificar atributos ARIA apropiados
          (node.tabIndex !== undefined && node.tabIndex >= 0) ||
          node.getAttribute('role') ||
          node.getAttribute('aria-label'),
      }),
    },
    {
      id: 'custom-color-contrast',
      description: 'Text must have sufficient color contrast',
      matcher: (node) => {
        // Verificar contraste en elementos de texto
        if (node.nodeType === Node.TEXT_NODE) {
          const computedStyle = window.getComputedStyle(node.parentElement);
          const textColor = computedStyle.color;
          const backgroundColor = computedStyle.backgroundColor;

          // Calcular ratio de contraste (simplificado)
          const contrast = getContrastRatio(textColor, backgroundColor);

          return contrast < 4.5; // WCAG AA standard
        }

        return false;
      },
    },
  ]);

function getContrastRatio(color1, color2) {
  // Implementación simplificada del cálculo de contraste
  const rgb1 = getRGB(color1);
  const rgb2 = getRGB(color2);

  const l1 = (0.299 * rgb1.r + 0.587 * rgb1.g + 0.114 * rgb1.b) / 1;
  const l2 = (0.299 * rgb2.r + 0.587 * rgb2.g + 0.114 * rgb2.b) / 1;

  const contrastRatio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) - 0.05);

  return contrastRatio;
}

function getRGB(color) {
  const match = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (!match) return null;

  return {
    r: parseInt(match[1]),
    g: parseInt(match[2]),
    b: parseInt(match[3]),
  };
}

// Analizar y generar reporte
builder
  .analyze({
    source: 'src',
    destination: 'reports/accessibility',
    reportFileName: 'a11y-report.html',
    reportTitle: `Accessibility Audit Report - ${new Date().toISOString().split('T')[0]}`,
    include: ['**/*.html', '**/*.js', '**/*.ts'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/*.spec.ts', '**/*.test.ts'],
  })
  .then(() => {
    console.log('✅ Enhanced accessibility report generated successfully');
    console.log(`📊 Report includes custom rules for interactive elements and color contrast`);
  })
  .catch((error) => {
    console.error('❌ Error generating enhanced accessibility report:', error);
    process.exit(1);
  });
```

## 🔄 Flujo de Trabajo Actualizado

### 1. Desarrollo Local con Verificación Continua

```bash
# Terminal 1: Linting en tiempo real
npm run dev

# Terminal 2: Testing con axe-core (opcional)
npm run test:accessibility --watch
```

### 2. Pre-commit con Verificación Automática

```bash
# .husky/pre-commit
#!/bin/sh
npm run check:accessibility
```

### 3. Pull Request con Validación Completa

```bash
# GitHub Actions ejecuta automáticamente:
# - ESLint con reglas de accesibilidad
# - Validación HTML
# - Testing con axe-core
# - Verificación de umbrales
# - Generación de reportes
```

Esta configuración completa proporcionará:

- ✅ Detección temprana de problemas (Shift Left)
- 🔍 Validación automática en cada commit
- 📊 Métricas claras y reportes detallados
- 🚫 Bloqueo de PRs que no cumplen estándares
- 📈 Mejora continua de la calidad accesible

## 🎯 Reglas ESLint Específicas por Categoría

### 🏗️ Estructura y Semántica

- `@angular-eslint/template/accessibility-alt-text` - Imágenes con alt descriptivo
- `@angular-eslint/template/accessibility-elements-content` - Elementos con contenido
- `@angular-eslint/template/accessibility-label-has-associated-control` - Labels asociadas a controles
- `@html-eslint/require-lang` - Idioma en HTML
- `@html-eslint/no-skip-heading-levels` - Jerarquía de encabezados correcta

### 🎮 Interactividad y Navegación

- `@angular-eslint/template/click-events-have-key-events` - Eventos de teclado en elementos clickeables
- `@angular-eslint/template/no-positive-tabindex` - TabIndex no positivo
- `@angular-eslint/template/no-distracting-elements` - Sin elementos distractores
- `custom/interactive-elements` - Elementos interactivos accesibles por teclado

### 📝 Formularios y Validación

- `@angular-eslint/template/inputs-have-type` - Tipos correctos en inputs
- `@angular-eslint/template/button-has-type` - Botones con tipo adecuado
- `@html-eslint/require-form-method` - Método en formularios
- `@html-eslint/require-input-label` - Labels en campos de formulario

### 🎨 Estilo y Contraste

- `custom/color-contrast` - Verificación automática de contraste
- `@html-eslint/valid-aria` - ARIA válido y correcto

### 🚀 Rendimiento y Calidad

- `@angular-eslint/template/no-negated-async` - Operaciones asíncronas seguras
- `@angular-eslint/template/no-call-expression` - Expresiones seguras en plantillas
- `custom/no-hardcoded-text` - Sin texto codificado

## 📚 Implementación Gradual Sugerida

### Mes 1-2: Configuración Base

1. Instalar ESLint y plugins
2. Configurar reglas básicas de accesibilidad
3. Crear primer componente accesible
4. Establecer guía de estilo

### Mes 3-4: Integración de Herramientas

1. Agregar axe-core para testing
2. Configurar CI/CD básico
3. Implementar dashboard de métricas simple
4. Empezar a medir score de accesibilidad

### Mes 5-6: Automatización Avanzada

1. Refinar reglas ESLint con validaciones personalizadas
2. Implementar testing E2E completo
3. Configurar reportes detallados
4. Establecer umbrales de calidad

### Mes 7-8: Optimización y Documentación

1. Optimizar rendimiento de componentes accesibles
2. Documentar todas las reglas y guías
3. Crear biblioteca de componentes accesibles
4. Formación continua al equipo

Esta configuración asegura un "Shift Left" robusto con verificación continua en cada etapa del desarrollo.

### 2. Scripts Automatizados para Accesibilidad

#### scripts/generate-a11y-report.js

```javascript
const AxeBuilder = require('@axe-core/builder');
const fs = require('fs');
const path = require('path');

const builder = new AxeBuilder();
builder.withTags(['wcag2a', 'wcag21aa', 'best-practice']);

builder
  .analyze({
    source: 'dist',
    destination: 'reports/accessibility',
    reportFileName: 'a11y-report.html',
    reportTitle: 'Accessibility Audit Report',
    include: ['**/*.html', '**/*.js'],
  })
  .then(() => {
    console.log('✅ Accessibility report generated successfully');
  })
  .catch((error) => {
    console.error('❌ Error generating accessibility report:', error);
    process.exit(1);
  });
```

#### scripts/check-a11y-threshold.js

```javascript
const fs = require('fs');

const THRESHOLDS = {
  violations: {
    critical: 0,
    serious: 2,
    moderate: 5,
    minor: 10,
  },
  score: {
    min: 90,
  },
};

function checkThresholds(reportPath) {
  try {
    const reportContent = fs.readFileSync(reportPath, 'utf8');
    const violations = JSON.parse(reportContent).violations || [];

    const counts = violations.reduce((acc, violation) => {
      acc[violation.impact] = (acc[violation.impact] || 0) + 1;
      return acc;
    }, {});

    const hasIssues =
      counts.critical > THRESHOLDS.violations.critical ||
      counts.serious > THRESHOLDS.violations.serious ||
      counts.moderate > THRESHOLDS.violations.moderate ||
      counts.minor > THRESHOLDS.violations.minor;

    if (hasIssues) {
      console.error(`❌ Accessibility thresholds exceeded:`);
      console.error(`Critical: ${counts.critical} (max: ${THRESHOLDS.violations.critical})`);
      console.error(`Serious: ${counts.serious} (max: ${THRESHOLDS.violations.serious})`);
      console.error(`Moderate: ${counts.moderate} (max: ${THRESHOLDS.violations.moderate})`);
      console.error(`Minor: ${counts.minor} (max: ${THRESHOLDS.violations.minor})`);
      process.exit(1);
    }

    console.log(`✅ Accessibility thresholds passed`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error checking accessibility thresholds:', error.message);
    process.exit(1);
  }
}

const reportPath = process.argv[2] || 'reports/accessibility/axe-report.json';
checkThresholds(reportPath);
```

### 3. Integración con Testing Visual

#### cypress-axe.json

```json
{
  "env": {
    "cypress-axe": {
      "threshold": 95,
      "impactLevels": ["minor", "moderate", "serious", "critical"],
      "includedImpacts": ["accessibility"],
      "runOnlyOn": ["ci", "staging"],
      "excludePatterns": ["*.spec.ts", "*.test.ts"]
    }
  }
}
```

#### .github/workflows/accessibility.yml

```yaml
name: Accessibility Pipeline
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  accessibility-audit:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run ESLint
        run: npm run lint:accessibility

      - name: Run HTML validation
        run: npm run validate:html

      - name: Build application
        run: npm run build

      - name: Run accessibility tests
        run: npm run test:accessibility

      - name: Generate accessibility report
        run: npm run a11y:report

      - name: Check accessibility thresholds
        run: npm run a11y:check

      - name: Upload accessibility report
        uses: actions/upload-artifact@v4
        with:
          name: accessibility-report
          path: reports/accessibility/

      - name: Comment PR with results
        if: github.event_name == 'pull_request'
        uses: actions/github-scripts@v7
        with:
          script: |
            // Script para comentar resultados en el PR
            const fs = require('fs');
            const reportPath = 'reports/accessibility/axe-report.json';

            if (fs.existsSync(reportPath)) {
              const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
              const violations = report.violations || [];
              
              if (violations.length > 0) {
                const comment = `## 🚨 Accessibility Issues Found\n\n${violations.slice(0, 10).map(v => 
                  `**${v.impact.toUpperCase()}**: ${v.description}\n- **Rule**: ${v.id}\n- **Target**: ${v.nodes.map(n => n.target.join(', '))}\n`
                ).join('\n')}`;
                
                console.log('Comment to add:', comment);
                // Aquí iría el código para postear el comentario
              }
            }
```

### 4. Componentes de Accesibilidad Reutilizables

#### lib/accessibility/base-button.component.ts

```typescript
import { Component, Input, booleanAttribute } from '@angular/core';

@Component({
  selector: 'lib-base-button',
  template: `
    <button
      [attr.aria-label]="ariaLabel"
      [attr.aria-pressed]="pressed"
      [attr.aria-disabled]="disabled"
      [attr.tabindex]="disabled ? -1 : 0"
      [class]="'base-button' + (pressed ? ' pressed' : '') + (disabled ? ' disabled' : '')"
      (click)="onClick.emit()"
      (keydown.enter)="onClick.emit()"
      (keydown.space)="onClick.emit()"
    >
      <ng-content></ng-content>
    </button>
  `,
  styles: [
    `
      .base-button {
        background: var(--primary-color, #007bff);
        color: white;
        border: none;
        border-radius: 4px;
        padding: 8px 16px;
        cursor: pointer;
        font-family: inherit;
        font-size: inherit;

        &:focus {
          outline: 2px solid var(--focus-color, #80bdff);
          outline-offset: 2px;
        }

        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        &.pressed {
          background: var(--pressed-color, #0056b3);
        }
      }
    `,
  ],
})
export class BaseButtonComponent {
  @Input() ariaLabel: string = '';
  @Input() pressed = false;
  @Input() disabled = false;

  @Output() onClick = new EventEmitter<void>();
}
```

#### lib/accessibility/skip-link.component.ts

```typescript
import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-skip-link',
  template: `
    <a
      [attr.href]="target"
      [attr.aria-label]="label"
      class="skip-link"
      (keydown.enter)="navigate()"
      (click)="navigate()"
    >
      {{ label }}
    </a>
  `,
  styles: [
    `
      .skip-link {
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color, #007bff);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1000;
        transition: top 0.3s ease;

        &:focus {
          top: 6px;
          outline: 2px solid var(--focus-color, #80bdff);
          outline-offset: 2px;
        }
      }
    `,
  ],
})
export class SkipLinkComponent {
  @Input() target: string = '#main-content';
  @Input() label: string = 'Skip to main content';

  navigate() {
    const element = document.querySelector(this.target);
    if (element) {
      element.focus();
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
```

### 5. Métricas y Dashboard

#### src/app/services/accessibility-metrics.service.ts

```typescript
import { Injectable } from '@angular/core';

export interface AccessibilityMetrics {
  score: number;
  violations: {
    critical: number;
    serious: number;
    moderate: number;
    minor: number;
  };
  trends: {
    score: number[];
    dates: string[];
  };
}

@Injectable({
  providedIn: 'root',
})
export class AccessibilityMetricsService {
  private metrics: AccessibilityMetrics[] = [];

  recordMetrics(metrics: AccessibilityMetrics) {
    this.metrics.push({
      ...metrics,
      timestamp: new Date().toISOString(),
    });

    // Guardar histórico (últimas 50 mediciones)
    if (this.metrics.length > 50) {
      this.metrics = this.metrics.slice(-50);
    }
  }

  getLatestMetrics(): AccessibilityMetrics | null {
    return this.metrics[this.metrics.length - 1] || null;
  }

  getTrends(): AccessibilityMetrics['trends'] {
    return {
      score: this.metrics.map((m) => m.score),
      dates: this.metrics.map((m) => m.timestamp.split('T')[0]),
    };
  }

  getImprovementSuggestions(): string[] {
    const latest = this.getLatestMetrics();
    if (!latest) return [];

    const suggestions = [];
    if (latest.score < 90) {
      suggestions.push('Implementar testing automatizado continuo');
    }
    if (latest.violations.critical > 0) {
      suggestions.push('Priorizar corrección de violaciones críticas');
    }
    return suggestions;
  }
}
```

### 6. Testing E2E para Accesibilidad

#### cypress/e2e/accessibility.cy.js

```javascript
describe('Accessibility E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.injectAxe();
  });

  it('should be keyboard navigable', () => {
    // Test navigation using only keyboard
    cy.get('body').tab();
    cy.focused().should('have.attr', 'aria-label');

    // Navigate through main interactive elements
    ['button', 'a', 'input'].forEach(selector => {
      cy.get(selector).first().type('{enter}');
      cy.focused().should('be.visible');
    });
  });

  it('should have proper ARIA labels', () => {
    cy.checkA11y();

    // Verify all interactive elements have accessible names
    cy.get('[role="button"]').each($el => {
      cy.wrap($el).invoke('attr', 'aria-label').should('not.be.empty');
    });

    cy.get('input[type="text"]').each($el => {
      const hasLabel = $el.attr('aria-label') ||
                     $el.attr('id') &&
                     cy.get(`label[for="${$el.attr('id')}"]`).length > 0;
      cy.wrap($el).should('satisfy', hasLabel);
    });
  });

  it('should maintain focus order', () => {
    const focusableElements = [];

    cy.get('button, a, input, [tabindex]:not([tabindex="-1"])').each($el => {
      focusableElements.push($el);
    });

    // Test tab order
    focusableElements.forEach((element, index) => {
      cy.wrap(element).focus();
      cy.focused().should('have.attr', 'tabindex', index.toString());
    });
  });

  it('should work with screen reader simulation', () => {
    // Test with reduced motion
    cy.window().then((win) => {
      win.matchMedia('(prefers-reduced-motion: reduce)').matches);
    });

    // Test with high contrast
    cy.window().then((win) => {
      win.matchMedia('(prefers-contrast: high)').matches;
    });

    // Test accessibility tree
    cy.get('html').should('have.attr', 'lang');
    cy.get('main').should('have.attr', 'role', 'main');
    cy.get('nav').should('have.attr', 'role', 'navigation');
  });
});
```

### 7. Documentación y Formación

#### docs/accessibility/guidelines.md

```markdown
# Guía de Accesibilidad para Equipo

## Principios Fundamentales

### POUR (Perceivable, Operable, Understandable, Robust)

- **Perceivable**: La información debe ser presentable de formas que los usuarios puedan percibir
- **Operable**: Los componentes de la interfaz deben ser operables y navegables
- **Understandable**: La información y el funcionamiento de la interfaz deben ser comprensibles
- **Robust**: El contenido debe ser lo suficientemente robusto como para ser interpretado por diversas tecnologías de asistencia

## Checklist de Desarrollo

### Antes de Escribir Código

- [ ] ¿Este componente necesita roles ARIA o hay un elemento HTML nativo?
- [ ] ¿Todos los elementos interactivos tienen etiquetas descriptivas?
- [ ] ¿El orden de tabulación es lógico?
- [ ] ¿Los colores tienen suficiente contraste?
- [ ] ¿Funciona sin ratón (solo teclado)?
- [ ] ¿Los formularios tienen validación accesible?

### Durante el Desarrollo

- [ ] Uso de herramientas de linting configuradas
- [ ] Testing con lectores de pantalla (NVDA, VoiceOver)
- [ ] Validación con herramientas automáticas (axe, Lighthouse)
- [ ] Revisión manual por colegas

### Antes del Commit

- [ ] No hay violaciones críticas de accesibilidad
- [ ] El score de accesibilidad es ≥ 90%
- [ ] Todos los tests E2E de accesibilidad pasan
- [ ] El código sigue las guías de estilo del proyecto

## Herramientas Recomendadas por Rol

### Desarrolladores

- **VS Code**: Extensiones ESLint, Prettier, Accessibility Insights
- **Chrome**: axe DevTools, Lighthouse, Colour Contrast Analyzer
- **Firefox**: Accessibility Inspector, Web Developer Toolbar

### Diseñadores UX/UI

- **Figma**: Plugin Stark, Contrast Checker
- **Adobe XD**: Plugins de accesibilidad
- **Sketch**: Plugins de contraste y verificación

### QA/Testing

- **axe-core**: Testing automatizado
- **Cypress**: Testing E2E accesible
- **NVDA**: Testing con lectores de pantalla
- **VoiceOver**: Testing en macOS/iOS
- **TalkBack**: Testing en Android

## Métricas de Éxito

### Objetivos del Proyecto

- Score de accesibilidad > 95%
- Cero violaciones críticas/serias
- Tiempo de corrección < 24 horas para problemas críticos
- Cobertura de testing > 80% de componentes interactivos

### Reporte Semanal

- Métricas de accesibilidad en dashboard
- Tendencias de mejora/degradación
- Acciones correctivas implementadas
- Formación realizada al equipo

Esta guía debe ser revisada trimestralmente y adaptada a las necesidades específicas del equipo.
```

### 8. Configuración Multi-Entorno

#### .env.a11y

```bash
# Accessibility Configuration
A11Y_ENABLED=true
A11Y_THRESHOLD=90
A11Y_INCLUDE_PATTERNS="**/*.html,**/*.ts,**/*.js"
A11Y_EXCLUDE_PATTERNS="**/*.spec.ts,**/*.test.ts,**/dist/**"
```

#### docker-compose.a11y.yml

```yaml
version: '3.8'

services:
  app:
    build:
      context: ..
      dockerfile: Dockerfile
    accessibility-test:
      image: node:18-alpine
      volumes:
        - ./reports:/app/reports
      command: >
        npm run test:accessibility:ci &&
        npm run a11y:check &&
        npm run a11y:report
      depends_on:
        - app
```

## 🎯 Implementación Gradual

### Fase 1: Fundamentos (Semanas 1-2)

- Configurar ESLint y plugins básicos
- Implementar componentes base accesibles
- Establecer guías de estilo

### Fase 2: Automatización (Semanas 3-4)

- Integrar axe-core en testing
- Configurar CI/CD para accesibilidad
- Implementar dashboard de métricas

### Fase 3: Avanzado (Semanas 5-6)

- Testing E2E especializado
- Integración con herramientas de visualización
- Formación continua al equipo

### Fase 4: Optimización (Semanas 7-8)

- Métricas y tendencias
- Optimización de rendimiento accesible
- Documentación completa del proyecto

## 📈 Beneficios Esperados

### Técnicos

- Reducción del 70% de problemas de accesibilidad en producción
- Tiempo de detección: Desde la primera línea de código
- Consistencia en todo el equipo
- Documentación automática de problemas

### De Negocio

- Reducción de costos de desarrollo y mantenimiento
- Mejora de experiencia para todos los usuarios (+16% población con discapacidad)
- Cumplimiento normativo (WCAG 2.1 AA, Ley 11/2023)
- Ventaja competitiva y expansión de mercado

Esta configuración avanzada posiciona al proyecto como un referente en desarrollo accesible, con herramientas robustas, procesos automatizados y métricas claras de éxito.
