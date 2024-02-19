import Joi from "joi"

export class ReferenceIDError extends Error{
    constructor(message: string){
        super(message)
    }
}

export class InputValidationError extends Joi.ValidationError{

}