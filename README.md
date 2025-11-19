# eBirth Business Academy

A modern, comprehensive crypto trading and business education platform built with React, TypeScript, and Tailwind CSS. The platform offers online courses, trading mentorship, and business education to help individuals master cryptocurrency trading and build successful businesses.

## Features

### Educational Platform
- **Crypto Trading Courses** - From basics to advanced techniques
- **Business Education** - Entrepreneurship and business development
- **Expert Instructors** - Industry professionals with real experience
- **Interactive Learning** - Engaging content with practical applications

### Key Sections
- **Hero Section** - Inspiring landing with floating Bitcoin animations
- **Course Catalog** - Web development and language courses
- **Trading Events** - Competitions and webinars
- **Student Testimonials** - Success stories and feedback
- **Professional Contact** - Multiple location support

### Visual Features
- **Custom Logo Integration** - Professional eBirth branding
- **Trading Chart Visualizations** - Interactive SVG charts and patterns
- **Social Media Integration** - Facebook, Telegram, Twitter, YouTube
- **Responsive Design** - Mobile-first approach
- **Modern UI/UX** - Purple and gold theme with glassmorphism effects

## Technology Stack

- **Frontend:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS, Custom CSS
- **Icons:** Lucide React, Custom SVG illustrations
- **Build Tool:** Vite
- **Package Manager:** pnpm
- **Deployment:** Netlify (configured)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Falconetdev/EBIRTH-App.git
   cd EBIRTH-App
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Start development server:**
   ```bash
   pnpm dev
   ```

4. **Build for production:**
   ```bash
   pnpm build
   ```

## Project Structure

```
EBIRTH - App/
├── client/                 # Frontend React application
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # Shadcn/ui components
│   │   ├── Header.tsx     # Navigation with dropdowns
│   │   └── Footer.tsx     # Footer with social links
│   ├── pages/             # Page components
│   │   ├── Index.tsx      # Main landing page
│   │   └── NotFound.tsx   # 404 page
│   ├── hooks/             # Custom React hooks
│   └── lib/               # Utility functions
├── public/                # Static assets
│   ├── ebirth-logo.png   # Main logo
│   ├── Bitcoin-PNG-*.png # Bitcoin graphics
│   ├── Home-*.png        # Hero images
│   └── who we are.png    # Team photos
├── server/               # Backend server
└── shared/               # Shared utilities
```