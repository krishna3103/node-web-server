const express 	= require('express');
const hbs 		= require('hbs');
const fs 		= require('fs');
const port 		= process.env.PORT || 3000;

var app 		= express();

hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screemIt', (text) => {
	return text.toUpperCase();
});

app.set('view engine', 'hbs');

//this is when we call html extention file using handlebas
//app.set('view engine', 'html');
//app.engine('html', require('hbs').__express);
app.use(express.static(__dirname+'/public'));

app.use((req,res,next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;

	console.log(log)

	fs.appendFile('server.log', log + '\n',(err) => {
		if(err){
			console.log('Error while printing into file.');
		}
	});
	next();
});

// app.use((req,res,next) => {
// 	res.render('maintenance.hbs', {
// 		pageTitle : 'Under Maintenance'
// 	});

// });


app.get('/', (req, res) => {
	res.render('home.hbs', {
		name : 'Krishna',
		age : 29,
		hobby : 'Cricket',
		pageTitle : 'Home page'
	});
});

app.get('/about', (req,res) => {
	res.render('about.hbs', {
		pageTitle : 'About Page'
	});
});

app.get('/bad', (req,res) => {
	res.send({
		error:'Somthing went wrong!'
	});
});

app.listen(port, () => {
	console.log(`Server is running in port ${port}`);
});