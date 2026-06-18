# 🎨 Sistema de Diseño - Aprendiendo Inglés con Flash Cards

## 📐 Filosofía de Diseño

Este proyecto implementa un **Sistema de Diseño Centralizado** usando CSS Variables, lo que permite cambiar toda la apariencia de la aplicación modificando un solo archivo.

---

## 🎯 Ubicación del Sistema

**Archivo principal:** `/src/styles/theme.css`

Todas las variables de color, espaciado y estilos están centralizadas en este archivo. Cualquier cambio aquí se propaga automáticamente a toda la aplicación.

---

## 🎨 Paleta de Colores Educativos

### Colores Primarios (Estudiantes)

```css
--edu-primary: #667eea        /* Morado principal - Fondos, headers */
--edu-primary-dark: #5568d3   /* Morado oscuro - Hover states */
--edu-secondary: #764ba2      /* Morado secundario - Acentos */
--edu-accent: #f093fb         /* Rosa brillante - Highlights */
```

### Colores de Estado

```css
--edu-success: #6FCF97        /* Verde - Respuestas correctas, éxito */
--edu-success-dark: #5EBF87   /* Verde oscuro - Hover */
--edu-warning: #F2C94C        /* Amarillo - Advertencias, neutral */
--edu-warning-dark: #E0B840   /* Amarillo oscuro - Hover */
--edu-danger: #FF6B9D         /* Rosa - Errores, incorrecto */
--edu-danger-dark: #E85A8A    /* Rosa oscuro - Hover */
--edu-info: #56CCF2           /* Azul - Información */
--edu-info-dark: #45B8DE      /* Azul oscuro - Hover */
```

---

## 🛡️ Paleta de Colores Admin

```css
--admin-primary: #1e293b      /* Gris oscuro - Fondo principal */
--admin-secondary: #334155    /* Gris medio - Contenedores */
--admin-accent: #3b82f6       /* Azul - Botones de acción */
--admin-border: #475569       /* Gris - Bordes */
```

---

## 🌈 Gradientes Predefinidos

```css
/* Morado a Rosa */
--edu-gradient-purple: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Rosa a Rojo */
--edu-gradient-pink: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);

/* Verde a Azul */
--edu-gradient-green: linear-gradient(135deg, #6FCF97 0%, #56CCF2 100%);

/* Multicolor (usado en fondos) */
--edu-gradient-blue: linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #DB2777 100%);
```

---

## 📦 Cómo Usar las Variables

### En Tailwind CSS

Las variables están disponibles como clases de Tailwind:

```tsx
<div className="bg-edu-primary text-white">
  <button className="bg-edu-success hover:bg-edu-success-dark">
    Botón Verde
  </button>
</div>
```

### En CSS Inline

También puedes usar las variables directamente:

```tsx
<div style={{ backgroundColor: 'var(--edu-primary)' }}>
  Contenido
</div>
```

---

## 🔄 Cambiar el Esquema de Colores

### Paso 1: Edita `/src/styles/theme.css`

```css
.dark {
  /* Cambia estos valores por tus colores preferidos */
  --edu-primary: #TU_COLOR_AQUI;
  --edu-secondary: #TU_COLOR_AQUI;
  /* ... etc */
}
```

### Paso 2: ¡Listo!

Los cambios se aplican automáticamente en **todas las pantallas** sin necesidad de modificar componentes individuales.

---

## 🎯 Ejemplos de Uso por Pantalla

### Landing Page
- **Fondo:** `gradient-to-br from-[#4F46E5] via-[#7C3AED] to-[#DB2777]`
- **Botones:** Verde (`edu-success`) y Gris oscuro (`card`)

### Dashboard Principal (Estudiantes)
- **Fondo:** `gradient-to-br from-[#667eea] via-[#764ba2] to-[#f093fb]`
- **Tarjetas:** Rosa, Morado, Verde con gradientes
- **Stats:** Amarillo, Verde, Rosa

