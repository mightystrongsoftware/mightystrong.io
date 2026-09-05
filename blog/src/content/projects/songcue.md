---
title: 'SongCue'
description: 'Turn Apple Music into a guessing game between friends: pick up to 20 songs, trim each one to its hardest moment, send the challenge over iMessage, and find out who really knows their music.'
category: 'Mobile App'
technologies: ['Swift', 'SwiftUI', 'MusicKit', 'iMessage Extension', 'App Groups']
image: '/assets/img/songcue-screenshot.png'
featured: true
status: 'in-progress'
startDate: 2026-08-29
---

## What is SongCue?

Everyone has a friend who claims they can name any song in two notes. SongCue is a way to find out.

It turns Apple Music into a guessing game. You build a challenge from any songs in the Apple Music catalog, then trim each one down to its hardest moment: a two-second cue from the middle of the bridge, half a second of intro, whatever feels fair (or cruel). Send the challenge over iMessage and see who actually knows their music.

## How it works

### Create

- **Search the full Apple Music catalog** and stack up to 20 songs per challenge.
- **Set each song's cue with a precision trimmer.** Position the snippet window anywhere in the track and adjust its start and end to a tenth of a second.
- **Give every challenge its own name and colour** so your "Surf rock" and "SWIFTIES" rounds don't get mixed up.

### Play

- **Hear a short snippet, then guess the song** with a limited number of replays.
- **Partial credit** for naming the artist or the title, full points for nailing the exact track.
- **A results breakdown made for bragging:** score, exact hits, and how many listens you needed.

### Share

- **Send challenges in iMessage** as rich, tappable cards.
- **Friends jump straight from the message into the game.**
- **Fire your score back** when you beat theirs.

## What it needs from you

SongCue needs an active Apple Music subscription to search the catalog and play snippets. Playback goes through Apple's MusicKit under your own subscription, so there's no separate music licensing and nothing to log in to beyond your Apple ID. Challenges friends send you can still be received and saved without a subscription; you just can't hear them until you have one.

## How it's built

SongCue is a native iOS app written in Swift and SwiftUI, with an iMessage extension for sharing. It runs on iPhone today and works on iPad in a stretched phone layout, with a proper iPad layout on the list of future niceties.

The part I care most about is what it doesn't do. There are no servers and no analytics. Your challenges and your profile live on-device in an App Group shared between the app and the iMessage extension. Apple Music access happens through MusicKit under your own subscription. When you share a challenge, the whole thing travels inside the iMessage payload itself, so there's no backend holding onto your playlists or your scores. If I never see your data, I can't lose it.

## Support

Questions, bug reports, or a challenge that won't open? Email [evan+songcue@mightystrong.io](mailto:evan+songcue@mightystrong.io) and I'll get back to you.

A few things worth checking first:

- **Nothing plays.** SongCue needs an active Apple Music subscription on the device, and the app needs permission to access Apple Music. Both live in Settings.
- **A shared challenge didn't show up.** Make sure SongCue is installed and the challenge was opened from the iMessage card. Challenges arrive through the message itself, so they can't be recovered from any server if the message is deleted.
- **A song won't search.** Only tracks in the Apple Music catalog are available; songs from your personal library that aren't in the catalog won't appear.

## Privacy

SongCue collects nothing. There are no servers and no analytics. Challenges and your profile live on your device, Apple Music access happens through Apple's MusicKit under your own subscription, and shared challenges travel inside the iMessage payload itself. Nothing about you leaves your phone except what you choose to send to a friend. The full [SongCue privacy policy](/privacy/songcue/) has the details.

## Status

SongCue is going through App Store review now. A link will land here once it's live.
