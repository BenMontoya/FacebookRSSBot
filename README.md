# FacebookRSSBot
Simple single-feed RSS Bot for Facebook.<br>
There's a 5-minute delay between posts to avoid being blocked for spam by Facebook.


## Requirements:
- NodeJS (https://nodejs.org/en/download/)
- xml2js (https://github.com/Leonidas-from-XIV/node-xml2js)
- node-fb (https://github.com/node-facebook/facebook-node-sdk)

## Usage:
<code>node news.js</code><br>
Or if you want to keep it running, install forever-node<br>
<code>npm install -g forever</code><br>
<code>forever start news.js</code>
