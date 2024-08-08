const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('firebase-admin');
const app = express();
const port = 3000;

// Initialize Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json'); // Update the path accordingly

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // Optionally, you can specify the databaseURL if needed
  // databaseURL: 'https://your-project-id.firebaseio.com'
});

const db = admin.firestore();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

app.use(cors({
  origin: '*', // or specify the allowed origin
}));

// Endpoint to receive user details
app.post('/user_details', async (req, res) => {
  try {
    const userDetails = req.body;

    // Validate the received data
    if (!userDetails.userId || !userDetails.email) {
      return res.status(400).json({ message: 'Invalid user details' });
    }

    // Store user details in Firestore
    await db.collection('users_reg').doc(userDetails.userId).set(userDetails);

    // Send a response back to the client
    res.status(200).json({ message: 'User details received and stored successfully' });
  } catch (error) {
    console.error('Error storing user details:', error);
    res.status(500).json({ message: 'Failed to store user details' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
