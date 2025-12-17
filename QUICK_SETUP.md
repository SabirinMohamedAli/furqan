# Quick Setup - Make Wishes Public! 🚀

## The Problem:
Right now, wishes are stored in localStorage, so each person only sees their own wishes. **Boring!** 😴

## The Solution:
Use Firebase to make ALL wishes public so everyone can see everyone's wishes! 🎉

---

## 5-Minute Setup:

### 1. Go to Firebase
Visit: https://console.firebase.google.com/
- Sign in with Google
- Click "Add Project" or "Get Started"

### 2. Create Project
- Name: `furqan-birthday` (or any name)
- Click "Continue" → Skip Analytics → "Create project"

### 3. Enable Database
- Click "Realtime Database" in left menu
- Click "Create Database"
- Choose location → "Next"
- **Select "Start in test mode"** → "Enable"

### 4. Get Your Config
- Click ⚙️ (gear icon) → "Project settings"
- Scroll to "Your apps" → Click `</>` (Web icon)
- App name: `Furqan Birthday` → "Register app"
- **Copy the `firebaseConfig` code**

### 5. Update Your Code
1. Open `script.js`
2. Find `firebaseConfig` (around line 270)
3. Replace with YOUR config from step 4
4. Save!

### 6. Set Database Rules
- Go to "Realtime Database" → "Rules" tab
- Replace with:
```json
{
  "rules": {
    "wishes": {
      ".read": true,
      ".write": true
    }
  }
}
```
- Click "Publish"

### 7. Done! 🎉
- Deploy your website
- Everyone can now see all wishes!

---

## Test It:
1. Submit a wish on your computer
2. Open the website on your phone
3. You should see the wish! ✨

---

## Need Help?
See `FIREBASE_SETUP.md` for detailed instructions with screenshots.

