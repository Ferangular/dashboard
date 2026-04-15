# Guía de Testing - Estructura Semántica y Encabezados (Regla 6 WCAG)

## Cómo Probar la Página

### 1. Acceso a la Demo

Abre tu navegador y ve a:

```
http://localhost:4202/semantic-structure
```

### 2. Pruebas de Estructura Semántica Recomendadas

#### Prueba Básica - Jerarquía de Encabezados

- **Un solo H1**: Verifica que solo haya un `<h1>` por página
- **Secuencia lógica**: Confirma que no hay saltos (h1 ? h3)
- **Anidación correcta**: Verifica estructura h1 > h2 > h3 > h4 > h5 > h6
- **Contenido descriptivo**: Cada encabezado debe describir su contenido

#### Prueba de Elementos Semánticos

- **Header**: Presence de `<header role="banner">`
- **Navigation**: Presence de `<nav role="navigation">`
- **Main**: Presence de `<main role="main">`
- **Aside**: Presence de `<aside role="complementary">`
- **Footer**: Presence de `<footer role="contentinfo">`
- **Section**: Uso correcto de `<section>` con encabezado
- **Article**: Uso correcto de `<article>` para contenido independiente

#### Prueba de Landmarks ARIA

- **Roles presentes**: Todos los landmarks tienen roles ARIA
- **Labels descriptivos**: `aria-label` o `aria-labelledby` presentes
- **Estructura lógica**: Landmarks anidados correctamente
- **Navegación clara**: Cada landmark tiene propósito claro

#### Prueba con Lectores de Pantalla

- **NVDA/JAWS**: Activar lector de pantalla
- **Navegación por H**: Saltar entre encabezados
- **Navegación por R**: Saltar entre landmarks
- **Navegación por D**: Saltar entre elementos semánticos
- **Anuncio correcto**: Contexto claro al navegar

#### Prueba de Navegación por Teclado

- **Tab order**: Navegación lógica por landmarks
- **Encabezados navegables**: Posibilidad de saltar a encabezados
- **Focus visible**: Indicadores claros en elementos semánticos
- **Atajos funcionales**: Teclas rápidas del lector de pantalla

### 3. Verificaciones de Accesibilidad

#### **Lo que deberías ver:**

- Un solo `<h1>` con el título principal
- Jerarquía de encabezados sin saltos
- Elementos semánticos HTML5 correctamente usados
- Roles ARIA descriptivos en landmarks
- Navegación clara por estructura
- Contenido bien organizado y contextualizado

#### **Problemas comunes a detectar:**

- Múltiples `<h1>` en la misma página
- Saltos de nivel (h1 ? h3 ? h2)
- Uso de `<div>` en lugar de elementos semánticos
- Landmarks sin roles o labels descriptivos
- Encabezados vacíos o poco descriptivos
- Estructura anidada incorrectamente
- Falta de navegación por estructura

### 4. Casos de Test Específicos

#### Test 1: Validación de Jerarquía

1. Inspecciona todos los encabezados h1-h6
2. **Resultado**: Un h1, secuencia lógica, sin saltos
3. **Verificar**: `validateHeadingHierarchy()` retorna true

#### Test 2: Verificación de Landmarks

1. Busca elementos con roles semánticos
2. **Resultado**: banner, navigation, main, complementary, contentinfo
3. **Verificar**: `countLandmarks()` > 0

#### Test 3: Navegación por Encabezados

1. Usa NVDA/JAWS con tecla `H`
2. **Resultado**: Navegación fluida entre encabezados
3. **Verificar**: Cada encabezado anunciado correctamente

#### Test 4: Navegación por Landmarks

1. Usa NVDA/JAWS con tecla `R`
2. **Resultado**: Saltos entre landmarks funcionales
3. **Verificar**: Cada landmark con contexto claro

#### Test 5: Estructura vs Estilo

1. Verifica que encabezados no se usen solo para estilo
2. **Resultado**: Uso semántico correcto
3. **Verificar**: CSS separado de estructura semántica

### 5. Herramientas Adicionales

#### Para testing avanzado:

- **NVDA/JAWS**: Validación completa con lectores de pantalla
- **Chrome DevTools**: Inspeccionar estructura y roles
- **axe DevTools**: Auditoría automática de estructura semántica
- **WAVE Extension**: Evaluación visual de landmarks
- **Accessibility Insights**: Análisis detallado de estructura

#### Extensiones recomendadas:

