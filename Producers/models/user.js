const mongoose = require('mongoose')

const {Schema,model} = mongoose;

const userSchema = Schema({
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

const User = model('User',userSchema);
module.exports = User;