const jwt = require("jsonwebtoken");
const asyncHandler = require("./aync");
const errorResponse = require("../Utils/errorResponse");

const Model = require("../Models");
const User = Model.user;

const userSession = require("../Models/userSession.Model");
exports.SignOut = asyncHandler((req, res, next) => {
    let token;
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
            token = req.headers.authorization.split(' ')[1];
        else if (req.cookies.token)
            token = req.cookies.token;

        //make sure token exists
        if (!token)
            return next(new errorResponse('Not Authorize to access this route', 401))
        else
            userSession.deleteOne({ jwtToken: token }, function(err, model) {
                if (err || !model)
                    return next(new errorResponse('SignOut failed', 501))
                else
                    res.status(200).json({
                        success: true,
                        message: "Logo out sucessfull"
                    })
            });

    } catch (err) {
        return next(new errorResponse('SignOut failed', 501));
    }

});


module.exports.SignUp = asyncHandler(
    (req, res, next) => {
        User.create(req.body, function(err, model) {

            if (err || !model)
                return next(new errorResponse(` ${err.message}`, 400));
            res.status(200).json({
                sucess: true,
                data: model,
                msg: `User ${model.username} created Sucessfully`,
            });
        });
    }
)


module.exports.SignIn = asyncHandler(
    async(req, res, next) => {
        const { email, password } = req.body;
        // let isMatch;
        try {
            if (!email || !password)
                return next(new errorResponse('please provide an email and password', 400));
            User.findOne({ email }, function(err, model) {
                if (err || !model)
                    return next(new errorResponse('Invalid credentials', 400));
                isMatch = model.matchPassword(password, function(isMatch) {
                    if (!isMatch)
                        return next(new errorResponse('Invalid credentials', 400));
                    sendTokenResponse(model, 200, res);
                });
            }).select('+password');
        } catch (err) {
            return next(new errorResponse('Invalid credentials', 400));
        }
    }
)

const sendTokenResponse = (user, statusCode, res) => {
    const jwtToken = user.getSignedJwtToken();
    let expires = new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000)
    let options;
    userSession.findOne({ userid: user._id }, function(err, doc) {
        if (!doc) {
            userSession.create({
                userid: user._id,
                jwtToken: jwtToken,
                expiresIn: expires,
                status: "ACTIVE"
            });
        }
    });
    options = {
        expires: expires,
        httpOnly: true
    }
    res
        .status(statusCode)
        .cookie('token', jwtToken, options)
        .json({
            success: true,
            jwtToken
        });
}

exports.authenticate = asyncHandler((req, res, next) => {
    let token;
    let decoded;
    try {

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
            token = req.headers.authorization.split(' ')[1];
        else if (req.cookies && req.cookies.token)
            token = req.cookies.token;

        //make sure token exists
        if (!token)
            return next(new errorResponse('Not Authorize to access this route', 401))

        //Verify token
        decoded = jwt.verify(token, process.env.JWT_SECRECT);
        user.findById(decoded.id, function(err, model) {
            if (err || !model)
                return next(new errorResponse('Not Authorize to access this route', 401))
            req.user = model;
            next();
        });
    } catch (err) {
        return next(new errorResponse('Not Authorize to access this route', 401))
    }
});