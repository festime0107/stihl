# STIHL Store Production Ready

Ky është version më real për përdorim me klientë.

## Çfarë ka

- MongoDB për produktet
- MongoDB për porositë
- Login admin
- Admin panel
- Shto/Edito/Fshi produkte
- Katalog klienti
- Shportë
- Ruajtje porosie në databazë
- Dërgim porosie në WhatsApp
- Export porosish CSV
- Strukturë file-sh e ndarë
- Komente në kod

## Si ta hapësh

1. Instalo paketat:

```bash
npm install
```

2. Krijo `.env.local` duke kopjuar `.env.example`

```bash
copy .env.example .env.local
```

3. Plotëso `MONGODB_URI` te `.env.local`

4. Start:

```bash
npm run dev
```

## Link-et

Klient:

```bash
http://localhost:3000
```

Admin:

```bash
http://localhost:3000/admin
```

## Login admin default

Në `.env.example` është:

```bash
ADMIN_EMAIL=admin@stihlstore.al
ADMIN_PASSWORD=Admin12345!
```

Ndryshoje para se ta përdorësh realisht.

## WhatsApp

Numri është vendosur:

```bash
NEXT_PUBLIC_WHATSAPP_NUMBER=355692240590
```

## Shënim

Për foto reale, tani vendos URL ose path në fushën `Foto URL/path` te Admin Panel.
Për upload file real në server duhet shtuar Cloudinary ose storage tjetër.


## Version V2 - Shtesa reale biznesi

Ky version shton:

- Dashboard statistikor
- Produkte me stok të ulët
- Status porosish
- Printim fature
- Export CSV
- Error handling më të mirë për produktet
- Konfirmim para fshirjes së produktit

Statuset e porosive:

- new = E re
- confirmed = E konfirmuar
- completed = E përfunduar
- cancelled = E anuluar


## Vercel Ready

Ky version ka:

- `.gitignore`
- `.env.example`
- `vercel.json`
- `next.config.js`
- `README_DEPLOY.md`
- MongoDB error message më të qartë
- gati për GitHub + Vercel

Për deploy ndiq file-in:

```bash
README_DEPLOY.md
```
