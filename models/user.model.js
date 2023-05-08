const { Schema, model } = require('mongoose')
const { logger } = require('../utils')


const userSchema = new Schema({
    user_name: {type: String},
    phone: {
        type: String,
        validate: {
            validator: function(v){
                return /\d{3}-\d{3}-\d{4}/.test(v);
            },
            message: props => '${props.value} is not a valid phone number!'
        },
        required:[true, 'User phone number required']
    
    },
    borrowed: {type: Array},
    numBooks: {type: Number}
});

const User = model('User', userSchema)

logger.debug('[mongodb] registered User model')
module.exports = User
