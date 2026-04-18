# LD Watches

**Tagline:** Donde el tiempo, se vuelve estilo  
**Location:** Mayagüez, Puerto Rico  
**Instagram:** [@ld_watches_](https://www.instagram.com/ld_watches_)

---

## Local Development

### 1. Install dependencies

```bash
npm install
```

### 2. Extract video frames (one-time setup)

Install ffmpeg first:
```bash
# macOS
brew install ffmpeg

# Ubuntu / Debian
sudo apt install ffmpeg
```

Then run:
```bash
npm run extract-frames
```

This reads the videos from `public/video/`, extracts WebP frames into `public/frames/`, and writes `public/frames-manifest.json` with the frame counts.

> **Note:** Commit the extracted frames to git so Vercel can serve them. The source videos are excluded from deployment via `.vercelignore`.

### 3. Start dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deployment to Vercel

The project is already linked to the Vercel project `ld-watches`.

1. Extract frames and commit them:
   ```bash
   npm run extract-frames
   git add public/frames/ public/frames-manifest.json
   git commit -m "feat: add scroll animation frames"
   ```

2. Push to `main` — Vercel auto-deploys:
   ```bash
   git push origin main
   ```

---

## Updating the Inventory

Edit `data/inventory.json` to add products:

```json
{
  "relojes": [
    {
      "id": "r1",
      "name": "Casio Edifice EFR-303",
      "price": "$89",
      "image": "/products/reloj-efr303.webp",
      "description": "Cronógrafo de acero inoxidable",
      "instagramUrl": "https://www.instagram.com/ld_watches_"
    }
  ]
}
```

Place product images in `public/products/`. When `image` is empty string, a placeholder is shown.

---

## Tech Stack

- **Next.js 14** (App Router)
- **Tailwind CSS v4** (CSS-first config)
- **TypeScript**
- **GSAP + ScrollTrigger** — scroll-driven canvas animation
- **Framer Motion** — section transitions
- **Vercel** — hosting

---

## Frame Extraction Details

| Setting | Desktop | Mobile |
|---------|---------|--------|
| Aspect ratio | 16:9 | 3:4 |
| Output size | 1920×1080 | 900×1200 |
| Format | WebP q82 | WebP q82 |
| Target frames | 300–500 | 300–500 |

The script computes the optimal FPS to keep total frames in the 300–500 range while preserving smooth playback.
