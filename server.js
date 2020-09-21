const express = require('express')
const bodyParser = require('body-parser')
const model = require('./models/index.js');
const point = require('./models/location.js');
const app = express()
const port = 3050
//const  sequelize = require('./database/config');
//const mysql = require('mysql');

// Get the Host from Environment or use default
const host = process.env.DB_HOST || 'localhost';
// Get the User for DB from Environment or use default
const user = process.env.DB_USER || 'root';

// Get the Password for DB from Environment or use default
const password = process.env.DB_PASS || '';

// Get the Database from Environment or use default
const database = process.env.DB_DATABASE || 'map';


app.use(bodyParser.json())
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
})

app.get('/', (req, res) => 
{
  console.log(req)
  res.send('Hello World!')
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

function addPoint(point, id) {
  var status = {};
  //for (index = 0; index < points.length; ++index) {
    model.location.create({location_id:(id), lng:parseFloat(point.lng),
      lat:parseFloat(point.lat), date: point.time})
     .then((result)=> {
       status.status = 200;
       status.response = result
       //res.status(200).send(result)
     })
     .catch((error)=>{
       console.log(error)
       status.status = 400
       status.response = error
       //res.status(400).send(error)
     })
  //}
  return status
}


app.post('/locations', (req, res) => {
  var status, response;
  const points = req.body.markers;
  //console.log(req.body)
  (async () => {
    console.log("hello")
    for (index = 0;index < points.length; ++index){
      status = await addPoint(points[index], req.body.id)
    }
    
})();
  
})

app.post('/getPoints', (req,res) => {
  model.location.findAll({
    where :{
      location_id: req.body.location_id
    },
  })
  .then((result) =>{
    res.status(200).send(result)
  })
  .catch((error) =>{
    res.status(400).send(error)
  })
})

app.all('/ping', (req, res) => res.send(+new Date()))
