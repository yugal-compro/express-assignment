const express = require('express');
var exphbs  = require('express-handlebars');
const courseRouter = require('./routes/courseRouter');

const cors = require('cors');

const app = express();

app.use(cors());



const port = 7000;

app.use(express.json());

app.use('/api',courseRouter);



app.get('/',(req,res)=>{
    res.render('courses');
})

app.listen(port,()=>{
    console.log(`Server is started on the port ${port}`);
});

