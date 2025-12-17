# Email & WhatsApp Notification Setup 📧📱

This guide will help you receive notifications when someone submits a wish!

## Current Setup:
- **WhatsApp Number**: +252612011700 ✅ (Already configured)
- **Email**: You can add your email in `script.js`

---

## Option 1: WhatsApp Notifications (Easiest) 📱

### Automatic WhatsApp (Requires WhatsApp Business API):
1. Go to: https://business.whatsapp.com/
2. Set up WhatsApp Business API
3. Get API credentials
4. Update the code to use the API

### Simple WhatsApp Link (Works Now!):
- When someone submits a wish, a WhatsApp link is generated
- You can manually click it or set up auto-open
- The link includes the wish details

**Current Status**: ✅ WhatsApp link is generated automatically!

---

## Option 2: Email Notifications (Using EmailJS) 📧

### Step 1: Create EmailJS Account (Free)
1. Go to: https://www.emailjs.com/
2. Sign up (free account)
3. Verify your email

### Step 2: Add Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Connect your email account
5. Copy the **Service ID**

### Step 3: Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Template ID: `wish_notification` (or any name)
4. Set up template:

**Subject**: `🎉 New Birthday Wish for Princess Furqan!`

**Content**:
```
Hello!

Someone just sent a birthday wish to Princess Furqan!

From: {{from_name}}
Date: {{date}}

Message:
{{message}}

---
This is an automated notification from the birthday website.
```

5. Click "Save"
6. Copy the **Template ID**

### Step 4: Get Public Key
1. Go to "Account" → "General"
2. Copy your **Public Key**

### Step 5: Update Your Code
1. Open `script.js`
2. Find line with `emailjs.init('YOUR_EMAILJS_PUBLIC_KEY')`
3. Replace with your Public Key
4. Find `send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', emailParams)`
5. Replace with your Service ID and Template ID
6. Update `NOTIFICATION_EMAIL` with your email address

---

## Option 3: Simple Email (Using mailto - No Setup!)

I can also add a simple mailto link that opens your email client. Would you like that?

---

## Current Implementation:

✅ **WhatsApp**: Link is generated automatically
- Format: `https://wa.me/252612011700?text=...`
- Contains: Name, Message, Date

⚠️ **Email**: Requires EmailJS setup (see above)
- Or I can add a simple mailto link

---

## Quick Test:

1. Submit a test wish
2. Check browser console (F12) for notification logs
3. For WhatsApp: The link will be logged (you can click it)
4. For Email: Will work after EmailJS setup

---

## Need Help?

- EmailJS Docs: https://www.emailjs.com/docs/
- WhatsApp API: https://developers.facebook.com/docs/whatsapp

Would you like me to:
1. Set up a simpler email solution (mailto link)?
2. Add auto-open WhatsApp feature?
3. Create a backend API for notifications?

Let me know! 🚀

