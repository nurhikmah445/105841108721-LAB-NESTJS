# LAPORAN LAB BACKEND

## PENDAHULUAN
Proyek Lab Backend ini merupakan implementasi sistem backend menggunakan framework **NestJS**, yang dirancang untuk memenuhi kebutuhan aplikasi modern dengan fitur-fitur seperti autentikasi, chat, profil mahasiswa, dan database dengan Prisma. Dalam proyek ini, kami akan membahas tentang bagaimana membangun aplikasi backend yang skalabel, aman, dan mudah dipelihara, serta bagaimana mengintegrasikan teknologi-teknologi seperti WebSockets dan JWT untuk menyediakan komunikasi real-time dan autentikasi pengguna yang aman. Dengan menggunakan contoh-contoh kode yang disediakan, Anda dapat mempelajari bagaimana menerapkan konsep-konsep ini dalam proyek Anda sendiri.

## STRUKTUR PROYEK

Berikut ini adalah struktur proyek **Lab-NestJS**:
```
📦lab-nestjs/
├── 📂node_modules/
├── 📂prisma/
│   ├── prisma.schema
├── 📂public/
│   ├── 🟨app.js
│   ├── 🟧index.html
│   ├── 🟦styles.css
├── 📂src/
│   ├── 📂chat/
│   |   |-- chat.gateaway.spec.ts
│   |   |-- chat.gateaway.ts
│   |   |-- chat.module.ts
│   |   |-- chat.service.spec.ts
│   |   |-- chat.service.ts
│   ├── 📂dto/
│   |   |-- create-mahasiswa.dto.ts
│   |   |-- register-user.dto.ts
│   ├── 📂entity/
│   |   |-- user.entity.ts
│   ├── 📂mahasiswa-profile/
│   |   |-- mahasiswa-profile.controller.spec.ts
│   |   |-- mahasiswa-profile.controller.ts
│   |   |-- mahasiswa-profile.module.ts
│   |   |-- mahasiswa-profile.service.spec.ts
│   |   |-- mahasiswa-profile.service.ts
│   ├── 📂profile/
│   |   |-- profile.controller.spec.ts
│   |   |-- profile.controller.ts
│   |   |-- profile.module.ts
│   |   |-- profile.service.spec.ts
│   |   |-- profile.service.ts
│   |-- app.controller.spec.ts
│   |-- app.controller.ts
│   |-- app.module.ts
│   |-- app.service.ts
│   |-- auth.guard.ts
│   |-- auth.module.ts
│   |-- 🟦main.ts
│   |-- 🟦prisma.ts
│   |-- 🟦user.decorator.ts
├── 📂test/
├── 📂uploads/
├── .env
├── .gitignore
├── .prettierrc
├── nest-cli.json
├── package-lock.json 
├── package.json 
├── README.md 
├── tsconfig.build.json 
├── tsconfig.json 
```

---

## PENJELASAN SETIAP STRUKTUR FOLDER

| Folder | Deskripsi |
|--------|-----------|
| `node_modules/` | Folder otomatis yang menyimpan semua dependensi proyek setelah `npm install`. |
| `prisma/` | Mengelola skema database dengan Prisma ORM (Object Relational Mapping) yang memungkinkan untuk berinteraksi dengan database. Berisi `prisma.schema` untuk mendefinisikan tabel database. |
| `public/` | Menyimpan file statis seperti HTML, CSS, dan JS untuk kebutuhan.Menghubungkan aplikasi web dengan server menggunakan WebSocket. Mengirimkan dan menerima data **chatting** dari server |
| `src/` | Folder utama yang berisi kode backend NestJS. |
| `uploads/` |  Tempat penyimpanan file yang di-upload oleh pengguna. File-file yang disimpan di dalam folder ini dapat digunakan untuk menyimpan file-file yang di-upload oleh pengguna, seperti foto profil, atau file lainnya. |
| `test/` | Folder untuk unit test dan integration test. |

