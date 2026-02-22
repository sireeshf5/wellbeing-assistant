# Wellbeing Assistant MVP - User Stories

## Overview
This document contains comprehensive user stories for the Wellbeing Assistant iOS app MVP. Stories are organized by implementation phase and prioritized for MVP delivery.

**Priority Levels:**
- **P0**: Must-have for MVP launch
- **P1**: Important for MVP, can be delayed if needed
- **P2**: Nice-to-have, post-MVP consideration

**Effort Estimates:**
- **S (Small)**: 1-2 days
- **M (Medium)**: 3-5 days
- **L (Large)**: 1-2 weeks

---

## Phase 1: Core Infrastructure & HealthKit Integration

### US-001: Initial App Setup and Onboarding
**As a** new user
**I want** to complete a simple onboarding flow when I first launch the app
**So that** I understand what the app does and can get started quickly

**Acceptance Criteria:**
- **Given** I am launching the app for the first time
- **When** the app opens
- **Then** I see a welcome screen explaining the app's purpose and key features
- **And** I can swipe through 3-4 onboarding screens highlighting privacy, offline functionality, and AI insights
- **And** I see a "Get Started" button that takes me to the permissions screen

**Priority:** P0
**Effort:** S

---

### US-002: HealthKit Permission Request
**As a** user
**I want** to grant the app access to my Apple Health data
**So that** the app can provide personalized insights based on my health metrics

**Acceptance Criteria:**
- **Given** I have completed the initial onboarding
- **When** I tap "Get Started" or navigate to permissions
- **Then** I see a clear explanation of why HealthKit access is needed
- **And** I can tap "Allow Access" to trigger the iOS HealthKit permission dialog
- **And** I can select which health data types to share (workouts, heart rate, sleep, steps, etc.)
- **And** the app gracefully handles both granted and denied permissions
- **And** I can skip this step and grant permissions later from Settings

**Priority:** P0
**Effort:** M

---

### US-003: Camera Permission for Workout Photos
**As a** user
**I want** to grant camera access to the app
**So that** I can capture photos of my workouts or form checks

**Acceptance Criteria:**
- **Given** I am on the permissions screen or attempting to use the camera for the first time
- **When** I tap to enable camera access
- **Then** I see a clear explanation of how camera access will be used
- **And** the iOS camera permission dialog appears
- **And** the app handles both granted and denied states appropriately
- **And** if denied, I see helpful instructions on how to enable it in Settings

**Priority:** P0
**Effort:** S

---

### US-004: Microphone Permission for Voice Input
**As a** user
**I want** to grant microphone access to the app
**So that** I can log workouts using voice input

**Acceptance Criteria:**
- **Given** I am on the permissions screen or attempting to use voice input for the first time
- **When** I tap to enable microphone access
- **Then** I see a clear explanation of how microphone access will be used (100% offline processing)
- **And** the iOS microphone permission dialog appears
- **And** the app handles both granted and denied states appropriately
- **And** if denied, I see instructions on enabling it in Settings
- **And** I am assured that all voice processing happens on-device

**Priority:** P0
**Effort:** S

---

### US-005: Read HealthKit Workout Data
**As a** user
**I want** the app to read my existing workout data from Apple Health
**So that** I have a complete view of my fitness history

**Acceptance Criteria:**
- **Given** I have granted HealthKit permissions
- **When** the app syncs with HealthKit
- **Then** I see my recent workouts from Apple Health displayed in the app
- **And** workouts show type, duration, date, and calories burned (if available)
- **And** the sync happens automatically on app launch
- **And** I can manually trigger a sync by pulling to refresh
- **And** the app handles cases where no workout data exists

**Priority:** P0
**Effort:** M

---

### US-006: Read HealthKit Metrics (Heart Rate, Sleep, Steps)
**As a** user
**I want** the app to read my health metrics from Apple Health
**So that** AI insights can consider my overall wellbeing

**Acceptance Criteria:**
- **Given** I have granted HealthKit permissions for specific metrics
- **When** the app syncs with HealthKit
- **Then** I see my recent metrics including:
  - Resting heart rate
  - Heart rate variability (HRV)
  - Sleep duration and quality
  - Daily step count
  - Active energy burned
- **And** metrics are displayed for the last 7-30 days
- **And** missing data is handled gracefully with appropriate messaging
- **And** sync happens automatically and can be manually triggered

**Priority:** P0
**Effort:** M

---

## Phase 2: Workout Logging

