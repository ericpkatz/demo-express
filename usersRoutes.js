const app = require('express').Router();

const users = [
  { id: 1, name: 'Moe' },
  { id: 2, name: 'Larry' },
];

module.exports = app;

app.post('/', (req, res, next)=> {
  if(!req.body.name){
    //return res.status(500).send('there was an error'); 
    return next('You must send a name');
  }
  users.push({ name: req.body.name, id: Math.random()});
  res.redirect('/users');
});

app.get('/', (req, res, next)=> {
  res.send(`
    <html>
      <body>
        <h1>My Express App</h1>
        <a href='/'>Home ${ Math.random() }</a>
        <a href='/users'>Users</a>
        <h2>Users</h2>
        <form method='POST'>
          <input name='name' />
          <button>Create</button>
        </form>
        <ul>
          ${
            users.map( user => `<li><a href='/users/${user.id}'>${user.name}</a></li>`).join('')
          }
        </ul>
      </body>
    </html>
  `);
});

app.get('/:id', (req, res, next)=> {
  res.send(`
    <html>
      <body>
        <h1>My Express App</h1>
        <a href='/'>Home ${ Math.random() }</a>
        <a href='/users'>Users</a>
        <h2>Users</h2>
        <ul>
          ${
            users.filter(user => user.id === req.params.id*1).map( user => `<li><a href='/users/${user.id}'>${user.name}</a></li>`).join('')
          }
        </ul>
      </body>
    </html>
  `);
});
