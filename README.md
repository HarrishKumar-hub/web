# Kovil Community Website

A modern community portal for temples, built with Next.js, TypeScript, and PostgreSQL.

## Features

### For Guests
- View public pages (home, about, events, news)
- Browse event calendar
- View announcements
- See public media gallery
- Contact temple via form

### For Members (10-15 users)
- All guest features PLUS:
- Access member directory with profiles
- RSVP to events
- Make donations
- Comment on announcements
- Create and edit personal profile
- Save language preferences
- Access member-only media

### For Admins
- Full admin panel
- Manage events, announcements, and media
- Manage member profiles and roles
- View donations and generate reports
- Edit temple settings and information

### Multi-Language Support
- English
- Tamil (தமிழ்)

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: PostgreSQL, Prisma ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Tailwind CSS
- **Payments**: Stripe/Razorpay (optional)
- **Media**: Cloudinary (optional)

## Project Structure

```
kovil-community/
├── app/                      # Next.js app directory
│   ├── layout.tsx           # Root layout with AuthProvider
│   ├── page.tsx             # Home page
│   ├── api/
│   │   └── auth/            # Authentication endpoints
│   │       ├── register
│   │       ├── login
│   │       ├── verify
│   │       └── logout
├── components/              # React components
│   ├── layout/              # Layout components (Header, Footer)
│   ├── events/              # Event components
│   ├── announcements/       # Announcement components
│   ├── members/             # Member components
│   ├── media/               # Media gallery components
│   ├── donations/           # Donation components
│   └── common/              # Common UI components
├── lib/                     # Utilities and libraries
│   ├── prisma.ts           # Prisma client
│   ├── jwt.ts              # JWT utilities
│   ├── validators.ts       # Zod schemas
│   ├── translations.ts     # i18n translations
│   └── useAuth.tsx         # Auth hook
├── middleware/              # Middleware
│   └── auth.ts             # Auth middleware
├── prisma/                 # Database
│   └── schema.prisma       # Database schema
├── styles/                 # Global styles
│   └── globals.css         # Tailwind CSS imports
├── public/                 # Static assets
├── .env.example            # Environment variables template
├── tailwind.config.ts      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Dependencies
└── next.config.js          # Next.js configuration
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm/bun
- PostgreSQL database

### Installation

1. **Clone the repository**
   ```bash
   cd kovil-community
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or yarn install / pnpm install / bun install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your configuration:
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/kovil_community
   JWT_SECRET=your-secret-key
   NODE_ENV=development
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npm run prisma:generate

   # Run migrations (creates tables)
   npm run prisma:push

   # Optional: Open Prisma Studio to manage data
   npm run prisma:studio
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Authentication Flow

1. **Registration**: New users sign up and get MEMBER role by default
2. **Login**: Users log in with email/password and receive JWT token
3. **Authentication**: Token stored in localStorage, sent with each request
4. **Authorization**: Different API endpoints check user role (GUEST/MEMBER/ADMIN)
5. **Logout**: Token removed from localStorage

## Database Schema

### Main Tables

- **Users**: User accounts with roles (GUEST/MEMBER/ADMIN)
- **Events**: Temple events and ceremonies
- **EventRSVPs**: User RSVPs for events
- **Announcements**: News and announcements
- **Comments**: Comments on announcements
- **MediaFiles**: Images and videos
- **Donations**: Donation records
- **TempleSettings**: Temple information
- **Translations**: English & Tamil translations

All content tables support bilingual fields (English + Tamil).

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify` - Verify token
- `POST /api/auth/logout` - Logout user

### Events
- `GET /api/events` - List events (filtered by role)
- `POST /api/events` - Create event (admin only)
- `GET /api/events/[id]` - Get event details
- `POST /api/events/[id]/rsvp` - RSVP to event (member only)

### More endpoints coming in Phase 2...

## Role-Based Access Control (RBAC)

### Guest User
- Can view public pages and events
- Cannot RSVP, comment, or donate
- Cannot see member directory

### Member
- Can view all public content
- Can RSVP to events
- Can view member directory
- Can comment on announcements
- Can make donations
- Can edit own profile

### Admin
- Can manage all content
- Can approve/reject members
- Can manage donations
- Can edit temple settings

## Multi-Language Support

The site supports English and Tamil. Language preference is:
1. Saved in user profile if logged in
2. Stored in localStorage if guest
3. Defaults to English

To add a new language, edit `lib/translations.ts`.

## Development

### Running Tests
```bash
npm run test
```

### Building for Production
```bash
npm run build
npm start
```

### Code Quality
```bash
npm run lint
```

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect to Vercel
3. Set environment variables
4. Deploy

### Other Platforms
- Railway (backend + database)
- Supabase (PostgreSQL + hosting)
- Railway + Vercel (separate deployment)

## Future Phases

### Phase 2: Core Features
- Event management
- Announcement publishing
- Member profiles
- Media gallery

### Phase 3: Admin Panel
- Dashboard
- Content management
- Member management
- Analytics

### Phase 4: Payment & Media
- Stripe/Razorpay integration
- Cloudinary image hosting
- Recurring donations

### Phase 5: Polish & Extras
- Email notifications
- Search functionality
- Performance optimization
- Advanced analytics

## Contributing

Contributions are welcome! Please follow these guidelines:
1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues or questions:
- Email: contact@kovilcommunity.com
- Create an issue on GitHub

## Roadmap

- [ ] Phase 1: Foundation ✅
- [ ] Phase 2: Core Features ✅
- [ ] Phase 3: Admin Panel ✅
- [ ] Phase 4: Payment & Media ✅
- [ ] Phase 5: Polish & Extras ✅
- [ ] Phase 6: Launch & Maintenance ✅

---

**Built with ❤️ for community building**
