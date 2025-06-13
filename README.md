# My Booking

Aplicación fullstack compuesta por un backend en **Laravel** y un frontend en **React + TypeScript**, usando **Vite** como bundler. Ideal para proyectos de reservas o agendas.

---

## 📁 Estructura del proyecto

```
my-booking/
├── app/                 # Backend Laravel
├── database/
├── public/
├── react-js/            # Frontend en React + TypeScript
│   ├── public/
│   ├── src/
│   │   ├── Api/                         # Lógica de conexión con APIs
│   │   │   ├── Auth.ts
│   │   │   └── axiosClient.ts
│   │   ├── Components/                 # Componentes reutilizables
│   │   │   ├── DynamicSearchSelect/
│   │   │   ├── Layout/
│   │   │   └── NavBar/
│   │   ├── Context/                    # Manejo de contexto global (React Context)
│   │   ├── Models/                     # Interfaces y modelos de datos
│   │   │   ├── Currency/
│   │   │   │   └── CurrencyInterface.ts
│   │   │   ├── Expense/
│   │   │   ├── Generic/
│   │   │   ├── Guest/
│   │   │   ├── Price/
│   │   │   └── Promotion/
│   │   └── ...
│   ├── index.html
│   └── package.json
├── routes/
├── artisan
├── composer.json
└── ...
```

---

## ⚙️ Requisitos

- PHP >= 8.1  
- Composer  
- Node.js >= 18  
- npm o yarn  
- MySQL o equivalente

---

## 🚀 Instalación y ejecución

### 1. Backend (Laravel)

```bash
git clone https://github.com/guduchango/my-booking.git
cd my-booking

composer install

cp .env.example .env
php artisan key:generate

php artisan migrate

php artisan serve
```

---

### 2. Frontend (React + Vite)

```bash
cd react-js

npm install

npm run dev
```

Esto levantará el frontend en `http://localhost:5173/`.

---

## 📦 Build de producción

```bash
npm run build
```

Los archivos generados estarán en `react-js/dist/`  
Podés servirlos con un servidor estático o integrarlos al `public/` de Laravel.

---

## 🧪 Herramientas y librerías destacadas

- **React 18 + TypeScript**
- **Vite**
- **React Router v6**
- **i18next** (multiidioma)
- **Zod** (validación de esquemas)
- **Dexie** (IndexedDB)
- **React Toastify**, **React Select**
- **ESLint** con configuración estricta

---

## 📌 Notas

- Frontend y backend funcionan como servicios separados y se comunican vía API REST.
- Puede integrarse el build del frontend al `public/` de Laravel para unificar el despliegue.

---

## 👨‍💻 Autor

Edgardo Chango — [GitHub](https://github.com/guduchango)

---

## 📜 Licencia

MIT
