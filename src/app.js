const express = require('express');
const bodyParser = require('body-parser');
const app = express ();
const ejs= require('ejs');
const { Client } = require('pg')
const client = new Client({
	database: 'bulletinboard',
  host: 'localhost',
  user: process.env.POSTGRES_USER,
  port: 5433
})

app.set('view engine', 'ejs');
app.set('views', 'src/views')
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true }));

client.connect();

app.get('/', function(request,response){
  response.render('index')
});

app.post('/', function(request,response){
	console.log("lol");

    let titlef= request.body.title;
    let textf = request.body.textinput;
    client.query(`insert into messages (title, body) values  ('${titlef}','${textf}')`, (err, result) => {
      console.log(err ? err.stack : 'message inserted')
    response.redirect('vmes')
  });
});

app.get('/vmes', function(request,response){
	client.query(`select * from messages`,(err,result)=>{
		console.log(err ? err.stack : 'displaying database')
		let data= result.rows

  response.render('vmes',{data:data})
});
});



app.listen(3000, ()=>{
  console.log("using port 3000")
});
