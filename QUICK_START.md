# ⚡ Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Navigate to Project Directory
```bash
cd .gemini/opportunity_cost_calculator
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start Development Server
```bash
npm run dev
```

### Step 4: Open in Browser
Open [http://localhost:3000](http://localhost:3000)

**That's it!** 🎉 The calculator should now be running.

---

## 🧪 Test the Calculator

### Test Case 1: Basic Calculation
1. **Monthly Rent**: 1200
2. **Months Renting**: 24
3. **Property Price**: 350000
4. Click "KIRA KERUGIAN SAYA SEKARANG!"

**Expected Results:**
- Total Rent Paid: RM 28,800
- Opportunity Cost: ~RM 79,700

### Test Case 2: Validation
1. Try entering empty fields
2. Try entering rent < RM500
3. Try entering months > 120
4. Verify error messages appear

### Test Case 3: Reset
1. Complete a calculation
2. Click "Kira Semula Dengan Nilai Lain"
3. Verify form clears and scrolls to top

---

## 📱 Test on Mobile

### Using Browser DevTools
1. Open Chrome DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select iPhone or Android device
4. Test all functionality

### Using Real Device
1. Find your local IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. Access on mobile: `http://YOUR_IP:3000`
3. Test touch interactions

---

## 🎨 Customize

### Change Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: '#3B82F6',  // Change to your brand color
  danger: '#EF4444',
  success: '#10B981',
  warning: '#F59E0B',
}
```

### Change Text
Edit these files:
- **Header**: `src/components/OpportunityCostCalculator.tsx`
- **Input Labels**: `src/components/InputSection.tsx`
- **Results**: `src/components/ResultsSection.tsx`
- **CTA Button**: `src/components/CTAButton.tsx`

### Change Calculations
Edit `src/utils/calculations.ts`:
```typescript
const appreciationRate = 0.10;     // Change property appreciation %
const downPaymentPercent = 0.10;   // Change down payment %
const loanPercent = 0.90;          // Change loan %
```

---

## 🚀 Deploy

### Quick Deploy to Vercel
```bash
npm install -g vercel
npm run build
vercel --prod
```

### Quick Deploy to Netlify
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

---

## 🐛 Troubleshooting

### Port 3000 already in use?
```bash
# Kill the process using port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill -9
```

### Dependencies not installing?
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build errors?
```bash
# Check Node version (should be 16+)
node --version

# Update Node if needed
# Download from https://nodejs.org/
```

---

## 📚 Next Steps

1. ✅ Calculator is running locally
2. 📖 Read [README.md](./README.md) for full documentation
3. 🚀 Read [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for deployment
4. 📊 Read [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) for overview

---

## 🆘 Need Help?

### Common Questions

**Q: How do I change the language to English?**
A: Edit all text in component files to English translations.

**Q: Can I use this with WordPress?**
A: Yes! Build the project and embed the `dist` folder contents.

**Q: How do I add Google Analytics?**
A: Add GA script to `index.html` (see DEPLOYMENT_GUIDE.md).

**Q: Can I customize the calculation formula?**
A: Yes! Edit `src/utils/calculations.ts`.

---

**Happy Coding!** 💻🎉

