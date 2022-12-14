require('dotenv').config();

const express = require('express');
const axios = require('axios');
const queryString = require('query-string');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
app.use(cookieParser()).use(cors());

const router = express.Router();


const scopes = [
  'user-read-private',
  'user-read-email',
  'user-read-recently-played',
  'user-top-read',
  'user-follow-read',
  'user-follow-modify',
  'playlist-read-private',
  'playlist-read-collaborative',
  'playlist-modify-public',
  'playlist-modify-private'
];

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const CALLBACK_URL = process.env.CALLBACK_URL;
const FRONTEND_URI = process.env.FRONTEND_URI;

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = function(length) {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const Request = (params) => axios({
  url: 'https://accounts.spotify.com/api/token',
  method: 'POST',
  params,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});

const stateKey = 'spotify_auth_state';

app.get('/login', (_, res) => {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  return res.redirect(
    `https://accounts.spotify.com/authorize?${queryString.stringify({
      response_type: 'code',
      client_id: CLIENT_ID,
      scope: scopes.join(' '),
      redirect_uri: CALLBACK_URL,
      state: state,
      show_dialog: true
    })}`,
  );
});

app.get('/callback', async (req, res) => {
  // your application requests refresh and access tokens
  // after checking the state parameter
  console.log("happy");
  const { code, state } = req.query;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  console.log(state);
  if (!state || state !== storedState) {
    return res.redirect(
      `${FRONTEND_URI}/#${queryString.stringify({ error: 'state_mismatch' })}`
    );
  }

  res.clearCookie(stateKey);

  try {
    const params = {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: 'authorization_code',
      redirect_uri: CALLBACK_URL,
      code
    }

    const { data: { access_token, refresh_token } } = await Request(params);
    
    res.redirect(
      `${FRONTEND_URI}/#${queryString.stringify({
        access_token,
        refresh_token
      })}`,
    );
  } catch (e) {
    res.redirect(`${FRONTEND_URI}/#${queryString.stringify({ error: 'invalid_token' })}`);
  }
});

app.get('/refresh_token', async (req, res) => {
  const { refresh_token } = req.query;

  if (!refresh_token) return res.status(401).send('Invalid refresh token');

  try {
    const params = {
      refresh_token,
      grant_type: 'refresh_token',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET
    }

    const { data: { access_token } } = await Request(params);
    
    res.json({
      access_token
    });
  } catch (e) {
    res.status(401).send('Invalid token');
  }
});

console.log('Listening on 8888');
app.listen(8888);

