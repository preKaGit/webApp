const path = require('path')
const express = require('express')
const expressHandlebars = require('express-handlebars')
const expressSession = require('express-session')
const bodyParser = require("body-parser")
const redisStore = require('connect-redis')(expressSession)
const app = express()
const awilix = require('awilix')
const cors = require('cors')

/**
 * Validator paths
 */
const accountValidator = require('../business-logic-layer/account-validator')
const postValidator = require('../business-logic-layer/post-validator')
const commentValidator = require('../business-logic-layer/comment-validator')
const tokenValidator = require('../business-logic-layer/token-validator')
const apiMiddleware = require('./routers/api/api-middleware')
    /**
     * Manager paths
     */
const commentManager = require('../business-logic-layer/comment-manager')
const tokenManager = require('../business-logic-layer/token-manager')
const loginManager = require('../business-logic-layer/login-manager')
const postManager = require('../business-logic-layer/post-manager')
const accountManager = require('../business-logic-layer/account-manager')

/**
 * Database paths 
 */
//const commentRepository = require('../data-access-layer/sql/comment-repository')
//const accountRepository = require('../data-access-layer/sql/account-repository')
//const postRepository = require('../data-access-layer/sql/post-repository')
//const db = require('../data-access-layer/sql/db.js')

const db = require('../data-access-layer/sequelize/db')
const accountRepository = require('../data-access-layer/sequelize/account-repository')
const postRepository = require('../data-access-layer/sequelize/post-repository')
const commentRepository = require('../data-access-layer/sequelize/comment-repository')

/**
 * Router paths
 */
const variousRouter = require('./routers/various-router')
const accountRouter = require('./routers/account-router')
const apiRouter = require('./routers/api/api-router')
const apiPostRouter = require('./routers/api/post-router')
const apiAccountRouter = require('./routers/api/account-router')
const postRouter = require('./routers/post-router')

// Setup express-handlebars.
app.set('views', path.join(__dirname, 'views'))

/**
 * Dependency injection
 */
const container = awilix.createContainer()
container.register("postRepository", awilix.asFunction(postRepository))
container.register("db", awilix.asValue(db))
container.register("accountRepository", awilix.asFunction(accountRepository))
container.register("postManager", awilix.asFunction(postManager))
container.register("variousRouter", awilix.asFunction(variousRouter))
container.register("postRouter", awilix.asFunction(postRouter))
container.register("accountManager", awilix.asFunction(accountManager))
container.register("accountRouter", awilix.asFunction(accountRouter))
container.register("accountValidator", awilix.asFunction(accountValidator))
container.register("apiRouter", awilix.asFunction(apiRouter))
container.register("apiPostRouter", awilix.asFunction(apiPostRouter))
container.register("apiAccountRouter", awilix.asFunction(apiAccountRouter))
container.register("loginManager", awilix.asFunction(loginManager))
container.register("tokenManager", awilix.asFunction(tokenManager))
container.register("postValidator", awilix.asFunction(postValidator))
container.register("commentValidator", awilix.asFunction(commentValidator))
container.register("commentManager", awilix.asFunction(commentManager))
container.register("commentRepository", awilix.asFunction(commentRepository))
container.register("tokenValidator", awilix.asFunction(tokenValidator))
container.register("apiMiddleware", awilix.asFunction(apiMiddleware))



const theAccountRouter = container.resolve('accountRouter')
const theApiRouter = container.resolve('apiRouter')
const theApiPostRouter = container.resolve('apiPostRouter')
const theApiAccountRouter = container.resolve('apiAccountRouter')
const theVariousRouter = container.resolve('variousRouter')
const thePostRouter = container.resolve('postRouter')

app.engine('hbs', expressHandlebars({
    extname: 'hbs',
    defaultLayout: 'main',
    helpers: {
        ifEquals: function(val1, val2, options) {
            if (val1 == val2) {
                return options.fn(this)
            }
            return options.inverse(this)
        }
    },
    layoutsDir: path.join(__dirname, 'layouts')
}))

// Handle static files in the public folder.
app.use(express.static(path.join(__dirname, 'public')))



app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(cors())
app.use(bodyParser.json())
app.use(expressSession({
    secret: 'RCZSqqgEBDr38wdL7hG34kxi4hBfpgYv',
    resave: false,
    store: new redisStore({
        host: 'redis',
        port: 6379,
        ttl: 260
    }),
    saveUninitialized: false,
}))

app.use(express.urlencoded({
    extended: false
}))

/*  
    Attach routers
*/
app.use('/api/posts', theApiPostRouter)
app.use('/api/account', theApiAccountRouter)
app.use('/api', theApiRouter)


app.use('/', theVariousRouter)
app.use('/accounts', theAccountRouter)
app.use('/posts', thePostRouter)


// Start listening for incoming HTTP requests!
app.listen(8080, function() {
    console.log('Running on 8080!')
})


app.use(function(request, response, next) {
    if (response.status(404)) {
        response.send('404: File Not Found :(')
    }
})