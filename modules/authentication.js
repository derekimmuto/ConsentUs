/* Immuto Web App Template | (c) Immuto, Inc. and other contributors */

var DB = require("./database.js")
var utils = require("./utils.js")
var cookie = require('cookie')


exports.create_user_session = (authToken, userInfo, res) => {
    return new Promise((resolve, reject) => {

        res.setHeader('Set-Cookie', cookie.serialize('authToken', authToken, {
            httpOnly: true,
            maxAge: 86400, // 1 day in seconds
        }));

        if (process.env.mode === "PROD") {
            res.setHeader('Set-Cookie', cookie.serialize('credential', credential, {
                httpOnly: true,
                maxAge: 86400, // 1 day in seconds
                sameSite: 'strict',                
                secure: true // false in DEV mode only
            })); 
        }

        DB.add_session(authToken, userInfo).then(() => {
            resolve()
        }).catch((err) => {
            reject(err)
        })
    })
}

exports.end_user_session = (req) => {
    return new Promise((resolve, reject) => {
        let authToken = get_auth_token(req)

        if (!authToken) {
            resolve()
            return
        }

        DB.delete_session(authToken).then(() => {
            resolve()
        }).catch((err) => {
            reject(err)
        })
    })
}

exports.user_logged_in = (req) => {
    return new Promise((resolve, reject) => {
        let authToken = get_auth_token(req)

        if (!authToken) {
            resolve(false)
            return
        }

        DB.get_user_session(authToken).then((sessionInfo) => {
            if (sessionInfo) {
                resolve(sessionInfo)
            } else {
                resolve(false)
            }
        }).catch((err) =>  {
            reject(err)
        })
    })
}

function get_auth_token(req) {
    let cookies = (cookie.parse(req.headers.cookie || ''));
    if (!(utils.is_empty(cookies))) {
        if (cookies.authToken) {
            return cookies.authToken
        }
    }
    if (req.query) {
        if (req.query.authToken) {
            return req.query.authToken 
        }
    }
    if (req.body) {
        if (req.body.authToken) {
            return req.body.authToken
        }
    }
    return undefined
}