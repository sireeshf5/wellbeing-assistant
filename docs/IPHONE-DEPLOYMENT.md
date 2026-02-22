# iPhone Deployment Guide

Complete guide to deploy and test the Wellbeing Assistant app on your iPhone from Windows.

## 🎯 Overview

Since you're developing on Windows but need to test on iPhone, you have several options. This guide covers all methods from easiest to most involved.

---

## ⚡ Option 1: EAS Build (Recommended - No Mac Needed!)

Expo Application Services (EAS) can build iOS apps in the cloud without needing a Mac.

### Prerequisites
- Apple Developer Account (Free or Paid)
- GitHub account (already set up ✅)
- npm installed on Windows (already set up ✅)

### Step 1: Install EAS CLI

```bash
cd wellbeing-assistant
npm install -g eas-cli
```

### Step 2: Login to Expo

```bash
eas login
```

Create a free Expo account if you don't have one.

### Step 3: Configure Project for EAS

Create `eas.json` in your project root:

```json
{
  "cli": {
    "version": ">= 5.2.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "ios": {
        "resourceClass": "m-medium"
      }
    },
    "preview": {
      "distribution": "internal",
      "ios": {
        "simulator": false
      }
    },
    "production": {
      "ios": {
        "resourceClass": "m-medium"
      }
    }
  },
  "submit": {
    "production": {}
  }
}
```

### Step 4: Update app.json

Update your `app.json`:

```json
{
  "expo": {
    "name": "Wellbeing Assistant",
    "slug": "wellbeing-assistant",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#007AFF"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.yourname.wellbeingassistant",
      "buildNumber": "1.0.0",
      "infoPlist": {
        "NSHealthShareUsageDescription": "We need access to your health data to track workouts and provide insights.",
        "NSHealthUpdateUsageDescription": "We need permission to save workouts to Apple Health.",
        "NSCameraUsageDescription": "Take photos of your workouts.",
        "NSMicrophoneUsageDescription": "Record voice notes for workouts.",
        "UIBackgroundModes": ["fetch"]
      },
      "entitlements": {
        "com.apple.developer.healthkit": true,
        "com.apple.developer.healthkit.access": [
          "health-records"
        ]
      }
    },
    "plugins": [
      [
        "expo-build-properties",
        {
          "ios": {
            "useFrameworks": "static"
          }
        }
      ]
    ]
  }
}
```

### Step 5: Build for iOS

```bash
# Build for internal distribution (TestFlight or direct install)
eas build --platform ios --profile preview
```

**What happens:**
1. Code is uploaded to EAS servers
2. iOS app is built on cloud Mac
3. You get a download link for the `.ipa` file

### Step 6: Install on iPhone

**Method A: TestFlight (Recommended)**

```bash
# Submit to TestFlight
eas submit --platform ios --latest
```

Then:
1. Open TestFlight app on iPhone
2. Install "Wellbeing Assistant"
3. Launch and test!

**Method B: Direct Install**