### Flash Cards
- **Fondo:** `gradient-to-br from-[#FF6B9D] via-[#C06C84] to-[#6C5B7B]`
- **Botones:** Azul (escuchar), Verde (verificar), Morado (siguiente)
- **Feedback:** Verde (correcto) / Rojo (incorrecto)

### Constructor de Oraciones
- **Fondo:** `gradient-to-br from-[#FFB6C1] via-[#DDA0DD] to-[#87CEEB]`
- **Zonas:** Verde (presente), Amarillo (pasado), Morado (futuro)
- **Palabras:** Azul con borde

### Progreso
- **Fondo:** `gradient-to-br from-[#667eea] via-[#764ba2] to-[#f093fb]`
- **Verbos Dominados:** Verde
- **Verbos Débiles:** Naranja

### Panel de Admin
- **Fondo:** `gradient-to-br from-[#1e293b] to-[#0f172a]`
- **Tarjetas:** Blanco/10 con backdrop-blur
- **Botones:** Azul (`admin-accent`), Verde (agregar)

---

## 🧩 Componentes Reutilizables

### Botón Estándar Grande

```tsx
<button className="px-10 py-5 bg-edu-success hover:bg-edu-success-dark text-white rounded-xl font-black text-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
  Mi Botón
</button>
```

### Tarjeta con Glassmorphism

```tsx
<div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border-4 border-white/30">
  Contenido
</div>
```

### Input Estilo Admin

```tsx
<input 
  type="text"
  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all"
/>
```

---

## 🎭 Estilos por Rol de Usuario

### Estudiante
- **Colores:** Vibrantes, coloridos (morado, rosa, verde, amarillo)
- **Estilo:** Amigable, divertido, con emojis
- **Botones:** Grandes, redondeados (rounded-2xl, rounded-3xl)
- **Bordes:** Gruesos (border-4)
- **Sombras:** Pronunciadas (shadow-2xl)

### Administrador
- **Colores:** Sobrios, profesionales (grises, azul)
- **Estilo:** Minimalista, funcional
- **Botones:** Medianos, menos redondeados (rounded-xl)
- **Bordes:** Delgados (border)
- **Sombras:** Sutiles

---

## 📱 Responsividad

El sistema está optimizado para desktop (1440x900px) pero usa clases responsive:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* Se adapta según el tamaño de pantalla */}
</div>
```

---

## 🚀 Extensibilidad

### Agregar Nuevos Colores

1. Edita `/src/styles/theme.css`:

```css
.dark {
  /* Tus nuevos colores */
  --mi-color-custom: #FF0000;
}
```

2. Agrégalos a las variables de Tailwind:

```css
@theme inline {
  --color-mi-color-custom: var(--mi-color-custom);
}
```

3. Úsalos en tus componentes:

```tsx
<div className="bg-mi-color-custom">
  Mi contenido
</div>
```

---

## 💡 Mejores Prácticas

✅ **SÍ hacer:**
- Usar las variables CSS definidas
- Mantener consistencia en bordes y sombras
- Seguir la paleta de colores por rol (estudiante/admin)
- Usar gradientes para fondos principales

❌ **NO hacer:**
- Hardcodear colores en componentes (use `bg-[#667eea]` solo si es temporal)
- Mezclar estilos de estudiante y admin en la misma pantalla
- Crear colores nuevos sin agregarlos al sistema centralizado

---

## 🎨 Herramientas Recomendadas

- **Coolors.co** - Para generar paletas de colores
- **Gradient Generator** - Para crear gradientes CSS
- **Color Contrast Checker** - Para accesibilidad
- **Tailwind CSS IntelliSense** (VS Code) - Autocompletado de clases

---

## 📚 Referencias

- Variables CSS: Todas en `/src/styles/theme.css`
- Componentes de ejemplo: Revisar cualquier componente en `/src/app/components/`
- Credenciales de prueba: Ver `CREDENTIALS.md`

**¡El sistema está diseñado para ser flexible y fácil de personalizar!** 🚀
