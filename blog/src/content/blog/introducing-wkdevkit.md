---
title: 'Introducing WKDevKit: Bringing Safari DevTools to iOS Apps'
description: 'Building an in-app debugging toolkit for WKWebView that brings Safari Web Inspector capabilities directly to iOS applications'
pubDate: 'Sep 02 2025'
heroImage: '../../assets/blog/wkdevkit-logo.png'
---

## The Inspiration

While exploring the new [WebView in SwiftUI](https://troz.net/post/2025/swiftui-webview/), I found myself contemplating the debugging challenges that iOS developers face when working with web content. The new SwiftUI WebView is elegant, but what about existing UIKit-based applications that rely on `WKWebView` with `UIViewRepresentable` conformances?

This got me thinking: how far could we push the boundaries of in-app debugging? Could we replicate the Safari Web Inspector experience directly within an iOS application?

## The Challenge

Traditional iOS web debugging requires:
- A Mac with Safari
- A physical connection or network setup
- Developer mode enabled
- Context switching between devices

For many debugging scenarios, especially when testing in the field or with non-technical team members, this setup is impractical. What if we could bring these tools directly into the app?

## Enter WKDevKit

WKDevKit is my attempt to bridge this gap—a lightweight iOS toolkit that implements Safari DevTools features directly within your app. No external connections, no desktop Safari, just immediate debugging capabilities at your fingertips.

## Feature Parity Analysis

After diving deep into `WKWebView`'s capabilities, here's what I discovered we can achieve:

| Safari Tool Feature | Implementation Approach |
|---|---|
| **JavaScript Console** (logs, errors, evaluate JS) | • Inject script overriding `console.log`, `console.warn`, `console.error`<br>• Send messages via `WKScriptMessageHandler`<br>• Use `evaluateJavaScript(_:)` for REPL-like execution |
| **DOM Snapshot** (Tree) | • Recursively walk DOM in JS → serialize to JSON<br>• Decode in Swift → show as tree UI (`DisclosureGroup` in SwiftUI) |
| **localStorage** / **sessionStorage** Viewer | • Run JS: `Object.entries(localStorage)` / `Object.entries(sessionStorage)`<br>• Decode into Swift structs → show in a list |
| **Cookies** (non-HTTPOnly) | • Run JS: `document.cookie` → split into key/value pairs<br>• Modify by assigning `document.cookie = "k=v"` |
| **Storage Editor** (add/edit/remove) | • Provide UI in Swift<br>• Use JS: `localStorage.setItem(key, value)` / `removeItem(key)` |

## Technical Implementation Highlights

### JavaScript Bridge Architecture

The core of WKDevKit relies on bidirectional communication between Swift and JavaScript:

```swift
// Swift side: Setting up message handlers
webView.configuration.userContentController.add(
    self, 
    name: "debugBridge"
)

// JavaScript side: Intercepting console
window.console.log = function() {
    window.webkit.messageHandlers.debugBridge.postMessage({
        type: 'console',
        level: 'log',
        args: Array.from(arguments)
    });
};
```

### DOM Tree Visualization

Creating a read-only DOM inspector required recursive traversal and careful serialization:

```javascript
function serializeDOM(node) {
    return {
        nodeName: node.nodeName,
        attributes: Array.from(node.attributes || []).map(a => ({
            name: a.name,
            value: a.value
        })),
        children: Array.from(node.childNodes).map(serializeDOM)
    };
}
```

### What Works Well

- **Console redirection** is seamless and provides full logging capabilities
- **DOM inspection** gives developers immediate visibility into page structure
- **Storage debugging** helps diagnose persistence issues quickly, future opportunity to update them.
- **JavaScript evaluation** enables powerful runtime debugging
- **WKWebView delegation events** helps you understand all the usages of the WKWebView delegate behaviors.

## Future Roadmap

The next phases of WKDevKit development will focus on:

1. **DOM inspection** DOM inspection experience updates
2. **Performance visualization** with custom timing markers
3. **Console REPL** seems to possible to enable specific javascript execution (for debugging)
4. **SwiftUI integration** for the new WebView API

## Getting Started

If you're interested in trying WKDevKit in your iOS projects:

```swift
import WKDevKit

class ViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let webView = WKWebView()
        let debugKit = WKDevKit(webView: webView)
        
        #if DEBUG
        debugKit.enableDebugging()
        #endif
    }
}
```

## Open Source Contribution

WKDevKit is open source and available on [GitHub](https://github.com/devandanger/WKDevKit). The project welcomes contributions, whether you're interested in:

- Adding new debugging features
- Improving the UI/UX
- Fixing bugs
- Enhancing documentation

## Conclusion

While we can't achieve 100% parity with Safari's Web Inspector due to sandboxing and security constraints, WKDevKit demonstrates that we can bring substantial debugging capabilities directly into iOS apps. For developers working with `WKWebView`, especially in UIKit-based applications, this toolkit offers a practical solution to everyday debugging challenges.

The journey of building WKDevKit has reinforced my belief that developer tools should meet developers where they are—in this case, right on the device where issues occur. Sometimes the best debugging tool is the one that's immediately available when you need it.