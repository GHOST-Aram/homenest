import { 
    HydratedUserDoc,
    UserModel 
} from "./model";
import { jest } from "@jest/globals";
import { existingUser} from "../controller/test.data";
import { DataAccess } from "./data-access";

export default class MockDataAccess extends DataAccess{

    constructor(model: UserModel){
        super(model)
    }

    public findByEmail = jest.fn(async(email: string): Promise<HydratedUserDoc | null> =>{
        if(email ===existingUser.email){
            return new this.model(existingUser)
        }
        else return null
    })
}