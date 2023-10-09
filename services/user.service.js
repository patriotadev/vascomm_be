const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');
const User = new PrismaClient().user;
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

class UserService {

    async create(payload) {
        const {nama, email, telepon} = payload;
        const password = crypto.randomBytes(10).toString('hex');
        const result = await User.create({
            data: {
                nama,
                email,
                telepon,
                role: 'user',
                password,
                status: 'Aktif'
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
        });
        return result;
    }

    async get(query) {
        const {search, take, skip} = query;
        let result;
        if (search !== '') {
            result = await User.findMany({
                skip: Number(skip),
                take: Number(take),
                where: {
                    nama: {
                        contains: search
                    },
                }
            });
        } else {
            result = await User.findMany({
                skip: Number(skip),
                take: Number(take),
            });
        }

        return result;
    }

    async update(payload) {
        const {id, nama, email, telepon, role, password, status} = payload;
        await User.update({
            where: {
                id
            },
            data: {
                nama, email, telepon, status, role, password,
            }
        });
    }

    async deleteById(id) {
        await User.update({
            where: {
                id
            },
            data: {
                status: 'Tidak Aktif'
            }
        });
    }

    async countUser() {
        const active = await User.count({
            where: {
                status: 'Aktif'
            }
        });
        const inactive = await User.count({
            where: {
                status: 'Tidak Aktif'
            }
        });
        return {
            active,
            inactive
        }
    }
}

module.exports = UserService;