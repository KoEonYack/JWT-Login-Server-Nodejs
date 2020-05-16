const express = require('express');
const app = express()
const port = 5002;

const bodyParser = require('body-parser');
const { User } = require("./models/User");

// applicaton/x-www-form-urlencoded 를 분석해서 가져올 수 있게
app.use(bodyParser.urlencoded({extended: true}));

// application/json 을 분석해서 가져올 수 있게
app.use(bodyParser.json());


const mongoose = require("mongoose")
mongoose.connect('mongodb+srv://apple:1234@cluster0-nfvbl.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log("MongoDB Connected..."))
.catch(err => console.log(err))


app.get('/', (req, res) =>
    res.send('HelloWorld')
)

app.post("/register", (req, res) => {

    const user = new User(req.body) 

    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    })
})


app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
});

