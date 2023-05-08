const { Schema, model } = require('mongoose')
const { logger } = require('../utils')


const bookSchema = new Schema({
                id:{type: Number},
                title: {type: String},
                inventory_count: {type: Number}
            });

const Book = model('Book', bookSchema)

logger.debug('[mongodb] registered Book model')
module.exports = Book
