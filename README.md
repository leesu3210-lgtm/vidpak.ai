# VidPak AI

A polished prototype for a Pakistan-first AI video creator platform.

## What is implemented in the prototype
- YouTube-style creator feed
- AI Studio UI: text→video, text→image, text→voice, audio→video
- Urdu / Roman Urdu / English / Punjabi / Sindhi choices
- Shorts / YouTube formats
- Creator library using browser localStorage
- Pricing and credit model
- Creator analytics preview
- Responsive desktop/mobile layout
- No fake external API calls and no hard-coded secrets

## Production architecture
Recommended stack:
- Next.js App Router + TypeScript
- Vercel for web/API hosting
- Postgres for users, projects, credits, payments
- Object storage for video/image/audio assets with signed URLs
- Queue/workflow system for long-running generation jobs
- Redis/rate limiting for abuse protection
- AI provider adapters so the platform can switch models without rewriting the app

### AI provider roles
1. LLM: script, storyboard, titles, captions, SEO metadata.
2. Image generation: thumbnails and scene images.
3. Video generation: short clips/scenes. Use a low-cost model for Starter and premium models for Pro.
4. TTS: Urdu/English narration.
5. Transcription: captions and audio-to-text.
6. FFmpeg/render worker: combine scenes, voice, captions, music and transitions.

### Critical business rule
Never put provider API keys in browser code. All AI calls must go through server-side routes/queues. Track provider cost per job and block jobs when the user's credit balance is insufficient.

## Suggested launch pricing
- Free: 2 previews/month, watermark.
- Creator: 249 PKR for 15 standard exports.
- Pro: 499 PKR for 35 standard exports.
- A 30 PKR quick-video tier can be introduced only after measuring real provider cost; it should have strict limits on duration, quality and model choice.

## Production payment plan
For Pakistan, design the payment abstraction so local methods such as JazzCash/Easypaisa can be added without coupling the AI job system to a payment provider. Keep card payments as an optional international method if a compliant processor is available to the business.

## Production safety
- User authentication and email verification
- Per-user credit ledger (immutable transaction records)
- Rate limiting and bot protection
- Moderation for prompts and uploaded media
- Signed private asset URLs
- Abuse/fraud controls
- Copyright/report workflow
- Privacy policy, terms, refund policy and AI-content disclosure
- Admin dashboard for jobs, costs, refunds and moderation

## Deployment
The current project is intentionally a static prototype and can be hosted as a static site. The production AI pipeline should be moved to a server-capable Next.js application with background jobs before accepting real payments.
