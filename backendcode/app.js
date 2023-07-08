const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const sequelize = require('./util/database');
const expenseDetails = require('./routes/addexpense');
const signupDetails = require('./routes/signuppage');

const app = express();

app.use(cors());
app.use(bodyparser.json());
app.use(expenseDetails);
app.use(signupDetails);

sequelize.sync()
.then(()=>{
    app.listen(700,()=>{
        console.log('server running on 700 port');
    })
})
.catch((error)=>{
    console.log('error while connecting to database',error);
})

