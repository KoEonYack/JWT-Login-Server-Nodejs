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

userSchema.statics.findByToken = function ( token, cb){
    var user = this;


    // 토큰을 decode 한다.
    jwt.verify(token, 'secretToken', function(err, decoded){
        // 유저 아이디를 이용해서 유저를 찾은 다음에 
        // 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인

        user.findOne({"_id": decoded, "token": token}, function(err, user){
            if(err) return cb(err);
            cb(null, user)
        })
    });


}

const User = mongoose.model('User', userSchema)

module.exports = { User }
