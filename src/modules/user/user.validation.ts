import Joi from 'joi';

const userNameSchema = Joi.object({
    firstName: Joi.string().required().regex(/^[A-Za-z]+$/)
        .message('{#label} should contain only alphabetic characters'),
    lastName: Joi.string().required().regex(/^[A-Za-z]+$/)
        .message('{#label} should contain only alphabetic characters'),
});

const userAddressSchema = Joi.object({
    street: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
});

const orderSchema = Joi.object({
    productName: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
});

const userValidationSchema = Joi.object({
    userId: Joi.number().required(),
    username: Joi.string().trim().required(),
    password: Joi.string().required(),
    fullName: userNameSchema.required(),
    age: Joi.number().required(),
    email: Joi.string().email().required(),
    isActive: Joi.boolean().required(),
    hobbies: Joi.array().items(Joi.string()).min(1).required(),
    address: userAddressSchema.required(),
    orders: Joi.array().items(orderSchema).min(1),
});

export default userValidationSchema;
