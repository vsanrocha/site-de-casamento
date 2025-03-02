# Supabase Migrations

This directory contains SQL migrations for setting up the Supabase database schema and initial data.

## Migration Files

- `20250301204622_initial_schema.sql`: Creates the initial database schema with tables for RSVPs, messages, and gifts
- `20250301204623_add_admin_user.sql`: Adds an admin user (vsrocha) with password 'foobar'

## How to Apply Migrations

### Option 1: Using Supabase CLI (Recommended)

1. Install Supabase CLI if you haven't already:
   ```bash
   npm install -g supabase
   ```

2. Link your project:
   ```bash
   supabase link --project-ref your-project-ref
   ```

3. Apply migrations:
   ```bash
   supabase db push
   ```

### Option 2: Manual Application

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of each migration file
4. Execute them in order (initial_schema first, then add_admin_user)

## Admin User

The migrations create an admin user with the following credentials:
- Email: vsrocha@example.com
- Password: foobar

**Note:** For production, it's recommended to create users through the Supabase dashboard or authentication API with proper security measures.

## Tables Created

1. **rsvps**
   - Stores RSVP confirmations from guests

2. **messages**
   - Stores messages from guests

3. **gifts**
   - Tracks gift reservations

All tables have Row Level Security (RLS) policies that allow:
- Full access to authenticated users (admins)
- Insert-only access to anonymous users (public)
