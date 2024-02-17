// server.js
import fetch from 'node-fetch';
import express from 'express';
import {v2 as cloudinary} from 'cloudinary';
import bodyParser from 'body-parser';
import cors from 'cors';

/*const express = require('express');
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary').v2;
const fetch = require('node-fetch');*/

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Cloudinary configuration          
cloudinary.config({ 
  cloud_name: 'dsdadzfly', 
  api_key: '421955221958275', 
  api_secret: 'g99EPce9gBZGWX_JDRXKRDTIjuA' 
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Endpoint to take screenshot and store in Cloudinary
app.post('/take-screenshot', async (req, res) => {
  try {
    const { url } = req.body;

    // Fetch screenshot from Pikwy API
    const response = await fetch(`https://api.pikwy.com/?token=24631bf376f2654e5e8cda9aa16a607919ce122704550a8d&url=${encodeURIComponent(url)}&width=auto&height=auto&full_page=true`, {
      method: 'POST'
    });

    if (!response.ok) {
      throw new Error('Failed to take screenshot');
    }

    const screenshotData = await response.buffer();
    console.log();

    // Upload screenshot to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
      if (error) {
        throw new Error('Failed to upload to Cloudinary');
        //return res.status(500).json({ error: 'Failed to upload to Cloudinary' });
      }
      
      return res.json({ thumbnail: result.url, createdAt: result.created_at, size: result.bytes });
    }).end(screenshotData);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
