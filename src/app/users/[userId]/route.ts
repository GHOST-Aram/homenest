import { NextRequest, NextResponse } from "next/server";
import { DataAccess } from "../data-access/data-access";
import { User } from "../data-access/model";
import { Controller } from "../controller/controller";
import '../config/db'
import { Validator } from "@/z-library/validation/validator";
import { userSchema } from "../validation-schema";
import { handleServerErrors } from "@/z-library/HTTP/http-errors";

const dataAccess = new DataAccess(User) 
const controller = new Controller(dataAccess)

export const PUT = async(request: NextRequest, { params }: PutParams): Promise<NextResponse> =>{
    const updateData: User = await request.json()
    const userId = params.userId

    const validator = new Validator(userSchema)
    const validationErrors = validator.validateUserInput(updateData)

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

type PutParams = {
    params: {
        userId: string
    }
}