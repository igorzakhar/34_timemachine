# Timer for Websites That Steal Your Time

This project helps to control time was spent on sites. It requires special extension for Chrome browser.

# Installing

Install extension for Chrome browser [Custom JavaScript for websites](https://chrome.google.com/webstore/detail/custom-javascript-for-web/poakhlngfciodnhlhhgnaaelnpjljija).

Open configuration of [cjs](https://chrome.google.com/webstore/detail/custom-javascript-for-web/poakhlngfciodnhlhhgnaaelnpjljija) browser extension on the site you want to controll. Click on the link "your own external scripts", add path [https://cdn.rawgit.com/igorzakhar/34_timemachine/725e2b4b/index.js](https://cdn.rawgit.com/igorzakhar/34_timemachine/725e2b4b/index.js). Don't forget to press "enable cjs for this host" to enable custom JS.  

After that you will see a countdown timer in top-left corner of web page. At the expiration of 3 minutes script will show a message with motivational and inspirational quotes every 30 seconds.

For faster development you can use JS code hosted on localhost. Simple web server can be used for that, run:

```bash

python3 -m http.server
```

Add path `http://localhost:8000/index.js` to [cjs](https://chrome.google.com/webstore/detail/custom-javascript-for-web/poakhlngfciodnhlhhgnaaelnpjljija) browser extension. Done.


# Project Goals

The code is written for educational purposes. Training course for web-developers - [DEVMAN.org](https://devman.org)
