const { PrismaClient } = require('@prisma/client');
const Jwt = require('jsonwebtoken');
const Auth = new PrismaClient().user;
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    port: process.env.MAIL_PORT,
    host: process.env.MAIL_HOST,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
    secure: true
})

class AuthService {
    async generateAccessToken(payload) {
        const token = Jwt.sign({...payload}, process.env.ACCESS_TOKEN, { expiresIn: "24h" });
        return token;
    }

    async register(payload) {
        const { nama, email, telepon } = payload;
        const password = crypto.randomBytes(10).toString('hex');
        const result = await Auth.create({
            data: {
                nama,
                email,
                telepon,
                password: await bcrypt.hash(password, 10),
                role: 'user',
                status: 'Tidak Aktif'
            }
        });
        const mailData = {
            from: process.env.MAIL_USER,
            to: email,
            subject: 'Pendaftaran Akun Berhasil',
            text: `Selamat! pendaftaran akun telah berhasil`,
            html: `Selamat! pendaftaran akun telah berhasil. Berikut password anda <br><br> ${password}`
        }
        transporter.sendMail(mailData, (error, info) => {
            return console.log(error);
        })
        return result;
    }

    async login(payload) {
        const { email, telepon, password } = payload;
        let user;
        user = await Auth.findUnique({
            where: {
                email,
                status: 'Aktif'
            }
        });

        if (user) {
            const isValidRequest = await bcrypt.compare(password, user.password);
            if (isValidRequest) {
                return {user};
            }
            return false;
        }
    }
}

module.exports = AuthService;