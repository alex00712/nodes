const {Schema, model, Types} = require('mongoose')
const schema = new Schema({
    tytle: {type: String, required: true},
    data: {type: String, required: true},
    date: {type: String, default: Date.now},
    checked: {type: Boolean, default: false},
    owner: {type: String, required: true},
})

module.exports = model('Note', schema)