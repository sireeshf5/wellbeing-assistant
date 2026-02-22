# Wellbeing Assistant - Architecture Diagram

## Overview
This document provides a comprehensive architectural overview of the Wellbeing Assistant iOS app, a privacy-first gym/wellbeing assistant built with React Native, TypeScript, and local-only AI processing.

---

## 1. High-Level System Architecture

```mermaid
graph TB
    subgraph "User Interface Layer"
        A[React Native Components]
        B[Navigation - 5 Tabs]
        C[Multi-Modal Input<br/>Text/Voice/Image]
    end

    subgraph "State Management Layer"
        D[Zustand Stores]
        E[Health Store]
        F[Workout Store]
        G[Nutrition Store]
        H[AI Insights Store]
        I[Voice Store]
    end

    subgraph "Service Layer"
        J[HealthKit Service]
        K[Database Service]
        L[AI Service<br/>TensorFlow Lite]
        M[Voice Service]
        N[Image Processing Service]
        O[Encryption Service]
    end

    subgraph "Data Layer"
        P[(Realm Database<br/>Encrypted)]
        Q[HealthKit Data Store]
        R[Encrypted Media Storage]
    end

    A --> D
    B --> A
    C --> A
    D --> E
    D --> F
    D --> G
    D --> H
    D --> I
    E --> J
    F --> K
    G --> K
    H --> L
    I --> M
    J --> Q
    K --> P
    L --> K
    M --> K
    N --> R
    O --> P
    O --> R

    style P fill:#ff6b6b
    style Q fill:#ff6b6b
    style R fill:#ff6b6b
    style O fill:#ffd93d
    style L fill:#6bcf7f
    style J fill:#6bcf7f
```

**Legend:**
- Red: Data storage with encryption
- Yellow: Security/encryption services
- Green: External integrations

---

## 2. Detailed Component Architecture

```mermaid
graph TB
    subgraph "UI Components"
        subgraph "Tab Navigation"
            T1[Dashboard Tab]
            T2[Workouts Tab]
            T3[Nutrition Tab]
            T4[Progress Tab]
            T5[Settings Tab]
        end

        subgraph "Main Screens"
            S1[Dashboard Screen]
            S2[Workout Logger]
            S3[Meal Logger]
            S4[Progress Charts]
            S5[Voice Input Screen]
            S6[Image Capture Screen]
            S7[AI Insights View]
            S8[Settings Screen]
        end

        subgraph "Shared Components"
            C1[Health Metric Card]
            C2[Workout Card]
            C3[Nutrition Card]
            C4[Chart Components]
            C5[Voice Input Button]
            C6[Camera Capture]
            C7[Insight Card]
        end
    end

    subgraph "State Management - Zustand Stores"
        ST1[Health Store<br/>- Metrics<br/>- Sync Status<br/>- Permissions]
        ST2[Workout Store<br/>- Active Workout<br/>- History<br/>- Templates]
        ST3[Nutrition Store<br/>- Meals<br/>- Macros<br/>- Goals]
        ST4[AI Insights Store<br/>- Insights<br/>- Recommendations<br/>- Trends]
        ST5[Voice Store<br/>- Transcript<br/>- Processing State]
        ST6[UI Store<br/>- Theme<br/>- Preferences]
    end

    T1 --> S1
    T2 --> S2
    T3 --> S3
    T4 --> S4
    T5 --> S8

    S1 --> C1
    S1 --> C7
    S2 --> C2
    S2 --> C5
    S3 --> C3
    S3 --> C6
    S4 --> C4
    S5 --> C5
    S6 --> C6
    S7 --> C7

    C1 --> ST1
    C2 --> ST2
    C3 --> ST3
    C4 --> ST1
    C4 --> ST2
    C4 --> ST3
    C5 --> ST5
    C6 --> ST3
    C7 --> ST4

    style ST1 fill:#4ecdc4
    style ST2 fill:#4ecdc4
    style ST3 fill:#4ecdc4
    style ST4 fill:#4ecdc4
    style ST5 fill:#4ecdc4
    style ST6 fill:#4ecdc4
```

---

## 3. Service Layer Architecture

