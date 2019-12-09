const Joi = require('@hapi/joi');

const register = (data) => {
    const schema = Joi.object({
        name: Joi.string().required().min(6).max(255),
        email: Joi.string().required().min(6).max(255).email(),
        password: Joi.string().required().min(6).max(1024)
    });
    return schema.validate(data);
};

const login = (data) => {
    const schema = Joi.object({
        email: Joi.string().required().min(6).max(255).email(),
        password: Joi.string().required().min(6).max(1024)
    });
    return schema.validate(data);
};

module.exports.register = register;
module.exports.login = login;
