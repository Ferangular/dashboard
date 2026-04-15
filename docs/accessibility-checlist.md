# ✅ Checklist de Accesibilidad para Angular (WCAG 2.2 AA)

## 📌 1. Estructura y Semántica HTML

- [ ] Se utilizan etiquetas semánticas (`header`, `nav`, `main`, `section`, `article`, `footer`).
- [ ] Existe un único `<h1>` por página.
- [ ] Los encabezados siguen un orden jerárquico correcto (`h1–h6`).
- [ ] Se emplean listas (`ul`, `ol`, `li`) para agrupar contenido relacionado.
- [ ] Se evita el uso innecesario de `<div>` y `<span>`.
- [ ] El atributo `lang` está definido en el documento.
- [ ] Las tablas incluyen `<th>` y atributos `scope` cuando corresponde.

### Ejemplo

```html
<main>
  <h1>Panel de Usuario</h1>
  <section>
    <h2>Información Personal</h2>
  </section>
</main>
```

## 🎨 2. Contraste y Diseño Visual

- [ ] El contraste cumple con WCAG 2.2 AA (mínimo 4.5:1).
- [ ] El texto puede ampliarse hasta un 200% sin perder funcionalidad.
- [ ] No se transmite información únicamente mediante el color.
- [ ] La interfaz es responsive y funcional en dispositivos móviles.
- [ ] Los elementos interactivos tienen un tamaño mínimo de 24×24 px.

## ⌨️ 3. Navegación por Teclado

- [ ] Toda la aplicación es navegable mediante teclado.
- [ ] El orden de tabulación es lógico.
- [ ] El foco es visible y consistente.
- [ ] No existen trampas de teclado.
- [ ] Se incluye un enlace para saltar al contenido principal.

### Ejemplo

```html
<a class="skip-link" href="#main-content">Saltar al contenido principal</a>
<main id="main-content">...</main>

<style>
  .skip-link {
    position: absolute;
    top: -40px;
    left: 0;
    background: #000;
    color: #fff;
    padding: 8px;
  }

  .skip-link:focus {
    top: 0;
  }
</style>
```

## 🅰️ 4. Uso Correcto de ARIA

- [ ] Se prioriza HTML semántico sobre ARIA.
- [ ] Los roles ARIA son válidos y necesarios.
- [ ] Los atributos aria-label y aria-describedby están correctamente definidos.
- [ ] Los estados dinámicos se actualizan correctamente (aria-expanded, aria-live).
- [ ] No se duplican roles innecesarios.

### Ejemplo

```html
<button aria-expanded="false" aria-controls="menu">Menú</button>
```

## 🧩 5. Accesibilidad en Componentes Angular

- [ ] Los componentes reutilizables son accesibles.
- [ ] Las imágenes incluyen atributos alt.
- [ ] Los botones utilizan `<button>` en lugar de `<div>`.
- [ ] Se utilizan correctamente las directivas de Angular.

### Ejemplo

```html
<button (click)="guardar()" type="button">Guardar</button>

<img ngSrc="perfil.jpg" alt="Foto de perfil del usuario" />
```

## 📝 6. Formularios Accesibles

- [ ] Cada campo tiene una etiqueta `<label>`.
- [ ] Los errores son claros y accesibles.
- [ ] Se utilizan tipos de entrada adecuados (email, tel, number).
- [ ] Los campos obligatorios están indicados.
- [ ] Los mensajes dinámicos usan aria-live.

### Ejemplo con Reactive Forms

```html
<label for="email">Correo electrónico</label>
<input id="email" type="email" formControlName="email" aria-describedby="emailError" />

<div
  id="emailError"
  aria-live="polite"
  *ngIf="form.controls.email.invalid && form.controls.email.touched"
>
  Introduce un correo válido.
</div>
```

## 🧭 7. Routing y Navegación en Angular

- [ ] Cada página tiene un título significativo.
- [ ] Se actualiza el `<title>` dinámicamente.
- [ ] La navegación es consistente.

### Ejemplo

```typescript
constructor(private title: Title) {}

ngOnInit(): void {
  this.title.setTitle('Dashboard | Mi Aplicación');
}
```

## 🛠️ 8. Angular CDK y Buenas Prácticas

- [ ] Se utiliza Angular CDK para mejorar la accesibilidad.
- [ ] Los diálogos gestionan correctamente el foco.
- [ ] Se emplea cdkTrapFocus en modales.

### Ejemplo

```html
<div cdkTrapFocus>
  <button cdkFocusInitial>Cerrar</button>
</div>
```

## 🔍 9. Herramientas de Evaluación

- [ ] Lighthouse no reporta errores críticos de accesibilidad.
- [ ] Se utiliza axe DevTools.
- [ ] Se realizan pruebas con NVDA o VoiceOver.
- [ ] Se aplican reglas de Angular ESLint.

## 📦 10. Configuración de ESLint para Angular

```json
{
  "overrides": [
    {
      "files": ["*.html"],
      "extends": [
        "plugin:@angular-eslint/template/recommended",
        "plugin:@angular-eslint/template/accessibility"
      ]
    }
  ]
}
```

## 🚀 11. Buenas Prácticas en Angular Moderno (v17+ y v21)

- [ ] Uso de componentes standalone.
- [ ] Uso del nuevo control flow (@if, @for, @switch).
- [ ] Implementación de Signals sin afectar la accesibilidad.
- [ ] Uso de NgOptimizedImage.
- [ ] Aplicación de lazy loading y @defer.

### Ejemplo

```html
@if (isLoading()) {
<p aria-live="polite">Cargando datos...</p>
} @else {
<app-dashboard />
}
```

## 📊 12. Checklist de Validación Final

| Categoría                 | Estado |
| ------------------------- | ------ |
| HTML Semántico            | ☐      |
| Navegación por Teclado    | ☐      |
| Formularios Accesibles    | ☐      |
| Uso de ARIA               | ☐      |
| Contraste y Diseño        | ☐      |
| Angular CDK               | ☐      |
| Routing y Títulos         | ☐      |
| Herramientas de Auditoría | ☐      |
| Cumplimiento WCAG 2.2 AA  | ☐      |

## 📄 Referencias

- [WCAG 2.2 – W3C](https://www.w3.org/TR/WCAG22/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Angular Accessibility Guide](https://angular.dev/guide/accessibility)
- [Ley 11/2023 y EN 301549](https://www.boe.es/eli/es/1/2023/11/16/con)

## 🏆 Recomendación Profesional

Guarda este checklist en tu repositorio como:

```
docs/accessibility-checklist.md
```

Y utilízalo en Pull Requests:

### Accessibility Checklist

- [ ] Cumple con WCAG 2.2 AA
- [ ] Navegable por teclado
- [ ] Compatible con lectores de pantalla
- [ ] Validado con Lighthouse y axe

---

### 📌 Cómo usarlo

1. Crea la carpeta `docs` en tu proyecto Angular.
2. Guarda el archivo como:
   ```
   docs/accessibility-checklist.md
   ```
3. Inclúyelo en tu `README.md` o en Confluence.
4. Añádelo como requisito en tus Pull Requests.

Si lo deseas, puedo adaptarlo a una plantilla de **GitHub, GitLab o Azure DevOps**.
