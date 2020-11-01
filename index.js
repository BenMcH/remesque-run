const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

var express = require('express')
var cors = require('cors');

var app = express();
app.use(cors());

const jsExt = '.js';

const functions = {}

const walkDir = (dir) => {
  fs.readdirSync(dir).forEach( f => {
    let dirPath = path.join(dir, f);
    const info = fs.statSync(dirPath)
    const isDirectory = info.isDirectory();

    const fullPath = dirPath.slice(dirPath.indexOf('/'), dirPath.length);
    const directories = fullPath.split('/').filter(({length}) => length > 0);

    let currentDirectory = functions;

    directories.slice(0, directories.length - 1).forEach((directory) => {
      if (!currentDirectory[directory]) {
        currentDirectory[directory] = {}
      }
      currentDirectory = currentDirectory[directory];
    });


    if (isDirectory) {
        walkDir(dirPath);
    } else {
      if (fullPath.endsWith(jsExt)) {
        const fileName = path.basename(fullPath);
        const fileNameWithoutJs = fileName.slice(0, fileName.length - jsExt.length);

        currentDirectory[fileNameWithoutJs] = require(`./${dirPath}`);
      }
    }
  });
};

walkDir('./loaders');

const getFunc = (path) => {
  const routes = path.split('/').filter(({length}) => length > 0);

  let obj = functions;

  const params = {}

  routes.forEach((route) => {
    if (obj[route]) {
      obj = obj[route];
    } else {
      const keys = Object.keys(obj);
      const wildcard = keys.find((key) => key.startsWith('$'));

      if (!wildcard) {
        return null;
      };

      params[wildcard.slice(1)] = route;
      obj = obj[wildcard];
    }
  });

  if (typeof obj === 'function') {
    return obj.bind(null, params);
  }

  return null;
}

app.get('*', async (req, res) => {
  const searchKey = querystring.unescape(req.path);
  
  const func = getFunc(searchKey);
  console.log({func});
  if (func) {
    res.status(200).send(await func(req));
  } else {
    res.status(404).send(`${req.path} not found`);
  }
})

app.listen(8080, function () {
  console.log('CORS-enabled web server listening on port 8080')
})
