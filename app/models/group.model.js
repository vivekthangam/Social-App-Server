const mongoose = require("mongoose");

const groupList = mongoose.model(
    "groupList",
    new mongoose.Schema({
        grpName: String,
        grpDesc: String
    })
);

module.exports = groupList;