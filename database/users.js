const prisma = require('./prisma')
const bcrypt = require('bcrypt')

const getAllUsers = () => {
    return prisma.user.findMany()
}

const findUsersByEmail = (email) => {
    return prisma.user.findUnique({
        where: { email }
    })
}

const getUserById = (id) => {
    return prisma.user.findUnique({
        select: {
            id: true,
            name: true,
            email: true,
            password: false,
        },
        where: { id }
    })
}

const createUser = (user) => {
    const hashedPassword = bcrypt.hashSync(user.password, 10)

    return prisma.user.create({
        data: {
            name: user.name,
            email: user.email,
            password: hashedPassword
        }
    })
}

const updateUser = (id, user) => {
    const hashedPassword = bcrypt.hashSync(user.password, 10)

    return prisma.user.update({
        where: { id: Number(id, 10)
         },
        data: {
            name: user.name,
            email: user.email,
            password: hashedPassword
        }
    })
}

const deleteUser = (id) => {
    return prisma.user.delete({
        where: { id }
    })
}

module.exports = {
    getAllUsers,
    findUsersByEmail,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}