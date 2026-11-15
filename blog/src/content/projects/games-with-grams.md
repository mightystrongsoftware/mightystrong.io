---
title: 'Games with Grams'
description: 'A turn-based word game for iPhone and iPad built for playing with family: take your turn when you have a minute, chat right on the board, and team up for a shared score when competing with Grandma feels wrong.'
category: 'Mobile App'
technologies: ['Swift', 'SwiftUI', 'SpriteKit', 'Game Center', 'Firebase']
image: '/assets/img/games-with-grams-icon.png'
featured: false
status: 'in-progress'
startDate: 2025-11-15
---

## What is Games with Grams?

Games with Grams is a word game for the people you'd actually like to hear from more often. You place tiles on a 15×15 board, score points for the words you build, and pass the turn. Nobody has to be online at the same time: you play your word when you have a minute, and your opponent gets a notification that it's their move.

The crossword-style core is familiar on purpose. The part I care about is everything around it, which is built for a grandparent and a grandchild playing across a few time zones rather than two strangers racing a clock.

## How it works

### Play

- **Turn-based matches over Game Center.** Invite a Game Center friend, play your word, and come back when it's your turn again.
- **Feedback while you place tiles.** The board checks your word and shows the score as you build it, so there's no guessing whether a move counts.
- **Every game in one list.** Home shows whose turn it is in each match so nothing gets forgotten.

### Three ways to play

- **Standard.** Classic head-to-head for two players.
- **Collaborative.** Both players build toward one combined score. Good for anyone who would rather team up than win.
- **Multiplayer.** Two to four players taking turns in rotation.

### Chat

- **Chat right on the board** with the person you're playing, without leaving the game.
- **Moves show up in the conversation** as they happen: the word played and what it scored.
- **Emoji reactions** for the plays that deserve one.

## What it needs from you

Games with Grams runs on iPhone and iPad and needs a Game Center account, which is how you sign in and find the people you play with. Turn notifications are optional but make the game a lot easier to keep going.

## Support

Questions, bug reports, or a game that seems stuck? Email [evan+gameswithgrams@mightystrong.io](mailto:evan+gameswithgrams@mightystrong.io) and I'll get back to you.

A few things worth checking first:

- **You can't sign in or start a game.** The app signs in through Game Center. Check that you're signed in under Settings > Game Center on the device.
- **You can't find someone to invite.** Invitations go through Game Center, so the other person needs the app installed and a Game Center account of their own, and it helps to be Game Center friends first.
- **You aren't getting "your turn" notifications.** Make sure notifications are allowed for the app in Settings > Notifications.
- **A word was rejected.** Words are checked against a standard tournament-style word list. Proper nouns, abbreviations, and some very new words aren't in it.
- **You want your data deleted.** Email the address above from any address and include your Game Center display name. I'll remove your profile and chat messages from the game's servers.

## Privacy

Games with Grams has no ads, no analytics, and no tracking. To make turn-based play and chat work, it stores a small profile (your Game Center display name and player ID, your in-app preferences, and a push notification token), plus the chat messages, reactions, and move summaries you exchange with the people you play. Matches themselves run through Apple's Game Center. The full [Games with Grams privacy policy](/privacy/games-with-grams/) has the details.

## Status

Games with Grams is in development and not yet on the App Store.
