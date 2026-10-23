import User from "../models/Users.js"

class userService {

    async Create(name, email, password) {
        try {
            await User.create({ name, email, password })
        } catch (error) {
            console.log(error)
        }
    }

    async getOne(email) {
        try {
            const user = await User.findOne({ where: { email } })
            return user
        } catch (error) {
            console.log(error)
        }
    }
}

export default new userService()