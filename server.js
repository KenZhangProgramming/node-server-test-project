const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


const port = process.env.PORT || 3000
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine','hbs');
//use built in middle ware
app.use(express.static(__dirname + '/public'));


// Keep track of the status of the sever by using app.use
app.use((req,res,next)=>{
	var now = new Date().toString();

	var log = `${now}: ${req.method} ${req.url}`;
	
	console.log(log);
	fs.appendFile('sever.log', log + '\n',(err)=>{
		if(err){
			console.log('Unable to append to sever.log.')
		}
	});
	next();
});


app.use((req,res,next)=>{
	var now = new Date().toString();

	var log = `${now}: ${req.method} ${req.url}`;

	// This middle ware controls the response to be the maintainance page.	
	res.render('maintainance.hbs',{
		pageTitle: 'Maintainance Page',
		welcomeMsg: 'Welcome to be fixed' 
	});

	console.log(log);
	fs.appendFile('sever.log', log + '\n',(err)=>{
		if(err){
			console.log('Unable to append to sever.log.')
		}
	});
});






hbs.registerHelper('getCurrentYear',()=>{
	//new Date().getFullYear()
	return 'TEST';
});


app.get('/', (req, res) => {
	//res.send('<h1>Hello Express</h1>');
	res.render('home.hbs',{
		pageTitle: 'Home Page',
		welcomeMsg: 'Welcome to Ken Website' 
	});
});

app.get('/about',(req,res)=>{
	res.render('about.hbs',{
		pageTitle: 'About Page',
	});
});


// /bad - send back json with errorMsg 


app.get('/bad',(req,res)=>{res.send(
	{
		name: 'Bad Request',
		properties:[
		'Syntax Error',
		'There is a bug!']
	}
	)});



app.listen(port,() => {console.log(`Sever is up on port ${port}`)});







