# Marco Legal de la Accesibilidad Digital en España y la UE

> **Importante:** La accesibilidad digital ha dejado de ser opcional para convertirse en una **obligación legal** con consecuencias significativas para empresas y desarrolladores.

---

## 1. Marco Normativo Europeo

### Directiva (UE) 2019/882 - European Accessibility Act (EAA)

- **Objetivo:** Garantizar que productos y servicios digitales sean accesibles para todas las personas, incluyendo aquellas con discapacidad
- **Ámbito:** Aplica a todos los Estados miembros de la UE
- **Enfoque:** Armonización de requisitos de accesibilidad en todo el mercado único europeo

### Ley 11/2023 - Transposición española

- **Estado:** Vigente desde 2023
- **Propósito:** Incorporar la directiva EAA al ordenamiento jurídico español
- **Refuerzo:** Establece obligaciones específicas y sanciones para el incumplimiento

---

## 2. Ámbito de Aplicación

### Sectores Afectados

La normativa impacta a múltiples sectores económicos:

- **Sitios web y aplicaciones móviles**
- **Comercio electrónico** y plataformas de venta online
- **Banca y servicios financieros** digitales
- **Transporte de pasajeros** y sistemas de reserva
- **Terminales de autoservicio** y quioscos interactivos
- **Servicios audiovisuales** y plataformas streaming
- **Comunicaciones electrónicas** y servicios de telecomunicaciones
- **Agencias de viajes** y plataformas de turismo
- **Suministros básicos:** agua, gas, electricidad

### Alcance Empresarial

- **Sector público:** Obligatorio para todas las administraciones
- **Sector privado:** Aplica a empresas de todos los tamaños
- **Empresas extranjeras:** Sujetos si operan en mercado europeo
- **Herramientas internas:** Aplica si son usadas por empleados con discapacidad

---

## 3. Calendario de Implementación

### Fechas Clave

| Fecha             | Requisito                                                 | Tipo        |
| ----------------- | --------------------------------------------------------- | ----------- |
| **28 junio 2025** | Nuevos productos y servicios accesibles desde lanzamiento | Obligatorio |
| **28 junio 2030** | Adaptación de productos existentes (anteriores a 2025)    | Plazo final |
| **2027**          | Comunicaciones de emergencia y casos específicos          | Excepciones |

### Estrategia de Implementación

- **Productos nuevos:** Accesibilidad desde diseño inicial
- **Productos existentes:** Adaptación progresiva
- **Planes de acción:** Documentación de mejoras programadas

---

## 4. Riesgos y Sanciones

### Consecuencias del Incumplimiento

- **Multas económicas:** Desde 30.000 hasta 1.000.000
- **Pérdida de subvenciones:** Inelegibilidad para ayudas públicas
- **Reclamaciones legales:** Acciones de particulares y asociaciones
- **Daño reputacional:** Impacto en imagen de marca
- **Prohibición operativa:** Cese temporal de actividades en casos graves

### Impacto de Negocio

La accesibilidad debe gestionarse como:

- **Riesgo legal:** Cumplimiento normativo obligatorio
- **Riesgo financiero:** Costos de sanciones y adaptación
- **Riesgo reputacional:** Pérdida de confianza y clientes

---

## 5. Normas Técnicas Aplicables

### Real Decreto 1112/2018

- **Sector:** Principalmente sector público
- **Estándar:** WCAG 2.1 AA como referencia principal
- **Aplicación:** Sitios web y aplicaciones públicas

### Real Decreto 193/2023

- **Enfoque:** Condiciones de accesibilidad y no discriminación
- **Requisitos:** Ajustes razonables y eliminación de barreras
- **Sanciones:** Régimen específico de infracciones y penalizaciones

### Norma UNE-EN 301549

- **Contenido:** Requisitos de accesibilidad para productos TIC
- **Base:** WCAG 2.1 + requisitos adicionales europeos
- **Importancia:** **WCAG por sí solo no siempre es suficiente**

