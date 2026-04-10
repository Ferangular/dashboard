# 📊 Dashboard Responsive - Angular 21 Performance Lab

> Dashboard responsive moderno desarrollado con Angular 21 para optimización de rendimiento y mejores prácticas de desarrollo

---

## 🎯 Descripción del Proyecto

Este proyecto es un **dashboard responsive** actualmente en desarrollo que sirve como laboratorio para experimentar con técnicas de optimización de rendimiento en Angular 21. La aplicación está diseñada para ser escalable, mantenible y seguir las mejores prácticas del framework.

**Estado actual:** 🚧 **En desarrollo activo** - Abierto a mejoras y contribuciones

---

## 📸 Vista Previa de la Aplicación

![Dashboard Preview](./dashboard-preview.png)

_Interfaz principal del dashboard mostrando el menú lateral, navegación superior y badges de entorno_

---

## ✨ Características Principales

### 🎨 Interfaz de Usuario

- **Diseño responsive** adaptado a diferentes tamaños de pantalla
- **Sidebar navegacional** con menú principal
- **Header dinámico** con información del entorno
- **Badges de entorno** para identificar desarrollo/producción
- **Modo DEBUG** activable para desarrollo

### 🛠️ Características Técnicas

- **Angular 21** con standalone components
- **TypeScript** para tipado fuerte
- **SCSS** para estilos modularizados
- **Signals** para gestión de estado reactiva
- **Lazy loading** para optimización de carga
- **Build optimizado** para producción

### 📱 Navegación

- **Inicio** - Dashboard principal
- **Listado** - Vistas de datos tabulares
- **Rendimiento** - Laboratorio de performance
- **Contacto** - Formulario de contacto
- **Ajustes** - Configuración de la aplicación

---

## 🚀 Tecnologías Utilizadas

- **Frontend:** Angular 21
- **Lenguaje:** TypeScript
- **Estilos:** SCSS/CSS3
- **Build Tool:** Angular CLI
- **Package Manager:** npm
- **Control de Versiones:** Git

---

## 📋 Estado del Desarrollo

### ✅ Funcionalidades Implementadas

- [x] Estructura base del dashboard
- [x] Sistema de routing con lazy loading
- [x] Componentes layout (header, footer, sidebar)
- [x] Sistema de configuración dinámica
- [x] Navegación responsive
- [x] Badges de entorno
- [x] Modo debug

### 🚧 En Desarrollo

- [ ] Componentes de visualización de datos
- [ ] Sistema de temas (dark/light mode)
- [ ] Internacionalización (i18n)
- [ ] Tests unitarios y e2e
- [ ] Optimización de performance avanzada

### 🎯 Próximamente

- [ ] Dashboard analytics
- [ ] Gráficos interactivos
- [ ] Sistema de notificaciones
- [ ] Perfiles de usuario
- [ ] API integration

---

## 🛠️ Requisitos Previos

- **Node.js** (v18 o superior)
- **npm** (v9 o superior)
- **Angular CLI** (v21)
- **Git** para control de versiones

---

## 🚀 Comenzando

### Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd dashboard

# Instalar dependencias
npm install
```

### Servidor de Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run start

# Navegar a http://localhost:4200/
```

### Build de Producción

```bash
# Build para producción
npm run build

# Build con análisis de bundle
npm run build:analyze

# Vista previa del build
npm run preview
```

### Linting y Formateo

```bash
# Verificar estilo de código
npm run lint

# Corregir automáticamente
npm run lint:fix

# Formatear código
npm run format
```

---

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── core/                 # Servicios e interfaces core
│   │   ├── services/         # Servicios globales
│   │   └── interfaces/       # Tipos e interfaces
│   ├── shared/               # Componentes compartidos
│   │   └── components/
│   │       └── layout/       # Componentes de layout
│   ├── features/             # Módulos de funcionalidades
│   └── app.routes.ts         # Configuración de rutas
├── assets/                   # Recursos estáticos
├── environments/             # Configuración de entornos
└── styles/                   # Estilos globales
```

---

## 🔧 Configuración

### Variables de Entorno

El proyecto utiliza configuración dinámica mediante archivos JSON:

```json
{
  "appName": "Angular 21 Performance Lab",
  "environmentName": "DESARROLLO",
  "debug": true,
  "ui": {
    "showEnvironmentBadge": true,
    "showDebugPanel": true
  }
}
```

---

## 🤝 Cómo Contribuir

Este proyecto está **abierto a mejoras** y **sugerencias**. Para contribuir:

1. **Fork** el repositorio
2. Crear una rama: `git checkout -b feature/nueva-caracteristica`
3. Realizar los cambios
4. Hacer commit: `git commit -m 'feat: agregar nueva característica'`
5. Push: `git push origin feature/nueva-caracteristica`
6. Abrir un **Pull Request**

### 🎯 Áreas de Mejora Prioritarias

- Optimización de performance
- Componentes reutilizables
- Testing y calidad de código
- Documentación técnica
- Accesibilidad (a11y)

---

## 📊 Información de Build

- **Tamaño del bundle:** ~66 KB (gzipped)
- **Tiempo de build:** ~3 segundos
- **Performance Score:** 95+ (Lighthouse)
- **Compatibilidad:** Modern browsers (ES2020+)

---

## 📄 Licencia

Este proyecto es educativo y está abierto para contribuciones de la comunidad.

---

## 🔗 Recursos Adicionales

- [Documentación Oficial de Angular](https://angular.dev)
- [Angular CLI Overview](https://angular.dev/tools/cli)
- [Angular Performance Guide](https://angular.dev/guide/performance)
- [TypeScript Documentation](https://www.typescriptlang.org/)

---

## 📞 Contacto

Para sugerencias, reportes de bugs o contribuciones:

- 📧 **Email:** [tu-email@ejemplo.com]
- 🐛 **Issues:** [GitHub Issues](link-al-repositorio/issues)
- 💬 **Discusiones:** [GitHub Discussions](link-al-repositorio/discussions)

---

_🚀 **Dashboard Responsive** - Construido con ❤️ usando Angular 21_

_Última actualización: Abril 2026_
