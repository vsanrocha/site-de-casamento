This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, set up your environment variables:

1. Create a `.env.local` file in the project root with the following content:
```
NEXT_PUBLIC_SUPABASE_URL=https://vcdoxemmyjnbhtzwxply.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

2. Replace `your-anon-key` with the anon key from your Supabase project settings.

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Supabase Setup

This project uses [Supabase](https://supabase.com/) as the backend database. The project is connected to a remote Supabase instance with reference ID `vcdoxemmyjnbhtzwxply`.

### Working with Supabase

- **Generate TypeScript Types**: To generate TypeScript types from the Supabase schema, run:
  ```bash
  npx supabase gen types typescript --project-id vcdoxemmyjnbhtzwxply --schema public > types/supabase.ts
  ```

- **Pull Database Schema**: To pull the latest database schema from the remote Supabase instance, run:
  ```bash
  npx supabase db pull -p your-db-password
  ```

- **Create New Migration**: To create a new migration file, run:
  ```bash
  npx supabase migration new migration_name
  ```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