### US-007: Log Workout via Text Input
**As a** user
**I want** to log a workout by typing details
**So that** I can quickly record my exercise when I don't want to use voice or photos

**Acceptance Criteria:**
- **Given** I am on the home screen
- **When** I tap the "Log Workout" button and select "Text Input"
- **Then** I see a form with fields for:
  - Workout type (dropdown or searchable list)
  - Duration
  - Date and time
  - Notes/description
  - Intensity level (optional)
- **And** I can save the workout with minimal required fields
- **And** the workout is saved locally on my device
- **And** the workout appears in my workout history immediately
- **And** validation errors are shown clearly

**Priority:** P0
**Effort:** M

---

### US-008: Log Workout via Voice Input
**As a** user
**I want** to log a workout by speaking naturally
**So that** I can quickly record details hands-free while exercising

**Acceptance Criteria:**
- **Given** I have granted microphone permissions
- **When** I tap the "Log Workout" button and select "Voice Input"
- **Then** I see a microphone button and recording indicator
- **And** I can tap to start recording and speak my workout details
- **And** I can say something like "I did a 30-minute run this morning, felt great"
- **And** the app transcribes my speech using on-device processing
- **And** the app extracts workout type, duration, and notes using local AI
- **And** I can review and edit the extracted information before saving
- **And** the workout is saved to my local database
- **And** the entire process happens offline

**Priority:** P0
**Effort:** L

---

### US-009: Log Workout via Image Capture
**As a** user
**I want** to capture a photo when logging a workout
**So that** I can document my form, environment, or visual progress

**Acceptance Criteria:**
- **Given** I have granted camera permissions
- **When** I tap the "Log Workout" button and select "Add Photo"
- **Then** I can either:
  - Take a new photo using the camera
  - Select an existing photo from my photo library
- **And** the photo is saved locally with the workout entry
- **And** I can optionally add text details to accompany the photo
- **And** the photo is compressed appropriately for storage
- **And** I can add multiple photos to a single workout
- **And** photos are stored securely on-device only

**Priority:** P1
**Effort:** M

---

### US-010: Write Workout Back to HealthKit
**As a** user
**I want** workouts I log in the app to sync back to Apple Health
**So that** I have a centralized health record across all my apps

**Acceptance Criteria:**
- **Given** I have granted HealthKit write permissions
- **When** I save a workout in the app
- **Then** the workout is automatically written to HealthKit
- **And** the workout includes type, duration, start/end time, and energy burned (if calculated)
- **And** the workout appears in the Apple Health app
- **And** if HealthKit write permission is denied, I see a notification with option to enable it
- **And** failed syncs are queued and retried

**Priority:** P1
**Effort:** M

---

### US-011: Combined Input Methods for Workout Logging
**As a** user
**I want** to combine text, voice, and photos when logging a workout
**So that** I can capture the most complete record of my session

**Acceptance Criteria:**
- **Given** I am logging a new workout
- **When** I access the workout logging screen
- **Then** I can add information via:
  - Text input fields
  - Voice recording and transcription
  - Photos from camera or library
- **And** all three input methods work together in a single workout entry
- **And** I can switch between input methods seamlessly
- **And** all data is saved together as one workout record
- **And** I can preview everything before saving

**Priority:** P1
**Effort:** M

---

## Phase 3: Workout Management & History

### US-012: View Workout History
**As a** user
**I want** to see a list of all my logged workouts
**So that** I can track my exercise history over time

**Acceptance Criteria:**
- **Given** I have logged workouts in the app
- **When** I navigate to the "History" or "Workouts" tab
- **Then** I see a chronological list of all workouts (most recent first)
- **And** each workout shows:
  - Type/name
  - Date and time
  - Duration
  - Thumbnail if photo was included
- **And** I can scroll through my workout history
- **And** I can filter by workout type or date range
- **And** I can search for specific workouts

**Priority:** P0
**Effort:** M

---

### US-013: View Workout Details
**As a** user
**I want** to tap on a workout to see full details
**So that** I can review all information about a specific session

**Acceptance Criteria:**
- **Given** I am viewing my workout history
- **When** I tap on a specific workout
- **Then** I see a detail screen showing:
  - Workout type
  - Date and time
  - Duration
  - Intensity level
  - All notes and descriptions
  - All associated photos (full size, swipeable)
  - HealthKit sync status
- **And** I can navigate back to the list
- **And** I can access edit and delete options from this screen

**Priority:** P0
**Effort:** S

---

