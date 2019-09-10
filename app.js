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

const readFileJSON = async(file) => {
  const jsonString = await readFile(file);
  return JSON.parse(jsonString);
}

const server = http.createServer( async (request, response)=> {
  try {
    if(request.url === '/') {
      //if(request.method === 'GET'){
        const html = await readFile('./index.html');
        response.write(html);
        response.end();
     // }
    }
    else if (request.url === '/api/guests'){
      console.log('helloooo')
      const guests = await readFileJSON('./guests.json');
      response.write(JSON.stringify(guests));
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
