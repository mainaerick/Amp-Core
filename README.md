# 🎶 Speaker Shop Showcase

> A modern **audio equipment showcase** built with **Laravel 11, Inertia.js, React (TypeScript), and Ant Design**.  
> Manage speakers, subwoofers, amplifiers, car audio, and accessories — complete with **filters, dealers, and settings**.

---

## ✨ Features

### 🌍 Public Website
- 🗂️ Browse by **categories**: Speakers, Subwoofers, Amplifiers, Accessories, Car Audio & Video
- 🎚️ Advanced **filters** (size, grade, type, impedance, channels, etc.)
- 🛒 **Where to Buy** section with dealers
- 📄 Product details with **images, specs, and demo videos**

### 🔑 Admin Panel
- 🔐 Secure **authentication**
- 📊 **CRUD management** for Categories, Products, Dealers, and Settings
- 🔄 Auto-calculated product counts per category
- 🖋️ Rich forms with **validation** (Ant Design + Inertia)
- ⚙️ Global settings (update/reset site configuration)

---

## 🛠️ Tech Stack

| Layer        | Technology |
|--------------|------------|
| **Backend**  | Laravel 11, PHP 8.2 |
| **Frontend** | React 18, TypeScript, Inertia.js |
| **UI**       | Ant Design |
| **Database** | MySQL (InnoDB) |
| **Auth**     | Laravel Breeze / Jetstream |
| **Dev Env**  | Laravel Sail (Docker), Vite |

---

## 📂 Project Structure

```
├── app/
│   ├── Http/Controllers/   # Controllers
│   ├── Models/             # Eloquent Models
│   ├── Policies/           # Authorization Policies
├── database/
│   ├── factories/          # Model Factories
│   ├── migrations/         # Database Migrations
│   ├── seeders/            # Seeders
├── resources/js/
│   ├── Pages/
│   │   ├── Admin/          # Admin Panel
│   │   ├── Public/         # Public Site
│   ├── Components/         # Shared UI Components
│   ├── Layouts/            # Admin, Public, Guest Layouts
│   ├── types/              # TypeScript Interfaces
├── routes/
│   ├── web.php             # Public + Admin routes
│   ├── api.php             # API routes
```

---

## ⚙️ Installation

### 1️⃣ Clone & Install
```bash
git clone https://github.com/your-username/speaker-shop.git
cd speaker-shop

composer install
npm install
```

### 2️⃣ Environment Setup
```bash
cp .env.example .env
php artisan key:generate
```

### 3️⃣ Database
Edit `.env` → configure MySQL → then:
```bash
php artisan migrate --seed
```

### 4️⃣ Run Servers
```bash
./vendor/bin/sail up -d    # Start Docker
npm run dev                # Start Vite dev server
```

---

## 🧪 Factories & Seeders

- 🎼 **Categories** → Pre-seeded (`speakers`, `amplifiers`, `subwoofers`, `accessories`, `car-audio`)
- 📦 **Products** → Generated via factories
- 🏪 **Dealers** → Example dealer (`SoundWave Audio Center`)
- ⚙️ **Settings** → Default site settings

---

## 🔐 Authorization

- Controlled via **Laravel Policies** (`CategoryPolicy`, `ProductPolicy`, etc.)
- Policies mapped in `AuthServiceProvider`
- Admin-only access to `/admin/*` routes

---

## 📜 Routes

### Public
| Path | Description |
|------|-------------|
| `/` | Home page |
| `/products/{category}` | Category listing w/ filters |
| `/products/{category}/{product}` | Product details |
| `/where-to-buy` | Dealer list |

### Admin
| Path | Description |
|------|-------------|
| `/admin/categories` | Manage categories |
| `/admin/products` | Manage products |
| `/admin/dealers` | Manage dealers |
| `/admin/settings` | Manage global settings |

---

## ✅ Testing

```bash
php artisan test
```

---

## 📦 Deployment

```bash
npm run build   # Build frontend assets
```

Deploy using **Docker**, **Laravel Forge**, **Vapor**, or your preferred hosting.

---

## 🖼️ Screenshots

> _(comming soon)_

---

## 📄 License

MIT License © 2025 – Speaker Shop Project  