### US-014: Edit Existing Workout
**As a** user
**I want** to edit a previously logged workout
**So that** I can correct mistakes or add missing information

**Acceptance Criteria:**
- **Given** I am viewing a workout's details
- **When** I tap the "Edit" button
- **Then** I see the workout form pre-populated with existing data
- **And** I can modify any field (type, duration, date, notes, intensity)
- **And** I can add or remove photos
- **And** I can save my changes
- **And** changes are reflected immediately in the workout list
- **And** changes sync to HealthKit if the workout was previously synced
- **And** I can cancel editing without saving changes

**Priority:** P0
**Effort:** M

---

### US-015: Delete Workout
**As a** user
**I want** to delete a workout entry
**So that** I can remove incorrect or duplicate entries

**Acceptance Criteria:**
- **Given** I am viewing a workout's details
- **When** I tap the "Delete" button
- **Then** I see a confirmation dialog warning that this action cannot be undone
- **And** I can confirm or cancel the deletion
- **And** upon confirmation, the workout is deleted from local storage
- **And** the workout is removed from HealthKit (if it was synced)
- **And** associated photos are deleted from local storage
- **And** I am returned to the workout list
- **And** the deleted workout no longer appears

**Priority:** P0
**Effort:** S

---

### US-016: Filter Workouts by Type
**As a** user
**I want** to filter my workout history by type
**So that** I can focus on specific activities (e.g., only running or only strength training)

**Acceptance Criteria:**
- **Given** I am viewing my workout history
- **When** I tap a filter button or dropdown
- **Then** I see a list of all workout types I've logged
- **And** I can select one or more types to filter by
- **And** the workout list updates to show only selected types
- **And** I can clear filters to see all workouts again
- **And** the filter state persists while navigating within the app
- **And** a visual indicator shows when filters are active

**Priority:** P1
**Effort:** S

---

### US-017: Search Workouts
**As a** user
**I want** to search through my workout notes and descriptions
**So that** I can quickly find specific sessions

**Acceptance Criteria:**
- **Given** I am viewing my workout history
- **When** I tap the search bar and enter text
- **Then** the workout list filters to show only workouts matching my search term
- **And** search looks through workout type, notes, and descriptions
- **And** results update in real-time as I type
- **And** I can clear the search to return to the full list
- **And** search is case-insensitive
- **And** I see a "no results" message if no workouts match

**Priority:** P2
**Effort:** S

---

## Phase 4: AI Insights & Recovery Score

### US-018: Calculate Daily Recovery Score
**As a** user
**I want** to see a daily recovery score
**So that** I know how ready my body is for exercise

**Acceptance Criteria:**
- **Given** the app has access to my HealthKit data
- **When** I open the app or navigate to the insights screen
- **Then** I see my recovery score for today (0-100 scale)
- **And** the score is calculated using on-device AI based on:
  - Sleep quality and duration
  - Heart rate variability (HRV)
  - Resting heart rate
  - Recent workout intensity and volume
- **And** I see a simple explanation of what the score means (e.g., "Well Recovered", "Moderate", "Low Recovery")
- **And** the calculation happens entirely offline
- **And** if insufficient data is available, I see a helpful message

**Priority:** P0
**Effort:** L

---

### US-019: View Recovery Score Trend
**As a** user
**I want** to see how my recovery score has changed over time
**So that** I can identify patterns in my recovery

**Acceptance Criteria:**
- **Given** I have multiple days of recovery score data
- **When** I view the recovery section
- **Then** I see a line chart showing my recovery score for the last 7-30 days
- **And** the chart clearly indicates good vs. poor recovery days
- **And** I can tap on a specific day to see the underlying metrics that influenced that score
- **And** the chart updates automatically as new data becomes available

**Priority:** P1
**Effort:** M

---

### US-020: Receive Workout Recommendations Based on Recovery
**As a** user
**I want** to receive AI-powered workout recommendations
**So that** I can train optimally based on my current recovery state

**Acceptance Criteria:**
- **Given** I have a calculated recovery score
- **When** I view the insights or home screen
- **Then** I see personalized workout recommendations such as:
  - "Your recovery is excellent - great day for high-intensity training"
  - "Moderate recovery - consider a light cardio or yoga session"
  - "Low recovery - focus on rest or gentle movement"
- **And** recommendations are generated on-device using local AI
- **And** recommendations consider my recent workout history
- **And** I can dismiss or acknowledge recommendations
- **And** recommendations update daily based on new data

**Priority:** P1
**Effort:** L

---

