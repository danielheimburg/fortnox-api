# Simple Fortnox API Client in NodeJS

This is a simple api client for fortnox written in NodeJS using the axios library. It will require you to keep track of your tokens with a database, cookie or cacheserver. You will also need to refresh the access_token when it expires.

This module uses OAuth2 for authentication and supports Fortnox API v3. See Fortnox APIDocs @ https://apps.fortnox.se/apidocs

This implementation only have the functions I needed for the API. If you need something else let me know.

## Usage
```javascript
var FortnoxAPI = require('fortnox')
var fortnox = Fortnox('clientId', 'clientSecret')
fortnox.dispatch(accessToken, 'get', 'invoices', null)
fortnox.dispatch(accessToken, 'put', 'invoices', { 'Invoice': { CustomerNumber: 1 } })
```
To activate and recieve your refresh_token & access_token use
```javascript
fortnox.activate(access_code, redirectUrl)
```
To exchange a refresh_token for access_token after expiration use
```javascript
fortnox.refreshToken(refreshToken)
```
To send API calls use
```javascript
fortnox.dispatch(accessToken, requestMethod, entity, body)
```
To traverse several pages take a look at getCustomerNumber that traverses all users until a customer with matching input email is found
```javascript
fortnox.getCustomerNumber(accessToken, email)
```