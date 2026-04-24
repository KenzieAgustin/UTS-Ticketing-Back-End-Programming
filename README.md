# 🎬 Cinema Booking API

> Sistem backend lengkap untuk pemesanan tiket bioskop — mulai dari autentikasi user, manajemen film & jadwal tayang, pemesanan kursi, pembayaran, hingga verifikasi tiket masuk.

---

## 👥 Tim Pengembang

| No  | Nama                        | Fitur                            |
| --- | --------------------------- | -------------------------------- |
| 1   | 535250054 (Yohanes Phandry) | Authentication & User Management |
| 2   | 535250079 (KenzieAgustin)   | Movies & Beverages               |
| 3   | 535250093 (Jessica-j3slyn)  | Theaters & Showtimes Scheduling  |
| 4   | 535250095 (nicholouissalim) | Booking & Promo Management       |
| 5   | 535250096 (chatrinatricia)  | Transaction & Admin Control      |

---

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB & Mongoose
- **Authentication**: JWT (JSON Web Token) + Passport.js
- **Security**: Bcrypt (password hashing)

---

## 📦 Instalasi & Menjalankan Project

```bash
# Clone repository
git clone <repository-url>
cd cinema-booking-api

# Install dependencies
npm install

# Buat file .env dan isi variabel berikut
cp .env.example .env

# Jalankan server
npm run dev
```

### Environment Variables

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017
JWT_SECRET=your_jwt_secret_key
```

---

## 🗂️ Struktur Fitur

```
cinema-booking-api/
├── 🔐 Auth & User Management
├── 🎞️  Movies & Beverages
├── 🏛️  Theaters & Showtimes
├── 🎟️  Booking & Promo
└── 💳  Transaction & Ticket
```

---

## 🔐 1. Authentication & User Management

Menangani registrasi, login, dan manajemen profil user. Menggunakan JWT untuk autentikasi dan bcrypt untuk keamanan password.

### Fitur Utama

- **Autentikasi** — User bisa daftar akun dan login. Login menghasilkan JWT token yang dipakai untuk membuktikan identitas di request-request berikutnya.
- **Manajemen profil** — User yang sudah login bisa lihat dan update data dirinya sendiri, serta ganti password.
- **Pembatasan akses** — Ada dua level akses: `user` biasa dan `admin`. User biasa hanya bisa akses data miliknya sendiri. Admin bisa manage semua user.
- **Keamanan** — Password di-hash pakai bcrypt sebelum disimpan. Ada proteksi timing attack di login, dan semua endpoint sensitif dilindungi middleware JWT.

### Database Schema (User)

| Field      | Type   | Keterangan                    |
| ---------- | ------ | ----------------------------- |
| `name`     | String | Nama user                     |
| `email`    | String | Email unik                    |
| `password` | String | Hashed dengan bcrypt          |
| `role`     | String | `user` (default) atau `admin` |

### Auth Endpoints

| Method | Endpoint              | Deskripsi                   | Akses  |
| ------ | --------------------- | --------------------------- | ------ |
| `POST` | `/api/auth/register`  | Daftar akun baru            | Public |
| `POST` | `/api/auth/login`     | Login & dapatkan JWT token  | Public |
| `GET`  | `/api/auth/protected` | Test middleware autentikasi | User   |

### User Endpoints

| Method   | Endpoint                         | Deskripsi                   | Akses |
| -------- | -------------------------------- | --------------------------- | ----- |
| `GET`    | `/api/users/me`                  | Lihat profil sendiri        | User  |
| `PUT`    | `/api/users/me`                  | Update nama & email sendiri | User  |
| `PUT`    | `/api/users/me/change-password`  | Ganti password sendiri      | User  |
| `GET`    | `/api/users`                     | Lihat semua user            | Admin |
| `POST`   | `/api/users`                     | Buat user baru              | Admin |
| `GET`    | `/api/users/:id`                 | Detail user by ID           | Admin |
| `PUT`    | `/api/users/:id`                 | Update user by ID           | Admin |
| `PUT`    | `/api/users/:id/change-password` | Ganti password user by ID   | Admin |
| `DELETE` | `/api/users/:id`                 | Hapus user by ID            | Admin |

---

## 🎞️ 2. Movies & Beverages

Menangani manajemen data film yang akan ditayangkan dan daftar minuman/snack yang tersedia di bioskop.

### Movies Endpoints

| Method   | Endpoint          | Deskripsi         | Akses  |
| -------- | ----------------- | ----------------- | ------ |
| `POST`   | `/api/movies`     | Tambah film baru  | Admin  |
| `GET`    | `/api/movies`     | Lihat semua film  | Public |
| `GET`    | `/api/movies/:id` | Detail film by ID | Public |
| `PUT`    | `/api/movies/:id` | Update data film  | Admin  |
| `DELETE` | `/api/movies/:id` | Hapus film        | Admin  |

### Beverages Endpoints

| Method   | Endpoint             | Deskripsi         | Akses  |
| -------- | -------------------- | ----------------- | ------ |
| `POST`   | `/api/beverages`     | Tambah item baru  | Admin  |
| `GET`    | `/api/beverages`     | Lihat semua item  | Public |
| `GET`    | `/api/beverages/:id` | Detail item by ID | Public |
| `PUT`    | `/api/beverages/:id` | Update data item  | Admin  |
| `DELETE` | `/api/beverages/:id` | Hapus item        | Admin  |

---

## 🏛️ 3. Theaters & Showtimes Management

Menangani manajemen lokasi bioskop dan penjadwalan tayang film. Setiap jadwal tayang (Showtimes) sangat bergantung pada data film (Movies) dan lokasi (Theaters).

### Theaters Endpoints

| Method   | Endpoint             | Deskripsi              | Akses  |
| -------- | -------------------- | ---------------------- | ------ |
| `POST`   | `/api/theathers`     | Daftarkan bioskop baru | Admin  |
| `GET`    | `/api/theathers`     | Lihat semua bioskop    | Public |
| `GET`    | `/api/theathers/:id` | Detail bioskop by ID   | Public |
| `DELETE` | `/api/theathers/:id` | Hapus data bioskop     | Admin  |

### Showtimes Endpoints

| Method   | Endpoint             | Deskripsi                | Akses  |
| -------- | -------------------- | ------------------------ | ------ |
| `POST`   | `/api/showtimes`     | Buat jadwal tayang baru  | Admin  |
| `GET`    | `/api/showtimes`     | Lihat semua jadwal aktif | Public |
| `DELETE` | `/api/showtimes/:id` | Hapus jadwal tayang      | Admin  |

### Alur Integrasi Theaters & Showtimes

```
1. [Movies] Buat film → dapatkan movie_id
         ↓
