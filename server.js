/**
 * Professor: Update your Mongodb connection string here or pass in environment variable MONGODB_URL=...
 */
const MONGODB_URL = "mongodb+srv://ann1271:austin1271@cluster0.qif3q.mongodb.net/A2?retryWrites=true&w=majority";

const express = require('express')
const hbs = require('express-handlebars')
const { logger, listRoutes, logMiddleware } = require('./utils')

const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.port ?? 8889



const bookController = require('./controllers/book.controller')
const userController = require('./controllers/user.controller')
const borrowController = require('./controllers/borrow.controller')


/**
 * Connect to Mongodb instance
 */
require('./services/mongo.service')(MONGODB_URL)

/**
 * Templating
 */
app.engine('handlebars', hbs.engine())
app.set('view engine', 'handlebars')


/**
 * Middleware
 */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(logMiddleware)


 let numUsers = 0;
 

 io.on('connection',  function(socket)  {
  socket.on('join', function(room) {
    socket.join(room);
     });
   let addedUser = false;

   socket.on('new message', (data) => {
     socket.broadcast.emit('new message', {
       username: socket.username,
       message: data
     });
   });
 
   
   socket.on('add user', (username) => {
     if (addedUser) return;
 
  
     socket.username = username;
     ++numUsers;
     addedUser = true;
     socket.emit('login', {
       numUsers: numUsers
     });

     socket.broadcast.emit('user joined', {
       username: socket.username,
       numUsers: numUsers
     });
   });

   socket.on('disconnect', () => {
     if (addedUser) {
       --numUsers;
 

       socket.broadcast.emit('user left', {
         username: socket.username,
         numUsers: numUsers
       });
     }
   });
 });
 app.post('/forum', function(req, res){
 

  res.render('forum');
})

app.get('/joinChat', function(req, res) {
  res.render('joinChat');
})

app.get('/forumList', bookController.forumListed)



app.get('/', function(req, res){
 
   
    res.render('welcome');
})

  app.get('/createUser', function(req, res) {
    res.render('createUser');
  
  })

  app.post('/submit-user', userController.create)


  app.get('/viewUsers', userController.index)


  app.get('/findUser', function(req, res) {
    res.render('findUser');
  
  })

app.post('/foundUser', userController.show)


  app.get('/updateUser', function(req, res) {
    res.render('updateUser');
  
  })

app.post('/updated-user', userController.update)


  app.get('/deleteUser', function(req, res) {
    res.render('deleteUser');
  
  })
  app.post('/deleted-user', userController.destroy)

  
  app.get('/createBook', function(req, res) {
    res.render('createBook');
  
  })

  app.post('/submit-book', bookController.create)




  app.get('/viewBooks', bookController.index)

 app.get('/findBook', function(req, res) {
    res.render('findBook');
  })
  app.post('/foundBook', bookController.show)




  app.get('/updateBook', function(req, res) {
    res.render('updateBook');
  
  })


  app.post('/updated-book', bookController.update)


  app.get('/deleteBook', function(req, res) {
    res.render('deleteBook');
  
  })
  app.post('/deleted-book', bookController.destroy)

app.get('/viewBorrowed', function(req, res){
  res.render('viewBorrowed')
})

app.post('/foundBorrowed', userController.showBorrowed)

app.get('/borrowBook', function(req, res){
  res.render('borrowBook')
})
app.post('/borrow-process', borrowController.borrow)

app.get('/returnBook', function(req, res){
  res.render('returnBook')
})

app.post('/return-process', borrowController.returnBook)


app.get('/', (_, res) => res.send(listRoutes(app._router.stack)))
http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
module.exports = app
