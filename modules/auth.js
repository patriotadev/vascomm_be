const AuthService = require('../services/auth.service');
const { LoginValidation, RegisterValidation } = require('../validations/auth-validator');

async function login (req, res) {
    try {
        const { error } = LoginValidation(req.body);
        if (error) return res.status(400).send({
            'code': 400,
            'message': error.details[0].message,
        });
        const authService = new AuthService();
        const result = await authService.login(req.body);
        if (result) {
            const accessToken = authService.generateAccessToken(req.body);
            return res.status(200).send({
                "code": 200,
                'message': 'Success',
                "data": {
                    user: result.user,
                    accessToken
                }
            });
        }
        return res.status(400).send({
            "code": 400,
            "message": "Failed",
            "data": []
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            "Status": "Failed",
            "code": 500,
            "error": error
        });
    }
}

async function register(req, res) {
    try {
        const { error } = RegisterValidation(req.body);
        if (error) return res.status(400).send({
            'code': 400,
            'message': error.details[0].message,
        });
        const authService = new AuthService();
        const result = await authService.register(req.body);
        const accessToken = authService.generateAccessToken(result);
        res.status(201).send({
            "code": 201,
            "message": "Success",
            "data": {
                accessToken,
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            "Status": "Failed",
            "code": 500,
            "error": error
        });
    }
}

module.exports = { login, register }