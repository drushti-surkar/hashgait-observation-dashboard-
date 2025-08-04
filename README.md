Objective

Our project, HashGait, aims to revolutionize user authentication by leveraging behavioral biometrics — specifically, unique gait patterns, touch interactions, and device motion signatures — as a seamless and continuous layer of identity verification. By converting real-time sensor data into deterministic cryptographic hashes (e.g., SHA-256), we create a lightweight yet robust “behavioral fingerprint” of each user that can be securely verified on the backend.

The objective is to build an end-to-end system that includes: • A mobile app to capture behavioral data using built-in smartphone sensors. • A Node.js backend for processing, hashing, and validating gait data. • Integration with an ICP backend (Internet Computer Protocol) for advanced pattern storage, confidence scoring, and blockchain-based trust. • A modern dashboard to visualize user authentication flows and backend performance.

⸻

Methodology

We follow a hybrid architecture combining mobile data capture, backend processing, and cryptographic verification: 1. Data Capture: The mobile app uses accelerometer, gyroscope, and touch input events to collect real-time behavioral signals. 2. Behavioral Hashing: The app sends anonymized gait data to the Node.js backend, which generates a SHA-256 hash representing the behavioral pattern. 3. Dual Backend Verification: The system runs parallel checks on both the Node.js backend and the ICP blockchain backend, returning confidence scores, authentication success/failure, and match history. 4. Dashboard Insights: A modern React Native dashboard shows live sensor data, recent hashes, backend health, and system metrics.

We use React Native for cross-platform mobile development, Express.js for a lightweight backend, and ICP for advanced behavioral storage and validation.

⸻

Scope of Solution

The proposed solution can be used in: • Fraud prevention: Passively verifying users to detect suspicious activity. • Silent KYC: Authenticating customers during onboarding without manual ID upload. • Continuous authentication: Ensuring session integrity beyond initial login. • Transaction security: Adding behavioral checks for high-value actions. • Financial inclusion: Extending biometric security to populations without physical biometric hardware.

Importantly, HashGait is hardware-agnostic — it works on any smartphone with motion sensors, without requiring new devices or complex installations.

⸻

Additional Details

HashGait’s innovation lies in its combination of behavioral biometrics with cryptographic rigor, packaged in an end-to-end system ready for real-world use. It balances: • Security: via non-reversible hashes and blockchain-backed records. • Usability: no additional hardware or active user effort. • Scalability: simple backend that can be cloud-deployed or integrated into existing bank APIs. • Innovation: bridges real-time behavioral data and decentralized trust mechanisms.

This approach aligns perfectly with the hackathon’s goals of building secure, scalable, and innovative solutions for the banking and fintech ecosystem.
