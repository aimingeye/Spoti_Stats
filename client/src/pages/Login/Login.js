import React, { useEffect, useState } from 'react';
import {
	setLocalAccessToken,
	setLocalRefreshToken,
	checkAuth,
} from '../../spotify';
import "./Login.css";
import { Typography, Grid, Button, Box, makeStyles } from '@material-ui/core';
import "../../index.css"
import landing_girl from '/Users/rishikapatwa/Desktop/utility/client/src/assets/landing-page-girl.png'
import { parseHashBangArgs } from '../../utils';
import config from '../../config';

const useStyles = makeStyles(theme => ({
	content: {
		flexGrow: 1,
	},
}));

const Login = () => {
	const [buttonText, setButtonText] = useState('LOGIN WITH SPOTIFY');
	const [disabled, setDisabled] = useState(false);

	useEffect(() => {
		const { error, access_token, refresh_token } = parseHashBangArgs(
			window.location.hash
		);

		if (error && error === 'invalid_token') return;

		if (error && error === 'state_mismatch') return;

		if (access_token) {
			setButtonText('Please wait...');
			setDisabled(true);
			setLocalAccessToken(access_token);
			setLocalRefreshToken(refresh_token);
			// Check also if token is legit
			const fetchLogged = async () => {
				try {
					await checkAuth();
					window.location.reload();
				} catch (e) {
					// token is not legit
					setDisabled(false);
					return;
				}
			};
			fetchLogged();
		}
	}, []);

	const classes = useStyles();
	return (
		<div class="home-main-section"> 
		<div className='brand'>
        <img
        src= "https://github.com/WebDevSimplified/Spotify-Landing-Page-Redesign/blob/master/images/logo.png?raw=true"
        alt=""
      />
      </div>
  <section class ="home-main-section">
    <div class="img-wrapper">
      <div class="lady-image"></div>
    </div>
    <div class="call-to-action">
      <h1 class="title">Feel The Music</h1>
      <span class="subtitle">Stream over 20 thousand songs with one click</span>
      <a href={`${config.backendUrl}/login`} class="btn">Join Now</a>
    </div>
  </section>
  <div class="home-page-circle-1"></div>
  <div class="home-page-circle-2"></div>
  <div class="home-page-circle-3"></div>
		</div>
		
	);
};

export default Login;
