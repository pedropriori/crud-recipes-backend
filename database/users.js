const prisma = require('./prisma')
const bcrypt = require('bcrypt')

const getAllUsers = () => {
    return prisma.user.findMany()
}

const getUsersByEmail = (email) => {
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

const createUser = ({ name, email, password }) => {
    const hashedPassword = bcrypt.hashSync(password, 10)

    return prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })
}

const updateUser = (id, { name, email, password }) => {
    const hashedPassword = bcrypt.hashSync(password, 10)

    return prisma.user.update({
        where: { id },
        data: {
            name,
            email,
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
    getUsersByEmail,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}