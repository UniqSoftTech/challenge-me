import { OpenAI } from 'openai';  // Import OpenAI correctly in v4.x
import { Request, Response } from 'express';
import { openai_key } from '../configs/config';

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

}
