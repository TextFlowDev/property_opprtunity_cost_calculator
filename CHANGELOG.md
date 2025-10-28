# Changelog

All notable changes to the Opportunity Cost Calculator project will be documented in this file.

## [Version 1.1.0] - 2025-10-28

### 🎉 Major Features Added

#### 1. **Multi-Language Support** 🌐
- Added English and Bahasa Melayu language toggle
- Language preferences saved to localStorage
- All UI elements and messages fully translated
- Smooth language switching without page reload
- Language toggle button in top-right corner

#### 2. **Save & Load Calculations** 💾
- Save up to 10 calculations with localStorage
- View saved calculations in a sliding panel
- Load previous calculations instantly
- Delete individual saved calculations
- Automatic cleanup of oldest calculations when limit reached
- Saved calculations panel accessible from top-left button

#### 3. **Social Media Sharing** 📢
- Share results to WhatsApp, Facebook, Twitter, and Telegram
- Copy results to clipboard
- Pre-formatted share messages in both languages
- Analytics tracking for share events
- Beautiful share button UI with icons

#### 4. **Print-Friendly Results** 🖨️
- Generate professional PDF-ready printouts
- Includes all calculation details
- Formatted for A4/Letter paper
- Company branding and disclaimers
- Timestamp on printouts

#### 5. **Advanced Mortgage Calculator** 🧮
- Adjustable interest rates (2% - 10%)
- Flexible loan tenure (5 - 35 years)
- Custom down payment percentage (5% - 50%)
- Monthly payment calculations
- Total interest calculations
- Interactive sliders for easy adjustments
- Collapsible panel to reduce clutter

#### 6. **Dark Mode Support** 🌙
- Full dark theme implementation
- Respects system preferences
- Manual toggle button
- Smooth transitions between themes
- Theme preference saved to localStorage
- Optimized contrast for readability

#### 7. **Calculation Comparison** 📊
- Compare up to 3 saved calculations side-by-side
- Interactive comparison charts
- Detailed comparison tables
- Visual analysis of best/worst scenarios
- Bar charts showing rent paid, opportunity cost, and equity built
- Only available when 2+ calculations saved

### 🔧 Technical Improvements

- **Context API Implementation**: Added LanguageContext and ThemeContext
- **Custom Hooks**: Created useSavedCalculations hook for state management
- **Type Safety**: Full TypeScript typing for all new features
- **Performance**: Optimized rendering with React.memo where appropriate
- **Responsive Design**: All new features mobile-optimized
- **Accessibility**: ARIA labels and keyboard navigation support

### 📦 New Components

1. `LanguageContext.tsx` - Language management
2. `LanguageToggle.tsx` - Language switcher UI
3. `ThemeContext.tsx` - Theme management
4. `ThemeToggle.tsx` - Dark mode switcher
5. `SavedCalculationsPanel.tsx` - Saved calculations UI
6. `ShareButtons.tsx` - Social sharing buttons
7. `PrintButton.tsx` - Print functionality
8. `AdvancedCalculator.tsx` - Mortgage calculator
9. `ComparisonMode.tsx` - Calculation comparison
10. `useSavedCalculations.ts` - Custom hook for storage

### 🎨 UI/UX Enhancements

- Floating action buttons for quick access
- Smooth animations with Framer Motion
- Sliding panels for saved calculations and comparison
- Color-coded results for better readability
- Interactive tooltips and help text
- Improved mobile touch targets
- Better error handling and user feedback

### 📱 Mobile Optimizations

- Touch-friendly buttons (48px minimum)
- Responsive panels and modals
- Optimized chart sizes for mobile
- Swipe gestures support
- Better keyboard handling on mobile

### 🐛 Bug Fixes

- Fixed validation to support dynamic translations
- Improved number formatting consistency
- Fixed localStorage quota handling
- Better error boundaries
- Fixed chart responsiveness issues

### 📚 Documentation

- Updated README.md with new features
- Added CHANGELOG.md
- Inline code comments improved
- Better TypeScript documentation

## [Version 1.0.0] - 2025-10-27

### Initial Release

- Basic calculator functionality
- Input validation
- Animated results
- Comparison chart
- Mobile responsive design
- CTA integration

---

## Roadmap

### Version 1.2 (Future)
- [ ] Email results feature
- [ ] User accounts
- [ ] Calculation history with cloud sync
- [ ] Export to Excel/CSV
- [ ] Property listing integration
- [ ] Mortgage rate API integration
- [ ] Multi-currency support
- [ ] Customizable report templates

### Version 2.0 (Future)
- [ ] Property comparison tool
- [ ] Investment ROI calculator
- [ ] Rental income calculator
- [ ] Tax savings calculator
- [ ] Retirement planning integration
- [ ] AI-powered recommendations

---

## Breaking Changes

None in this version. All changes are backward compatible.

## Migration Guide

No migration needed from v1.0.0 to v1.1.0. All new features are additive and don't affect existing functionality.

## Contributors

Development by AI Assistant with guidance from TextFlowDev team.

---

**Last Updated**: October 28, 2025