```mermaid
graph LR
    subgraph "Services"
        subgraph "HealthKit Service"
            HK1[Permission Manager]
            HK2[Data Synchronizer]
            HK3[Query Builder]
            HK4[Observer Manager]
        end

        subgraph "Database Service"
            DB1[Realm Manager]
            DB2[CRUD Operations]
            DB3[Query Engine]
            DB4[Migration Handler]
        end

        subgraph "AI Service - TensorFlow Lite"
            AI1[Model Loader]
            AI2[Inference Engine]
            AI3[Pattern Analyzer]
            AI4[Recommendation Generator]
        end

        subgraph "Voice Service"
            V1[Speech Recognizer]
            V2[NLP Parser]
            V3[Intent Classifier]
            V4[Data Extractor]
        end

        subgraph "Image Processing"
            IMG1[Camera Interface]
            IMG2[Food Recognition]
            IMG3[Nutrition Estimator]
            IMG4[Image Compression]
        end

        subgraph "Encryption Service"
            ENC1[Key Manager]
            ENC2[Data Encryptor]
            ENC3[File Encryptor]
            ENC4[Secure Storage]
        end
    end

    HK1 --> HK2
    HK2 --> HK3
    HK3 --> HK4

    DB1 --> DB2
    DB2 --> DB3
    DB3 --> DB4

    AI1 --> AI2
    AI2 --> AI3
    AI3 --> AI4

    V1 --> V2
    V2 --> V3
    V3 --> V4

    IMG1 --> IMG2
    IMG2 --> IMG3
    IMG3 --> IMG4

    ENC1 --> ENC2
    ENC2 --> ENC3
    ENC3 --> ENC4

    style HK1 fill:#95e1d3
    style DB1 fill:#95e1d3
    style AI1 fill:#95e1d3
    style V1 fill:#95e1d3
    style IMG1 fill:#95e1d3
    style ENC1 fill:#f38181
```

---

## 4. Data Flow Diagram - User Input to Storage

```mermaid
sequenceDiagram
    participant U as User
    participant UI as UI Component
    participant S as Zustand Store
    participant SVC as Service Layer
    participant ENC as Encryption Service
    participant DB as Realm Database

    U->>UI: Input Data (Text/Voice/Image)
    UI->>S: Update State
    S->>SVC: Process Data

    alt Voice Input
        SVC->>SVC: Speech Recognition
        SVC->>SVC: NLP Parsing
        SVC->>SVC: Extract Structured Data
    end

    alt Image Input
        SVC->>SVC: Food Recognition
        SVC->>SVC: Nutrition Estimation
    end

    SVC->>ENC: Encrypt Data
    ENC->>ENC: Generate Encryption Key
    ENC->>ENC: Encrypt Payload
    ENC->>DB: Store Encrypted Data
    DB-->>SVC: Confirmation
    SVC-->>S: Update State
    S-->>UI: Re-render
    UI-->>U: Visual Feedback
```

---

## 5. HealthKit Integration Flow

```mermaid
sequenceDiagram
    participant APP as App Launch
    participant HKS as HealthKit Service
    participant HK as Apple HealthKit
    participant STORE as Health Store (Zustand)
    participant DB as Realm Database
    participant AI as AI Service

    APP->>HKS: Initialize
    HKS->>HK: Request Permissions
    HK-->>HKS: Grant/Deny

    alt Permissions Granted
        HKS->>HK: Setup Background Observer
        HKS->>HK: Query Historical Data
        HK-->>HKS: Return Health Data
        HKS->>STORE: Update State
        HKS->>DB: Cache Data Locally

        Note over HK,HKS: Real-time Updates
        HK->>HKS: Background Delivery
        HKS->>STORE: Update Metrics
        HKS->>AI: Trigger Analysis
        AI->>AI: Generate Insights
        AI->>STORE: Update AI Insights
    end

    alt Permissions Denied
        HKS->>STORE: Update Permission Status
        STORE->>APP: Show Permission Request UI
    end
```

---

## 6. AI Insights Generation Flow

```mermaid
graph TD
    A[Data Collection Trigger] --> B{Data Source}

    B -->|Workout Data| C[Workout History]
    B -->|Health Data| D[HealthKit Metrics]
    B -->|Nutrition Data| E[Meal Logs]

    C --> F[Data Aggregator]
    D --> F
    E --> F

    F --> G[Data Preprocessor]
    G --> H[Feature Extraction]

    H --> I{TensorFlow Lite Models}

    I --> J[Pattern Recognition Model]
    I --> K[Trend Analysis Model]
    I --> L[Recommendation Model]

    J --> M[Identified Patterns]
    K --> N[Detected Trends]
    L --> O[Personalized Recommendations]

    M --> P[Insight Generator]
    N --> P
    O --> P

    P --> Q[Ranking & Prioritization]
    Q --> R[Encryption]
    R --> S[(Store in Realm)]
    S --> T[Update AI Insights Store]
    T --> U[Display in UI]

    style I fill:#6bcf7f
    style R fill:#ffd93d
    style S fill:#ff6b6b
```

---

## 7. Database Schema Architecture

