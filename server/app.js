var express = require('express');
var app = express();
var path = require('path');
var port = 5000;

app.use(express.static('server/public'));

app.get('/',function(req,res) {
  res.sendFile(path.resolve('server/public/views/index.html'));
});

app.get("/data/:operand1/:operand2/:operator",function(req,res) {
  console.log(req.params);
  console.log(req.params.operand1,req.params.operator,req.params.operand2);

  var result;
  var operand1 = parseInt(req.params.operand1);
  var operand2 = parseInt(req.params.operand2);

  switch (req.params.operator) {
    case "add":
        result = operand1 + operand2;
      break;
    case "subtract":
        result = operand1 - operand2;
      break;
    case "multiply":
        result = operand1 * operand2;
      break;
    case "divide":
        result = operand1 / operand2;
      break;
  }

  console.log('Result is', result);
  res.send({result: result});
});

app.listen(port);
console.log('Listening on port: ', port);
