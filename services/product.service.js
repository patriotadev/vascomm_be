const { PrismaClient } = require('@prisma/client');
const Product = new PrismaClient().product;


class ProductService {
    async create(payload) {
        const {nama, harga, gambar, status} = payload;
        const result = await Product.create({
            data: {
                nama,
                harga,
                gambar,
                status
            }
        });
        return result;
    }

    async get(query) {
        const {search, take, skip} = query;
        let result;
        if (search !== '') {
            result = await Product.findMany({
                orderBy: {
                    createdAt: 'desc'
                },
                skip: Number(skip),
                take: Number(take),
                where: {
                    nama: {
                        contains: search
                    },
                    status: 'Aktif'
                }
            });
        } else {
            result = await Product.findMany({
                where: {
                    status: 'Aktif'
                },
                orderBy: {
                    createdAt: 'desc'
                },
                skip: Number(skip),
                take: Number(take),
            });
        }

        return result;
    }

    async getById(id) {
        const result = await Product.findUnique({
            where: {
                id
            }
        });
        return result;
    }

    async update(payload) {
        const {id, nama, harga, gambar, status} = payload;
        await Product.update({
            where: {
                id
            },
            data: {
                nama, harga, gambar, status
            }
        });
    }

    async deleteById(id) {
        await Product.update({
            where: {
                id
            },
            data: {
                status: 'Tidak Aktif'
            }
        });
    }

    async countProduct() {
        const active = await Product.count({
            where: {
                status: 'Aktif'
            }
        });
        const inactive = await Product.count({
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

module.exports = ProductService;