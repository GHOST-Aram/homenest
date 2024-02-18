import { DataAccess } from "../data-access/data-access";

export class Controller{
    private dataAccess: DataAccess

    constructor(dataAccess: DataAccess){
        this.dataAccess = dataAccess
    }
}