2. [Theaters] Daftarkan bioskop → dapatkan theather_id
         ↓
3. [Showtimes] Buat jadwal tayang menggunakan movie_id + theather_id
```

---

## 🎟️ 4. Booking & Promo Management

Menangani pemesanan tiket bioskop, penguncian kursi sementara, dan penerapan kode promo.

### Database Schema (Booking/Ticket)

| Field         | Type     | Keterangan                                        |
| ------------- | -------- | ------------------------------------------------- |
| `userId`      | ObjectId | Referensi ke user (**wajib**)                     |
| `movieName`   | String   | Nama film (**wajib**)                             |
| `seatNumber`  | String   | Nomor kursi (**wajib**)                           |
| `price`       | Number   | Harga tiket (**wajib**)                           |
| `bookingDate` | Date     | Otomatis diisi sistem                             |
| `status`      | String   | `CONFIRMED` (default), `LOCKED`, atau `CANCELLED` |

### Booking Endpoints

| Method   | Endpoint                | Deskripsi                         | Akses |
| -------- | ----------------------- | --------------------------------- | ----- |
| `POST`   | `/booking/`             | Buat pesanan tiket baru           | User  |
| `GET`    | `/booking/my-ticket`    | Lihat tiket milik user yang login | User  |
| `POST`   | `/booking/apply-promo`  | Terapkan kode promo               | User  |
| `POST`   | `/booking/lock-seats`   | Kunci kursi sementara             | User  |
| `DELETE` | `/booking/unlock-seats` | Batalkan kuncian kursi            | User  |
| `GET`    | `/booking/:id`          | Detail pesanan by ID              | User  |

## 💳 5. Transaction & Ticket Verification

Menangani proses pembayaran booking, pembatalan, monitoring transaksi oleh admin, dan verifikasi tiket oleh staff. Setiap tiket hanya bisa digunakan **satu kali** untuk menjaga validitas check-in.

### Transaction Endpoints

| Method  | Endpoint                  | Deskripsi                 | Akses |
| ------- | ------------------------- | ------------------------- | ----- |
| `POST`  | `/api/booking/:id/pay`    | Proses pembayaran booking | User  |
| `PATCH` | `/api/booking/:id/cancel` | Batalkan booking pending  | User  |
| `GET`   | `/api/admin/transactions` | Lihat semua transaksi     | Admin |

| Payment Method | Keterangan                 |
| -------------- | -------------------------- |
| `transfer`     | Transfer bank (default)    |
| `ewallet`      | E-Wallet (GoPay, OVO, dll) |
| `cash`         | Tunai di kasir             |

```json
{
  "paymentMethod": "ewallet"
}
```

```
GET /api/admin/transactions?status=paid
GET /api/admin/transactions?status=pending
GET /api/admin/transactions?status=cancelled
```

### Ticket Endpoints

| Method | Endpoint              | Deskripsi                   | Akses |
| ------ | --------------------- | --------------------------- | ----- |
| `POST` | `/api/tickets/verify` | Verifikasi & check-in tiket | Staff |

### Alur Integrasi Transaction & Ticket

```
1. [Booking] Buat pesanan → dapatkan booking_id
         ↓
2. [Transaction] Bayar dengan booking_id → tiket otomatis dibuat
         ↓
3. [Ticket] Staff scan booking_id saat penonton masuk → check-in berhasil
```

---

## 🔄 Alur Lengkap Sistem

```
[Register/Login] → Dapatkan JWT Token
        ↓
[Browse Movies] → Pilih film & jadwal tayang
        ↓
[Lock Seat] → Kunci kursi sementara
        ↓
[Create Booking] → Buat pesanan (status: CONFIRMED)
        ↓
[Apply Promo] → Opsional: gunakan kode promo
        ↓
[Pay] → Proses pembayaran → tiket otomatis dibuat
        ↓
[Verify Ticket] → Staff scan tiket saat masuk studio ✅
```

---

## 🔒 Autentikasi

Semua endpoint yang memerlukan autentikasi harus menyertakan JWT token di header:

```
Authorization: Bearer <your_jwt_token>
```

Token didapatkan setelah berhasil login via `POST /api/auth/login` dan berlaku selama **1 hari**.

---

## 📋 Status Code

| Code  | Keterangan                                          |
| ----- | --------------------------------------------------- |
| `200` | OK — Request berhasil                               |
| `201` | Created — Data berhasil dibuat                      |
| `400` | Bad Request — Data yang dikirim tidak valid         |
| `401` | Unauthorized — Token tidak ada atau tidak valid     |
| `403` | Forbidden — Tidak punya akses                       |
| `404` | Not Found — Data tidak ditemukan                    |
| `500` | Internal Server Error — Terjadi kesalahan di server |
