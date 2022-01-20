const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb+srv://besyuzkirk:z9mPgruWxPTdPCT@movie-db.tvs7i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
    mongoose.connection.on('open',() => {
        console.log("açık")
    })
    mongoose.connection.on('error',(err) => {
        console.log("kapalı", err)
    })
    mongoose.Promise = global.Promise;
};

