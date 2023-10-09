const Joi = require('joi');

const LoginValidation = (payload) => {
    const schema = Joi.object({
        email: Joi.string(),
        telepon: Joi.string(),
        password: Joi.string().required(),
    });

    return schema.validate(payload);
}

const RegisterValidation = (payload) => {
    const schema = Joi.object({
        nama: Joi.string().required(),
        email: Joi.string().required(),
        telepon: Joi.string().required(),
    });

    return schema.validate(payload);
}

module.exports = { 
    LoginValidation,
    RegisterValidation
 };