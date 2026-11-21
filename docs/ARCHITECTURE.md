# Technical Architecture

## 1. Why a Single Self-Contained HTML File?

The application is engineered to work instantly upon double-clicking an HTML file, without needing a server, internet connection, or complex installation. It can be shared simply via USB, local storage, or static web hosting.

## 2. Core Components

1. **Standalone Build Pipeline (uild/build.py)**:
   - Inlines dataset arrays (words.json, i18n.json, 	r/*.json).
   - Inlines styles.css and pp.js directly into the HTML skeleton.
   - Embeds developer documentation as top-level comments.

2. **State & Storage (src/app.js)**:
   - Spaced Repetition engine using Leitner box system with 5 stages.
   - User progress, custom notes, edited words, and history are saved to localStorage.
   - Zero tracking or telemetry. Fully privacy-respecting and offline-first.

3. **Audio Playback Engine**:
   - Prefers local high-quality native British (UK) and American (US) MP3 files when hosted or available.
   - Gracefully falls back to browser speech synthesis (Web Speech API) if audio files are unavailable.
