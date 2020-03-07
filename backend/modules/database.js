/* Immuto Web App Template | (c) Immuto, Inc. and other contributors */

var sessionPlaceholder = {} // in place of database to query

exports.add_session = (authToken, userInfo) => {
    return new Promise((resolve, reject) => {
        sessionPlaceholder.authToken = userInfo
        resolve()
    })
}

exports.delete_session = (authToken, userInfo) => {
    return new Promise((resolve, reject) => {
        sessionPlaceholder.authToken = undefined
        resolve()
    })
}

exports.get_user_session = (authToken, userInfo) => {
    return new Promise((resolve, reject) => {
        resolve(sessionPlaceholder.authToken)
    })
}