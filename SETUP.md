# Setup Instructions

## Issues Fixed

1. **Added error handling** to the authentication controller to prevent server crashes
2. **Improved error messages** for better debugging

## Required Setup Steps

### 1. Create Environment Variables File

Create a `.env` file in the `server` directory with the following variables:

```env
# MongoDB Connection String
# For local MongoDB:
MONGO_URI=mongodb://localhost:27017/personal-task-manager

# For MongoDB Atlas (cloud):
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname

# JWT Secret Key (use a random string for production)
# You can generate one using: openssl rand -base64 32
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Server Port (optional, defaults to 5000)
PORT=5000
```

### 2. Install MongoDB

If you don't have MongoDB installed locally:

**Option A: Local MongoDB**
- Download and install MongoDB from https://www.mongodb.com/try/download/community
- Make sure MongoDB service is running

**Option B: MongoDB Atlas (Cloud - Recommended)**
- Sign up at https://www.mongodb.com/cloud/atlas
- Create a free cluster
- Get your connection string and update `MONGO_URI` in `.env`

### 3. Install Dependencies

Make sure you've installed dependencies for both client and server:

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 4. Start the Application

**Terminal 1 - Start the server:**
```bash
cd server
npm run dev
```

**Terminal 2 - Start the client:**
```bash
cd client
npm start
```

## Common Issues

### "MONGO_URI not set" Error
- Make sure you created a `.env` file in the `server` directory
- Check that the file is named exactly `.env` (not `.env.txt` or similar)
- Verify the `MONGO_URI` variable is set correctly

### "JWT_SECRET is not set" Error
- Add `JWT_SECRET` to your `.env` file
- Use a random string (at least 32 characters recommended)

### Connection Refused / Network Error
- Make sure MongoDB is running (if using local MongoDB)
- Check that the server is running on port 5000
- Verify the `MONGO_URI` connection string is correct
- Check firewall settings if using MongoDB Atlas

### CORS Errors
- The server already has CORS enabled
- Make sure the client is running on the expected port (usually 3000)
- Check that the API URL in `client/src/services/api.js` matches your server URL

## Testing

1. Open http://localhost:3000 (or your React app port)
2. Navigate to the Register page
3. Fill in the registration form
4. Check the browser console and server logs for any errors

