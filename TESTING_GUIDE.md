# 🧪 Testing Guide - Opportunity Cost Calculator v1.1

## ✅ Issue Fixed!

The PostCSS configuration has been updated to work with Tailwind CSS v3.4.17. The error should now be resolved.

---

## 🚀 How to Test Locally

### Step 1: Start Development Server

```bash
cd C:\Users\neaxu\.gemini\X\.gemini\opportunity_cost_calculator
npm run dev
```

The server should start without errors and display:

```
VITE v6.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  press h + enter to show help
```

### Step 2: Open in Browser

**Local URL:** `http://localhost:5173/`

**Network URL:** Check terminal output for your local IP address (e.g., `http://192.168.x.x:5173/`)

---

## 📋 Feature Testing Checklist

### 🌐 Test 1: Language Toggle
1. Click the **🌐** button in top-right corner
2. Switch between EN and BM
3. Verify all text changes language
4. Refresh page - language should persist

**Expected:** Smooth language switching, text updates instantly

---

### 💾 Test 2: Save & Load Calculations
1. Enter values:
   - Monthly Rent: 1200
   - Months Renting: 24
   - Property Price: 350000
2. Click **CALCULATE**
3. Click **💾 Save** button
4. Click **💾** button (top-left) to open saved calculations
5. Click on the saved calculation to load it
6. Try deleting a calculation with 🗑️

**Expected:** 
- Calculation saves successfully
- Panel slides in from left
- Clicking loads the calculation instantly
- Delete removes it from list

---

### 📢 Test 3: Social Media Sharing
1. Calculate results (use test values above)
2. Scroll to **Share Your Results** section
3. Click each social media button:
   - **WhatsApp** - Opens WhatsApp with pre-filled message
   - **Facebook** - Opens Facebook share dialog
   - **Twitter** - Opens Twitter compose
   - **Telegram** - Opens Telegram share
   - **Copy** - Copies to clipboard

**Expected:** Each platform opens correctly with formatted message

---

### 🖨️ Test 4: Print Results
1. Calculate results
2. Click **🖨️ Print Results** button
3. New window opens with formatted report
4. Use browser print or save as PDF

**Expected:** Professional-looking printable report

---

### 🧮 Test 5: Advanced Calculator
1. Calculate results
2. Click **🧮 Advanced Calculator** button
3. Adjust sliders:
   - Interest Rate: Try 3.5%, 5%, 7%
   - Loan Tenure: Try 20, 25, 30 years
   - Down Payment: Try 10%, 20%, 30%
4. Watch calculations update in real-time

**Expected:** 
- Panel expands smoothly
- Sliders work
- Numbers update instantly
- Monthly payment shows correctly

---

### 🌙 Test 6: Dark Mode
1. Click **🌙** button in top-right
2. Interface switches to dark theme
3. Click **🌞** to switch back to light
4. Refresh page - theme should persist

**Expected:** 
- Smooth theme transition
- All elements properly styled in dark mode
- Toggle animates nicely

---

### 📊 Test 7: Comparison Mode
1. Save at least 2 different calculations (vary the rent amounts)
2. Click **📊 Compare** button (top-left)
3. Select 2-3 calculations (checkbox them)
4. View the comparison chart and table

**Expected:**
- Panel slides in from left
- Chart displays with different colored bars
- Table shows side-by-side comparison
- Best/worst analysis displays

---

## 🔍 Detailed Test Scenarios

### Scenario A: First-Time Renter
**Profile:** Renting RM 1,200/month for 2 years, looking at RM 350K property

1. Open app
2. Select language (BM for Malaysian user)
3. Enter: Rent=1200, Months=24, Price=350000
4. Calculate
5. Check opportunity cost (should be ~RM 79,700)
6. Save calculation
7. Share on WhatsApp
8. Print for records

**Expected outcome:** User sees significant loss and wants to take action

---

### Scenario B: Long-Term Renter
**Profile:** Been renting RM 2,000/month for 5 years

