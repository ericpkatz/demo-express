const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 3000;


console.log(express.urlencoded().toString());
app.use(express.urlencoded());

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use((req, res, next)=> {
  console.log(req.url);
  req.foo = 'bar';
  next();
});

app.get('/', (req, res, next)=> {
  res.send(`
    <html>
      <head>
        <link rel='stylesheet' href='/assets/styles.css' />
      </head>
      <body>
        <h1>My Express App</h1>
        <a href='/'>Home ${ Math.random() }</a>
        <a href='/users'>Users</a>
        <h2>Home Page</h2>
      </body>
    </html>
  `);
});


app.use('/users', require('./usersRoutes'));
app.listen(port, ()=> console.log(`listening on port ${port}`));
