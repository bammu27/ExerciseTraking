const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const user = require('./models/user');
const exersise = require('./models/exersise')
const path = require('path')
const bodyParser = require('body-parser')



require('dotenv').config()
const port = process.env.PORT||2000;

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())



mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log('database connected successfully');
}).catch((err)=>{
    console.log('Error occur in  connexcting database')
})






app.get('/exersise/:id',(req,res)=>{
   
const user = req.params.id;
exersise.find({name:user}).then((exersise)=>{
    console.log(exersise)
    res.json(exersise)
}).catch((err)=>{
    res.status(500).json({err:'internal server'});
})

})

app.post('/user', (req, res) => {
    const newUsername = req.body.username; // Use req.body.username instead of req.body.name
    const Email = req.body.email;
    const Password = req.body.password;
    console.log(newUsername);

    const USER = new user({ username: newUsername ,email:Email,password:Password});

    USER.save()
        .then((us) => {
            console.log('user created successfully', us);
            res.json(us); // Send the created user as a response
        })
        .catch((err) => {
            console.log('error occurred:', err);
            res.status(500).json({ error: 'Internal server error' });
        });
});




app.post('/exersise/:id',(req,res)=>{
    const uname=req.params.id;
    const desc = req.body.desc;
    const dur = req.body.dur;
    const date = new Date(); 

    const exe = new exersise({
        name:uname,
        description:desc,
        duration:dur,
        date:date
    })

    exe.save().then((exe)=>{
        console.log(exe)
        res.json(exe)
        
    }).catch((err)=>{
        console.log('error occurred:', err);
        alert("Your schdule is fail to add")
        res.status(500).json({ error: 'Internal server error' });
    })




})

app.post('/user/auth', async (req, res) => {
    const { username, password } = req.body;
    try {
      const us = await user.findOne({ username });
    
      if ( us.password === password) {
        
        res.json({'username':us.username});
      } else {
        res.status(401).send('');
        
      }
    } catch (err) {
      console.log("Error occurred:", err);
      res.status(500).send('');
    }
  });
  






app.listen(port,()=>{
    console.log(`server is running on port:${port}`)
})


