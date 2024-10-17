const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    }
},{collection: 'users'});

//adding static methods
userSchema.statics.signup = async function (email, username, password){
    //validate fields
    if (!email || !password || !username){
        throw Error('All fields must be filled.');
    }
    if (!validator.isByteLength(username, {min:3, max:12})){
        throw Error('Invalid Username: must be between 3-12 characters');
    }
    if(!validator.isEmail(email)){
        throw Error('Email is invalid');
    }

    //email in use check
    const exists = await this.findOne({email});
    if (exists){
        throw Error('Email is already in use');
    }

    //user exists check
    const userExists = await this.findOne({username});
    if (userExists){
        throw Error('Username is in use');
    }

    // add salt and hash password for encryption to database

}

module.exports = mongoose.model('User', userSchema);