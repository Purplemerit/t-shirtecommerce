# 🚀 PRODUCTION DEPLOYMENT GUIDE
**Faxico E-Commerce Platform**

---

## ✅ PRE-DEPLOYMENT CHECKLIST

### 1. **Environment Configuration** ⚠️ CRITICAL

#### MongoDB Setup
1. Create production MongoDB cluster at [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create database user with strong password
3. Whitelist application server IPs
4. Get connection string and update `MONGODB_URI` in `.env.local`

#### AWS S3 Setup
1. Create S3 bucket for product images
2. Configure bucket policy for public read access
3. Set up CORS configuration:
```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedOrigins": ["https://your-domain.com"],
    "ExposeHeaders": []
  }
]
```
4. Create IAM user with S3 permissions
5. Generate access keys and update `.env.local`

#### Razorpay Setup
1. Complete KYC verification at [Razorpay](https://razorpay.com/)
2. Get LIVE API keys (not test keys!)
3. Update `.env.local` with live keys:
   - `RAZORPAY_KEY_ID=rzp_live_...`
   - `RAZORPAY_KEY_SECRET=...`
   - `NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_...`

#### Admin Credentials
1. **CHANGE DEFAULT ADMIN PASSWORD!**
2. Update in `.env.local`:
```env
ADMIN_EMAIL=your-admin@email.com
ADMIN_PASSWORD=VerySecurePassword123!@#
```

---

### 2. **Code Review & Testing**

#### Run Tests
```bash
npm run build
npm run start
```

#### Test Critical Flows
- [ ] Product browsing
- [ ] Add to cart
- [ ] Checkout with real payment (small amount)
- [ ] Order confirmation
- [ ] Admin product creation
- [ ] Discount code application

---

### 3. **Security Hardening**

#### Update Environment Variables
```env
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

#### Enable Security Headers
Add to `next.config.js`:
```javascript
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ]
  }
}
```

---

### 4. **Performance Optimization**

#### Image Optimization
- All product images should be WebP format
- Maximum size: 500KB per image
- Recommended dimensions: 800x800px

#### Caching Strategy
Add to API routes:
```typescript
export const revalidate = 3600; // Revalidate every hour
```

---

## 🌐 DEPLOYMENT OPTIONS

### Option A: Vercel (Recommended)

#### Steps:
1. Push code to GitHub
2. Connect repository to [Vercel](https://vercel.com/)
3. Add environment variables in Vercel dashboard
4. Deploy!

#### Environment Variables in Vercel:
- Go to Project Settings → Environment Variables
- Add all variables from `.env.local`
- Set for Production environment

#### Custom Domain:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

---

### Option B: AWS / DigitalOcean / Other

#### Requirements:
- Node.js 18+ installed
- PM2 for process management
- Nginx as reverse proxy

#### Setup:
```bash
# Install dependencies
npm install --production

# Build application
npm run build

# Start with PM2
pm2 start npm --name "faxico" -- start
pm2 save
pm2 startup
```

#### Nginx Configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 📧 POST-DEPLOYMENT SETUP

### 1. **Email Notifications** (Optional but Recommended)

Install email service:
```bash
npm install nodemailer
```

Create `/src/lib/email.ts`:
```typescript
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});

export async function sendOrderConfirmation(order: any) {
  await transporter.sendMail({
    from: process.env.FROM_EMAIL,
    to: order.shippingInfo.email,
    subject: `Order Confirmation - ${order.orderId}`,
    html: `
      <h1>Thank you for your order!</h1>
      <p>Order ID: ${order.orderId}</p>
      <p>Total: $${order.amount}</p>
    `
  });
}
```

Update `/src/app/api/verify-payment/route.ts`:
```typescript
import { sendOrderConfirmation } from '@/lib/email';

// After successful payment verification
const order = await Order.findOne({ orderId: razorpay_order_id });
await sendOrderConfirmation(order);
```

---

### 2. **Analytics Setup**

#### Google Analytics
1. Create GA4 property at [Google Analytics](https://analytics.google.com/)
2. Get Measurement ID (G-XXXXXXXXXX)
3. Add to `.env.local`:
```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

4. Add to `src/app/layout.tsx`:
```tsx
import Script from 'next/script';

// In <head>
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
  `}
</Script>
```

---

### 3. **Monitoring & Error Tracking**

#### Sentry Setup
```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

Follow wizard instructions and add DSN to `.env.local`

---

### 4. **SSL Certificate**

#### With Vercel:
- Automatic! Vercel provides free SSL

#### With Custom Server:
```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal
sudo certbot renew --dry-run
```

---

## 🔍 POST-LAUNCH MONITORING

### Week 1 Checklist:
- [ ] Monitor error logs daily
- [ ] Check payment success rate
- [ ] Verify email notifications working
- [ ] Test on multiple devices/browsers
- [ ] Monitor page load times
- [ ] Check database performance

### Ongoing:
- [ ] Weekly backup of database
- [ ] Monthly security updates
- [ ] Quarterly performance review
- [ ] Regular dependency updates

---

## 🆘 TROUBLESHOOTING

### Payment Not Working
1. Check Razorpay dashboard for errors
2. Verify webhook URL is correct
3. Check API keys are LIVE keys
4. Ensure amount is in correct format (cents)

### Images Not Loading
1. Check S3 bucket permissions
2. Verify CORS configuration
3. Check AWS credentials
4. Ensure bucket is public

### Database Connection Issues
1. Verify MongoDB connection string
2. Check IP whitelist
3. Ensure database user has correct permissions
4. Check network connectivity

---

## 📞 SUPPORT RESOURCES

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **MongoDB Atlas**: https://docs.atlas.mongodb.com/
- **Razorpay Docs**: https://razorpay.com/docs/
- **AWS S3 Docs**: https://docs.aws.amazon.com/s3/

---

## ✨ RECOMMENDED ENHANCEMENTS

### Short Term (1-2 weeks):
1. Add email notifications for orders
2. Implement search functionality
3. Add product reviews
4. Set up automated backups

### Medium Term (1-2 months):
1. Add inventory management alerts
2. Implement customer support chat
3. Add order tracking with carrier APIs
4. Build mobile app

### Long Term (3-6 months):
1. AI-powered product recommendations
2. Multi-currency support
3. International shipping
4. Loyalty program

---

**Good luck with your launch! 🚀**

*Last Updated: February 7, 2026*
