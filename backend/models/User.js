const mongoose = require('mongoose')

const UserSchema= new mongoose.Schema({
    username: {
        type: String,
        require:true,
        min:2,
        max:22,
        unique:true
    },

    email: {
        type: String,
        require:true,
        max:55,
        unique:true
    },

    password: {
        type: String,
        require:true,
        min:8
    },
},
{
    timestamps:true
}
)

module.exports =mongoose.model("User", UserSchema);