---
## PENJELASAN SETIAP FILE PADA FOLDER
|Folder src/chat | Deskripsi|
|--------|-----------|
| `chat.gateway.spec.ts` | *****
| `chat.gateway.ts` | *****
| `chat.module.ts` | *****
| `chat.service.spec.ts` | *****
| `chat.service.ts` | *****
---
|Folder src/dto | Deskripsi|
|--------|-----------|
|`create-mahasiswa.dto.ts`| *****
|`register-user.dto.ts`| *****
---
|Folder src/entity | Deskripsi|
|--------|-----------|
|`user.entity.ts`| *****
---
|Folder src/mahasiswa-profile | Deskripsi|
|--------|-----------|
|`mahasiswa-profile.controller.spec.ts`| *****
|`mahasiswa-profile.controller.ts`| *****
|`mahasiswa-profile.module.ts`| *****
|`mahasiswa-profile.service.spec.ts`| *****
|`mahasiswa-profile.service.ts`| *****
---
|Folder src/profile | Deskripsi|
|--------|-----------|
|`profile.controller.spec.ts`| *****
|`profile.controller.ts`| *****
|`profile.module.ts`| *****
|`profile.service.spec.ts`| *****
|`profile.service.ts`| *****
---
|Folder src/ | Deskripsi|
|--------|-----------|
|`app.controller.spec.ts`| *****
|`app.controller.ts`| *****
|`app.module.ts`| *****
|`app.service.spec.ts`| *****
|`app.service.ts`| *****
|`auth.guard.ts`| *****
|`auth.module.ts`| *****
|`main.ts`| *****
|`prisma.ts`| *****
|`user.decorator.ts`| *****
---
## DIAGRAM ARSITEKTUR

Berikut diagram arsitektur proyek dalam bentuk flowchart visual:
```mermaid
flowchart
    A[Main.ts] -->|Memuat| B[AppModule]
    B -->|Memuat| C[AuthModule]
    B -->|Memuat| D[ChatModule]
    B -->|Memuat| E[ProfileModule]
    B -->|Memuat| F[PrismaModule]
    
    C -->|Mengelola| G[AuthService]
    C -->|Mengatur Route| H[AuthController]
    
    D -->|Mengelola| I[ChatService]
    D -->|Mengatur Route| J[ChatController]
    
    E -->|Mengelola| K[ProfileService]
    E -->|Mengatur Route| L[ProfileController]
    
    F -->|Mengelola Database| M[Database Operations]
```

Diagram ini menunjukkan bagaimana modul saling terhubung dan bagaimana aliran data terjadi di dalam aplikasi **Lab-NestJS**.

## Alur Kerja Register User, Login dan Authenticated
```mermaid
graph TD
  %% Registrasi Pengguna
  A[Mulai: Register] -->|Pengguna mengisi data| B[Simpan data pengguna]
  B -->|Sukses| C[Tampilkan pesan sukses]
  B -.->|Gagal: Username sudah digunakan| I[Tampilkan error: Akun sudah ada]

  %% Login dan Autentikasi
  D[Mulai: Login] -->|Pengguna memasukkan kredensial| E[Periksa username]
  E -->|Valid| F[Periksa password]
  E -.->|Gagal: Username tidak ditemukan| L[Tampilkan error: Akun tidak terdaftar]
  F -->|Valid| G[Generate token]
  F -.->|Gagal: Password salah| M[Tampilkan error: Password salah]
  G -->|Sukses| H[Return token]
  H -->|Sukses| J[Pengguna menyimpan token & mengakses API]

  %% Autentikasi Token
  J -->|Mengakses API dengan token| K[Verifikasi token]
  K -->|Valid| N[Akses API diberikan]
  K -.->|Gagal: Token tidak valid| O[Tampilkan error: Token tidak sah]
```


## Cara Menjalankan Proyek

1. **Clone repository:**
   ```sh
   git clone <repo-url>
   cd lab-nestjs
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Menjalankan server:**
   ```sh
   npm run start
   npm run start:dev
   ```

4. **Akses API di:**
   ```sh
   http://localhost:3000
   http://localhost:3000/api-docs  --> Swagger
   ```

## Teknologi yang Digunakan
- **NestJS** → Framework backend berbasis TypeScript.
- **Prisma** → ORM untuk database.
- **WebSockets** → Untuk komunikasi real-time dalam chat.
- **JWT (JSON Web Token)** → Untuk autentikasi pengguna.

## Kesimpulan
Proyek ini adalah implementasi backend menggunakan NestJS dengan beberapa modul utama, termasuk autentikasi, chat, profil mahasiswa, dan database dengan Prisma. Dengan menggunakan teknologi seperti WebSockets dan JWT, proyek ini dapat menyediakan komunikasi real-time dan autentikasi pengguna yang aman.