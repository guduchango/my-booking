# My Booking

Fullstack application with a **Laravel** backend and a **React + TypeScript** frontend, using **Vite** as the bundler. Ideal for booking or scheduling projects.

---

## 📁 Project Structure

```
my-booking/
├── app/                 # Laravel Backend
├── database/
├── public/
├── react-js/            # React + TypeScript Frontend
│   ├── public/
│   ├── src/
│   │   ├── Api/                         # API connection logic
│   │   │   ├── Auth.ts
│   │   │   └── axiosClient.ts
│   │   ├── Components/                 # Reusable components
│   │   │   ├── DynamicSearchSelect/
│   │   │   ├── Layout/
│   │   │   └── NavBar/
│   │   ├── Context/                    # Global state management (React Context)
│   │   ├── Models/                     # Interfaces and data models
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

## ⚙️ Requirements

- PHP >= 8.1  
- Composer  
- Node.js >= 18  
- npm or yarn  
- MySQL or compatible

---

## 🚀 Installation and Execution

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

This will launch the frontend at `http://localhost:5173/`.

---

## 📦 Production Build

```bash
npm run build
```

The compiled files will be located in `react-js/dist/`  
You can serve them with a static server or integrate them into Laravel's `public/` folder.

---

## 🧪 Main Tools and Libraries

- **React 18 + TypeScript**
- **Vite**
- **React Router v6**
- **i18next** (internationalization)
- **Zod** (schema validation)
- **Dexie** (IndexedDB)
- **React Toastify**, **React Select**
- **ESLint** with strict rules

---

## 📌 Notes

- Frontend and backend run as separate services and communicate via a REST API.
- You can integrate the frontend build into Laravel’s `public/` directory for unified deployment.

---

## 👨‍💻 Author

Edgardo Chango — [GitHub](https://github.com/guduchango)

---

## 📜 License

MIT
