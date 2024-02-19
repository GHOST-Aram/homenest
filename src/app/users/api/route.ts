import { NextRequest } from "next/server";
import { DataAccess } from "./data-access/data-access";
import { User } from "./data-access/model";
import { Controller, Paginator } from "./controller/controller";
import './config/db'
import { validator } from "@/z-library/validation/validator";
import { userSchema } from "./validation-schema";
import { handleServerErrors } from "@/z-library/HTTP/http-errors";
import Joi from "joi";

const dataAccess = new DataAccess(User) 
const controller = new Controller(dataAccess)

export const POST = async(request: NextRequest) =>{
    const userData:User = await request.json()
    
    try{
        await validator.validateUserInput(userData, userSchema)
        return await controller.addNew(userData)
    } catch(error){
        if(error instanceof Joi.ValidationError){
            return validator.handleValidationErrors(error)
        } else {
            return handleServerErrors()
        }
    } 
}


export const GET = async(request: NextRequest) =>{ 
    const paginator = paginate(request)
    
    try {
        return await controller.getMany(paginator)
    } catch (error) {
        return handleServerErrors()
    }
}

const paginate = (request: NextRequest): Paginator =>{
    const page = request.nextUrl.searchParams.get("page")
    const limit = request.nextUrl.searchParams.get("limit")

    const paginationLimit = Number(limit)
    const skipDocsNumber = (Number(page) - 1) * paginationLimit

    const paginator: Paginator = {
        limit: paginationLimit ? paginationLimit: 10,
        skip: skipDocsNumber ? skipDocsNumber : 0
    }

    return paginator
}
