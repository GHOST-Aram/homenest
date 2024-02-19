import Joi from "joi";

export const userSchema = Joi.object({
    name: Joi.string().min(2).max(200).required(),
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().min(8).max(24).required(),
    role: Joi.string().required(),    
})

export const userModificationSchema = Joi.object({
    name: Joi.string().min(2).max(200),
    email: Joi.string().email(),
    password: Joi.string().alphanum().min(8).max(24),
    role: Joi.string(),  
})
