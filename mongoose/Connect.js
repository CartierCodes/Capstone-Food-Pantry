const mongoose = require('mongoose');
let conn = null;
const uri = "mongodb://mongoadmin:mongoadmin@ec2-3-93-79-35.compute-1.amazonaws.com";
exports.connect = async function() {
    if (conn == null) {
        conn = mongoose.connect(uri);
        await conn;
    }
    return conn;
};