import { NextRequest, NextResponse } from "next/server";
import { DataAccess } from "../data-access/data-access";
import { User } from "../data-access/model";
import { Controller } from "../controller/controller";
import '../config/db'
import { validator } from "@/z-library/validation/validator";
import { userModificationSchema, userSchema } from "../validation-schema";
import { handleServerErrors } from "@/z-library/HTTP/http-errors";

const dataAccess = new DataAccess(User) 
const controller = new Controller(dataAccess)

export const GET = async(_request: NextRequest, { params }: urlParams): Promise<NextResponse> =>{
    const userId = params.userId
    
    try {
        validator.validateReferenceId(userId)
    } catch (error:any) {
        return validator.handleValidationErrors(error.message)
    }
    
    try {
        return controller.getOne(userId)
    } catch (error) {
        return handleServerErrors()
    }
}

export const PUT = async(request: NextRequest, { params }: urlParams): Promise<NextResponse> =>{
    const updateData: User = await request.json()
    const userId = params.userId

    const validationErrors = validator.validateUserInput(updateData, userSchema)

    if(validationErrors){
        return validator.handleValidationErrors(validationErrors)
    } else {
        try {
            return controller.updateOne(userId, updateData)
        } catch (error) {
            return handleServerErrors()
        }
    }  
}

export const PATCH = async(request: NextRequest, { params }: urlParams ) : Promise<NextResponse> =>{
    const updateData: User = await request.json()
    const userId = params.userId

    const validationErrors = validator.validateUserInput(updateData, userModificationSchema)

    if(validationErrors){
        return validator.handleValidationErrors(validationErrors)
    } else {
        try {
            return controller.modifyOne(userId, updateData)
        } catch (error) {
            return handleServerErrors()
        }
    }  
}

export const DELETE = async(_request: NextRequest, { params }:urlParams ) =>{
    const userId = params.userId
    
    try {
        validator.validateReferenceId(userId)
    } catch (error:any) {
        return validator.handleValidationErrors(error.message)
    }
    
    try {
        return controller.deleteOne(userId)
    } catch (error) {
        return handleServerErrors()
    }
}

type urlParams = {
    params: {
        userId: string
    }
}