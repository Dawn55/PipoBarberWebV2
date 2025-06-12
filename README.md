# PipoBerber - Berber Salonu Yönetim Sistemi

## Proje Tanımı

PipoBerber, modern berber salonları için geliştirilmiş kapsamlı bir yönetim sistemidir. Bu uygulama, müşteri randevu yönetimi, admin paneli, mesajlaşma sistemi ve finansal işlem takibi gibi temel özellikleri bir araya getirerek berber salonlarının günlük operasyonlarını dijitalleştirmeyi amaçlar.

### Temel Özellikler

- **Randevu Yönetimi**: Müşteriler online randevu alabilir, randevu durumlarını takip edebilir
- **Admin Paneli**: Salon sahipleri tüm randevuları görüntüleyebilir ve yönetebilir
- **Mesajlaşma Sistemi**: Müşteri-salon arası iletişim ve randevu bazlı mesajlaşma
- **Kullanıcı Yönetimi**: Kayıt, giriş ve profil yönetimi
- **Finansal Takip**: Gelir-gider takibi ve raporlama
- **Misafir Erişimi**: Kayıt olmadan randevu alma imkanı

## Kullanılan Teknolojiler

### Frontend & Backend
- **Next.js 14** - React tabanlı full-stack framework
- **React 18** - Kullanıcı arayüzü kütüphanesi
- **TypeScript** - Tip güvenliği için

### Veritabanı & ORM
- **Prisma** - Modern ORM ve veritabanı toolkit
- **SQLite** - Hafif ve hızlı veritabanı

### Styling & UI
- **TailwindCSS** - Utility-first CSS framework
- **Lucide React** - Modern ikonlar
- **React Icons** - Ek ikon kütüphanesi
- **React Hot Toast** - Bildirim sistemi

### Authentication & Security
- **NextAuth.js** - Kimlik doğrulama sistemi
- **bcrypt/bcryptjs** - Şifre hashleme
- **jsonwebtoken** - JWT token yönetimi

### Ek Kütüphaneler
- **React Hook Form** - Form yönetimi
- **React Google Maps API** - Harita entegrasyonu
- **date-fns** - Tarih manipulasyonu

## Kurulum Talimatları

### Gereksinimler
- Node.js (v18 veya üzeri)
- npm veya yarn paket yöneticisi
- Git

### Adım 1: Projeyi Klonlayın
```bash
git clone <repository-url>
cd pipoberber
```

### Adım 2: Bağımlılıkları Yükleyin
```bash
npm install
```

### Adım 3: Ortam Değişkenlerini Ayarlayın
`.env.local` dosyası oluşturun ve aşağıdaki değişkenleri ekleyin:

```env
# Veritabanı
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# JWT
JWT_SECRET="your-jwt-secret-here"

# Google Maps (opsiyonel)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="your-google-maps-api-key"
```

### Adım 4: Veritabanını Oluşturun
```bash
# Prisma istemcisini oluştur
npx prisma generate

# Veritabanı tablolarını oluştur
npx prisma db push

# (Opsiyonel) Prisma Studio ile veritabanını görüntüle
npx prisma studio
```

### Adım 5: Geliştirme Sunucusunu Başlatın
```bash
npm run dev
```

Uygulama `http://localhost:3000` adresinde çalışmaya başlayacaktır.

## Admin Giriş Bilgileri

Test amaçlı admin hesabı oluşturmak için aşağıdaki bilgileri kullanabilirsiniz:

**Admin Kullanıcısı:**
- **Email:** mari@gmail.com
- **Şifre:** 123456

> **Not:** Bu bilgiler sadece geliştirme ve test amaçlıdır. Üretim ortamında güvenli şifreler kullanın.

### Admin Hesabı Oluşturma (Manuel)
Prisma Studio (`npx prisma studio`) kullanarak User tablosuna manuel olarak admin kullanıcısı ekleyebilirsiniz:

```javascript
// Şifreyi hashlemek için bcrypt kullanın
const hashedPassword = await bcrypt.hash("admin123", 12);

// User tablosuna eklenecek veri
{
  name: "Admin",
  surname: "User",
  email: "admin@pipoberber.com",
  phoneNumber: "5555555555",
  password: hashedPassword,
  isAdmin: true,
  isGuest: false
}
```

## Proje Yapısı

```
pipoberber/
├── app/                    # Next.js App Router
│   ├── about/             # Hakkımızda sayfası
│   ├── admin/             # Admin paneli
│   ├── api/               # API routes
│   ├── appointments/      # Randevu sayfaları
│   ├── guest/             # Misafir randevu
│   ├── login/             # Giriş sayfası
│   └── register/          # Kayıt sayfası
├── components/            # Yeniden kullanılabilir bileşenler
├── helpers/               # Yardımcı fonksiyonlar
├── lib/                   # Kütüphane konfigürasyonları
├── prisma/                # Veritabanı şeması ve migrations
│   ├── schema.prisma      # Prisma şema dosyası
│   └── dev.db            # SQLite veritabanı
└── public/                # Statik dosyalar
```

## Veritabanı Şeması

Uygulama aşağıdaki ana tablolara sahiptir:

- **User**: Kullanıcı bilgileri (müşteri/admin)
- **Appointment**: Randevu bilgileri
- **AppointmentMessage**: Randevu bazlı mesajlar
- **Message**: Genel mesajlaşma
- **Transaction**: Finansal işlemler

## Önemli Scriptler

```bash
# Geliştirme sunucusu (Turbo ile)
npm run dev

# Üretim build'i
npm run build

# Üretim sunucusu
npm start

# Linting
npm run lint

# Prisma client oluştur
npx prisma generate

# Veritabanı senkronizasyonu
npx prisma db push
```

## Katkıda Bulunma

1. Projeyi fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## Lisans

Bu proje özel kullanım içindir. Ticari kullanım için izin gereklidir.

## İletişim


---

**Not:** Bu uygulama aktif geliştirme aşamasındadır. Öneriler ve geri bildirimler için issue açabilirsiniz.
