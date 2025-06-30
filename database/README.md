# Database Setup

This project uses **Drizzle ORM** with **Neon PostgreSQL** for database management.

## Quick Start

### Development
```bash
# Generate migrations from schema changes
pnpm db:generate

# Apply migrations to database
pnpm db:migrate

# Open Drizzle Studio (database GUI)
pnpm db:studio

# Push schema directly to database (for prototyping)
pnpm db:push
```

#### Accessing Drizzle Studio Remotely

If you're working on a remote machine via SSH, Drizzle Studio runs on `localhost:4983` of the remote machine. To access it from your local browser, you need SSH port forwarding:

**Method 1: SSH Tunnel (Recommended)**
```bash
# On your local machine, open a new terminal:
ssh -L 4983:localhost:4983 username@your-remote-machine
```

Then open `http://localhost:4983` in your local browser.

**Method 2: Add to SSH Config**
Edit `~/.ssh/config` on your local machine:
```
Host your-remote-machine
    HostName your.remote.ip.address
    User your-username
    LocalForward 4983 localhost:4983
```

**What this does**: Creates a secure encrypted tunnel that forwards port 4983 from your local machine to the remote machine's port 4983, allowing you to access Drizzle Studio as if it were running locally.

### Production
Migrations run automatically during the build process via the `scripts/migrate.js` script.

## Schema Management

- **Schema Definition**: `src/lib/db/schema.ts`
- **Database Connection**: `src/lib/db/index.ts`
- **Migrations**: `database/migrations/`
- **Legacy Schema**: `database/schema.sql` (kept for reference)

## Environment Variables

Ensure `NEON_DATABASE_URL` is set in your environment:

```bash
NEON_DATABASE_URL="postgresql://username:password@host/database?sslmode=require"
```

### Setting up Environment Variables in Vercel

1. **Via Vercel Dashboard**:
   - Go to your project dashboard on [vercel.com](https://vercel.com)
   - Navigate to **Settings** → **Environment Variables**
   - Add `NEON_DATABASE_URL` with your database connection string
   - Select the appropriate environments (Production, Preview, Development)
   - Click **Save**

2. **Via Vercel CLI**:
   ```bash
   # Add environment variable for all environments
   vercel env add NEON_DATABASE_URL
   
   # Add for specific environment only
   vercel env add NEON_DATABASE_URL production
   ```

3. **Important Notes**:
   - Environment variables are available during both **build time** and **runtime**
   - Changes require a new deployment to take effect
   - For security, never commit your actual database URL to version control

### Local Development
Create a `.env` file in your project root:
```bash
NEON_DATABASE_URL="your_neon_database_url_here"
NEXT_PUBLIC_VENMO_USERNAME="your_venmo_username"
```

**Important**: Use `.env` (not `.env.local`) because drizzle-kit only reads `.env` files by default. Next.js will automatically load `.env` files, so this works for both Next.js and drizzle-kit commands.

### Additional Environment Variables

#### Venmo Integration
- **`NEXT_PUBLIC_VENMO_USERNAME`**: Your Venmo username (without @) for donation links
  - Used in the donation modal and support links
  - Example: `siptheowl`
  - Required for Venmo payment functionality

## Current Tables

### beta_signups
- `id` (serial, primary key)
- `email` (varchar, not null)
- `normalized_email` (varchar, unique, not null) 
- `created_at` (timestamp with timezone, default now)
- `ip_address` (inet, optional)
- `user_agent` (text, optional)

## Deployment

The build process automatically runs migrations:
1. `node scripts/migrate.js` - Applies pending migrations
2. `next build` - Builds the application

This ensures the database is always up-to-date in production deployments. 
