const express = require('express');
const app = express();
const router = express.Router();
const logger = require('./log');

router.get('/', function (req, res, next) {
  req.url = './index.html';
  next();
});
app.use(router);

app.all('*', function(req, res, next) {  
  res.header("Access-Control-Allow-Origin", "*");  
  res.header("Access-Control-Allow-Headers", "X-Requested-With");  
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
  res.header("X-Powered-By",' 3.2.1')  
  res.header("Content-Type", "application/json;charset=utf-8");  
  next();  
});  

app.get('/getInfo', function(req, res) {
  console.log(req.url);
  let user_ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(user_ip);
  logger.error({
    a: 1,
    b: 1
  })
  res.json();
})

app.use(express.static('./'));
const server = app.listen(7788);
