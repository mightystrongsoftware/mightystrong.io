---
title: 'Building a Cross-Platform App in One Night with Agentic Engineering'
description: 'How I shipped a Flutter scoreboard app to iOS, Android, Web, and macOS in a single late-night session using AI-assisted development.'
pubDate: 'Dec 31 2025'
heroImage: '../../assets/blog/live-scoring-logo.png'
---

Last night I decided to scratch an itch: build a [simple volleyball scoreboard app](/projects/live-scoring). What started as "two numbers, tap to increment" turned into a cross-platform shipping exercise that revealed both the power of agentic engineering and the surprising complexity hiding in "simple" apps.

By morning, [Live Scoring](https://scoring.netmetrics.cloud) was in review on the App Store, installable as a PWA, and running natively on macOS—all from a single Flutter codebase.

## The Agentic Engineering Approach

Instead of the traditional cycle of research → plan → implement → debug, I worked conversationally with Claude Code throughout the session. The AI handled boilerplate, caught platform-specific gotchas before they became bugs, and suggested patterns I wouldn't have discovered until much later in traditional development.

The result? A shipping app in hours instead of days. But more interestingly, the technical challenges we solved together reveal patterns useful for any cross-platform project.

## The Deceptive Simplicity

A scoreboard app sounds trivial. But real-world requirements quickly compound:

- Installs as a native-feeling app on any device
- Large, easy-to-tap targets for fast-paced games
- Persists game history locally

Each of these spawned technical challenges that would have taken hours to research and debug solo.

## Challenge 1: PWA Install Experience Across Platforms

### The Android Way (Easy)
Chrome on Android automatically prompts users to install PWAs that meet the criteria—512×512 icon, `display: "standalone"` in manifest, valid `start_url`. No custom code needed.

### The iOS Way (Manual)
Safari doesn't support the `beforeinstallprompt` event. Users must manually tap Share → "Add to Home Screen"—a flow most users don't know exists.

**Solution:** A custom install banner that only appears on iOS Safari:

```dart
// Conditional import - loads stub on native, real implementation on web
import '../services/pwa_service.dart'
    if (dart.library.js_interop) '../services/pwa_service_web.dart';
```

The web implementation detects iOS Safari specifically:

```dart
bool isIOSSafariBrowser() {
  final userAgent = html.window.navigator.userAgent;
  final isIOS = userAgent.contains('iPad') ||
                userAgent.contains('iPhone');
  final isSafari = userAgent.contains('Safari') &&
                   !userAgent.contains('CriOS');  // Not Chrome on iOS
  final isStandalone = html.window.matchMedia('(display-mode: standalone)').matches;
  return isIOS && isSafari && !isStandalone;
}
```

The banner slides up, shows the Share icon, and remembers dismissal in localStorage.

## Challenge 2: Platform-Specific Code Without Breaking Native Builds

The `web` package provides browser APIs but crashes iOS/Android builds if imported directly. Dart's conditional imports solve this elegantly:

```dart
// pwa_service.dart (stub for native platforms)
bool isIOSSafariBrowser() => false;
void showIOSInstallBanner() {}

// pwa_service_web.dart (real implementation)
import 'package:web/web.dart' as html;
bool isIOSSafariBrowser() {
  // Actual browser detection...
}
```

The import statement chooses the right file at compile time:

```dart
import 'pwa_service.dart'
    if (dart.library.js_interop) 'pwa_service_web.dart';
```

Native builds get the no-op stub. Web builds get the real implementation. Zero runtime cost.

## Challenge 3: URL Routing for Web

Flutter web defaults to hash-based URLs (`/#/privacy`) which look unprofessional and break some analytics tools. We needed clean paths (`/privacy`) for the privacy policy page.

**Two changes required:**

1. Enable path URL strategy before `runApp()`:

```dart
import 'package:flutter_web_plugins/url_strategy.dart';

void main() {
  usePathUrlStrategy();
  runApp(const MyApp());
}
```

2. Define named routes:

```dart
MaterialApp(
  initialRoute: '/',
  routes: {
    '/': (context) => const HomeScreen(),
    '/privacy': (context) => const PrivacyPolicyScreen(),
  },
)
```

Without `usePathUrlStrategy()`, direct navigation to `/privacy` would redirect to the home screen—a confusing bug that's easy to miss during development.

## Challenge 4: Gesture Layering

The scoreboard needed multiple input methods for accessibility and speed:
- **Tap** to increment (+1)
- **Long press** to decrement (-1)
- **Swipe up** to increment (alternative)
- **Swipe down** to decrement (alternative)

Flutter's `GestureDetector` handles all of these, but velocity thresholds prevent accidental triggers:

```dart
GestureDetector(
  onTap: onScoreTap,
  onLongPress: onScoreLongPress,
  onVerticalDragEnd: (details) {
    if (details.velocity.pixelsPerSecond.dy < -100) {
      onScoreTap();     // Swipe up = increment
    } else if (details.velocity.pixelsPerSecond.dy > 100) {
      onScoreLongPress(); // Swipe down = decrement
    }
  },
  child: // Score display...
)
```

The 100 pixels/second threshold filters out accidental micro-swipes while remaining responsive to intentional gestures.

## Challenge 5: Orientation Locking

Scoreboards need landscape orientation for visibility. Flutter makes this easy—but cleanup matters:

```dart
@override
void initState() {
  super.initState();
  SystemChrome.setPreferredOrientations([
    DeviceOrientation.landscapeLeft,
    DeviceOrientation.landscapeRight,
  ]);
}

@override
void dispose() {
  SystemChrome.setPreferredOrientations([
    DeviceOrientation.portraitUp,
    DeviceOrientation.portraitDown,
    DeviceOrientation.landscapeLeft,
    DeviceOrientation.landscapeRight,
  ]);
  super.dispose();
}
```

Forgetting the `dispose()` cleanup leaves the entire app stuck in landscape after leaving the scoreboard screen.

## Challenge 6: Haptic Feedback That Works

Haptic feedback makes the app feel responsive, but implementation varies:

```dart
onTap: () {
  HapticFeedback.lightImpact();  // Subtle tap
  setState(() => _homeScore++);
},
onLongPress: () {
  HapticFeedback.mediumImpact();  // Stronger feedback for decrement
  setState(() {
    if (_homeScore > 0) _homeScore--;
  });
},
```

`HapticFeedback` works on iOS and Android. On web, it silently no-ops—no conditional code needed.

## Challenge 7: Local Storage Strategy

Game history persists via `shared_preferences`, which abstracts platform differences:
- **iOS/Android:** NSUserDefaults / SharedPreferences
- **Web:** localStorage
- **macOS:** Property lists

Games serialize to JSON for storage:

```dart
class Game {
  Map<String, dynamic> toJson() => {
    'id': id,
    'homeScore': homeScore,
    'awayScore': awayScore,
    'homeName': homeName,
    'awayName': awayName,
    'homeColor': homeColor,
    'awayColor': awayColor,
    'createdAt': createdAt.toIso8601String(),
  };
}
```

No server, no accounts, no sync complexity. Games stay on the device where they were created.  I don't love the idea of having to deserialize a giant chunk of data then enumerate it into an array, but this was quickly available out of the box.  I might research later how to be more efficient doing things like SQLite or CoreData.

## Key Takeaways

1. **PWA behavior differs dramatically between iOS and Android.** Budget time for platform-specific install flows.

2. **Conditional imports are essential for web-specific code.** The `if (dart.library.js_interop)` pattern keeps native builds clean.

3. **URL strategy must be set before `runApp()`.** Late configuration causes subtle routing bugs.

4. **Gesture thresholds prevent frustration.** Raw gesture detection without velocity filtering leads to accidental inputs.

5. **Always clean up system chrome changes.** Orientation locks, status bar styles, and other system UI changes persist across screens if not reset.

6. **Local-first is underrated.** For single-device use cases, `shared_preferences` eliminates entire categories of complexity.

## The Agentic Advantage

What made this a one-night build instead of a one-week build? The AI caught platform-specific issues before I hit them. When I described wanting "a PWA that feels native on iOS," it immediately flagged that Safari doesn't support install prompts and suggested the conditional import pattern.

Traditional development would have meant: build → test on iOS → discover the problem → research solutions → implement → test again. Instead, the solution came bundled with the initial implementation.

This isn't about AI writing all the code—it's about compressing the research-and-discovery phase that dominates most development time.

## The Result

A 16MB iOS app, instant web load, and zero backend infrastructure. Sometimes the best architecture is the simplest one that works across all your target platforms.

---

*[Live Scoring](https://scoring.netmetrics.cloud) is free with no ads. Available on the [App Store](https://apps.apple.com/us/app/live-scoring/id6757214621) (eventually) and as a PWA.*
