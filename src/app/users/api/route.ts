import { NextRequest } from "next/server";
import { DataAccess } from "../data-access/data-access";
import { User } from "../data-access/model";
import { Controller } from "../controller/controller";
import '../config/db'
import { Validator } from "@/z-library/validation/validator";
import { userSchema } from "./validation-schema";
import { handleServerErrors } from "@/z-library/HTTP/http-errors";

const dataAccess = new DataAccess(User) 
const controller = new Controller(dataAccess)

export const POST = async(request: NextRequest) =>{
    const userData:User = await request.json()
    const validator = new Validator(userSchema)
    const validationErrors = validator.validateUserInput(userData)

    if(validationErrors){
        return validator.handleValidationErrors(validationErrors)
    } else {
        try{
            return controller.addNew(userData)
        } catch(error){
            return handleServerErrors(error)
        }
    }
}