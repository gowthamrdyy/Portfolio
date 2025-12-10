# 🚀 Gowtham Sree Charan Reddy - Portfolio

A modern, interactive portfolio website built with Next.js 15, featuring stunning animations, particle effects, and a fully responsive design.

![Portfolio Preview](public/hero-image.png)

## ✨ Features

- **Particle Text Animation** - Dynamic text effects with interactive particles
- **3D Globe** - Interactive globe in the footer section
- **Animated Skills Tree** - Visual representation of technical skills with animated beams
- **Project Showcase** - Scrolling card stream with hover effects
- **Responsive Design** - Fully optimized for all screen sizes
- **Creative Mobile Menu** - Animated hamburger menu with modern design
- **SEO Optimized** - Complete meta tags, sitemap, and structured data
- **Dark Theme** - Sleek dark mode design throughout

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **3D Graphics:** Three.js, Cobe (Globe)
- **UI Components:** Radix UI, Lucide Icons
- **Fonts:** Geist Sans & Mono

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/gowthamrdyy/portfolio.git

# Navigate to the project
cd portfolio

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
├── public/
│   ├── projects/          # Project screenshots
│   ├── stickers/          # Floating sticker images
│   ├── gallery*.jpg       # Gallery images
│   └── hero-image.png     # Hero section image
├── src/
│   ├── app/
│   │   ├── layout.tsx     # Root layout with SEO
│   │   ├── page.tsx       # Main page
│   │   └── sitemap.ts     # Dynamic sitemap
│   └── components/
│       ├── ui/            # UI components
│       └── about-me.tsx   # About section
└── ...config files
```

## 🎨 Customization

### Update Personal Info

1. **Hero Image:** Replace `public/hero-image.png`
2. **Gallery Images:** Replace `public/gallery1-5.jpg`
3. **Project Images:** Replace files in `public/projects/`

### Update Content

- **About Section:** `src/components/about-me.tsx`
- **Skills:** `src/components/ui/skills-beam.tsx`
- **Projects:** `src/components/ui/projects-section.tsx`
- **Footer Links:** `src/components/ui/footer.tsx`
- **Resume Link:** `src/components/ui/header.tsx`

### SEO Configuration

Update these files with your domain:
- `src/app/layout.tsx` - Meta tags and Open Graph
- `src/app/sitemap.ts` - Sitemap URLs
- `public/robots.txt` - Sitemap reference
- `src/components/structured-data.tsx` - JSON-LD schema

## 🔧 Environment Variables

Create a `.env.local` file:

```env
# Google Analytics (optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## 📱 Responsive Breakpoints

- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px

## 🌐 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/gowthamrdyy/portfolio)

### Manual Deployment

```bash
npm run build
# Deploy the .next folder to your hosting provider
```

## 📊 Performance

- ⚡ Lighthouse Score: 90+
- 🎯 First Contentful Paint: < 1.5s
- 📱 Mobile Optimized
- 🔍 SEO Ready

## 🤝 Connect

- **GitHub:** [@gowthamrdyy](https://github.com/gowthamrdyy)
- **LinkedIn:** [gowthamrdyy](https://linkedin.com/in/gowthamrdyy)
- **Instagram:** [@gowthamrdyy](https://instagram.com/gowthamrdyy)
- **Email:** iamgowthamsree@gmail.com

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ by Gowtham Sree Charan Reddy
