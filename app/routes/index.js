const UserRoutes = require('./user.routes')
const { authenticate } = require('../Middlewares/Auth')
const AuthRoutes = require('./Auth.routes');

// console.log(UserRoutes)
const createRoutes = app => {
    app.use("/api/v1/users", UserRoutes);

    app.use("/api/auth", AuthRoutes)
    app.use(authenticate);
}

module.exports = createRoutes;