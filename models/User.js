const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const user_schema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
user_schema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
})

user_schema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
}

module.exports = mongoose.model('User', user_schema);