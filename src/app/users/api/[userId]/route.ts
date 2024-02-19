import { NextRequest } from "next/server";
import { DataAccess } from "../data-access/data-access";
import { User } from "../data-access/model";
import { Controller } from "../controller/controller";
import '../config/db'
import { validator } from "@/z-library/validation/validator";
import { userModificationSchema, userSchema } from "../validation-schema";
import { handleServerErrors } from "@/z-library/HTTP/http-errors";
import { ReferenceIDError } from "@/z-library/validation/validation-errors";
import { InputValidationError } from "@/z-library/validation/validation-errors";

const dataAccess = new DataAccess(User) 
const controller = new Controller(dataAccess)

export const GET = async(_request: NextRequest, { params }: urlParams): Promise<Response> =>{
    const userId = params.userId
    
    try {
        validator.validateReferenceId(userId)
        return controller.getOne(userId)
    } catch (error) {
        if(error instanceof ReferenceIDError)
            return validator.handleValidationErrors(error.message)
        else
            return handleServerErrors()
    }
}

export const PUT = async(request: NextRequest, { params }: urlParams): Promise<Response> =>{
    const userId = params.userId
    const updateData: User = await request.json()
 
    try {
        validator.validateReferenceId(userId)
        await validator.validateUserInput(updateData, userSchema)

        return controller.updateOne(userId, updateData)
    } catch (error) {
        
        if(error instanceof InputValidationError){
            return validator.handleValidationErrors(error)

        } else if (error instanceof ReferenceIDError){
            return validator.handleValidationErrors(error.message)
            
        } else {
            return handleServerErrors()
        }
    }
}  


export const PATCH = async(request: NextRequest, { params }: urlParams ) : Promise<Response> =>{
    const updateData: User = await request.json()
    const userId = params.userId

    try {
        validator.validateReferenceId(userId)
        await validator.validateUserInput(updateData, userModificationSchema)

        return controller.modifyOne(userId, updateData)

    } catch (error) {
        
        if(error instanceof InputValidationError){
            return validator.handleValidationErrors(error)

        } else if (error instanceof ReferenceIDError){
            return validator.handleValidationErrors(error.message)

        } else {
            return handleServerErrors()
        }
    }
}

export const DELETE = async(_request: NextRequest, { params }:urlParams ): Promise<Response> =>{
    const userId = params.userId
    
    try {
        validator.validateReferenceId(userId)
        
        return controller.deleteOne(userId)
    } catch (error) {
        if (error instanceof ReferenceIDError){
            return validator.handleValidationErrors(error.message)
        } else {
            return handleServerErrors()            
        }
    }
}

type urlParams = {
    params: {
        userId: string
    }
}