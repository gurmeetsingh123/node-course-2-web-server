const express = require ('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT|| 3000;
var app = express();
 
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs')


app.use((req, res, next) =>{
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	//console.log(log);
	fs.appendFile('server.log',log + '\n',(err)=>{
		if(err) {
			console.log('unable to append')
		}
	});
 next();
});

//app.use((req, res, next) =>{
//	res.render('maintain.hbs');
//});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getcurrentyear',() => {
	return new Date().getFullYear()
});

hbs.registerHelper('uppercase',(text) => {
	return text.toUpperCase();
});
app.get('/', (req, res) => {
	//res.send('<h1>hello express <h1>');
	res.render ('home.hbs',{
		pagetitle: 'home page',
		welcomemsg: 'welcome to the home page',
		
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs',{
		pagetitle: 'about page',

	});
});
 app.get('/bad', (req, res) =>{
 	res.send({
 		error: 'error occured'
 	});
 });
app.listen(port, () =>{
	console.log(`server is up on ${port}`);
});