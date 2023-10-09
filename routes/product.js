const express = require('express');
const { createProduct, updateProduct, getProduct, deleteProduct, countProduct } = require('../modules/product');
const router = express.Router();
const crypto = require('crypto');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        const generateName = Date.now();
        const fileExtension = file.originalname.split('.')[1];
        cb(null, generateName + '.' + fileExtension);
    }
})
const upload = multer({storage: storage});

router.get('/', getProduct);
router.get('/count-product', countProduct);
router.post('/', upload.single('image'), createProduct);
router.put('/', upload.single('image'), updateProduct);
router.delete('/', deleteProduct);

module.exports = router;