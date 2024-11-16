import { body, ValidationChain } from 'express-validator';

export const createUser: ValidationChain[] = [
  body('wallet').notEmpty().withMessage("wallet is required"),
  body('proof').notEmpty().withMessage("proof is required"),
  body('age').notEmpty().withMessage("age is required"),
  body('name').notEmpty().withMessage("name is required"),
  body('height').notEmpty().withMessage("height is required"),
  body('weight').notEmpty().withMessage("weight is required"),
  body('birthday').notEmpty().withMessage("birthday is required"),
  body('relationship_status').notEmpty().withMessage("relationship_status is required"),
];

export const updateUser: ValidationChain[] = [
  body('proof').notEmpty().withMessage("proof is required"),
  body('age').notEmpty().withMessage("age is required"),
  body('name').notEmpty().withMessage("name is required"),
  body('height').notEmpty().withMessage("height is required"),
  body('weight').notEmpty().withMessage("weight is required"),
  body('birthday').notEmpty().withMessage("birthday is required"),
  body('relationship_status').notEmpty().withMessage("relationship_status is required"),
];