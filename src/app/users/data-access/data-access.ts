import { UserModel } from "./model";

export class DataAccess{
    private model: UserModel

    constructor(model: UserModel){
        this.model = model
    }
}