```mermaid
erDiagram
    USER ||--o{ WORKOUT : logs
    USER ||--o{ MEAL : tracks
    USER ||--o{ HEALTH_METRIC : has
    USER ||--o{ AI_INSIGHT : receives
    USER ||--|| USER_PREFERENCES : configures

    WORKOUT {
        string id PK
        datetime startTime
        datetime endTime
        string workoutType
        int duration
        float caloriesBurned
        json exercises
        string notes
        datetime createdAt
        boolean encrypted
    }

    EXERCISE {
        string id PK
        string workoutId FK
        string name
        int sets
        int reps
        float weight
        string unit
        int restTime
    }

    MEAL {
        string id PK
        string userId FK
        datetime mealTime
        string mealType
        json foodItems
        float totalCalories
        float protein
        float carbs
        float fats
        string imageUrl
        string notes
        boolean encrypted
    }

    FOOD_ITEM {
        string id PK
        string mealId FK
        string name
        float quantity
        string unit
        float calories
        float protein
        float carbs
        float fats
    }

    HEALTH_METRIC {
        string id PK
        string userId FK
        datetime timestamp
        string metricType
        float value
        string unit
        string source
        boolean syncedFromHealthKit
    }

    AI_INSIGHT {
        string id PK
        string userId FK
        datetime generatedAt
        string insightType
        string title
        string description
        json data
        float confidence
        int priority
        boolean read
        boolean encrypted
    }

    USER_PREFERENCES {
        string id PK
        string userId FK
        string theme
        boolean notificationsEnabled
        json nutritionGoals
        json fitnessGoals
        string preferredUnits
        boolean voiceInputEnabled
    }

    VOICE_TRANSCRIPT {
        string id PK
        datetime timestamp
        string transcript
        json parsedData
        string intentType
        boolean processed
        boolean encrypted
    }

    MEDIA_FILE {
        string id PK
        string relatedId FK
        string fileType
        string encryptedPath
        string thumbnailPath
        datetime createdAt
        int fileSize
        boolean encrypted
    }

    WORKOUT ||--o{ EXERCISE : contains
    MEAL ||--o{ FOOD_ITEM : includes
    MEAL ||--o| MEDIA_FILE : has
```

---

## 8. Security & Privacy Architecture

```mermaid
graph TB
    subgraph "Privacy-First Design"
        subgraph "Data at Rest"
            DR1[Realm Database<br/>AES-256 Encryption]
            DR2[Media Files<br/>File-Level Encryption]
            DR3[HealthKit Data<br/>iOS Sandbox]
        end

        subgraph "Data in Transit"
            DT1[No Network Calls]
            DT2[Local Processing Only]
            DT3[No Cloud Sync]
        end

        subgraph "Encryption Points"
            E1[User Input → Encrypted Storage]
            E2[Voice Transcripts → Encrypted]
            E3[Food Images → Encrypted]
            E4[AI Insights → Encrypted]
            E5[Workout Data → Encrypted]
        end

        subgraph "Access Control"
            AC1[Biometric Authentication]
            AC2[App-Level PIN]
            AC3[Auto-Lock Timeout]
            AC4[HealthKit Permissions]
        end

        subgraph "Key Management"
            KM1[Keychain Storage]
            KM2[Realm Encryption Key]
            KM3[File Encryption Keys]
            KM4[Key Rotation Support]
        end
    end

    DR1 --> E1
    DR2 --> E3

    E1 --> KM2
    E2 --> KM2
    E3 --> KM3
    E4 --> KM2
    E5 --> KM2

    KM2 --> KM1
    KM3 --> KM1
    KM4 --> KM1

    AC1 --> DR1
    AC2 --> DR1
    AC3 --> DR1
    AC4 --> DR3

    style DR1 fill:#ff6b6b
    style DR2 fill:#ff6b6b
    style DR3 fill:#ff6b6b
    style KM1 fill:#ffd93d
    style DT1 fill:#6bcf7f
    style DT2 fill:#6bcf7f
    style DT3 fill:#6bcf7f
```

---

## 9. Navigation Structure

```mermaid
graph TD
    ROOT[App Root]

    ROOT --> NAV[Tab Navigator]

    NAV --> TAB1[Dashboard]
    NAV --> TAB2[Workouts]
    NAV --> TAB3[Nutrition]
    NAV --> TAB4[Progress]
    NAV --> TAB5[Settings]

    TAB1 --> D1[Dashboard Screen]
    D1 --> D2[Quick Stats]
    D1 --> D3[Recent Insights]
    D1 --> D4[Today's Summary]
    D1 --> D5[Quick Actions]

    TAB2 --> W1[Workout List]
    TAB2 --> W2[Active Workout]
    TAB2 --> W3[Workout Templates]
    W1 --> W4[Workout Detail]
    W2 --> W5[Exercise Logger]
    W3 --> W6[Template Editor]

    TAB3 --> N1[Meal List]
    TAB3 --> N2[Meal Logger]
    TAB3 --> N3[Nutrition Goals]
    N2 --> N4[Food Search]
    N2 --> N5[Camera Capture]
    N2 --> N6[Voice Input]

    TAB4 --> P1[Progress Charts]
    TAB4 --> P2[Body Metrics]
    TAB4 --> P3[Workout Stats]
    TAB4 --> P4[Nutrition Trends]
    P1 --> P5[Detailed Chart View]

    TAB5 --> SET1[General Settings]
    TAB5 --> SET2[HealthKit Sync]
    TAB5 --> SET3[Privacy & Security]
    TAB5 --> SET4[Goals & Preferences]
    TAB5 --> SET5[About & Help]

    style NAV fill:#4ecdc4
    style TAB1 fill:#95e1d3
    style TAB2 fill:#95e1d3
    style TAB3 fill:#95e1d3
    style TAB4 fill:#95e1d3
    style TAB5 fill:#95e1d3
```

