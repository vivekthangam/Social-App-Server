const mongoose = require("mongoose");

const friendList = mongoose.model(
    "friendList",
    new mongoose.Schema({
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        recipientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    })
);

module.exports = friendList;