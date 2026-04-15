# Guía de Testing - Navegación por Teclado

## Cómo Probar la Página

### 1. Acceso a la Demo

Abre tu navegador y ve a:

```
http://localhost:4202/keyboard-navigation
```

### 2. Pruebas de Teclado Recomendadas

#### Prueba Básica - Navegación con Tab

- Presiona `Tab` repetidamente para ver el orden de navegación
- Observa cómo los elementos reciben foco visible
- Presiona `Shift + Tab` para navegar hacia atrás

#### Prueba de Skip Links

- Presiona `Tab` hasta que aparezcan los enlaces de salto
- Presiona `Enter` en "Saltar al contenido principal"
- Verifica que el foco salta directamente a esa sección

#### Prueba de Tabs con Flechas

- Navega hasta los tabs (Tab 1, Tab 2, Tab 3)
- Usa `Arrow Right` y `Arrow Left` para cambiar entre tabs
- Observa cómo los paneles se muestran/ocultan

#### Prueba del Modal

- Navega hasta el botón "Abrir Modal"
- Presiona `Enter` para abrirlo
- Intenta navegar dentro del modal (foco atrapado)
- Presiona `Escape` para cerrarlo

#### Prueba de Estados en Tiempo Real

- Navega por diferentes elementos
- Observa el footer que muestra:
  - Elemento enfocado actualmente
  - Posición del tab index

### 3. Verificaciones de Accesibilidad

#### **Lo que deberías ver:**

- Outline azul visible en todos elementos enfocados
- Orden lógico de navegación
- Funcionamiento completo sin ratón
- Estados ARIA actualizados dinámicamente
- Focus trapping en modales

#### **Problemas comunes a detectar:**

- Elementos sin foco visible
- Orden de tabulación ilógico
- Foco atrapado incorrectamente
- Estados ARIA desincronizados

### 4. Herramientas Adicionales

#### Para testing avanzado:

- **NVDA/JAWS**: Activar lector de pantalla
- **Chrome DevTools**: Inspeccionar estados ARIA
- **axe DevTools**: Auditoría automática