### US-021: Get AI Insights from Workout Patterns
**As a** user
**I want** to receive insights about my workout patterns
**So that** I can optimize my training over time

**Acceptance Criteria:**
- **Given** I have logged multiple workouts over several weeks
- **When** I view the insights screen
- **Then** I see AI-generated observations such as:
  - "You typically work out in the morning and have better consistency"
  - "Your running volume has increased 20% this month"
  - "You haven't done strength training in 2 weeks - consider adding it back"
- **And** insights are generated weekly using on-device AI
- **And** insights are actionable and specific to my data
- **And** I can view a history of previous insights
- **And** all AI processing happens offline

**Priority:** P1
**Effort:** L

---

## Phase 5: Wellbeing & Holistic Health

### US-022: Receive Holistic Wellbeing Recommendations
**As a** user
**I want** to receive recommendations beyond just workouts
**So that** I can improve my overall health and wellbeing

**Acceptance Criteria:**
- **Given** the app has access to my health metrics
- **When** I view the wellbeing or insights screen
- **Then** I see recommendations across multiple dimensions:
  - Sleep optimization (e.g., "Your sleep has been inconsistent - try a regular bedtime")
  - Stress management (e.g., "Consider meditation or breathing exercises")
  - Recovery practices (e.g., "Schedule a rest day this week")
  - Activity balance (e.g., "Add some low-intensity movement on rest days")
- **And** recommendations are prioritized by relevance
- **And** I can mark recommendations as completed or dismissed
- **And** recommendations update based on my progress
- **And** all recommendations are generated on-device

**Priority:** P1
**Effort:** L

---

### US-023: Track Sleep Patterns
**As a** user
**I want** to see visualizations of my sleep patterns
**So that** I can understand how sleep affects my recovery and performance

**Acceptance Criteria:**
- **Given** HealthKit has sleep data from my Apple Watch or iPhone
- **When** I navigate to the sleep section
- **Then** I see a chart showing:
  - Sleep duration per night (last 7-30 days)
  - Average sleep time
  - Sleep consistency
  - Correlation with recovery score
- **And** I can see which nights had poor sleep highlighted
- **And** I can tap on specific nights for more details
- **And** I receive suggestions for improving sleep quality

**Priority:** P2
**Effort:** M

---

### US-024: View Stress and Readiness Indicators
**As a** user
**I want** to see indicators of my stress and readiness levels
**So that** I can make informed decisions about training intensity

**Acceptance Criteria:**
- **Given** the app has HRV and heart rate data
- **When** I view the wellbeing dashboard
- **Then** I see indicators for:
  - Current stress level (based on HRV trends)
  - Physical readiness (recovery score)
  - Sleep readiness
- **And** indicators use simple color coding (green/yellow/red)
- **And** I can tap each indicator for more detailed information
- **And** indicators update daily or in real-time when new data is available
- **And** all calculations happen on-device

**Priority:** P2
**Effort:** M

---

## Phase 3-4: Data Visualization

### US-025: View Weekly Workout Summary
**As a** user
**I want** to see a summary of my weekly workout activity
**So that** I can track if I'm meeting my exercise goals

**Acceptance Criteria:**
- **Given** I have logged workouts during the current week
- **When** I view the dashboard or insights screen
- **Then** I see a weekly summary showing:
  - Total number of workouts
  - Total exercise time
  - Breakdown by workout type (pie chart or bar chart)
  - Comparison to previous weeks
- **And** the week resets every Monday (or user-configured day)
- **And** I can swipe to view previous weeks
- **And** visual charts are clear and easy to understand

**Priority:** P1
**Effort:** M

---

### US-026: View Monthly Progress Charts
**As a** user
**I want** to see monthly visualizations of my fitness progress
**So that** I can track long-term trends and improvements

**Acceptance Criteria:**
- **Given** I have at least one month of workout data
- **When** I navigate to the progress or insights screen
- **Then** I see monthly charts for:
  - Workout frequency (workouts per week)
  - Total workout duration trend
  - Recovery score average
  - Steps and active calories trends
- **And** I can toggle between different metrics
- **And** I can switch between month view and 3-month view
- **And** charts highlight achievements or milestones

**Priority:** P2
**Effort:** M

---

### US-027: Export Workout Data
**As a** user
**I want** to export my workout data
**So that** I can back it up or use it in other applications

**Acceptance Criteria:**
- **Given** I have logged workouts in the app
- **When** I navigate to Settings and select "Export Data"
- **Then** I can export my data in multiple formats:
  - JSON (complete data including notes and metadata)
  - CSV (tabular format for spreadsheets)
