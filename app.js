const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

app.use(cors())


app.use(cors({
    origin: '*', // or specify the allowed origin
  }));
  
// Endpoint to receive user details
app.post('/user_details', (req, res) => {
  const { firstname, lastname, phone, fcm_token } = req.body;

  // Log the user details
  console.log('User Details Received:');
  console.log(`First Name: ${firstname}`);
  console.log(`Last Name: ${lastname}`);
  console.log(`Phone: ${phone}`);
  console.log(`FCM Token: ${fcm_token}`);

  // Send a response back to the client
  res.status(200).json({ message: 'User details received successfully' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
