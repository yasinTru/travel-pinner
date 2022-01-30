const mongoose = require('mongoose')

const PinSchema= new mongoose.Schema({
  
    username:
    {
        type:String,
        require:true,
        min:3

    },

    title:
    {
        type:String,
        require:true,

    },

    comment:
    {
        type: String,
        require:true,
    },

    rating:
    {
        type:Number,
        require:true,
        min:1,
        max:5
    },

    latitude:
    {
        type:Number,
        require:true,
    },

    longitude:
    {
        type:Number,
        require:true,
    }

},
{
    timestamps:true
}
)

module.exports =mongoose.model("Pin", PinSchema);