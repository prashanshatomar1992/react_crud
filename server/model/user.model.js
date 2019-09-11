const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const bcrypt = require('bcryptjs');

let UserSchema = new Schema({
    name:{type:String},
    email:{type:String},
    phone:{type:String},
    password:{type:String}
},{
    collection:'user'
});

UserSchema.pre('save',function(next){
    console.log('inside pre save user')
    console.log(this)
    let user = this;
    if(!user.isModified('password')) return next();
    bcrypt.genSalt(10,(err,salt)=>{
        if(err) return next(err);

        console.log('admin salt  ',salt,user.password)
        bcrypt.hash(user.password, salt , (err,hash) =>{
            console.log("admin hash",salt,hash)

            if(err) return next(err); 
            user.password = hash;
            next();
        })

    });
    console.log('inside pre save user')
    console.log('inside pre save user')
});

UserSchema.methods.checkPassword = function(attempt, callback){

    let user = this;
    
    bcrypt.compare(attempt, user.password, (err, isMatch) => {
        if(err) return callback(err);
        callback(null, isMatch);
    });

};
module.exports = mongoose.model('User', UserSchema)