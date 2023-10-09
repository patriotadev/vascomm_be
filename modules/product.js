const ProductService = require('../services/product.service');
const { 
    CreateProductValidation,
    UpdateProductValidation,
    DeleteProductValidation 
} = require('../validations/product-validator');

async function createProduct(req, res) {
    try {
        if (req.file) {
            req.body.gambar = req.file.filename;
        } else {
            req.body.gambar = '-';
        }
        const { error } = CreateProductValidation(req.body);
        if (error) return res.status(400).send({
            'code': 400,
            'message': error.details[0].message,
        });
        const productService = new ProductService();
        await productService.create(req.body);
        res.status(201).send({
            'code': 201,
            'message': 'Data has been added successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            'code': 500,
            'message': error,
        });
    }
}

async function getProduct(req, res) {
    try {
        const productService = new ProductService();
        const result = await productService.get(req.query);
        res.status(200).send({
            'code': 200,
            'message': 'Success',
            'data': result
        });
    } catch (error) {
        res.status(500).send({
            'code': 500,
            'message': error,
        });
    }
}

async function updateProduct(req, res) {
    try {
        if (req.file) {
            req.body.gambar = req.file.filename;
        }
        const { error } = UpdateProductValidation(req.body);
        if (error) return res.status(400).send({
            'code': 400,
            'message': error.details[0].message,
        });
        const productService = new ProductService();
        await productService.update(req.body);
        res.status(201).send({
            'code': 201,
            'message': 'Data has been updated successfully',
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            'code': 500,
            'message': error,
        });
    }
}

async function deleteProduct(req, res) {
    try {
        const { error } = DeleteProductValidation(req.body);
        if (error) return res.status(400).send({
            'code': 400,
            'message': error.details[0].message,
        });
        const productService = new ProductService();
        await productService.deleteById(req.body.id);
        res.status(201).send({
            'code': 201,
            'message': 'Data has been deleted successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            'code': 500,
            'message': error,
        });
    }
}

async function countProduct(req, res) {
    try {
        const productService = new ProductService();
        const result = await productService.countProduct();
        res.status(200).send({
            'code': 200,
            'message': 'Success',
            'data': result
        });
    } catch (error) {
        res.status(500).send({
            'code': 500,
            'message': error,
        });
    }
}

module.exports = { createProduct, getProduct, updateProduct, deleteProduct, countProduct }