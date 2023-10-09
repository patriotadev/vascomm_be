const Joi = require('joi');

const CreateUserValidation = (payload) => {
    const schema = Joi.object({
        nama: Joi.string().required(),
        email: Joi.string().required(),
        telepon: Joi.string(),
    });

    return schema.validate(payload);
}

const UpdateUserValidation = (payload) => {
    const schema = Joi.object({
        id: Joi.string().required(),
        nama: Joi.string().required(),
        telepon: Joi.string(),
        role: Joi.string(),
        password: Joi.string(),
        status: Joi.string(),
        email: Joi.string().required(),
    });

    return schema.validate(payload);
}

const DeleteUserValidation = (payload) => {
    const schema = Joi.object({
        id: Joi.string().required(),
    });

    return schema.validate(payload);
}

module.exports = { 
    CreateUserValidation,
    UpdateUserValidation,
    DeleteUserValidation
 };