// We don't need langchain to use openAi but it will make some things easier
import { OpenAI } from 'langchain/llms/openai'
import { StructuredOutputParser } from 'langchain/output_parsers'
import { PromptTemplate } from 'langchain/prompts'
import { z } from 'zod'

// creates a zod schema that we will feed into langchain to coach the AI
const instructions = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe('The mood of the person who wrote the journal entry.'),
    color: z
      .string()
      .describe(
        'A hexadecimal color code that represents the mood of the journal entry. You should use color psychology to determine the color and return it in hexadecimal format. Example #000000 for black, represents sadness.'
      ),
    negative: z
      .boolean()
      .describe(
        'Is the journal entry negative? (i.e did it contain negative emotions or encounters?). Curse words don\'nt ne '
      ),
    subject: z.string().describe('The underlying subject of the journal entry.'),
    summary: z
      .string()
      .describe('A quick summary of the entire journal entry.'),
    sentimentScore: z
      .number()
      .describe(
        'sentiment of the text rated on a scale from -10 to 10, where -10 is extremely negative.'
      ),
  })
)
// This function is creating a prompt by receiving content and then formatting instructions (our zod schema)
const getPrompt = async (content) => {
  const formattedInstructions = instructions.getFormatInstructions()
  // creates a new prompt template that will receive input (entry's) and format to follow (formatted instructions)
  const prompt = new PromptTemplate({
    template: `You are Doctor of Psychology, analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! \n
        {formattedInstructions}\n{entry}`,
    inputVariables: [`entry`],
    partialVariables: { formattedInstructions },
  })
  //   this will format the prompt template
  const input = await prompt.format({
    entry: content,
  })
  return input
}

// The analysis function that we will use to get our final result
export const analyze = async (content) => {
  const input = await getPrompt(content)
  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' })
  const result = await model.call(input)

  try {
    // this will finally parse the result into javascript object. it was markdown prior
    return instructions.parse(result)
  } catch (e) {
    console.log(e)
  }
}
