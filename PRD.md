Here is the **updated PRD** for your SaaS product based on the latest feedback, pricing changes, and competitive analysis:

---

# 🧾 Product Requirements Document (PRD)

**Product Name:** ProductAd  
**Tagline:** _Create. Influence. Sell. Instantly._  
**Type:** SaaS Web App  
**Tech Stack:** Next.js, Supabase, TailwindCSS, ShadCN UI, Stripe  
**APIs Used:**

- **Image Generation** – OpenAI (DALL·E 3)
- **Voice Synthesis** – ElevenLabs
- **Video Generation & Lip-Sync** – Kling AI

---

## 🎯 Product Overview

ProductAd allows users to generate promotional content for their products using AI. Users upload a product image, write a short description or slogan, describe a scene, and optionally select a pre-generated AI influencer to market the product.

Users can:

- Generate AI-based marketing images
- Use AI influencers in generated video scenes
- Add voiceover or influencer speech (lip-synced)
- Download or re-generate content as needed

---

## 🔄 User Flow

### Step 1: Product Input

- Upload product image
- Add slogan or short product description
- Describe the marketing scene
- Choose an AI Influencer (optional)

### Step 2: Generate Image

- Image is created using OpenAI (DALL·E 3)
- User can download or re-generate

### Step 3: Generate Video (Optional)

- User provides a script
- If influencer selected → lip-sync applied
- If no influencer → voiceover is added
- Video is generated using Kling AI + ElevenLabs
- Final video is downloadable

---

## 💰 Pricing Plans (Monthly Subscriptions)

| Plan        | Users     | Images/mo | Videos/mo | Price      |
| ----------- | --------- | --------- | --------- | ---------- |
| **Plus**    | Unlimited | 5         | 0         | **$14.99** |
| **Pro**     | Unlimited | 10        | 10        | **$24.99** |
| **Pro Max** | Unlimited | 20        | 20        | **$34.99** |

### ⚙️ Add-ons (Post-Plan Limits)

| Item                 | Price |
| -------------------- | ----- |
| Extra Image          | $0.50 |
| Extra Lip-Sync Video | $1.00 |
| Extra Pro-Mode Video | $2.00 |

> _Note: Lip-sync video is the default to reduce cost. Pro Mode video (full scene, better quality) available as upgrade._

---

## 🧾 Cost Breakdown Per Plan (Estimates)

### Plus ($14.99)

- 5 Images × $0.04 = $0.20
- Total Cost ≈ **$0.20**
- **Excellent profit margin**

### Pro ($24.99)

- 10 Images × $0.04 = $0.40
- 10 Lip-sync Videos × $0.14 = $1.40
- Voice generation (10 mins) ≈ $1.00
- Total Cost ≈ **$2.80**
- **Margin: ~$22.19**

### Pro Max ($34.99)

- 20 Images × $0.04 = $0.80
- 20 Lip-sync Videos × $0.14 = $2.80
- Voice generation (20 mins) ≈ $2.00
- Total Cost ≈ **$5.60**
- **Margin: ~$29.39**

> ⚠️ If users upgrade to **Pro Mode Video**:  
> Cost per video jumps to **$0.98**, total = $19.60 (Pro Max) → still profitable but tighter margin.

---

## 🔐 User Roles & Permissions

- **Free User (Non-subscriber):** Can explore, but can't generate content
- **Subscriber (Plus/Pro/Pro Max):** Can generate based on plan limits
- **Admin:** Manage users, influencers, usage reports, payments, content moderation

---

## 📦 Content Management

- **AI Influencers:** Pre-generated with names, styles, personality tags
- **Voice Library:** Re-usable voice profiles via ElevenLabs
- **Scenes/Prompts:** Saved prompt templates for quick re-generation
- **Content History:** User can view/download previous generations

---

## 🔗 Integrations

- **Stripe** – Subscription billing and upgrades
- **Supabase** – Auth, DB, storage (videos/images)
- **OpenAI API** – Image generation
- **Kling AI API** – Video + Lip-sync
- **ElevenLabs API** – Text-to-speech (voiceovers)

---

## 🧪 MVP Scope

- User login/signup (Supabase)
- UI to input product info + description
- Image generation + regeneration
- Video generation via influencer or voiceover
- Content download
- Stripe subscription logic
- Admin dashboard (basic analytics, user view)

---

## 📅 Milestones (MVP Timeline Suggestion)

| Milestone                   | Duration  |
| --------------------------- | --------- |
| UI/UX Design                | 1 week    |
| Image generation flow       | 1 week    |
| Video generation flow       | 1.5 weeks |
| Stripe integration          | 0.5 week  |
| Admin & analytics dashboard | 1 week    |
| Internal testing            | 1 week    |
| Launch (Public Beta)        | —         |

---

Want me to prepare a **pitch deck outline**, **landing page content**, or **demo script** next?