- **HeadingsMap**: Visualización de jerarquía de encabezados
- **Landmarks**: Navegación por landmarks en Chrome
- **Accessibility Tree**: Inspección de árbol de accesibilidad
- **Semantic Inspector**: Análisis de elementos semánticos

### 6. Checklist de Validación

#### Estructura de Encabezados

- [ ] Un solo `<h1>` por página
- [ ] Jerarquía secuencial sin saltos
- [ ] Encabezados descriptivos y únicos
- [ ] Contenido relevante bajo cada encabezado
- [ ] No encabezados vacíos o genéricos

#### Elementos Semánticos

- [ ] `<header>` con `role="banner"`
- [ ] `<nav>` con `role="navigation"`
- [ ] `<main>` con `role="main"`
- [ ] `<aside>` con `role="complementary"`
- [ ] `<footer>` con `role="contentinfo"`
- [ ] `<section>` con encabezado descriptivo
- [ ] `<article>` para contenido independiente

#### Roles ARIA

- [ ] Roles presentes en landmarks
- [ ] `aria-label` descriptivos
- [ ] `aria-labelledby` cuando corresponda
- [ ] Sin roles redundantes en elementos semánticos
- [ ] Estructura de ARIA tree correcta

#### Navegación y Usabilidad

- [ ] Navegación por encabezados funcional
- [ ] Navegación por landmarks funcional
- [ ] Atajos de teclado operativos
- [ ] Contexto claro al navegar
- [ ] Estructura predecible y lógica

### 7. Testing con Lectores de Pantalla

#### Comandos NVDA/JAWS:

- **H**: Saltar al siguiente encabezado
- **Shift+H**: Saltar al encabezado anterior
- **1-6**: Saltar a encabezado de nivel específico
- **R**: Saltar al siguiente landmark
- **Shift+R**: Saltar al landmark anterior
- **D**: Saltar al siguiente elemento semántico
- **Insert+F3**: Lista de todos los encabezados
- **Insert+F7**: Lista de todos los landmarks

#### Verificación de Anuncios:

- "Encabezado de nivel 1: [texto]"
- "Encabezado de nivel 2: [texto]"
- "Navegación principal"
- "Contenido principal"
- "Contenido complementario"
- "Información del sitio"

### 8. Errores Comunes y Soluciones

#### Error: Múltiples H1

- **Problema**: `<h1>Título 1</h1><h1>Título 2</h1>`
- **Solución**: `<h1>Título Principal</h1><h2>Subtítulo</h2>`

#### Error: Saltos de Nivel

- **Problema**: `<h1>Título</h1><h3>Subtítulo</h3>`
- **Solución**: `<h1>Título</h1><h2>Subtítulo</h2>`

#### Error: Divs en lugar de Semánticos

- **Problema**: `<div class="header">` sin rol
- **Solución**: `<header role="banner">`

#### Error: Landmarks sin Label

- **Problema**: `<main>` sin descripción
- **Solución**: `<main role="main" aria-label="Contenido principal">`

### 9. Métricas de Éxito

#### Indicadores de testing exitoso:

- **WCAG Compliance**: 100% de criterios de estructura semántica
- **Screen Reader Navigation**: Operabilidad completa con NVDA/JAWS
- **axe DevTools**: 0 violaciones de estructura
- **Lighthouse**: Accessibility score >95%
- **HeadingsMap**: Estructura visual correcta
- **Landmarks Navigation**: Todos landmarks funcionales

#### KPIs de Usabilidad:

- Tiempo de navegación por estructura < 5 segundos
- Tasa de éxito en encontrar contenido > 95%
- Satisfacción de usuarios con lectores de pantalla > 4.5/5
- Reducción de pasos para encontrar información > 50%

### 10. Validación Automática

#### Scripts de Testing:

```javascript
// Validar jerarquía de encabezados
function validateHeadingHierarchy() {
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  let previousLevel = 0;

  for (const heading of headings) {
    const currentLevel = parseInt(heading.tagName.charAt(1));
    if (currentLevel > previousLevel + 1 && previousLevel > 0) {
      return false;
    }
    previousLevel = currentLevel;
  }
  return true;
}

// Contar landmarks
function countLandmarks() {
  const landmarks = document.querySelectorAll(
    '[role="banner"], [role="navigation"], [role="main"], [role="complementary"], [role="contentinfo"]',
  );
  return landmarks.length;
}
```

---

**Nota**: Esta guía cubre la Regla 6 de WCAG 2.1 sobre estructura semántica y encabezados. La implementación cumple con estándares internacionales y normativa europea de accesibilidad, proporcionando una base sólida para el diseño de documentos web accesibles y navegables.
