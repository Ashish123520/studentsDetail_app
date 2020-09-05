const express=require("express");
const bodyParser=require('body-parser');
const app = express();
// const path = require('path');
const exphbs=require("express-handlebars")
const session = require('express-session');
const methodOverride=require('method-override')
const {formatDate,truncate}=require('./helpers/hbs')
// const{ isLoggedIn,ensureGuest}=require('./middelwere/auth')
const authenticateController=require('./controllers/authenticate-controller');
const addDetails=require('./controllers/add_details');
const Details=require('./controllers/show_details');
const connection = require('./config');


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: true
}));

app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method
      delete req.body._method
      return method
    }
  }))
  


app.engine(".hbs",exphbs({helpers:{formatDate,truncate},defaultLayout:"main",extname:".hbs"}))
app.set("view engine",".hbs")


app.get("/",(req,res)=>{
    res.render('login')
    })

/* route to handle login and registration */
app.post('/auth',authenticateController.authenticate)

app.get('/dashboard',function(request, response) {
     var user=request.session.user;
     var userId=request.session.userId;
     console.log(userId,user)
     if(user&&userId!=null)
     {
        connection.query('SELECT * FROM uni_details',function(error,details)
    {
     if (error) {
         res.json({
             status:false,
             message:'there are some error with query'
         })
       }else{
		response.render('dashboard',{
            Username:user,
            details
        });
        
    }
})
     }
    else{
        response.redirect('/')
    }
    
});


app.get('/addDetails', function(request, response) {
	 
    response.render('students/add');
});

app.post('/addDetails',addDetails.add);

app.get('/viewDetails',Details.showDetails);

app.get('/editDetails/:uid',Details.editDetails);

app.get('/delete/:uid',Details.deleteDetails);

app.get('/auth/logout', function(req, res) { 
    req.session.destroy()
    res.redirect('/');
});

app.listen(4000);