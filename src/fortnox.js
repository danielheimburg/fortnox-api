const qs = require('qs')
const axios = require('axios')

function FortnoxAPI(secret) {
    this.secret = secret
}

FortnoxAPI.prototype.refreshToken = function (refreshToken) {

    return axios.post(`https://apps.fortnox.se/oauth-v1/token`,
        qs.stringify({
            'refresh_token': `${refreshToken}`,
            'grant_type': 'refresh_token'
        }), {
        headers: {
            'Authorization': `Basic ${this.secret}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(response => {
        response.data.timestamp = new Date()
        return response.data
    }).catch(error => {
        throw error
    })
}

FortnoxAPI.prototype.dispatch = function (accessToken, requestMethod, entity, body) {

    return axios({
        method: `${requestMethod}`,
        url: `https://api.fortnox.se/3/${entity}`,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }, data: body,
    }).then(response => {
        return response.data
    }).catch(error => {
        throw error
    })
}

FortnoxAPI.prototype.activate = function (code, redirect) {
    return axios.post(`https://apps.fortnox.se/oauth-v1/token`,

        qs.stringify({
            'code': code,
            'grant_type': 'authorization_code',
            'redirect_uri': redirect
        }), {
        headers: {
            'Authorization': `Basic ${this.secret}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(response => {
        response.data.timestamp = new Date()
        return response.data

    }).catch(error => {
        throw error
    })
}

FortnoxAPI.prototype.getCustomerNumber = async function (accessToken, email) {

    let pagination = { curPage: 1, maxPage: 1 }

    while (pagination.curPage <= pagination.maxPage) {
        let payload = await this.dispatch(accessToken, 'get', 'customers?page=' + pagination.curPage, null).catch(error => {
            throw error
        })

        pagination.maxPage = Number.parseInt(payload.MetaInformation['@TotalPages'])
        pagination.curPage++

        let customer = payload.Customers.find((customer) => customer.Email.toLowerCase() == email.toLowerCase())

        if (customer?.CustomerNumber)
            return customer.CustomerNumber
    }

    return -1
}

module.exports = FortnoxAPI