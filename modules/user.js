const UserService = require('../services/user.service');
const { CreateUserValidation, UpdateUserValidation, DeleteUserValidation } = require('../validations/user-validator');

async function createUser(req, res) {
    try {
        const { error } = CreateUserValidation(req.body);
        if (error) return res.status(400).send({
            'code': 400,
            'message': error.details[0].message,
        });
        const userService = new UserService();
        await userService.create(req.body);
        res.status(201).send({
            'code': 201,
            'message': 'Data has been added successfully',
        });
    } catch (error) {
        res.status(500).send({
            'code': 500,
            'message': error,
        });
    }
}

async function getUser(req, res) {
    try {
        const userService = new UserService();
        const result = await userService.get(req.query);
        res.status(200).send({
            'code': 200,
            'message': 'Success',
            'data': result
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            'code': 500,
            'message': error,
        });
    }
}

async function updateUser(req, res) {
    try {
        const { error } = UpdateUserValidation(req.body);
        if (error) return res.status(400).send({
            'code': 400,
            'message': error.details[0].message,
        });
        const userService = new UserService();
        await userService.update(req.body);
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

async function deleteUser(req, res) {
    try {
        const { error } = DeleteUserValidation(req.body);
        if (error) return res.status(400).send({
            'code': 400,
            'message': error.details[0].message,
        });
        const userService = new UserService();
        await userService.deleteById(req.body.id);
        res.status(201).send({
            'code': 201,
            'message': 'Data has been deleted successfully',
        });
    } catch (error) {
        res.status(500).send({
            'code': 500,
            'message': error,
        });
    }
}

async function countUser(req, res) {
    try {
        const userService = new UserService();
        const result = await userService.countUser();
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

module.exports = { createUser, getUser, updateUser, deleteUser, countUser }