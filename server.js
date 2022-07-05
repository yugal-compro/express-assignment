const express = require('express');
const cors = require('cors');
const courseRouter = require('./routes/courseRouter');
const port = 7000;
const app = express();

app.use(cors());

app.use(express.json());

app.use('/api',courseRouter);

app.listen(port,()=>{
    console.log(`Server is started on the port ${port}`);
});

