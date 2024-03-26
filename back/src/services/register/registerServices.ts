import User from "../../model/user.model";

export async function addUser(name: string, username: string, email: string, password: string) {
    try{
        await User.sync()
        const createdUser = await User.create({
            username: username,
            name: name,
            email: email,
            password: password
        })
        await User.sync()
        console.log(`user ${name} created with id ${createdUser}`)
        console.log(createdUser)
    }catch(err){
        console.error(err)
    }
}