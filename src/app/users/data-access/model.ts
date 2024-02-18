import { HydratedDocument, Model, Schema, model, models } from "mongoose"
import { compare, hash } from 'bcrypt'


export interface User{
    name: string
    email: string
    password: string
    profilePicture?: Buffer
    pictureUrl?: string
    banner?: Buffer
    role?: string
}

interface UserMethods{
    hasValidPassword: (password: string) => Promise<boolean>
}
export type UserModel = Model<User, {}, UserMethods>

const userSchema = new Schema<User, UserModel,UserMethods>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    pictureUrl:{
        type: String
    },
    profilePicture: {
        type: Buffer,
        contentType: String
    },
    role:{
        type: String,
        enum: ['landlord', 'tenant', 'admin'],
        required: true,
        default: 'tenant'
    }
})

userSchema.pre('save', async function(next){
    const hashedPassword = await hash(this.password, 10)
    this.password = hashedPassword

    next()
})

userSchema.method('hasValidPassword', async function(password: string): Promise<boolean>{
    const isValidPassword = await compare(password, this.password)

    return isValidPassword
})

export type HydratedUserDoc = HydratedDocument<User>

export const User = models.User ? models.User : model<User,UserModel>('User', userSchema)