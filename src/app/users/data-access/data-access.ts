import { Paginator } from "../controller/controller";
import { HydratedUserDoc, UserModel, User } from "./model";

export class DataAccess{
    public model: UserModel

    constructor(model: UserModel){
        this.model = model
    }
    
    public createNew = async(data: User): Promise<HydratedUserDoc> =>{
        return await this.model.create(data)
    }

    public findByEmail = async(email: string): Promise<HydratedUserDoc | null> =>{
        return await this.model.findOne({ email })
    }

    public findById = async(id: string): Promise<HydratedUserDoc | null> =>{
        return await this.model.findById(id, '-password')   
    }

    public findMany = async(pagination: Paginator): Promise<HydratedUserDoc[]> =>{
        return await this.model.find().skip(pagination.skip).limit(pagination.limit)
    }
}