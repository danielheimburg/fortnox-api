# Simple Fortnox API Client in NodeJS

This is a simple api client for fortnox written in NodeJS. It will require you to keep track of your tokens with a database, cookie or cacheserver. You will also need to keep track of the token expiration and refresh it.

This module uses OAuth2 for authentication which is the only authentication method available for new instances of Fortnox applications now.

See APIDocs @ https://apps.fortnox.se/apidocs

## Usage
```javascript
var FortnoxAPI = require('fortnox')
var fortnox = new Fortnox(clientSecret)
fortnox.dispatch(accessToken, 'get', 'invoices', null)
fortnox.dispatch(accessToken, 'put', 'invoices', 'Invoice': { CustomerNumber: 1 })
```
To activate and recieve your access_token use
```javascript
fortnox.activate(access_code, redirectUrl)
```
To exchange a refresh_code for access_code use
```javascript
fortnox.refreshToken(refreshToken)
```
To send API calls use
```javascript
fortnox.dispatch(accessToken, requestMethod, entity, body)
```