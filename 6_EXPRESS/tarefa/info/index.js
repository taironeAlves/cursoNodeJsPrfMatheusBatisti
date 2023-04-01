const express = require('express');
const router = express.Router()
const path = require('path')

const localPath = path.join(__dirname, '../templates');

router.get('/:id', (req, res) =>{
    res.sendFile(`${localPath}/info.html`);
});

module.exports = router;