---

## 10. Multi-Modal Input Processing Flow

```mermaid
graph TD
    START[User Input] --> MODAL{Input Type}

    MODAL -->|Text| TEXT[Text Input Component]
    MODAL -->|Voice| VOICE[Voice Input Component]
    MODAL -->|Image| IMAGE[Image Capture Component]

    TEXT --> PARSE_TEXT[Parse Text Input]
    PARSE_TEXT --> VALIDATE[Validate Data]

    VOICE --> RECORD[Record Audio]
    RECORD --> TRANSCRIBE[Speech-to-Text<br/>iOS Speech Framework]
    TRANSCRIBE --> NLP[NLP Processing]
    NLP --> EXTRACT[Extract Entities<br/>Numbers, Foods, Exercises]
    EXTRACT --> VALIDATE

    IMAGE --> CAPTURE[Capture Image]
    CAPTURE --> COMPRESS[Compress Image]
    COMPRESS --> RECOGNIZE[Food Recognition<br/>TensorFlow Lite]
    RECOGNIZE --> ESTIMATE[Nutrition Estimation]
    ESTIMATE --> VALIDATE

    VALIDATE --> ENCRYPT[Encrypt Data]
    ENCRYPT --> STORE[(Store in Realm)]
    STORE --> UPDATE[Update Store]
    UPDATE --> AI_TRIGGER{Trigger AI Analysis?}

    AI_TRIGGER -->|Yes| AI_PROCESS[Generate Insights]
    AI_TRIGGER -->|No| RENDER[Re-render UI]

    AI_PROCESS --> RENDER
    RENDER --> END[Display Confirmation]

    style VOICE fill:#ffd93d
    style IMAGE fill:#ffd93d
    style RECOGNIZE fill:#6bcf7f
    style ENCRYPT fill:#ff6b6b
    style STORE fill:#ff6b6b
```

---

## Technology Stack Summary

### Frontend
- **Framework**: React Native (iOS)
- **Language**: TypeScript
- **State Management**: Zustand
- **Navigation**: React Navigation (Tab Navigator)
- **UI Components**: Custom components with Reanimated

### Backend Services (Local Only)
- **Database**: Realm (with AES-256 encryption)
- **Health Data**: Apple HealthKit
- **AI/ML**: TensorFlow Lite (on-device inference)
- **Voice**: iOS Speech Framework
- **Storage**: iOS FileSystem (encrypted)

### Security
- **Database Encryption**: Realm encryption with keys in Keychain
- **File Encryption**: AES-256 for media files
- **Authentication**: Biometric (Face ID/Touch ID) + PIN
- **Network**: No network calls - 100% local processing

### AI Models
- **Pattern Recognition**: Workout pattern analysis
- **Trend Analysis**: Health metric trends
- **Nutrition Estimation**: Food image recognition
- **Recommendation Engine**: Personalized suggestions

---

## Key Architectural Principles

1. **Privacy First**: All data stays on device, no cloud sync
2. **Encryption Everywhere**: Data encrypted at rest and during processing
3. **Offline-First**: Full functionality without internet
4. **Performance**: Local AI inference for fast insights
5. **User Control**: User owns and controls all their data
6. **Modular Design**: Services are independent and testable
7. **Type Safety**: TypeScript for compile-time safety
8. **Reactive State**: Zustand for predictable state management

---

## Data Flow Patterns

### Read Pattern
```
User Action → UI Component → Zustand Store → Service → Database → Store Update → UI Re-render
```

### Write Pattern
```
User Input → Validation → Service Processing → Encryption → Database → Store Update → UI Feedback
```

### HealthKit Sync Pattern
```
HealthKit Change → Background Observer → HealthKit Service → Store Update → AI Trigger → Insight Generation
```

### AI Insight Pattern
```
Data Change → Aggregation → Preprocessing → TensorFlow Lite → Insight Generation → Encryption → Storage → Display
```

---

## Conclusion

This architecture provides a robust, privacy-focused foundation for the Wellbeing Assistant app. The modular design allows for easy testing, maintenance, and future enhancements while maintaining the core principle of keeping all user data local and secure.
