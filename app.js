const fs = require('fs');
const http = require('http');

const readFile = (file)=> {
  return new Promise((resolve, reject)=> {
    fs.readFile(file, (err, data)=> {
      if(err){
        reject(err);
      }
      else {
        resolve(data.toString());
      }
    });
  });
}

const server = http.createServer( async (request, response)=> {
  try {
    if(request.url === '/') {
      const html = await readFile('./index.html');
      response.write(html);
      response.end();
    }
  }
  catch(ex){
    response.statusCode = 500;
    response.write(ex.message);
    response.end();
  }
});

server.listen(3000);
