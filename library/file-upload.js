const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
        destination: function(req, file, callback){
            callback(null, path.dirname(__dirname)+"/uploads/posts");
        },
        filename: function(req, file, callback){
            const filename = "posts"+Date.now()+path.extname(file.originalname);
            callback(null, filename);
        }
    });

const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

module.exports = {
    storage,
    fileFilter
};