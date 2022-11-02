const express = require('express');
const router = express.Router();
const jsonParser = express.json();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, '/models')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
});

router.route('/')
.post(storage, jsonParser, (req, res) => 
{
    console.log(req.body['SceneWidtch']);
    res.status = 200;
    res.send(req.body);
});

module.exports = router;