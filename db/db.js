const mongoose = require('mongoose')
mongoose.connect(
    'mongodb://localhost:27017/allinfluencersdb',
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }
).then(() => {
    console.log('connected db')
}).catch((e) => {
    console.log("An error occured. Error: ",e)
})