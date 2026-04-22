# 📝 ToDo Ionic Firebase

Aplicación de tareas con categorías desarrollada con **Ionic + Angular**, que implementa **Feature Flags de Firebase** y **persistencia local de datos** mediante almacenamiento en el dispositivo.

---

## 📋 Descripción

Esta app permite gestionar tareas organizadas por categorías. Integra Firebase Remote Config para controlar funcionalidades mediante feature flags, con soporte de persistencia local para que la data esté disponible incluso sin conexión.

---

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Uso |
|---|---|---|
| **Ionic Framework** | 8.0.0 | Framework de UI para apps híbridas |
| **Angular** | 20.0.0 | Framework frontend principal |
| **TypeScript** | 5.9.0 | Lenguaje principal del proyecto |
| **Firebase** | 11.10.0 | Remote Config / Feature Flags |
| **AngularFire** | 20.0.1 | Integración Angular + Firebase |
| **Capacitor** | 8.3.1 | Puente nativo para iOS/Android |
| **SCSS** | — | Estilos personalizados |
| **Karma + Jasmine** | — | Testing unitario |
| **ESLint** | — | Linting y calidad de código |

---

## 📁 Estructura del Proyecto

```
ToDo-Ionic-Firebase/
├── src/
│   └── app/
│       ├── core/                          # Núcleo de la aplicación
│       │   ├── models/                    # Interfaces y modelos de datos
│       │   │   ├── categorias.model.ts    # Modelo de categoría
│       │   │   └── tareas.model.ts        # Modelo de tarea
│       │   └── services/                  # Servicios globales
│       │       ├── alerts.service.ts      # Manejo de alertas y notificaciones
│       │       ├── modal.service.ts       # Manejo de modales
│       │       ├── remote-config.service.ts  # Integración Firebase Remote Config
│       │       └── storage.service.ts     # Persistencia local de datos
│       ├── features/                      # Módulos de funcionalidades
│       │   ├── categorias/                # Módulo de categorías
│       │   │   ├── categorias.page.html
│       │   │   ├── categorias.page.scss
│       │   │   ├── categorias.page.ts
│       │   │   └── categorias.service.ts  # Lógica de negocio de categorías
│       │   └── tareas/                    # Módulo de tareas
│       │       ├── tarea-modal/           # Modal para crear/editar tareas
│       │       │   ├── tarea-modal.page.html
│       │       │   ├── tarea-modal.page.scss
│       │       │   └── tarea-modal.page.ts
│       │       ├── tareas.page.html
│       │       ├── tareas.page.scss
│       │       ├── tareas.page.ts
│       │       └── tareas.service.ts      # Lógica de negocio de tareas
│       └── shared/                        # Componentes compartidos
│           └── menu/                      # Menú lateral de navegación
│               ├── menu.page.html
│               ├── menu.page.scss
│               └── menu.page.ts
├── .browserslistrc
├── .editorconfig
├── .eslintrc.json
├── .gitignore
├── angular.json
├── capacitor.config.ts
├── ionic.config.json
├── karma.conf.js
├── package.json
├── tsconfig.json
├── tsconfig.app.json
└── tsconfig.spec.json
```

---

## 🚀 Cómo ejecutar la aplicación

### Prerrequisitos

Asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) v18+
- [npm](https://www.npmjs.com/) v9+
- [Ionic CLI](https://ionicframework.com/docs/cli) → `npm install -g @ionic/cli`
- [Angular CLI](https://angular.io/cli) → `npm install -g @angular/cli`

### 1. Clonar el repositorio

```bash
git clone https://github.com/gusbolano17/ToDo-Ionic-Firebase.git
cd ToDo-Ionic-Firebase
```

### 2. Cambiar a la rama develop

```bash
git checkout develop
```

### 3. Instalar dependencias

```bash
npm install
```

### 4. Configurar Firebase

En `src/environments/environment.ts`, agrega tu configuración de Firebase:

```typescript
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
  }
};
```

### 5. Ejecutar en el navegador

```bash
ionic serve
```

La app estará disponible en `http://localhost:8100`

### 6. Ejecutar en Android

```bash
ionic build #hace build al proyecto como se haria en angular web que es casi lo mismo
npx cap add android #Esto se da despues de hacer el build al proyecto de ionic - solo se hace una vez
ionic cap sync android #Esto es antes para que se reflejen los cambios antes de compilar a apk
ionic cap run android #Es la ejecucion como tal de la app, generalmente en entornos de desarrollo, no de produccion
```

### 7. Ejecutar en iOS

```bash
ionic build
npx cap add ios
npx cap run ios
```

---

## 🌿 Ramas del Proyecto

| Rama | Descripción |
|---|---|
| `main` | Código base inicial del proyecto |
| `develop` | Rama de desarrollo con todos los cambios y mejoras |

---

## 📌 Cambios Realizados en la rama `develop`

Todos los cambios del proyecto fueron implementados en la rama `develop`. A continuación se detalla lo que se desarrolló:

### ✅ Funcionalidades Implementadas

**Módulo de Tareas (`features/tareas`)**
- Creación, edición y eliminación de tareas desde un modal dedicado (`tarea-modal`)
- Marcado de tareas como completadas
- Servicio `tareas.service.ts` con toda la lógica de negocio del CRUD

**Módulo de Categorías (`features/categorias`)**
- Creación y administración de categorías para organizar las tareas
- Asociación de tareas a su categoría correspondiente
- Servicio `categorias.service.ts` desacoplado de la vista

**Feature Flags con Firebase Remote Config (`core/services/remote-config.service.ts`)**
- Integración de Firebase Remote Config para habilitar/deshabilitar funcionalidades en tiempo real sin necesidad de publicar una nueva versión
- Soporte de valores por defecto locales para garantizar funcionamiento offline

**Persistencia Local (`core/services/storage.service.ts`)**
- Almacenamiento local de la data mediante Ionic Storage / Capacitor Preferences
- Sincronización entre el estado guardado localmente y los valores remotos de Firebase

**Servicios de UI (`core/services`)**
- `alerts.service.ts` — centraliza la presentación de alertas y mensajes de confirmación
- `modal.service.ts` — gestiona la apertura y cierre de modales (incluyendo `tarea-modal`)

**Menú de Navegación (`shared/menu`)**
- Menú lateral compartido que provee navegación entre las secciones de Tareas y Categorías

### 🏗️ Arquitectura y Configuración

- Arquitectura organizada en tres capas: `core` (lógica global), `features` (módulos de negocio) y `shared` (componentes reutilizables)
- Configuración de **Capacitor** como puente nativo (en lugar de Cordova)
- Configuración de **ESLint** para mantener calidad y consistencia del código

---

## 🧪 Ejecutar Pruebas

```bash
# Pruebas unitarias
ng test

# Pruebas con cobertura
ng test --code-coverage
```

---

## 👤 Autor

**Gustavo Adolfo Bolaño Ramos**
- GitHub: [@gusbolano17](https://github.com/gusbolano17)

---

## 📄 Licencia

Este proyecto es de uso educativo y de práctica personal.
