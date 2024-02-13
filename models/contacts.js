const { Schema, model } = require('mongoose')

const contactsSchema = new Schema({
  phone: { type: String, required: true },
  email: { type: String, required: true },
})

module.exports = model('Contacts', contactsSchema)
