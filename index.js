const express = require('express');
const app = express();
const router = express.Router();
const logger = require('./log');
const {extend} = require('./utils/index')

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
  // res.header("Content-Type", "application/json;charset=utf-8");  
  next();  
});  

const connect = {
  error: function(query) {
    if(query.target === 'scriptError') {
      return {
        target: query.target,
        msg: query.msg,
        file: query.file,
        line: query.line,
        col: query.col,
        stack: query.stack,
        page: query.page,
        type: query.type,
        system: query.system,
        mobile: query.mobile,
        ua: query.ua,
        protocol: query.protocol,
        network: query.network,
        time: query.time
      }
    } else if(query.target === 'resourceError'){
      return {
        target: query.target,
        type: query.type,
        file: query.file,
        page: query.page,
        outerHTML: query.outerHTML,
        tagName: query.tagName,
        id: query.id,
        className: query.className,
        path: query.path,
        selector: query.selector,
        system: query.system,
        mobile: query.mobile,
        ua: query.ua,
        protocol: query.protocol,
        network: query.network,
        time: query.time
      }
    }
    
  }
}

app.get('/getInfo', function(req, res) {
  // console.log(req.url);
  if(!req.query.t) {
    res.json({
      msg: 'type丢失'
    });
  }
  console.log(req.query.t);
  const log = connect[req.query.t](req.query);
  let user_ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  logger.error(extend(log, {ip: user_ip}));
  res.json({
    msg: '成功'
  });
})

app.use(express.static('./'));
const server = app.listen(7788);
