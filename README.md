# Chat e-Sports

**Enhance your user experience by knowing when matches will happen and chatting with friends about them.**

- Live chat with friends during matches
- User authentication and profiles
- Avatar upload and storage
- Responsive design for all devices

## Tech Stack
| Frontend | Backend | Database | APIs |
|----------|---------|----------|------|
| Next.js 14 + TypeScript | Next.js API Routes | Supabase PostgreSQL | PandaScore |
| Tailwind CSS | Prisma ORM | Supabase Realtime | Supabase Auth |

## Running the Project

This project uses **Supabase** (database + auth) and **PandaScore API**. Both are free for development - just create accounts.

### 1. Clone the Repository
```bash
git clone https://github.com/maarcotulio/Chat_e-Sports.git
cd Chat_e-Sports
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Setup Environment (.env)
Copy `.env.example` to `.env` and fill the values:

#### Supabase Configuration
1. Create account at [supabase.com](https://supabase.com)
2. Create new project/organization
3. Go to **Settings > API** → copy **Project URL** and **anon key**:
```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

4. Go to **Settings > Database** → copy **Direct connection** and **Connection Pooler**:
```env
DATABASE_URL="postgresql://[user]:[YOUR_PASSWORD]@[host]:[port]/[dbname]"
DIRECT_URL="postgresql://[user]:[YOUR_PASSWORD]@[host]:[port]/[dbname]"
```

#### PandaScore API
1. Create account at [pandascore.co](https://pandascore.co)
2. Copy your **Access Token**:
```env
PANDASCORE_TOKEN=your_access_token
```

### 4. Database Setup
```bash
pnpm prisma db push
```

#### Supabase Configuration (Dashboard)
1. **Table Editor**: Enable **RLS** on all tables except `messages`
2. **messages table**: Enable **Realtime**
3. **Storage** → Create bucket `avatar` → Set as **Public**

#### SQL Policies (run in Supabase SQL Editor)
```sql
-- Allow viewing messages
GRANT SELECT ON messages TO anon, authenticated;
```

```sql
-- Avatar bucket policies for authenticated users
CREATE POLICY "Allow authenticated insert on avatar"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'avatar');

CREATE POLICY "Allow authenticated select on avatar" 
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'avatar');

CREATE POLICY "Allow authenticated update on avatar"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'avatar');
```

### 5. Run the Project
```bash
pnpm dev
```

**Access: http://localhost:3000**

[1](https://github.com/othneildrew/Best-README-Template)
[2](https://www.alter-solutions.pt/blog/arquivos-readme)
[3](https://github.com/danielfilh0/fincheck)
