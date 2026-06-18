# Credenciales de Acceso

## 🔐 Credenciales de Administrador

Para acceder al **Panel de Administrador** usa estas credenciales:

```
Email: admin@english.com
Password: admin123
```

Al iniciar sesión con estas credenciales, serás redirigido automáticamente al Panel de Administrador.

## 👤 Usuarios Normales

Cualquier otro email y contraseña que uses para registrarte creará una cuenta de **Usuario Normal (Estudiante)**.

Ejemplo:
```
Email: estudiante@ejemplo.com
Password: cualquiercontraseña
```

## 🎯 Flujos de Navegación

### Flujo de Usuario Normal (Estudiante)
1. **Landing Page** (`/`) → Solo Login y Register
2. **Login exitoso** → **Dashboard Principal** (`/dashboard`)
3. Desde el Dashboard puedes acceder a:
   - **Flash Cards** (`/learn`) - Aprender verbos con imágenes
   - **Constructor** (`/educational-home` → `/constructor`) - Armar oraciones
   - **Mi Progreso** (`/progress`) - Ver estadísticas
   - **Mi Perfil** (`/profile`) - Ver y editar datos personales

### Flujo de Administrador
1. **Landing Page** (`/`) → Login con credenciales de admin
2. **Login exitoso** → **Panel de Administrador** (`/admin`)
3. Desde el Panel de Admin puedes:
   - Ver lista de todos los verbos
   - Buscar verbos por nombre (inglés o español)
   - **Editar verbos existentes** (`/admin/verb/:id`)
   - **Crear nuevos verbos** (`/admin/verb/new`)
   - Cambiar imágenes (URL)
   - Modificar traducciones y ejemplos
   - Ver perfil (`/profile`)

## 🎨 Sistema de Colores Centralizado

Todos los colores están definidos en `/src/styles/theme.css` con variables CSS:

### Colores Educativos
- `--edu-primary: #667eea` (Morado principal)
- `--edu-secondary: #764ba2` (Morado secundario)
- `--edu-success: #6FCF97` (Verde éxito)
- `--edu-warning: #F2C94C` (Amarillo advertencia)
- `--edu-danger: #FF6B9D` (Rosa peligro)
- `--edu-info: #56CCF2` (Azul información)

### Colores Admin
- `--admin-primary: #1e293b` (Gris oscuro)
- `--admin-secondary: #334155` (Gris medio)
- `--admin-accent: #3b82f6` (Azul acento)

**Para cambiar el esquema de colores de toda la aplicación**, simplemente modifica las variables en `theme.css` y los cambios se aplicarán automáticamente en todas las pantallas.

## 📊 Características Principales

### Para Estudiantes
- ✅ Sistema de Flash Cards con 16 verbos
- ✅ Imágenes reales de Unsplash
- ✅ Audio de pronunciación (text-to-speech)
- ✅ Constructor de oraciones con drag & drop
- ✅ Seguimiento de progreso (localStorage)
- ✅ Estadísticas detalladas
- ✅ Perfil de usuario editable

### Para Administradores
- ✅ Panel de control completo
- ✅ CRUD de verbos (crear, leer, actualizar)
- ✅ Editor visual de flash cards
- ✅ Búsqueda de verbos
- ✅ Cambio de imágenes
- ✅ Gestión de traducciones y ejemplos
- ✅ Vista previa en tiempo real

## 🔄 Persistencia de Datos

Los datos se guardan en **localStorage**:
- `isAuthenticated` - Estado de autenticación
- `currentUser` - Datos del usuario actual (con rol)
- `userName` - Nombre del usuario
- `verbProgress` - Progreso de aprendizaje de cada verbo

En una aplicación de producción, esto se sincronizaría con una base de datos backend (Supabase, Firebase, etc.).

## 🚀 Rutas Principales

```
/ - Landing Page (pública)
/auth - Login/Register (pública)
/dashboard - Dashboard Principal (protegida, solo autenticados)
/profile - Perfil de Usuario (protegida, solo autenticados)
/learn - Flash Cards (protegida, solo autenticados)
/constructor - Constructor de Oraciones (protegida, solo autenticados)
/progress - Progreso del Estudiante (protegida, solo autenticados)
/admin - Panel de Administrador (protegida, solo administradores)
/admin/verb/:id - Editor de Verbos (protegida, solo administradores)
/admin/verb/new - Crear Nuevo Verbo (protegida, solo administradores)
```

## 💡 Notas Importantes

1. **Credenciales de Admin**: Las credenciales están hardcoded en `/src/app/utils/auth.ts` para propósitos de demostración.

2. **Redireccionamiento Automático**: 
   - Si inicias sesión como admin → Redirige a `/admin`
   - Si inicias sesión como usuario normal → Redirige a `/dashboard`

3. **Protección de Rutas**: 
   - Las rutas de admin solo son accesibles para usuarios con `role: 'admin'`
   - Si un usuario normal intenta acceder a `/admin`, será redirigido a `/dashboard`

4. **Landing Page Actualizada**: 
   - Ya NO tiene el botón "Proyecto Educativo"
   - Solo muestra "Registrarse" e "Iniciar Sesión"

5. **Edición de Verbos**: 
   - Los cambios se guardan localmente (localStorage)
   - En producción, se conectaría a una API/base de datos real
