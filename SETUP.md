# Setup Guide - Kovil Community Website

This guide will help you set up the Kovil Community website locally and deploy it.

## Prerequisites

Before starting, ensure you have:

1. **Node.js 18+** - [Download here](https://nodejs.org/)
2. **npm** (comes with Node.js) or alternative like yarn/pnpm
3. **PostgreSQL 12+** - [Download here](https://www.postgresql.org/download/)
4. **Git** - [Download here](https://git-scm.com/)

## Step 1: Clone/Setup the Project

```bash
# Navigate to project directory
cd kovil-community
```

## Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Prisma ORM
- And other dependencies listed in `package.json`

## Step 3: Set Up PostgreSQL Database

### Option A: Local PostgreSQL Installation

1. **Create a database**
   ```bash
   # On Windows (Command Prompt)
   psql -U postgres
   CREATE DATABASE kovil_community;
   \q
   ```

   ```bash
   # On macOS/Linux (Terminal)
   sudo -u postgres createdb kovil_community
   ```

2. **Get your connection string**
   ```
   postgresql://postgres:YOUR_PASSWORD@localhost:5432/kovil_community
   ```

### Option B: Cloud Database (Recommended for Deployment)

Use one of these services:
- **Supabase** - https://supabase.com/ (PostgreSQL hosting)
- **Railway** - https://railway.app/ (PostgreSQL hosting)
- **Heroku Postgres** - https://www.heroku.com/postgres

## Step 4: Configure Environment Variables

1. **Copy the example file**
   ```bash
   cp .env.example .env.local
   ```

2. **Edit `.env.local`** and update with your values:
   ```bash
   # Linux/macOS
   nano .env.local

   # Windows
   notepad .env.local
   ```

3. **Set the DATABASE_URL**
   ```env
   DATABASE_URL=postgresql://postgres:your_password@localhost:5432/kovil_community
   JWT_SECRET=change-this-to-a-random-string-at-least-32-characters
   NODE_ENV=development
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

## Step 5: Set Up Database Schema

1. **Generate Prisma Client**
   ```bash
   npm run prisma:generate
   ```

2. **Apply migrations (creates tables)**
   ```bash
   npm run prisma:push
   ```

3. **Verify with Prisma Studio** (optional)
   ```bash
   npm run prisma:studio
   ```
   This opens a visual database manager at http://localhost:5555

## Step 6: Run Development Server

```bash
npm run dev
```

The server will start at [http://localhost:3000](http://localhost:3000)

Open the URL in your browser and you should see the Kovil Community homepage!

## Step 7: Test Authentication

1. **Go to Register**: [http://localhost:3000/register](http://localhost:3000/register)
2. **Create an account** with your details
3. **Login** with your credentials
4. **See the difference** between guest and member views

## Troubleshooting

### "Can't find module @prisma/client"
```bash
npm run prisma:generate
```

### "Database connection failed"
- Check `DATABASE_URL` in `.env.local`
- Ensure PostgreSQL is running
- Verify database name exists

### "Port 3000 already in use"
```bash
# Use a different port
npm run dev -- -p 3001
```

### "TypeScript errors"
```bash
# Clean and rebuild
rm -rf .next
npm run build
```

## Common Commands

```bash
# Development
npm run dev                    # Start development server
npm run lint                   # Run code linter
npm run prisma:studio         # Open database GUI

# Production
npm run build                  # Build for production
npm start                      # Start production server

# Database
npm run prisma:generate        # Generate Prisma client
npm run prisma:push           # Apply schema to database
npm run prisma:migrate        # Create and apply migration
```

## Creating Test Data

1. Go to Prisma Studio:
   ```bash
   npm run prisma:studio
   ```

2. Use the GUI to insert test data:
   - Create users with different roles (MEMBER, ADMIN)
   - Create events, announcements, etc.

Or use the API to create data:

```bash
# Register a new user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test1234",
    "name": "Test User"
  }'
```

## Next Steps

1. **Phase 2**: Build core features (events, announcements, members)
2. **Admin Panel**: Create admin dashboard for management
3. **Customization**: Update temple name, colors, content
4. **Deployment**: Deploy to Vercel or Railway

## Deployment to Vercel

### Recommended: Vercel + Railway Database

1. **Push code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push -u origin main
   ```

2. **Set up Railway PostgreSQL**
   - Go to https://railway.app
   - Create account and project
   - Add PostgreSQL plugin
   - Copy DATABASE_URL

3. **Deploy on Vercel**
   - Go to https://vercel.com
   - Import your GitHub repo
   - Add environment variables:
     - DATABASE_URL (from Railway)
     - JWT_SECRET
     - NEXT_PUBLIC_APP_URL
   - Deploy!

## API Documentation

See `README.md` for API endpoint reference.

## Support

### Common Issues & Solutions

**Database migrations failing?**
- Ensure database exists
- Check PostgreSQL is running
- Try `npm run prisma:db push --skip-generate`

**Authentication not working?**
- Clear browser localStorage
- Check JWT_SECRET is set
- Verify token in browser dev tools (Application > LocalStorage)

**Build errors?**
- Delete node_modules: `rm -rf node_modules`
- Reinstall: `npm install`
- Try: `npm run build`

## Security Notes

⚠️ **IMPORTANT FOR PRODUCTION:**

1. Change JWT_SECRET to a strong random string:
   ```bash
   # Generate random secret
   openssl rand -base64 32
   ```

2. Set NODE_ENV=production in production

3. Use HTTPS only in production

4. Never commit `.env.local` to Git

5. Add additional auth headers/CORS in production

## Performance Tips

1. Use Prisma Studio to analyze slow queries
2. Add database indexes for frequently queried fields
3. Implement caching with Redis (optional)
4. Use CDN for images and static content

---

**Happy building! 🕉️**

If you have issues, check the GitHub issues or contact support at contact@kovilcommunity.com
