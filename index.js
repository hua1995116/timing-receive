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
        msg: query.msg,
        line: query.line,
        col: query.col,
        stack: query.stack,
      }
    } else if(query.target === 'resourceError'){
      return {
        outerHTML: query.outerHTML,
        tagName: query.tagName,
        id: query.id,
        className: query.className,
        path: query.path,
        selector: query.selector,
      }
    }
  }
}

app.get('/getPef', function(req, res) {
  if(!req.query.t) {
    res.json({
      msg: 'type丢失'
    });
  }
  logger.error({
    type: req.query.t,
    name: 'vla',
    num: parseInt(100*Math.random())
  });
  res.json({
    msg: '成功'
  });
})

app.get('/getInfo', function(req, res) {
  if(!req.query.t) {
    res.json({
      msg: 'type丢失'
    });
  }
  // console.log(req.query.t);
  const {target, type, file, page, system, mobile, ua, protocol, network, time, client} = req.query;
  const log = connect[req.query.t](req.query);
  let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  logger.error(extend(log, {
    target,
    type,
    file,
    page,
    system,
    mobile,
    ua,
    protocol,
    network,
    createtime: time,
    client,
  }));
  res.json({
    msg: '成功'
  });
})

app.use(express.static('./'));
const server = app.listen(7788);
