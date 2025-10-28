# 🔥 Property Opportunity Cost Calculator

<div align="center">

![Version](https://img.shields.io/badge/version-1.1.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-38B2AC?logo=tailwind-css)

**Berapa Anda Rugi Dengan Menyewa?**

An emotional, high-impact calculator showing Malaysian renters how much money they're losing by not buying property.

**By Kun Property Seminar | Win Society Group**

[Live Demo](https://your-app-url.vercel.app) · [Documentation](#-documentation) · [Report Bug](https://github.com/TextFlowDev/property_opprtunity_cost_calculator/issues)

</div>

---

## 🎯 Overview

The **Property Opportunity Cost Calculator** is a sophisticated web application designed to help Malaysian renters understand the financial impact of their renting decisions. By visualizing the opportunity cost of renting versus buying property, this tool drives emotional engagement and encourages users to take action toward property ownership.

### Purpose

- 📊 **Educate** renters about opportunity costs
- 💡 **Visualize** wealth-building potential
- 🚀 **Drive** webinar registrations
- 📱 **Engage** mobile-first users (70% traffic)

### Target Audience

- Malaysian renters (age 25-40)
- First-time home buyers
- Property investment beginners
- Financial literacy seekers

---

## ✨ Version 1.1 Features

### 🆕 New in Version 1.1

#### 1. 🌐 **Multi-Language Support**
- English & Bahasa Melayu toggle
- 150+ translated strings
- Real-time language switching
- Persistent language preferences

#### 2. 💾 **Save & Load Calculations**
- Save up to 10 calculations
- localStorage implementation
- Quick load functionality
- Manage saved scenarios

#### 3. 📢 **Social Media Sharing**
- WhatsApp, Facebook, Twitter, Telegram
- Copy to clipboard
- Pre-formatted messages
- Viral growth potential

#### 4. 🖨️ **Print-Friendly Results**
- Professional PDF-ready output
- Complete calculation details
- Branded headers & footers

#### 5. 🧮 **Advanced Mortgage Calculator**
- Adjustable interest rates (2-10%)
- Flexible loan tenure (5-35 years)
- Custom down payment (5-50%)
- Real-time calculations

#### 6. 🌙 **Dark Mode**
- Full dark theme
- System preference detection
- Smooth transitions
- Eye-strain reduction

#### 7. 📊 **Calculation Comparison**
- Compare up to 3 calculations
- Interactive charts
- Side-by-side comparison
- Data-driven decisions

---

## 🚀 Quick Start

Get the calculator running in 2 minutes:

```bash
# Clone the repository
git clone https://github.com/TextFlowDev/property_opprtunity_cost_calculator.git

# Navigate to project directory
cd property_opprtunity_cost_calculator

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:3000
```

That's it! 🎉

---

## 📦 Installation

### Prerequisites

- **Node.js** 16.0 or higher
- **npm** 7.0 or higher
- Modern web browser

### Step-by-Step Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/TextFlowDev/property_opprtunity_cost_calculator.git
   cd property_opprtunity_cost_calculator
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build:**
   ```bash
   npm run preview
   ```

---

## 🛠️ Technology Stack

### Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| [React](https://react.dev/) | 18.3.1 | UI library |
| [TypeScript](https://www.typescriptlang.org/) | 5.8.2 | Type safety |
| [Vite](https://vitejs.dev/) | 6.2.0 | Build tool |
| [Tailwind CSS](https://tailwindcss.com/) | 3.4.17 | Styling |

### UI & Animation

| Technology | Version | Purpose |
|------------|---------|---------|
| [Framer Motion](https://www.framer.com/motion/) | 11.15.0 | Animations |
| [Recharts](https://recharts.org/) | 2.15.0 | Charts |
| [React Number Format](https://github.com/s-yadav/react-number-format) | 5.4.2 | Input formatting |

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
npm run build
vercel --prod
```

### Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
npm run build
netlify deploy --prod --dir=dist
```

---

## 🔗 Integration with WordPress

### Embedding in WordPress (Breakdance Builder)

1. **Add Custom HTML Element** in Breakdance
2. **Paste the iframe code:**

```html
<iframe 
  src="https://your-app-url.vercel.app" 
  style="width: 100%; min-height: 100vh; border: none;"
  title="Property Opportunity Cost Calculator"
  loading="lazy"
  allowfullscreen>
</iframe>

<script>
  // Auto-resize iframe based on content
  window.addEventListener('message', function(e) {
    if (e.data.height) {
      document.querySelector('iframe').style.height = e.data.height + 'px';
    }
  });
</script>
```

3. **Mobile Responsive:** The iframe is fully responsive and will adapt to all screen sizes.

---

## 📱 Mobile Responsive

- ✅ Mobile-first design
- ✅ Touch-friendly buttons (48px minimum)
- ✅ Optimized for all screen sizes
- ✅ Fast loading on mobile networks
- ✅ iOS and Android compatible

---

## 📄 License

This project is licensed under the MIT License.

---

## 📞 Contact

### Kun Property Seminar | Win Society Group

- **Website**: [Your Website]
- **Email**: [Your Email]
- **Phone**: [Your Phone]

### Project Repository

- **GitHub**: [https://github.com/TextFlowDev/property_opprtunity_cost_calculator](https://github.com/TextFlowDev/property_opprtunity_cost_calculator)
- **Issues**: [Report Bug / Request Feature](https://github.com/TextFlowDev/property_opprtunity_cost_calculator/issues)

---

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Framer Motion for smooth animations
- Recharts for beautiful charts
- The open-source community

---

**© 2025 Kun Property Seminar | Win Society Group | All Rights Reserved.**

Made with ❤️ for Malaysian Property Investors

⭐ Star us on GitHub — it helps!
