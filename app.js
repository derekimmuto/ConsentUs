/* Immuto Web App Template | (c) Immuto, Inc. and other contributors */
var express = require('express');
var path = require('path')
var bodyParser = require('body-parser')
var immuto = require('immuto-backend')
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

/* Project Modules */
var auth = require(path.join(__dirname, 'modules', 'authentication.js'))
var DB = require(path.join(__dirname, 'modules', 'database.js'))

const DEFAULT_PORT = 8001
const IMMUTO_HOST = process.env.IMMUTO_HOST || "https://dev.immuto.io" // dev env default 

var app = express();
var im = immuto.init(true, IMMUTO_HOST) // leave blank for production use


app.use(express.static(path.join(__dirname, 'static')));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json()) 


if (process.env.MODE !== "PROD") {
    console.warn("Running in test/debug mode")
}


/******************************* Website Pages ********************************/
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', "html", 'index.html'));
})

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', "html", 'register.html'));
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', "html", 'login.html'));
})

app.get('/logout', (req, res) => {
    auth.end_user_session(req).then(() => {
        res.redirect('/login')
    }).catch((err) => {
        console.error(err)
        res.status(500).end()
    })
})

app.get('/dashboard', (req, res) => {
    auth.user_logged_in(req).then((userInfo) => {
        if (userInfo) {
            res.sendFile(path.join(__dirname, 'static', "html", 'dashboard.html'));
        } else {
            res.redirect('/login')
        }
    }).catch((err) => {
        console.error(err)
        res.status(500).end()
    })
})

app.get('/tables', (req, res) => {
    auth.user_logged_in(req).then((userInfo) => {
        if (userInfo) {
            res.sendFile(path.join(__dirname, 'static', "html", 'tables.html'));
        } else {
            res.redirect('/login')
        }    
    }).catch((err) => {
        console.error(err)
        res.status(500).end()
    })
})

app.get('/file-upload', (req, res) => {
    auth.user_logged_in(req).then((userInfo) => {
        if (userInfo) {
            res.sendFile(path.join(__dirname, 'static', "html", 'file_upload.html'));
        } else {
            res.redirect('/login')
        }    
    }).catch((err) => {
        console.error(err)
        res.status(500).end()
    })
})

/************************************ API *************************************/
app.post("/register-org-user", (req, res) => {
    // validate appropriately before use
    // restrict registration as needed 
    let email = req.body.email 

    var http = new XMLHttpRequest()
    let sendstring = "email=" + email.toLowerCase()
    sendstring += "&noEmail=true" // Causes API to respond with authToken rather than emailing user
    sendstring += "&authToken=" + im.authToken // org admin authToken for permissioning new user registration
    http.open("POST", IMMUTO_HOST + "/submit-org-member", true)
    http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    http.onreadystatechange = () => {
        if (http.readyState == 4 && http.status == 200) {
            let regToken = http.responseText
            
            DB.add_new_user(userInfo).then(() => {
                res.end(regToken)
            }).catch((err) => {
                console.error(err)
                res.status(500).end()
            })

        } else if (http.readyState == 4) {
            res.status(http.status).end(http.responseText)
        }
    }
    http.send(sendstring)
})

app.post("/login-user", (req, res) => {
    user_logged_in_immuto(req.body.authToken).then((userInfo) => {
        if (!userInfo) {
            res.status(403).end()
            return;
        }

        // only accept Immuto accounts associated with Metrodora
        DB.get_user_info(userInfo.email).then((consentsusInfo) => {
            if (consentsusInfo) {
                auth.create_user_session(req.body.authToken, userInfo, res).then(() => {
                    res.status(204).end()
                }).catch((err) => {
                    console.error(err)
                    res.status(500).end("Internal error.") // more info if appropriate
                })
            } else {
                res.status(403).end("A Consentsus account does not exist with that email.")
            }
        }).catch((err) => {
            console.error(err)
            res.status(500).end()
        })

    }).catch((err) => {
        if (err.code && err.code == 403) {
            res.status(403).end("Unauthorized.")
        } else {
            res.status(500).end("Internal error.") // more info if appropriate
        }
    })
})

/* APP Middleware */
app.use(function(req, res, next){
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'static', "html", '404.html'));
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});



/***************************** Utility Functions ******************************/
function user_logged_in_immuto(authToken) {
    return new Promise((resolve, reject) => {
        var http = new XMLHttpRequest()

        let sendstring = "authToken=" + authToken
        http.open("POST", IMMUTO_HOST + "/verify-user-authentication", true)
        http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
        http.onreadystatechange = () => {
            if (http.readyState == 4 && http.status == 200) {
                try {
                    let userInfo = JSON.parse(http.responseText)
                    resolve(userInfo)
                } catch(err) {
                    reject(err)
                }
            } else if (http.readyState == 4) {
                let response = {
                    responseText: http.responseText,
                    code: http.status
                }
                reject(response)
            }
        }
        http.send(sendstring)
    })
}

function get_credentials() {
    credentials = {}
    if (process.env.EMAIL && process.env.PASSWORD) {
        credentials.email = process.env.EMAIL
        credentials.password = process.env.PASSWORD
        return credentials
    } else {
        console.error("You must set EMAIL and PASSWORD env variables.")
        process.exit()
    }
}


/* APP START */
let cred = get_credentials()
console.log("Authenticating admin Immuto account.")
im.authenticate(cred.email, cred.password).then(() => { // authentication lasts 24 hours
    console.log("Authentication successful. Starting web server.")
    DB.establish_connection().then(() => {
        console.log("Connected to MongoDB");
        app.listen((process.env.PORT || DEFAULT_PORT), function() {
            console.log('Node app is running on port: ' + (process.env.PORT || DEFAULT_PORT));
        });
    }).catch((err) => {
        console.error(err)
        process.exit(1)
    })
}).catch((err) => {
    console.error("Error authenticating admin Immuto account:")
    console.error(err)
})



// Deauthenticate on server shutdown
process.on('SIGINT', function() {
    im.deauthenticate().then(() => {
        console.log("Successfully logged out of Immuto before exiting!");
        process.exit();
    }).catch((err) => {
        console.error(err)
        process.exit();
    })
});
