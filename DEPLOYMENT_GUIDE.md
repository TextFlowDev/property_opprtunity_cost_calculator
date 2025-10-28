# 🚀 Deployment Guide - Opportunity Cost Calculator

## Pre-Deployment Checklist

- [ ] All components tested and working
- [ ] Responsive design verified on mobile/tablet/desktop
- [ ] Analytics tracking configured
- [ ] Error handling implemented
- [ ] Performance optimized (< 2s load time)
- [ ] Cross-browser compatibility tested

## Deployment Options

### Option 1: Vercel (Recommended)

**Steps:**

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
npm run build
vercel --prod
```

4. Configure custom domain (optional):
   - Go to Vercel dashboard
   - Navigate to your project
   - Add custom domain in Settings

**Environment Variables:**
- None required for basic deployment
- Add Google Analytics ID if needed

### Option 2: Netlify

**Steps:**

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Login:
```bash
netlify login
```

3. Deploy:
```bash
npm run build
netlify deploy --prod --dir=dist
```

4. Configure:
   - Set build command: `npm run build`
   - Set publish directory: `dist`

### Option 3: GitHub Pages

**Steps:**

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/opportunity-calculator",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. Update `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/opportunity-calculator/',
  plugins: [react()],
})
```

4. Deploy:
```bash
npm run deploy
```

### Option 4: Traditional Hosting (cPanel, etc.)

**Steps:**

1. Build the project:
```bash
npm run build
```

2. Upload the `dist` folder contents to your web server

3. Configure `.htaccess` for React Router (if needed):
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## Post-Deployment

### 1. Configure Google Analytics

Add to `index.html` before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 2. Test Production Build

Visit these URLs and verify:
- [ ] Main calculator loads
- [ ] All inputs work correctly
- [ ] Validation shows errors
- [ ] Calculate button works
- [ ] Results animate properly
- [ ] Chart displays correctly
- [ ] CTA button scrolls to registration
- [ ] Reset button works
- [ ] Mobile responsive
- [ ] No console errors

### 3. Performance Testing

Use these tools:
- **Google PageSpeed Insights**: https://pagespeed.web.dev/
- **GTmetrix**: https://gtmetrix.com/
- **WebPageTest**: https://www.webpagetest.org/

Target Scores:
- Performance: >90
- Accessibility: >95
- Best Practices: >90
- SEO: >90

### 4. Browser Testing

Test on:
- [ ] Chrome (Windows/Mac/Android)
- [ ] Safari (Mac/iOS)
- [ ] Firefox (Windows/Mac)
- [ ] Edge (Windows)

### 5. Mobile Testing

Test on actual devices:
- [ ] iPhone (Safari)
- [ ] Android (Chrome)
- [ ] Tablet (iPad)

Check:
- [ ] Touch targets are 48px minimum
- [ ] No iOS zoom on input focus
- [ ] Smooth scrolling
- [ ] Animations perform well

## Monitoring Setup

### 1. Error Tracking (Sentry)

```bash
npm install @sentry/react
```

In `src/main.tsx`:
```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
});
```

### 2. Analytics Dashboard

Track these metrics:
- Calculator views
- Completion rate
- CTA click-through rate
- Average time on page
- Bounce rate
- Device breakdown

### 3. A/B Testing (Optional)

Test variations of:
- CTA button color (green vs orange)
- Headline copy
- Results presentation order
- Chart vs no chart

## Optimization Tips

### 1. Image Optimization

If you add images:
```bash
npm install vite-plugin-imagemin
```

### 2. Code Splitting

Already configured in Vite. Verify chunks in build output.

### 3. Caching

Add to `.htaccess`:
```apache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>
```

### 4. Gzip Compression

Most hosting providers enable this by default. Verify with:
```bash
curl -H "Accept-Encoding: gzip" -I https://yoursite.com
```

## Troubleshooting

### Issue: White screen after deployment

**Solution:**
1. Check browser console for errors
2. Verify all files uploaded correctly
3. Check base URL in `vite.config.ts`
4. Clear browser cache

### Issue: Charts not showing

**Solution:**
1. Verify Recharts is in dependencies (not devDependencies)
2. Check for JavaScript errors in console
3. Test on different browsers

### Issue: Animations laggy on mobile

**Solution:**
1. Reduce animation duration
2. Use CSS transforms instead of position
3. Test on actual devices, not just emulators

### Issue: Analytics not tracking

**Solution:**
1. Verify Google Analytics script is in `index.html`
2. Check GA tracking ID is correct
3. Test in incognito/private mode
4. Use GA Debugger Chrome extension

## Maintenance

### Weekly
- [ ] Check error logs
- [ ] Review analytics data
- [ ] Test calculator functionality
- [ ] Check mobile responsiveness

### Monthly
- [ ] Update dependencies: `npm update`
- [ ] Review and optimize performance
- [ ] A/B test new variations
- [ ] Analyze conversion data

### Quarterly
- [ ] Major dependency updates: `npm audit`
- [ ] Design refresh (if needed)
- [ ] Update calculation assumptions
- [ ] User feedback implementation

## Security

### Content Security Policy

Add to `index.html`:
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self' https://www.google-analytics.com;">
```

### HTTPS

Always use HTTPS in production. Most modern hosting providers provide free SSL certificates.

## Backup

### Automated Backups

If using Vercel/Netlify:
- Deployments are automatically versioned
- Can rollback to any previous version instantly

If using traditional hosting:
- Set up daily automated backups
- Store backups off-site
- Test restore process regularly

## Support

For issues or questions:
1. Check this deployment guide
2. Review the main README.md
3. Check GitHub issues (if applicable)
4. Contact development team

---

**Last Updated:** October 2025
**Version:** 1.0.0

