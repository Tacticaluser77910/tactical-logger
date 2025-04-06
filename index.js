
require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const { google } = require('googleapis');

const app = express();
app.use(express.json());

app.post('/', async (req, res) => {
    try {
        const ip = req.body.ip;
        const ipinfo = await fetch(`https://ipinfo.io/${ip}?token=${process.env.YOUR_IPINFO_TOKEN}`).then(r => r.json());

        console.log('Visitor:', {
            ip,
            info: ipinfo,
            url: req.body.url,
            userAgent: req.body.userAgent,
            language: req.body.language
        });

        res.send('OK');
    } catch (e) {
        console.error(e);
        res.status(500).send('Error');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
