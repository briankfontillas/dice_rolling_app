const HTTP = require('http');
const URL = require('url').URL;
const PORT = 3000;

//add functionality to roll multiple die based off number argument
  //declare number of rolls to be initialized to the value of rolls from the URL
  //within a loop, invoke the dieroll function until we reach that amount
//add functionality to roll specific number die
  //change max to variable

function dieRoll(min, max) {
  return Math.floor(Math.random() * (max - min + 1));
}

const SERVER = HTTP.createServer((req, res) => {
  let method = req.method;
  let path = req.url;
  let origin = `http://localhost${PORT}`;
  const myURL = new URL(path, origin);
  const params = myURL.searchParams;

  if (path === '/favicon.ico') {
    res.statusCode = 404;
    res.end();
  } else {
    let count = 0;
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    
    while (count < params.get('rolls')) {
      let content = dieRoll(1, params.get('sides'));
      res.write(`${content}\n`);
      count += 1;
    }
    res.write(`${method} ${path}\n`);
    res.end();
  }

});

SERVER.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
})