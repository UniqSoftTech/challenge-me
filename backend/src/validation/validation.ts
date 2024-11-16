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

export const signin: ValidationChain[] = [
  body('wallet').notEmpty().withMessage("wallet is required"),
];

export const claimWinnings: ValidationChain[] = [
  body('marketId').notEmpty().withMessage("marketId is required"),
];

export const createMarket: ValidationChain[] = [
  body('question').notEmpty().withMessage("question is required"),
];

export const placeBet: ValidationChain[] = [
  body('marketId').notEmpty().withMessage("marketId is required"),
  body('_isYes').notEmpty().withMessage("_isYes is required"),
  body('amountInEther').notEmpty().withMessage("amountInEther is required"),
];


export const vote: ValidationChain[] = [
  body('marketId').notEmpty().withMessage("marketId is required"),
  body('_votedYes').notEmpty().withMessage("_votedYes is required"),
];