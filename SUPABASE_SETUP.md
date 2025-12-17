# Supabase Setup - Make Wishes Public! 🌟

**This takes only 2 minutes and makes ALL wishes visible to EVERYONE!**

## Why Supabase?
- ✅ **100% Free** for small projects
- ✅ **Super Easy** - 2 minute setup
- ✅ **Public Database** - Everyone sees everyone's wishes
- ✅ **Real-time** - New wishes appear instantly
- ✅ **No Credit Card** required

---

## Step-by-Step Setup (2 Minutes):

### Step 1: Create Supabase Account
1. Go to: https://supabase.com
2. Click "Start your project"
3. Sign up with GitHub (easiest) or email
4. Click "New Project"

### Step 2: Create Project
1. **Organization**: Create new or use existing
2. **Name**: `furqan-birthday` (or any name)
3. **Database Password**: Create a strong password (save it!)
4. **Region**: Choose closest to you
5. Click "Create new project"
6. Wait 2 minutes for setup

### Step 3: Create Wishes Table
1. In Supabase dashboard, click "Table Editor" (left menu)
2. Click "Create a new table"
3. **Table name**: `wishes`
4. Click "Save"
5. Click "Add Column" and add these columns:

   - **name** (type: text)
   - **message** (type: text)
   - **image** (type: text)
   - **date** (type: timestamp)
   - **id** (type: text, make it primary key)

6. Click "Save"

### Step 4: Enable Public Access
1. Click "Authentication" → "Policies" (or "Table Editor" → your table → "Policies")
2. Click "New Policy"
3. Select "For full customization"
4. Policy name: `Allow public read and write`
5. **Allowed operation**: SELECT, INSERT
6. **Policy definition**: Leave default (allows all)
7. Click "Review" → "Save policy"

### Step 5: Get Your API Keys
1. Click "Settings" (gear icon) → "API"
2. Find **Project URL** (copy it)
3. Find **anon public** key (copy it)
4. These are your credentials!

### Step 6: Update Your Website
1. Open `script.js` in your project
2. Find these lines (around line 270):
   ```javascript
   const SUPABASE_URL = 'YOUR_SUPABASE_URL';
   const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
   ```
3. Replace with YOUR values from Step 5:
   ```javascript
   const SUPABASE_URL = 'https://xxxxx.supabase.co';
   const SUPABASE_ANON_KEY = 'eyJhbGc...';
   ```
4. Save the file

### Step 7: Deploy & Test! 🎉
1. Deploy your website (Netlify, GitHub Pages, etc.)
2. Submit a wish
3. Open the website on another device/browser
4. **You should see the wish!** ✨

---

## Quick Test:
1. Open browser console (F12)
2. Look for: `✅ Supabase connected - wishes are now PUBLIC!`
3. If you see this, it's working!

---

## Troubleshooting:

**Q: "Supabase table not created yet"**
- Make sure you created the `wishes` table (Step 3)
- Check table name is exactly `wishes`

**Q: "Error saving wish"**
- Check that policies allow INSERT (Step 4)
- Verify your API keys are correct

**Q: Still using localStorage?**
- Check console for Supabase connection message
- Verify SUPABASE_URL and SUPABASE_ANON_KEY are updated

---

## That's It! 🚀

Your wishes are now **PUBLIC** and visible to **EVERYONE**!

Need help? Check Supabase docs: https://supabase.com/docs