---

## 6. Implicaciones para Desarrolladores Angular

### Requisitos Técnicos Obligatorios

- **HTML semántico:** Uso correcto de elementos estructurales
- **Navegación por teclado:** Acceso completo sin ratón
- **Formularios accesibles:** Labels asociados y errores claros
- **ARIA correcto:** Atributos bien implementados y necesarios
- **Contraste y foco:** Visibilidad adecuada de elementos
- **Lectores de pantalla:** Compatibilidad con NVDA, JAWS, VoiceOver
- **Validación continua:** Integración de herramientas de análisis

### Integración en el Ciclo de Desarrollo

```
Diseño UX -> Desarrollo -> Testing -> Despliegue -> Mantenimiento
     |            |           |           |            |
   Accesible   Accesible   Validado   Monitorizado   Actualizado
```

---

## 7. Estrategia de Cumplimiento

### Enfoque Integral

La accesibilidad debe ser una **estrategia global** que afecta a:

- **Diseño UX/UI:** Wireframes y prototipos accesibles
- **Desarrollo:** Código semántico y componentes accesibles
- **Testing:** Validación automática y manual
- **Documentación:** Guías y manuales accesibles
- **Herramientas internas:** Software para empleados
- **Proveedores:** Selección basada en criterios de accesibilidad

### Plan de Acción Recomendado

1.  **Auditoría inicial:** Evaluación del estado actual
2.  **Plan de mejoras:** Priorización por impacto y esfuerzo
3.  **Formación:** Capacitación del equipo técnico
4.  **Herramientas:** Integración de validación automática
5.  **Monitorización:** Seguimiento continuo del cumplimiento

---

## 8. Recursos y Herramientas

### Herramientas de Validación

- **[axe DevTools](https://www.deque.com/axe/devtools/)** - Extensión Chrome
- **[Lighthouse](https://developers.google.com/web/tools/lighthouse)** - Auditoría integrada
- **[WAVE](https://wave.webaim.org/)** - Evaluación visual
- **[Color Contrast Checker](https://webaim.org/resources/contrastchecker/)** - Verificación de contraste

### Documentación Oficial

- [Directiva (UE) 2019/882](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex:32019L0882)
- [Ley 11/2023](https://www.boe.es/eli/es/1/2023/11/16/con)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [UNE-EN 301549](https://www.une.org/encuentra-tu-norma/busca-tu-norma/norma?c=N0058233)

---

## 9. Resumen Ejecutivo

### En una frase

> La accesibilidad digital en España y la UE es una **obligación legal** que afecta a la mayoría de productos y servicios digitales, con **plazos concretos**, **sanciones importantes** y un impacto directo en cómo diseñas, desarrollas y validas aplicaciones Angular.

### Puntos Clave

- **No es opcional:** Es requisito legal con sanciones económicas
- **Plazos definidos:** 2025 para nuevos productos, 2030 para existentes
- **Impacto total:** Afecta a todo el ciclo de vida del producto
- **Verificación continua:** Requiere herramientas y procesos específicos

---

## 10. Checklist de Cumplimiento Legal

## 10.1 Qué implica esto para un desarrollador Angular

A nivel práctico, esto significa que desarrollar una app accesible ya no es solo “hacerlo bien”, sino **hacerlo conforme a normativa**.

Para ti implica trabajar con foco en:

- HTML semántico
- navegación por teclado
- formularios accesibles
- uso correcto de ARIA
- contraste y foco visible
- compatibilidad con lectores de pantalla
- validación continua con herramientas de análisis

En otras palabras: la accesibilidad debe integrarse en el desarrollo desde el principio, no dejarse para el final.

---

## 10.2 Idea principal

La ley obliga a que la accesibilidad forme parte del ciclo completo del producto digital. No basta con revisar una pantalla al final. Hay que plantearla como una estrategia global que afecta a:

- diseño
- desarrollo
- testing
- documentación
- herramientas internas
- selección de proveedores

---
