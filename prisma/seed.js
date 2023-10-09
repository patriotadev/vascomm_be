const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

async function main() {
    const users = await prisma.user.createMany(
        {
            data: [
                {
                    nama: "admin",
                    email: "admin.vasc99@mailnesia.com",
                    telepon: '08123456781',
                    role: 'admin',
                    password: await bcrypt.hash('secretpass', 10),
                    status: 'Aktif'
                },
                {
                    nama: "Budi",
                    email: "budi.vasc99@mailnesia.com",
                    telepon: '08123456782',
                    role: 'user',
                    password: await bcrypt.hash('secretpass', 10),
                    status: 'Aktif'
                },
                {
                    nama: "Agung",
                    email: "agung.vasc99@mailnesia.com",
                    telepon: '08123456783',
                    role: 'user',
                    password: await bcrypt.hash('secretpass', 10),
                    status: 'Aktif'
                },
                {
                    nama: "Bagus",
                    email: "bagus.vasc99@mailnesia.com",
                    telepon: '08123456784',
                    role: 'user',
                    password: await bcrypt.hash('secretpass', 10),
                    status: 'Aktif'
                },
            ]
        }
    );
    const products = await prisma.product.createMany(
        {
            data: [
                {
                    nama: "Sepatu",
                    harga: '472.000',
                    gambar: 'sepatu.jpg',
                    status: 'Aktif'
                },  
                {
                    nama: "Mouse PC",
                    harga: '42.000',
                    gambar: 'mouse_pc.jpg',
                    status: 'Aktif'
                },
                {
                    nama: "Tas",
                    harga: '160.000',
                    gambar: 'tas.jpg',
                    status: 'Aktif'
                },
                {
                    nama: "Keyboard",
                    harga: '250.000',
                    gambar: 'keyboard.jpg',
                    status: 'Aktif'
                },
            ]
        }
    );

    console.log(users, products);
}

main().then(async() => {
    await prisma.$disconnect()
}).catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})