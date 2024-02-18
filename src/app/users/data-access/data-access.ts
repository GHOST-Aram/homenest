import { HydratedUserDoc, UserModel } from "./model";

export class DataAccess{
    public model: UserModel

    constructor(model: UserModel){
        this.model = model
    }

    public findByEmail = async(email: string): Promise<HydratedUserDoc | null> =>{
        return await this.model.findOne({ email })
    }
}