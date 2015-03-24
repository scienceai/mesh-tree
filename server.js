var meshTreeFuncs = require('./index.js')
  , zmq = require('zmq')
  , prettyjson = require('prettyjson');

var responder = zmq.socket('rep');
const HOST = process.argv[2] || '127.0.0.1';
const PORT = 7770;
const ADDRESS = 'tcp://'+ HOST + ':' + PORT;
responder.bind(ADDRESS, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Listening for requests on ' + HOST + ' at port ' + PORT);
  }
});

responder.on('message', function (bufReq) {
  var starttime = new Date().getTime();
  var reqMsg = JSON.parse(bufReq.toString());
  console.log('Received job ' + reqMsg.job_id);
  console.log('...Job info: ');
  console.log(prettyjson.render(reqMsg));
  (meshTreeFuncs[reqMsg.taskname])(reqMsg.payload).then(function (result) {

    respObj = {
      error: false,
      result: result,
      job_id: reqMsg.job_id,
      elapsed_secs: (new Date().getTime() - starttime) / 1000
    };

    responder.send(new Buffer(JSON.stringify(respObj), 'utf8'));
    console.log('Completed job ' + reqMsg.job_id);
    console.log('...Result: ');
    console.log(prettyjson.render(respObj));

  }, function (err) {

    respObj = {
      error: true,
      result: 'ERROR: ' + err,
      job_id: reqMsg.job_id,
      elapsed_secs: (new Date().getTime() - starttime) / 1000
    };

    responder.send(new Buffer(JSON.stringify(respObj), 'utf8'));
    console.log('Failed job ' + reqMsg.job_id);

  });
});