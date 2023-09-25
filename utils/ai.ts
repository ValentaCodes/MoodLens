// We don't need langchain to use openAi but it will make some things easier
import { OpenAI } from 'langchain/llms/openai'
import {StructuredOutputParser} from 'langchain/output_parsers'
import {z} from 'zod'

const instructions = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe('The mood of the person who wrote the journal entry.'),
    subject: z.string().describe('The subject of the journal entry.'),
    color: z
      .string()
      .describe(
        'A hexadecimal color code that represents the mood of the journal entry. You should use color psychology to determine the color and return it in hexadecimal format. Example #0101fe for blue, it represents calm, tranquility, stability, wisdom.'
      ),
    negative: z
      .boolean()
      .describe(
        'Is the journal entry negative? (i.e did it contain negative emotions?). '
      ),
    summary: z
      .string()
      .describe('A short summary of the entire journal entry.'),
    sentimentScore: z
      .number()
      .describe(
        'sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative.'
      ),
  })
)

export const analyze = async (prompt: string) => {
    const formatInstructions = instructions.getFormatInstructions()

    const model = new OpenAI({temperature: 0, modelName: 'gpt-3.5-turbo'})
    const result = await model.call(prompt)
    console.log(result);
}