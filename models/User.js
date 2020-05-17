const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    }, 
    email: {
        type: String,
        trime: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number      
    }
})

// 모델을 저장하기 전에 무엇을 한다는 것
userSchema.pre('save', function( next ){
    var user = this; // 모델 스키마 지칭

    if(user.isModified('password')){
        // 비밀번호를 암호화 시킨다.
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if (err) return next(err)
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err)
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
})

userSchema.methods.comparePassword = function(plainPassword, cb){

    // plainPassword 1234567   암호화된 비밀번호 xxxx 같은지 검사를 해야한다.
    bcrypt.compare(plainPassword, this.password, function (err, isMatch){
        if(err) return cb(err), // 비밀번호가 같지 않다.
            cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb) {
    
    var user = this;

    // json webtoken을 이용해서 token을 생성하기
    // var token = jwt.sign(user._id, 'secretToekn')
    var token = jwt.sign(user._id.toHexString(), 'secretToken')

    // user._id + 'secretToken' = token

    user.token = token
    user.save(function(err, user){
        if(err) return cb(err)
        cb(null, user)
    })

}

const User = mongoose.model('User', userSchema)

module.exports = { User }
