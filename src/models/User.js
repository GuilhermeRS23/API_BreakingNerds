const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require
    },
    username: {
        type: String,
        require
    },
    email: {
        type: String,
        require,
        unique: true
    },
    password: {
        type: String,
        require
    },
    avatar: {
        type: String,
        require
    },
    background: {
        type: String,
        require
    }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
