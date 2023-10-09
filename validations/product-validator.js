const Joi = require('joi');

const CreateProductValidation = (payload) => {
    const schema = Joi.object({
        nama: Joi.string().required(),
        harga: Joi.string().required(),
        gambar: Joi.string(),
        status: Joi.string().required(),
    });

    return schema.validate(payload);
}

const UpdateProductValidation = (payload) => {
    const schema = Joi.object({
        id: Joi.string().required(),
        nama: Joi.string().required(),
        harga: Joi.string().required(),
        gambar: Joi.string(),
        status: Joi.string().required(),
    });

    return schema.validate(payload);
}

const DeleteProductValidation = (payload) => {
    const schema = Joi.object({
        id: Joi.string().required(),
        nama: Joi.string().required(),
        harga: Joi.string().required(),
        gambar: Joi.string(),
        status: Joi.string().required(),
        createdAt: Joi.date()
    });

    return schema.validate(payload);
}

module.exports = { 
    CreateProductValidation,
    UpdateProductValidation,
    DeleteProductValidation
 };