# Guía de Testing - Formularios Accesibles (Regla 5 WCAG)

## Cómo Probar la Página

### 1. Acceso a la Demo

Abre tu navegador y ve a:

```
http://localhost:4202/form-accessibility
```

### 2. Pruebas de Formularios Recomendadas

#### Prueba Básica - Estructura Semántica

- **Labels**: Verifica que cada campo tenga `<label for="id">`
- **Fieldsets**: Confirma grupos lógicos con `<fieldset>` y `<legend>`
- **Required fields**: Identifica campos obligatorios con asterisco (\*)
- **Placeholders**: No deben usarse como etiquetas principales

#### Prueba de Validación en Tiempo Real

- **Campo vacío required**: Deja campos obligatorios vacíos y muestra error
- **Email inválido**: Introduce formato incorrecto (ej: "test@")
- **Teléfono**: Usa menos de 9 dígitos o caracteres no numéricos
- **Código Postal**: Introduce menos de 5 dígitos
- **Longitud mínima**: Escribe menos de 2 caracteres en nombre/apellidos

#### Prueba de Estados ARIA

- **aria-invalid**: Campos inválidos deben tener `aria-invalid="true"`
- **aria-describedby**: Error messages deben estar vinculados
- **aria-live**: Messages deben anunciarse por lectores de pantalla
- **aria-busy**: Botón submit durante envío

#### Prueba de Navegación por Teclado

- **Tab order**: Navega entre campos en orden lógico
- **Focus visible**: Todos elementos deben tener indicador visible
- **Enter/Space**: Activar checkboxes y botones
- **Escape**: Cerrar modales (si aplica)

#### Prueba de Lectores de Pantalla

- **NVDA/JAWS**: Activar lector de pantalla
- **Field labels**: Leer etiquetas descriptivas
- **Error messages**: Escuchar mensajes de error
- **Form status**: Anuncio de estado del formulario

#### Prueba de Feedback Visual

- **Errores individuales**: Mensajes debajo de cada campo
- **Resumen de errores**: Lista de errores al enviar formulario
- **Estados de botón**: Deshabilitado/habilitado según validación
- **Loading state**: Indicador durante envío

### 3. Verificaciones de Accesibilidad

#### **Lo que deberías ver:**

- Labels descriptivos para cada campo
- Mensajes de error claros y específicos
- Estados ARIA actualizados dinámicamente
- Navegación completa por teclado
- Feedback visual claro para todos estados
- Contraste adecuado en todos elementos
- Focus indicators visibles

#### **Problemas comunes a detectar:**

- Campos sin labels o labels incorrectas
- Placeholder usado como única etiqueta
- Mensajes de error no accesibles
- Estados ARIA desincronizados
- Botón submit siempre bloqueado
- Sin indicación de campos obligatorios
- Focus no visible o confuso

### 4. Casos de Test Específicos

#### Test 1: Validación de Campos Obligatorios

1. Deja todos los campos vacíos
2. Haz clic en "Enviar Formulario"
3. **Resultado**: Mensajes de error en cada campo obligatorio
4. **Verificar**: `aria-invalid="true"` en campos inválidos

#### Test 2: Validación de Formatos

1. Email: introduce "test@" (incompleto)
2. Teléfono: introduce "123" (incompleto)
3. Código Postal: introduce "12" (incompleto)
4. **Resultado**: Mensajes específicos de formato
5. **Verificar**: Error messages con `role="alert"`

#### Test 3: Navegación por Teclado

1. Presiona `Tab` desde el inicio
2. Navega por todos los campos
3. Usa `Shift+Tab` para retroceder
4. **Resultado**: Orden lógico y foco visible
5. **Verificar**: Todos elementos reciben foco

#### Test 4: Envío Exitoso

1. Completa todos los campos correctamente
2. Acepta términos y condiciones
3. Haz clic en "Enviar Formulario"
4. **Resultado**: Mensaje de éxito y reset automático
5. **Verificar**: `aria-live="polite"` en mensaje

#### Test 5: Reset de Formulario

1. Completa algunos campos
2. Haz clic en "Limpiar Formulario"
3. **Resultado**: Todos los campos vacíos
4. **Verificar**: Estados reseteados correctamente

### 5. Herramientas Adicionales

#### Para testing avanzado:

- **NVDA/JAWS**: Validación completa con lectores de pantalla
- **Chrome DevTools**: Inspeccionar estados ARIA en tiempo real
- **axe DevTools**: Auditoría automática de formularios
- **WAVE Extension**: Evaluación de accesibilidad visual
- **Color Contrast Analyzer**: Verificar ratios de contraste

#### Extensiones recomendadas:

- **Accessibility Insights for Web**: Microsoft
- **Axe DevTools**: Deque Systems
- **Lighthouse**: Google Chrome
- **WAVE**: WebAIM

### 6. Checklist de Validación

#### Estructura HTML

- [ ] Todos los inputs tienen `<label for="id">`
- [ ] Grupos lógicos con `<fieldset>` y `<legend>`
- [ ] Campos obligatorios claramente indicados
- [ ] Atributos `autocomplete` apropiados
- [ ] Types de input correctos (email, tel, etc.)

#### Validación y Feedback

- [ ] Validación en tiempo real
- [ ] Mensajes de error específicos
- [ ] Resumen de errores al enviar
- [ ] Estados de loading/envío
- [ ] Confirmación de éxito

#### ARIA y Accesibilidad

- [ ] `aria-invalid` dinámico
- [ ] `aria-describedby` para mensajes de error
- [ ] `aria-live` para notificaciones
- [ ] `aria-busy` durante envío
- [ ] Roles semánticos correctos

#### Navegación por Teclado

- [ ] Tab order lógico
- [ ] Focus visible en todos elementos
- [ ] Activación con Enter/Space
- [ ] No trampas de foco
- [ ] Skip links si aplica

#### Estilos Visuales

- [ ] Contraste 4.5:1 mínimo
- [ ] Focus indicators claros
- [ ] Estados hover/focus consistentes
- [ ] Diseño responsive
- [ ] Soporte high contrast

### 7. Errores Comunes y Soluciones

#### Error: Placeholder como etiqueta

- **Problema**: `<input placeholder="Nombre">` sin label
- **Solución**: Añadir `<label for="nombre">Nombre</label>`

#### Error: Mensajes de error no accesibles

- **Problema**: `<div class="error">Error</div>` sin role
- **Solución**: `<div role="alert" aria-live="polite">Error</div>`

#### Error: Botón submit siempre deshabilitado

- **Problema**: Lógica de validación incorrecta
- **Solución**: Verificar `isFormValid()` computed property

#### Error: Sin indicación de campos obligatorios

- **Problema**: Usuario no sabe qué campos son required
- **Solución**: Asterisco (\*) con `aria-label="obligatorio"`

### 8. Métricas de Éxito

#### Indicadores de testing exitoso:

- **WCAG Compliance**: 100% de criterios aplicados
- **Keyboard Navigation**: Operabilidad completa sin ratón
- **Screen Reader**: Compatibilidad total con NVDA/JAWS
- ** axe DevTools**: 0 violaciones de nivel AA
- **Lighthouse**: Accessibility score >95%
- **User Testing**: Tareas completadas sin asistencia

---

**Nota**: Esta guía cubre la Regla 5 de WCAG 2.1 sobre formularios accesibles. La implementación cumple con estándares internacionales y normativa europea de accesibilidad.
