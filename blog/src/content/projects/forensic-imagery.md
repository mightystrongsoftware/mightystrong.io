---
title: 'Forensic Imagery'
description: 'An iOS app that inspects a photo at the byte level and tells you where it came from and whether it has been touched since capture, including detection of Apple Reference Image and C2PA Content Credentials.'
category: 'Mobile App'
technologies: ['Swift', 'SwiftUI', 'ImageIO', 'PhotoKit', 'C2PA', 'Tuist']
image: '/assets/img/forensic-imagery-icon.png'
featured: true
status: 'in-progress'
startDate: 2026-09-16
---

## What is Forensic Imagery?

Every photo carries a story in its bytes: which camera took it, when, where, and what software has handled it since. Forensic Imagery reads that story and puts it in front of you.

Hand it a single image from the clipboard, Files, Photos, or the camera and it produces a forensic report from the original bytes. Nothing is re-encoded on the way in, so EXIF, XMP, ICC profiles, and the container structure all survive intact. The report headlines any provenance record it finds, then lists heuristic findings ranked by severity, every metadata dictionary the system exposes, the file's hashes, and a byte-level walk of the JPEG, PNG, or HEIF container.

## Why it exists

The main reason this app exists is to demonstrate [Apple Reference Image](https://security.apple.com/blog/apple-reference-image/), Apple's opt-in camera mode that produces a sensor-signed, securely timestamped capture. The pixel data and metadata are signed at the moment of capture, bounded by timestamps from Apple's timestamp service, and sealed with a composite RSA-3072 and ML-DSA-87 signature. Right now it is limited to the main camera on iPhone 18 Pro and iPhone 18 Pro Max.

The catch is that third-party apps can't fully use it yet. The iOS 27 SDK only reports whether a file *contains* Reference Image data. There is no public API to verify the signature, check the photo against Apple's revocation list, or read the on-file signature format. Only the Photos app can do that today.

So the app does what is possible now:

- **Detects Reference Image data** and shows it prominently as a provenance signal.
- **Says plainly that presence was detected but the signature was not verified**, and explains why.
- **Loads the iOS 27 symbol at runtime** so the app still runs on SDKs and devices that lack it.
- **Is structured to upgrade the finding from "present" to "verified"** once Apple ships a verification API.

## What else it does

- **C2PA Content Credentials.** Parses the JUMBF manifest store for claim version, assertion labels, signer certificate names, edit actions, and AI training policies. Detection only, no signature verification. More on what those are [below](#a-primer-on-c2pa-and-jumbf).
- **Tamper heuristics.** Missing camera metadata, editing software recorded, modified after capture, resized since capture, XMP edit history, Adobe namespaces, progressive JPEG re-encodes, Photoshop resource blocks, extension mismatches, and more.
- **Full metadata.** Every ImageIO dictionary (EXIF, TIFF, GPS, IPTC, Apple maker notes), a parsed XMP summary, and the raw XMP packet, with per-tag copy.
- **Location.** Embedded GPS on a map with altitude, accuracy, and an Open in Maps link.
- **Integrity.** SHA-256, MD5, file size, and magic bytes.
- **Container structure.** JPEG segments, PNG chunks, and HEIF boxes, including JUMBF detection.
- **Export.** Share the whole report as plain text.

## A primer on C2PA and JUMBF

Apple Reference Image is one answer to "where did this photo come from?" The industry-wide answer is [C2PA](https://c2pa.org/), the Coalition for Content Provenance and Authenticity. It's a standards body backed by Adobe, Microsoft, Google, the BBC, camera makers like Leica and Nikon, and a long list of others, and it publishes an [open specification](https://spec.c2pa.org/specifications/) for attaching a tamper-evident history to a piece of media.

The consumer-facing name for that history is [Content Credentials](https://contentcredentials.org/). Think of it as a nutrition label for an image. A Content Credential is a **manifest**: a bundle of signed **claims** and **assertions** that say things like which device or app created the file, what edits were made and by what tool, whether generative AI was involved, and whether the creator allows the image to be used for AI training. Each manifest is signed with a certificate, and every subsequent edit can add a new manifest that references the previous one, so the file carries a chain of custody. If you have a file with credentials in it, the [Content Credentials verify tool](https://contentcredentials.org/verify) will show you the chain.

Manifests have to live somewhere inside the file, and that's where **JUMBF** comes in. JUMBF is the JPEG Universal Metadata Box Format, Part 5 of the [JPEG Systems](https://jpeg.org/jpegsystems/) family of standards (ISO/IEC 19566-5). It's a generic container for stuffing structured metadata into JPEG, PNG, HEIF, and other formats without disturbing the image data. C2PA [uses JUMBF as its envelope](https://spec.c2pa.org/specifications/specifications/2.2/specs/C2PA_Specification.html#_use_of_jumbf): the manifest store is a JUMBF superbox, holding boxes for the claim, its signature, and the assertions, embedded as an APP11 segment in a JPEG, a `caBX` chunk in a PNG, or a `jumb` box in HEIF. That's why the container walk in this app flags JUMBF when it sees it. Finding the box is the first step to finding the credentials.

What Forensic Imagery does today is read that structure and surface it: the claim version, the labels of each assertion, the signer's certificate name, the recorded edit actions, and any AI training policy. What it does not do is verify the signature or walk the certificate chain back to a trusted root. That's a real cryptographic check with trust-list and revocation questions attached, and it's better handled by the open-source [c2pa-rs](https://github.com/contentauth/c2pa-rs) library from the Content Authenticity Initiative than by something I'd hand-roll in Swift. Detection tells you a credential is present. Verification tells you whether to believe it. The app is honest about which one it's giving you.

## Image sources

- **Clipboard.** Watches the pasteboard and auto-opens a freshly copied image when you return to the app, using the system paste button so there's no "Allow Paste" banner.
- **Files.** Document picker, plus Open In and share-sheet hand-off for JPEG, PNG, HEIC, TIFF, and RAW.
- **Photos.** Standard photo picker. Only the chosen image is shared with the app.
- **Camera.** Direct capture.

## How it's built

Forensic Imagery is a native iOS app written in Swift and SwiftUI, targeting iOS 17 and later on iPhone and iPad. The Xcode project is generated with Tuist, so a single Swift file is the source of truth for targets, settings, and the Info.plist.

Like SongCue, it has no servers and no analytics. Analysis happens entirely on-device, and the only thing that leaves your phone is a report you choose to share.

## Status

Forensic Imagery is in active development. Apple Reference Image detection needs the iOS 27 Photos framework at runtime and an iPhone 18 Pro capture to trigger, so the provenance side is waiting on hardware and on Apple's verification API. Everything else works today.
