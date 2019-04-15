const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).send({
        title: "Download API",
        version: "0.0.7"
    });
});

module.exports = router;