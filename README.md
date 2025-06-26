# 🏨 MyBooking Backend

Backend API for the **MyBooking** accommodation management application, developed with Laravel 10, MySQL, and Sanctum for authentication.

🔗 Backend repository: https://github.com/guduchango/mybooking-backend-laravel  
🔗 Frontend repository: https://github.com/guduchango/mybooking-frontend-react  
🔗 Online demo: https://mybooking.edgardoponce.com  
🌐 My website: https://edgardoponce.com

---

## 📦 What does this project include?

- REST API built with Laravel 10
- Authentication using Laravel Sanctum
- Models, controllers, factories, seeders for a complete CRUD system
- Support for multi-user reservations
- Price calendar per unit per day
- Validation for overlapping reservations

---

## 🚀 How to start the project

### Requirements

- PHP >= 8.1
- Composer
- MySQL or compatible database

### Installation steps

Clone the repository:

```
git clone https://github.com/guduchango/mybooking-backend-laravel.git
cd mybooking-backend-laravel
```

Install PHP dependencies:

```
composer install
```

Copy the environment file and configure your database and credentials:

```
cp .env.example .env
```

Edit `.env` and update the following lines:

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

Generate the application key:

```
php artisan key:generate
```

Run database migrations and seeders:

```
php artisan migrate --seed
```

Start the Laravel development server:

```
php artisan serve
```

The API will be available at: http://127.0.0.1:8000

---

## 🗂 Laravel folder structure

```
app/
├── Http/
│   └── Controllers/       HTTP controllers
├── Models/                Eloquent models
database/
├── factories/             Test data factories
├── seeders/               Database seeders
routes/
├── api.php                API routes
├── web.php                Web routes
storage/                   Files and logs
```

---

## 🛠 How to seed data

You can use the included factories and seeders to generate example data:

```
php artisan migrate:fresh --seed
```

This will reset the database and populate it with demo data.

---

## 🖼 Screenshots

You can add screenshots of your API responses or Postman collections here.

Example:

```
![API example response](docs/api-response.png)
```

Place images in a `docs/` folder inside the repository.

---

## 🔗 Frontend

The frontend for this API can be found at:  
https://github.com/guduchango/mybooking-frontend-react

---

## 🎯 How to contribute

If you’d like to collaborate:

1. Fork the repository
2. Create a new branch with your improvement or fix
3. Submit a pull request describing your changes

Direct contact: you can write to me through my website https://edgardoponce.com or open an issue on the repository.

---

## 🗒 Task board (Kanban / Tickets)

Currently, there is no public task board.  
I’m considering using GitHub Projects to manage tasks collaboratively.

---

## 📄 License

This project is available under the MIT license.

---

## 🙏 Acknowledgments

Thanks to all the open source technologies and libraries that make this project possible.
