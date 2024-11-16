import { OpenAI } from 'openai';  // Import OpenAI correctly in v4.x
import { Request, Response } from 'express';
import { openai_key } from '../configs/config';
import db from '../models/_index';

export class OpenAIController {
  // Instantiate OpenAI with your API key
  private openai = new OpenAI({
    apiKey: openai_key
  });

  // Function to check if text is "challengeable"
  checkChallengeable = async (req: Request, res: Response) => {
    try {
      const { question } = req.body;
      // Define the prompt to evaluate the challengeable status of the text
      const prompt = `Is this text challengeable based on the criteria (e.g., logical consistency, question format, etc.)? Answer with "true" or "false". Text: "${question}"`;

      // Request OpenAI to process the text
      const response: any = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo', // You can also use 'gpt-4' if you have access
        messages: [{ role: 'user', content: prompt }],
      });

      // Extract the model's response
      const answer = response?.choices[0].message.content.trim();

      // Return true if the answer is "true", false otherwise
      res.status(200).json({ data: answer === 'true' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  }

  // Function to generate funny, measurable, and betting-able questions
  generateQuestions = async (req: any, res: any) => {
    const user = await db.Users.findOne({ where: { id: req?.user?.id } })
    if (!user) return res.status(404).json({ message: 'User not found' })

    const prompt = `
        Create 3 funny, measurable, and betting-able questions for a person with the following details:
        - Name: ${user.name}
        - Age: ${user.age}
        - Birthday: ${user.birthday}
        - Height: ${user.height}
        - Weight: ${user.weight}
        - Relationship Status: ${user.relationship_status}

        The questions should be fun, measurable (can be measured in units like time, amount, etc.), and should have the potential for betting (e.g., "Who can guess your weight loss after 1 month?").

        Each question should be distinct and not repetitive.
      `;

    try {
      const response: any = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      });

      res.status(200).json({ data: response?.choices[0].message.content.trim().split("\n"), status: true });
    } catch (error) {
      console.error('Error generating questions:', error);
      res.status(500).json({ message: 'Internal server error', error });
    }
  };

}
