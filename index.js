// Load environment variables from .env
require('dotenv').config();

// Import libraries
const express = require('express');
const bodyParser = require('body-parser');
const supabaseClient = require('@supabase/supabase-js');
const axios = require('axios');

// Create Express app
const app = express();

// Set server port
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Serve frontend files from public folder
app.use(express.static(__dirname + '/public'));

// Supabase connection info
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Create Supabase client
const supabase = supabaseClient.createClient(
  supabaseUrl,
  supabaseKey
);



// ============================================
// GET USERS FROM DATABASE
// ============================================

app.get('/users', async (req, res) => {

  // Select all users from Supabase table
  const { data, error } = await supabase
    .from('users')
    .select();

  // Handle errors
  if (error) {
    return res.status(500).json(error);
  }

  // Return users
  res.json(data);
});



// ============================================
// CREATE NEW USER
// ============================================

app.post('/users', async (req, res) => {

  // Get data from request body
  const { email, password } = req.body;

  // Check if fields are empty
  if (!email || !password) {

    return res.status(400).json({
      message: 'Email and password are required'
    });
  }

  // Basic email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Check email format
  if (!emailRegex.test(email)) {

    return res.status(400).json({
      message: 'Invalid email format'
    });
  }

  // Insert new user into Supabase
  const { data, error } = await supabase
    .from('users')
    .insert([
      {
        email: email,
        password: password
      }
    ])
    .select();

  // Handle database errors
  if (error) {
    return res.status(500).json(error);
  }

  // Success response
  res.status(201).json(data);
});



// ============================================
// EXTERNAL API ROUTE
// RANDOM USER API
// ============================================

app.get('/random-user', async (req, res) => {

  try {

    // Fetch data from external API
    const response = await axios.get(
      'https://randomuser.me/api/'
    );

    // Return API data to frontend
    res.json(response.data);

  } catch (error) {

    // Error handling
    res.status(500).json({
      error: 'Failed to fetch random user'
    });
  }
});



// ============================================
// START SERVER
// ============================================

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});