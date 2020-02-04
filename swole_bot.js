if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const axios = require('axios');
const {BOT_ID, DOMAIN} = process.env

const workoutResponse = (name) => {
  axios.put(`${DOMAIN}/${name}/workouts`).then(
    (res) => {console.log(res)}
  ).catch(function (error) {
    console.log(error);
  });
res.end()
}

const respond = (req,res) => {
  console.log(`hit endpoint`)
  console.log(`req`, req.body)
      botRegex = /^\/workout$/

  if(req.body.text && botRegex.test(req.body.text)) {
    workoutResponse(req.body.name);
    this.res.end();
  } else {
    console.log("don't care");
    this.res.end();
  }
}



exports.respond = respond;