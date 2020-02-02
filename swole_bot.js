const HTTPS = require('https');
const botID = require('./config');

const workoutRespose = () => {
    const botResponse = `Yay for workouts`
    const options = {
        hostname: 'api.groupme.com',
        path: '/v3/bots/post',
        method: 'POST'
    }
    const body = {
        "bot_id": botID,
        "text": botResponse,
    }

    console.log(`senging reply`)

    bot = HTTPS.request(options, (res) =>{
        if (res.statusCode === 202){
            //coool
        }
        console.log('rejecting bad status code ' + res.statusCode);
    })
    botReq.on('error', function(err) {
        console.log('error posting message '  + JSON.stringify(err));
      });
      botReq.on('timeout', function(err) {
        console.log('timeout posting message '  + JSON.stringify(err));
      });
      botReq.end(JSON.stringify(body));
}

const respond = () => {
  const request = JSON.parse(this.req.chunks[0]),
      botRegex = /^\/workout$/;

  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    workoutRespond();
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}



exports.respond = respond;