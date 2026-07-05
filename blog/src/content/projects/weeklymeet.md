---
title: 'WeeklyMeet'
description: 'A When2Meet for a recurring week: share one password-protected link, everyone paints their typical Monday-Sunday availability, and the group instantly sees where the overlap is.'
category: 'Web App'
technologies: ['Next.js', 'TypeScript', 'Supabase', 'Postgres', 'Vercel']
link: 'https://weeklymeet.toolbelts.dev'
image: '/assets/img/weeklymeet-logo.png'
featured: true
status: 'completed'
startDate: 2026-06-29
---

## What is WeeklyMeet?

Scheduling tools are great at answering "what day works for this one meeting?" They're terrible at a question that comes up far more often: "when are we usually all free?"

Think of a study group deciding on a weekly session, a band booking rehearsals, a remote team looking for standing overlap hours, or a club planning recurring practices. You don't want a specific Tuesday. You want to understand everyone's typical week.

WeeklyMeet is a When2Meet for a recurring week. You create one link, share it with your group, and everyone paints their typical availability onto a shared Monday through Sunday grid. Then the group instantly sees where everyone overlaps. No accounts, no app to install, just a link.

## How it works

1. **Create a link.** Give it a title and a password, pick your visible hours (default 6 AM to midnight), and you get a short shareable URL.
2. **Share it.** Send the link and password to your group. Copy it, or on mobile, use the native share sheet to fire it straight into Messages or email.
3. **Everyone paints their week.** Each person types a name and drags across the grid to mark time as Available (green), Maybe (amber, meaning free but not ideal), or Blocked (red). It's a familiar traffic-light system, and it works with touch.
4. **See the overlap.** Flip to the Overlap view for a heatmap where the greener a slot, the more people are free. Or open Best Times for an automatically ranked list of the top windows where the most people overlap, with adjacent half-hours merged into clean ranges like "Monday 9:00-10:30 · 4/5 available."

## The details that make it nice to use

- **Mobile-first grid.** On desktop you see all seven days; on a phone you swipe day by day, so the grid never feels cramped.
- **Maybe matters.** The amber "Maybe" tier is weighted at half in the heatmap and rankings, so "if I have to" time is visible but doesn't outrank a true green.
- **Hide the hours you don't need.** Skip overnight entirely; only the hours you care about ever render.
- **Private by default.** Every link is password-protected, and passwords are hashed. The raw data is never exposed to the browser.
- **Self-cleaning.** Links automatically expire and delete after 30 days, so nothing lingers.

## How it's built

WeeklyMeet is a Next.js app on Vercel, backed by Supabase Postgres.

The interesting part is the security model. Instead of exposing database tables to the browser, every table is fully locked down, and all reads and writes go through password-checked Postgres functions. The browser only ever holds a public key; the room password is verified server-side on every single request, and unlocking a room never leaks anything to someone without it. Rooms even expire lazily and get swept up by a scheduled cleanup job, so expired links are dead instantly and gone entirely within a day.

The whole thing runs on a two-layer design token setup (raw palette, then semantic roles) that keeps the UI consistent, and ships with the full production checklist: a custom domain with HTTPS, social share previews, structured data, search-engine hygiene that keeps private links out of Google, and analytics.

## Try it

WeeklyMeet is free and takes about ten seconds to start. Make a link, send it to your group, and find the time that actually works, every week.

[weeklymeet.toolbelts.dev](https://weeklymeet.toolbelts.dev)
