const auth= require("./auth.routes");
const user=require("./user.routes");
const web=require("./web");

module.exports = function(app) {
    auth(app);
    user(app);
    web(app);
    
};