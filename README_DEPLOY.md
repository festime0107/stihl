# Deploy në Vercel - STIHL Store

Ky version është gati për deploy në Vercel.

## 1. Testo lokalisht

Në folderin e projektit:

```bash
npm install
copy .env.example .env.local
npm run dev
```

Te `.env.local` vendos vlerat reale.

## 2. Kontrollo `.env.local`

Shembull:

```env
MONGODB_URI=mongodb+srv://festime:password@cluster0.xxxxx.mongodb.net/stihl-store?retryWrites=true&w=majority&appName=Cluster0
ADMIN_EMAIL=admin@stihlstore.al
ADMIN_PASSWORD=Admin12345!
JWT_SECRET=vendos-nje-secret-shume-te-forte-123456789
NEXT_PUBLIC_WHATSAPP_NUMBER=355692240590
NEXT_PUBLIC_BUSINESS_PHONE=+355 69 224 0590
NEXT_PUBLIC_BUSINESS_ADDRESS=Kukës, Albania
```

## 3. Mos e bëj upload `.env.local` në GitHub

`.env.local` është futur në `.gitignore`, kështu që nuk shkon në GitHub.

## 4. Hidhu në GitHub

```bash
git init
git add .
git commit -m "STIHL store production ready"
git branch -M main
git remote add origin REPO_URL
git push -u origin main
```

## 5. Importo në Vercel

- Hyr te https://vercel.com
- Add New Project
- Import GitHub Repository
- Framework: Next.js

## 6. Vendos Environment Variables në Vercel

Te Vercel:

```txt
Project Settings → Environment Variables
```

Shto këto një nga një:

```env
MONGODB_URI
ADMIN_EMAIL
ADMIN_PASSWORD
JWT_SECRET
NEXT_PUBLIC_WHATSAPP_NUMBER
NEXT_PUBLIC_BUSINESS_PHONE
NEXT_PUBLIC_BUSINESS_ADDRESS
```

Pastaj kliko **Deploy**.

## 7. MongoDB Atlas - Network Access

Te MongoDB Atlas:

```txt
Security → Network Access
```

Për Vercel vendos:

```txt
0.0.0.0/0
```

ose **Allow Access From Anywhere**.

## 8. Link-et pas deploy

Faqja për klientin:

```txt
https://projekti.vercel.app
```

Faqja për adminin:

```txt
https://projekti.vercel.app/admin
```

## 9. Çfarë të testosh pas deploy

- Hap faqen kryesore
- Shiko produktet
- Shto produkt në shportë
- Plotëso porosi
- Dërgo në WhatsApp
- Hyr te `/admin`
- Shto produkt
- Edito produkt
- Shiko porositë
- Ndrysho statusin
- Printo faturë
- Export CSV

## 10. Kujdes

Për përdorim real, ndrysho:

```env
ADMIN_PASSWORD
JWT_SECRET
```

Mos i lër default.
