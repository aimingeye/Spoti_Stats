import React, { useEffect, useState } from 'react';
import {
	setLocalAccessToken,
	setLocalRefreshToken,
	checkAuth,
} from '../../spotify';
import "./Discover.css";
import { Typography, Grid, Button, Box, makeStyles } from '@material-ui/core';
import "/Users/rishikapatwa/Desktop/utility/client/src/index.css"
import landing_girl from '/Users/rishikapatwa/Desktop/utility/client/src/assets/landing-page-girl.png'
import { parseHashBangArgs } from '../../utils';
import config from '../../config';


const Discover = () => {
	
	return (
    <div >
       
      <section className='discover-main-section'>
      <div className='brand'>
        <img
        src= "https://github.com/WebDevSimplified/Spotify-Landing-Page-Redesign/blob/master/images/logo.png?raw=true"
        alt=""
      />
      </div>
   </section>
    <section className ="discover-main-section">
      <div className ="call-to-action">
        <h1 className="title">Discover new music</h1>
        <div className="icon-section">
        <div className="icon">
            <img src="https://cdn-icons.flaticon.com/png/512/3138/premium/3138325.png?token=exp=1657550322~hmac=96cccc84fb5a44d29b5eea447432881b" />
            <a href={`${config.backendUrl}/top-tracks`} class="btn">Tracks</a>
          </div>
          <div className="icon">
            <img src="https://cdn-icons-png.flaticon.com/512/3048/3048362.png" />
            <a href={`${config.frontendUrl}/top-artists`} class="btn">artists</a>
          </div>
          <div className="icon">
            <img src="https://cdn-icons.flaticon.com/png/512/1550/premium/1550321.png?token=exp=1657549871~hmac=b7760597744b1324cf23b8784c41ca2c" />
            <a href={`${config.frontendUrl}/playlist`} class="btn">playlist</a>
          </div>
        </div>
        <div className="rish">
        By joining you can benefit by listening to the latest albums released.
        </div>
      </div>
      <img className="covers-image" src="images/covers.jpg" />
    </section>
  </div>
 
	);
};

export default Discover;
