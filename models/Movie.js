const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({ 
    title:{
        type:String,
        required:true
    },
    category:String,
    country:String,
    year:String,
    imdb_score:String,
    director_id:Schema.Types.ObjectId,
    createdAt: {
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('movie',MovieSchema);