1. Download `.ipa` file from EAS build
2. Use [Diawi](https://www.diawi.com/) to generate install link
3. Open link on iPhone Safari
4. Install the app

---

## 🖥️ Option 2: Cloud Mac Service

Use a remote Mac to build and deploy.

### Services:
- **MacStadium** ($79/month) - Full Mac rental
- **MacinCloud** ($30/month) - Mac by the hour
- **GitHub Actions** (Free) - Automated builds

### GitHub Actions Method (Free!)

Create `.github/workflows/ios-build.yml`:

```yaml
name: iOS Build

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  build:
    runs-on: macos-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: npm install

      - name: Install CocoaPods
        run: cd ios && pod install

      - name: Build iOS app
        run: |
          cd ios
          xcodebuild -workspace WellbeingAssistantApp.xcworkspace \
                     -scheme WellbeingAssistantApp \
                     -configuration Release \
                     -archivePath build/App.xcarchive \
                     archive

      - name: Upload artifact
        uses: actions/upload-artifact@v3
        with:
          name: ios-build
          path: ios/build/App.xcarchive
```

Then:
1. Push to GitHub
2. GitHub Actions builds on macOS
3. Download `.xcarchive` file
4. Use [fastlane](https://fastlane.tools/) or Xcode to install

---

## 💻 Option 3: Borrow a Mac Temporarily

If you have access to a Mac for a few hours:

### One-Time Setup on Mac

```bash
# Clone your repo
git clone https://github.com/sireeshf5/wellbeing-assistant.git
cd wellbeing-assistant

# Install dependencies
npm install

# Install iOS pods
cd ios
pod install
cd ..
```

### Build and Install

1. Open `ios/WellbeingAssistantApp.xcworkspace` in Xcode
2. Connect your iPhone via USB
3. Select your iPhone as the build target
4. Click "Run" (▶️ button)
5. App installs on your iPhone!

**Pro Tip:** Once installed, you can continue development on Windows. The app stays on your iPhone. Only rebuild when you add new native features.

---

## 📱 Option 4: Use Expo Go (Limited - No HealthKit)

Quick test without HealthKit:

```bash
npm install -g expo-cli
expo start
```

Scan QR code with Expo Go app on iPhone.

**Limitation:** HealthKit won't work in Expo Go. Use for UI testing only.

---

## 🔧 Recommended Workflow

**Best Practice for Windows + iPhone Development:**

1. **Development (Windows):**
   - Code on Windows in VS Code
   - Commit to GitHub regularly
   - Test UI with Android emulator (if needed)

2. **iOS Testing (Cloud):**
   - Use EAS Build once a week
   - Install via TestFlight
   - Test HealthKit, camera, etc.

3. **Iteration:**
   - Fix bugs on Windows
   - Rebuild with EAS when ready
   - Repeat!

---

## 🚀 Quick Start (TL;DR)

**Fastest way to test on your iPhone:**

```bash
# 1. Install EAS
npm install -g eas-cli

# 2. Login
eas login

# 3. Configure (add eas.json as shown above)
# 4. Build
eas build --platform ios --profile preview

# 5. Install via link sent to you
# Done! 🎉
```

---

## 📝 Checklist Before Building

- [ ] Apple Developer Account created
- [ ] `eas.json` configured
- [ ] `app.json` updated with bundle ID
- [ ] All code committed to GitHub
- [ ] EAS CLI installed
- [ ] iPhone connected to same WiFi (for TestFlight)

---

## 🐛 Troubleshooting

### "HealthKit entitlement not found"
- Add HealthKit capability in Apple Developer portal
- Update `app.json` with correct entitlements

### "Bundle ID already exists"
- Change bundle ID in `app.json` to something unique
- Format: `com.yourname.wellbeingassistant`

### "Build failed"
- Check build logs in EAS dashboard
- Usually missing dependencies or config issues
- Google the error message - EAS has great docs!

---

## 💡 Tips

1. **Free Apple ID:** You can use a free Apple Developer account for testing. Paid ($99/year) only needed for App Store.

2. **TestFlight Limit:** Free accounts can have 10,000 testers. More than enough!

3. **Build Time:** EAS builds take 10-20 minutes. Be patient!

4. **Caching:** EAS caches dependencies. Subsequent builds are faster.

5. **Local Testing:** For quick UI changes, use Android emulator on Windows between iOS builds.

---

## 📚 Additional Resources

- [EAS Build Docs](https://docs.expo.dev/build/introduction/)
- [TestFlight Guide](https://developer.apple.com/testflight/)
- [React Native HealthKit](https://github.com/agencyenterprise/react-native-health)
- [Fastlane for iOS](https://fastlane.tools/)

---

## 🎯 Next Steps After Install

Once installed on your iPhone:

1. **Grant Permissions:**
   - Open app → Allow HealthKit access
   - Allow camera & microphone

2. **Test Features:**
   - ✅ HealthKit sync (steps, sleep, heart rate)
   - ✅ Workout logging
   - ✅ Recovery score calculation
   - ✅ AI insights generation

3. **Report Issues:**
   - Take screenshots of bugs
   - Check Xcode logs (if using Mac)
   - Fix on Windows, rebuild

4. **Iterate:**
   - Add features on Windows
   - Test on iPhone weekly
   - Deploy to TestFlight when stable

---

**You're all set!** 🚀

Your app is fully built and ready to test on your iPhone. Choose the method that works best for you (I recommend EAS Build) and get testing!