- **And** I can choose to export all workouts or a specific date range
- **And** the export includes all workout details, photos (as file references), and metadata
- **And** I can share the export via AirDrop, email, or save to Files
- **And** I see a success message when export completes

**Priority:** P1
**Effort:** M

---

## Settings & Privacy

### US-028: Manage HealthKit Permissions
**As a** user
**I want** to review and modify HealthKit permissions
**So that** I can control what health data the app can access

**Acceptance Criteria:**
- **Given** I am in the app Settings
- **When** I tap on "Health Permissions"
- **Then** I see a list of all HealthKit data types the app can access
- **And** I see which permissions are currently granted or denied
- **And** I can tap to open iOS Settings to modify permissions
- **And** I see clear explanations of why each permission is requested
- **And** the app shows which features require which permissions

**Priority:** P0
**Effort:** S

---

### US-029: View Privacy Policy and Data Usage
**As a** user
**I want** to understand how my data is used and stored
**So that** I can trust the app with my health information

**Acceptance Criteria:**
- **Given** I am in the app Settings
- **When** I tap on "Privacy & Data"
- **Then** I see clear information about:
  - All data is stored locally on my device
  - No data is sent to external servers
  - All AI processing happens on-device
  - How photos are stored and secured
  - How HealthKit data is used
- **And** I can access the full privacy policy
- **And** I can see how much storage the app is using
- **And** I can delete all app data if desired

**Priority:** P0
**Effort:** S

---

### US-030: Delete All App Data
**As a** user
**I want** to delete all my data from the app
**So that** I can start fresh or completely remove my information

**Acceptance Criteria:**
- **Given** I am in Settings
- **When** I tap "Delete All Data"
- **Then** I see a serious warning that this action is permanent and cannot be undone
- **And** I must confirm the deletion with a secondary confirmation
- **And** upon confirmation, all local data is deleted:
  - All workout entries
  - All photos
  - All cached HealthKit data
  - All AI-generated insights
  - User preferences (except permission states)
- **And** I am returned to the onboarding screen
- **And** HealthKit data remains in Apple Health (not deleted)

**Priority:** P1
**Effort:** S

---

## Summary by Priority

### P0 (Must-Have for MVP): 16 stories
- US-001: Initial App Setup and Onboarding
- US-002: HealthKit Permission Request
- US-003: Camera Permission
- US-004: Microphone Permission
- US-005: Read HealthKit Workout Data
- US-006: Read HealthKit Metrics
- US-007: Log Workout via Text Input
- US-008: Log Workout via Voice Input
- US-012: View Workout History
- US-013: View Workout Details
- US-014: Edit Existing Workout
- US-015: Delete Workout
- US-018: Calculate Daily Recovery Score
- US-028: Manage HealthKit Permissions
- US-029: View Privacy Policy and Data Usage

### P1 (Important for MVP): 12 stories
- US-009: Log Workout via Image Capture
- US-010: Write Workout Back to HealthKit
- US-011: Combined Input Methods
- US-016: Filter Workouts by Type
- US-019: View Recovery Score Trend
- US-020: Workout Recommendations Based on Recovery
- US-021: AI Insights from Workout Patterns
- US-022: Holistic Wellbeing Recommendations
- US-025: Weekly Workout Summary
- US-027: Export Workout Data
- US-030: Delete All App Data

### P2 (Nice-to-Have): 5 stories
- US-017: Search Workouts
- US-023: Track Sleep Patterns
- US-024: View Stress and Readiness Indicators
- US-026: Monthly Progress Charts

---

## Effort Summary

**Small (S):** 9 stories (45-90 development days)
**Medium (M):** 14 stories (42-70 development days)
**Large (L):** 7 stories (35-70 development days)

**Total Estimated Effort:** 122-230 development days (approximately 6-12 months for a solo developer or 3-6 months for a small team)

---

## Implementation Notes

1. **Phase 1** should establish the foundation with HealthKit integration and permissions
2. **Phase 2** focuses on core workout logging functionality with all input methods
3. **Phase 3** builds out workout management and history features
4. **Phase 4** implements AI capabilities for insights and recovery scoring
5. **Phase 5** adds holistic wellbeing recommendations and advanced visualizations

All features maintain the core principles:
- 100% offline functionality
- Privacy-first design
- On-device AI processing
- No external data transmission
- Seamless HealthKit integration
