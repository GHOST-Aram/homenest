import { ObjectSchema, ValidationError } from "joi";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";
import { ReferenceIDError } from "./validation-errors";
import { InputValidationError } from "./validation-errors";

class Validator {
   

    public validateUserInput = async(userData: Object,  validationSchema: ObjectSchema
        ): Promise<void> =>{
            const {error, value} =  validationSchema.validate(userData,{ abortEarly: false})

        if(error){
            throw new InputValidationError(error.message, error.details, error._original)
        }
    }

    public validateReferenceId = (id: string) =>{
        if(isValidObjectId(id))
            return
        throw new ReferenceIDError(
            'Invalid reference Id. Id must be a hexadecimal string of length 24.'
        )
    }
    
    public handleValidationErrors = (errors: ValidationError | string): NextResponse =>{
        
        return new NextResponse(JSON.stringify(errors), {
            status: 400,
            headers: {
                'Content-Types': 'application/json'
            }
        })
    }
}

export const validator  = new Validator()