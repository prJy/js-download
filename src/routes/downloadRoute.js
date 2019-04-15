const express = require('express');
const router = express.Router();
const controller = require('../controllers/downloadController');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/_static/files/');
    },
    filename: function (req, file, cb) {        
        cb(null, file.originalname);
    },
    onFileUploadStart: function (file) {
        console.log(file.name + ' is starting ...');
    },
    onFileUploadComplete: function (file, req, res) {
        console.log(file.name + ' uploading is ended ...');
        console.log("File name : "+ file.name +"\n"+ "FilePath: "+ file.path)
    },
    onError: function (error, next) {
        console.log("File uploading error: => "+error)
        next(error)
    }
});

const upload = multer({ storage });

router.get('/', controller.get);
router.get('/:id', controller.getById);
router.post('/upload', upload.single('file'), controller.post);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);

module.exports = router;