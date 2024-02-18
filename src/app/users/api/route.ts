import { NextRequest } from "next/server";
import { DataAccess } from "../data-access/data-access";
import { User } from "../data-access/model";
import { Controller } from "../controller/controller";
import '../config/db'

const dataAccess = new DataAccess(User) 
const controller = new Controller(dataAccess)

export const POST = async(request: NextRequest) =>{
    const userData:User = await request.json()
    return controller.addNew(userData)
    
}