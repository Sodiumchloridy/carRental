> [!NOTE]
> This project is academic coursework for UECS3253 Wireless Application Development module.

# Car Rental Application
![452744983-b1b1bd8b-01d7-4cc4-9268-237aedab077a](https://github.com/user-attachments/assets/e9cacc43-2880-42eb-bf7a-25091cb97f8f)

A full-stack car rental management application with a React Native mobile client and authentication backend.

## Project Structure

This project consists of the following main components:

- `android-client/`: React Native mobile application
- `auth-service/`: Flask-based authentication backend
- `chat-ws/`: WebSocket for chat fetching and storing

## Features

### Mobile Application
- User authentication (login/registration)
- Browse cars by category (SUV, Sedan, Luxury)
- Car details view with specifications
- Booking system with date selection
- Online payment processing
- Booking confirmation and history
- Offline functionality with SQLite data storage
- Firebase integration for data management

### Authentication Service
- User registration with email, password, name, IC number, and phone number
- Secure login with JWT authentication
- User profile management
- SQLite database for user storage

## Technical Stack

### Mobile Client
- React Native
- Firebase Firestore
- SQLite (local storage)
- React Navigation
- Linear Gradient
- Vector Icons

### Authentication Service
- Flask
- SQLite
- JWT Authentication

## Getting Started

### Setting Up the React Native Client

1. Navigate to the Android client directory:
```bash
cd android-client
```

2. Install dependencies:
```bash
npm install
```

3. Add Firebase configuration:
   - Download your `google-services.json` file from Firebase Console
   - Place it in the `android/app/` directory

4. Clean previous builds:
```bash
cd android
./gradlew clean
cd ..
```

5. Start the app:
```bash
npm start
```

### Setting Up the Authentication Service

1. Navigate to the authentication service directory:
```bash
cd auth-service
```

2. Install dependencies:
```bash
poetry install
```

3. Run the server:
```bash
poetry run python server.py
```

The authentication server will start on port 5000: http://localhost:5000
### Setting Up the Chat WebSocket

1. Navigate to the Chat WebSocket directory:
```bash
cd chat-ws
```

2. Run the websocket server:
```bash
python chatWebSocket.py
```

The WebSocket server will start on port 5001: http://localhost:5001
## Integration

To connect the React Native app with the authentication service, create a `config.json` file in your React Native project's `src` directory:

```json
{
  "FLASK_API": "http://10.0.2.2:5000",  // For Android emulator
  // Use "http://localhost:5000" for iOS simulator
  // Use "http://YOUR_IP_ADDRESS:5000" for physical devices
  "WEBSOCKET_SERVER": "http://10.0.2.2:5001" // For Android emulator
  // Use "http://localhost:5001" for iOS simulator
  // Use "http://YOUR_IP_ADDRESS:5001" for physical devices
}
```

Then import it in your files:

```typescript
// Direct import
import config from '../../config.json';

// Then use it like:
const apiUrl = config.FLASK_API;
```

Make sure your `tsconfig.json` has JSON module resolution enabled:

```json
{
  "compilerOptions": {
    "resolveJsonModule": true,
    // ... other options
  }
}
```

## 📜 Contributors

See the full list of contributors in [CONTRIBUTORS.md](./CONTRIBUTORS.md).

## License

This project is licensed under the MIT License.
