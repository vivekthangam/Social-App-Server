const moongoose = require('mongoose')
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const userSchema = moongoose.Schema({
    username: { type: String, index: true, required: true },
    email: { type: String, index: true, required: true, unique: true },
    phone: { type: Number, index: true, required: true, unique: true },
    password: { type: String }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});



userSchema.pre('save', function(next) {
    const user = this;
    if (this.isModified("password") && this.isNew) {
        bcrypt.genSalt(10, function(err, salt) {
            if (err)
                return next(err);
            else {

                user.password = bcrypt.hash(user.password, salt, function(hasherror, hash) {
                    if (hasherror) return next(hasherror)
                    else
                        user.password = hash;
                    next();
                });
            }
        });
    }

});

userSchema.methods.getSignedJwtToken = function() {
    return jwt.sign({
        id: this._id,
        username: this.username,
        email: this.email
    }, process.env.JWT_SECRECT, {
        expiresIn: process.env.JWT_EXPIRE
    });
}

userSchema.methods.matchPassword = async function(enterdPassword, callback) {
    return await callback(bcrypt.compare(enterdPassword, this.password));
}

userSchema.post('save', function(error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        if (/email/i.test(error.message))
            next(new Error('Email must be unique'));
        if (/phone/i.test(error.message))
            next(new Error('Phone must be unique'));
        if (/username/i.test(error.message))
            next(new Error('Username must be unique'));

    } else {
        next(error);
    }
});
module.exports = moongoose.model('User', userSchema);