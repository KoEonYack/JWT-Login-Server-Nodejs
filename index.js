const express = require('express');
const app = express()

const mongoose = require("mongoose")
mongoose.connect('mongodb+srv://covenant:1234@cluster0-nfvbl.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log("MongoDB Connected..."))
.catch(err => console.log(err))

const port = process.env.PORT || 5000;

app.get('/', (req, res) =>
    res.send('HelloWorld')
)

app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
});

