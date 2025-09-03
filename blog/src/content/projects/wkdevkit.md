---
title: 'WKDevKit'
description: 'Lightweight iOS toolkit aiming to bring parity to existing web debugging tools but available in-app for development and debugging purposes.'
category: 'iOS Development'
technologies: ['Swift', 'iOS', 'WKWebView', 'WebKit']
image: '/wkdevkit-logo.png'
featured: true
status: 'in-progress'
startDate: 'Sep 01 2024'
github: 'https://github.com/devandanger/WKDevKit'
---

## Project Overview

WKDevKit is a lightweight iOS toolkit designed to bring web debugging capabilities directly into iOS applications. It provides developers with powerful debugging tools for WKWebView-based applications, offering parity with existing web debugging tools but accessible directly within the app during development.

## Core Features

### In-App Debugging Tools
- **DOM Inspector**: Interactive DOM tree visualization and element inspection
- **Console Logging**: Real-time JavaScript console output within the app
- **Network Monitor**: Track and inspect all network requests and responses
- **Storage Viewer**: Examine localStorage, sessionStorage, and cookies
- **JavaScript Execution**: Execute JavaScript directly in the WKWebView context

### Developer Experience
- **Lightweight Integration**: Minimal overhead with easy drop-in installation
- **Development-Only**: Automatically disabled in production builds
- **Touch-Friendly Interface**: Optimized for on-device debugging
- **No External Dependencies**: Self-contained toolkit with no third-party requirements

## Technical Implementation

### Architecture
Built entirely in Swift, WKDevKit leverages native iOS APIs and WKWebView's debugging capabilities to provide a seamless debugging experience without requiring external tools or connections.

### Key Components
- **WKWebView Extensions**: Enhanced debugging hooks into WebKit
- **Native UI Overlays**: iOS-native debugging interface
- **JavaScript Bridge**: Bidirectional communication between native and web contexts
- **Performance Monitoring**: Real-time metrics without impacting app performance

## Use Cases

### Hybrid App Development
Perfect for iOS applications that heavily rely on WKWebView for content rendering, providing immediate debugging capabilities without Safari Web Inspector.

### Mobile Web Testing
Test and debug web content directly on iOS devices without the need for desktop Safari or remote debugging setup.

### Production Debugging
Quickly diagnose issues in development and staging environments with on-device debugging tools.

## Installation

### Swift Package Manager
```swift
dependencies: [
    .package(url: "https://github.com/devandanger/WKDevKit.git", from: "1.0.0")
]
```

### CocoaPods
```ruby
pod 'WKDevKit'
```

## Getting Started

```swift
import WKDevKit

// Initialize WKDevKit with your WKWebView
let debugger = WKDevKit(webView: myWebView)

// Enable debugging overlay
#if DEBUG
debugger.showDebugOverlay()
#endif
```

## Current Progress

- ✅ DOM viewer implementation
- ✅ Storage inspection capabilities  
- ✅ Basic console logging
- 🔄 Network request monitoring
- 🔄 JavaScript execution interface
- 📋 Performance profiling tools

## Why WKDevKit?

Traditional web debugging on iOS requires connecting to a Mac with Safari Web Inspector, which isn't always practical during mobile development. WKDevKit solves this by bringing essential debugging tools directly to the device, enabling:

- **Immediate Feedback**: Debug issues as they occur without switching contexts
- **Mobile-First Testing**: Test on actual devices in real-world conditions
- **Team Collaboration**: Non-technical team members can help identify issues
- **Rapid Iteration**: Make changes and debug without complex setup

## Community

WKDevKit is open source and welcomes contributions. Whether you're fixing bugs, adding features, or improving documentation, your help is appreciated.

Visit the [GitHub repository](https://github.com/devandanger/WKDevKit) to get involved or report issues.