1. Enter: Rent=2000, Months=60, Price=500000
2. Calculate
3. See massive opportunity cost
4. Use Advanced Calculator to see if they can afford mortgage
5. Save this calculation
6. Try different property price scenarios
7. Use comparison mode to compare options

**Expected outcome:** User realizes urgency of buying

---

### Scenario C: Budget-Conscious User
**Profile:** Comparing cheap vs expensive rent

1. First calculation: Rent=800, Months=24, Price=250000
2. Save it
3. Second calculation: Rent=1500, Months=24, Price=250000
4. Save it
5. Third calculation: Rent=2200, Months=24, Price=250000
6. Save it
7. Open comparison mode
8. Select all three
9. See visual difference

**Expected outcome:** User sees how rent amount affects opportunity cost

---

## 🐛 Common Issues & Solutions

### Issue: Port Already in Use
**Error:** `Port 5173 is already in use`

**Solution:**
```bash
# Stop the existing process
# Press Ctrl+C in the terminal running the dev server
# Or kill the process:
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

---

### Issue: White Screen / No Content
**Cause:** JavaScript error or build issue

**Solution:**
1. Open browser console (F12)
2. Check for errors
3. Clear cache (Ctrl+Shift+Delete)
4. Hard refresh (Ctrl+Shift+R)

---

### Issue: Dark Mode Not Working
**Cause:** localStorage not enabled

**Solution:**
1. Check browser settings
2. Enable cookies/storage for localhost
3. Try incognito mode

---

### Issue: Saved Calculations Not Loading
**Cause:** localStorage full or disabled

**Solution:**
```javascript
// Open browser console and run:
localStorage.clear()
// Then refresh the page
```

---

## 📱 Mobile Testing

### Using Chrome DevTools
1. Open DevTools (F12)
2. Click device toggle (Ctrl+Shift+M)
3. Select device:
   - iPhone 12 Pro
   - Samsung Galaxy S21
   - iPad Pro
4. Test all features

### Using Real Mobile Device
1. Find your computer's IP address:
   ```bash
   ipconfig
   # Look for IPv4 Address
   ```
2. Start dev server with host flag:
   ```bash
   npm run dev -- --host
   ```
3. Open on mobile: `http://YOUR_IP:5173/`

---

## 🎯 Performance Testing

### Check Load Time
1. Open DevTools > Network tab
2. Refresh page
3. Check total load time (should be <3s)

### Check Bundle Size
```bash
npm run build
```
Check `dist/` folder size (should be <2MB)

---

## ✅ All Features Working Checklist

- [ ] App loads without errors
- [ ] No PostCSS errors in console
- [ ] Language toggle works
- [ ] Calculations are accurate
- [ ] Save/Load works
- [ ] All share buttons work
- [ ] Print generates correct format
- [ ] Advanced calculator calculates correctly
- [ ] Dark mode toggles properly
- [ ] Comparison mode shows charts
- [ ] Mobile responsive
- [ ] No console errors
- [ ] No linter errors

---

## 🌐 Deployment Testing (When Ready)

### Before Deploying:
1. Run production build: `npm run build`
2. Test preview: `npm run preview`
3. Check all features still work
4. Test on different browsers
5. Test on real mobile devices

### After Deploying:
1. Test live URL
2. Check all features
3. Monitor analytics
4. Check error logs

---

## 📞 Need Help?

If you encounter issues:

1. **Check Console:** Open browser DevTools (F12) and look for errors
2. **Clear Cache:** Hard refresh (Ctrl+Shift+R)
3. **Restart Server:** Stop (Ctrl+C) and restart `npm run dev`
4. **Reinstall:** Delete `node_modules/` and run `npm install`

---

## 🎉 Testing Complete!

Once all tests pass, your app is ready to:
- ✅ Deploy to production
- ✅ Share with users
- ✅ Collect feedback
- ✅ Monitor analytics

**Happy Testing! 🚀**

