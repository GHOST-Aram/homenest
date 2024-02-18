import { 
    HydratedUserDoc,
    UserModel,
    User 
} from "./model";
import { jest } from "@jest/globals";
import { existingUser} from "../controller/test.data";
import { DataAccess } from "./data-access";

const EXISTING_USER_ID = '64c9e4f2df7cc072af2ac9e4'

export default class MockDataAccess extends DataAccess{

    constructor(model: UserModel){
        super(model)
    }


    public createNew = jest.fn( async(data: User): Promise<HydratedUserDoc> =>{
        return new this.model(data)
    })

    public findByEmail = jest.fn(async(email: string): Promise<HydratedUserDoc | null> =>{
        if(email ===existingUser.email){
            return new this.model(existingUser)
        }
        else return null
    })

    public findById = jest.fn(async(id: string): Promise<HydratedUserDoc | null> =>{
        if(id === EXISTING_USER_ID)   {
            return new this.model(existingUser)
        } else {
            return null
        }
    })

}