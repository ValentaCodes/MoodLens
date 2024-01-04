// We don't need langchain to use openAi but it will make some things easier
import { OpenAI } from 'langchain/llms/openai'
import { StructuredOutputParser } from 'langchain/output_parsers'
import { PromptTemplate } from 'langchain/prompts'
import { z } from 'zod'
import { loadQARefineChain } from 'langchain/chains'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import { Document } from 'langchain/document'
// creates a zod schema that we will feed into langchain to coach the AI
const instructions = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe('The overall mood of the person who wrote the journal entry.'),
    color: z
      .string()
      .describe(
        'A hexadecimal color code that represents the mood of the journal entry. Example #000000 for black, it represents sadness.'
      ),
    negative: z
      .boolean()
      .describe(
        "Is the journal entry negative? (i.e did it contain sad emotions or negative encounters?). Curse words don't necessarily mean that it's negative. "
      ),
    subject: z
      .string()
      .describe('The underlying subject of the journal entry.'),
    summary: z
      .string()
      .describe('A quick summary of the entire journal entry.'),
    sentimentScore: z
      .number()
      .describe(
        'sentiment of the text rated on a scale from -10 to 10. Where -10 is extremely negative, 10 is extremely positive, and 0 is neutral'
      ),
  })
)
// This function is creating a prompt by receiving content and then formatting instructions (our zod schema)
const getPrompt = async (content: string) => {
  const formattedInstructions = instructions.getFormatInstructions()
  // creates a new prompt template that will receive input (entry's) and format to follow (formatted instructions)
  const prompt = new PromptTemplate({
    template: `Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! \n
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
export const analyze = async (content: string) => {
  // Get input that has been formatted
  const input = await getPrompt(content)
  // create the model
  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' })
  // call the model and initiate result
  const result = await model.call(input)

  try {
    // this will finally parse the result into javascript object. it was markdown prior
    return instructions.parse(result)
  } catch (e) {
    console.error(e)
  }
}

// TODO: create a refinement prompt and template 
// const refineQuestionPrompt = () => {
// CODE HERE
// }

// this function will turn our entries into documents to feed into our model and retrieve.
// Will use an in-memory vector db
export const askMeAnything = async (question: string, entries: any) => {
  // create the model and chains
  const embeddings = new OpenAIEmbeddings({modelName: 'text'})
  const model = new OpenAI({
    temperature: 0,
  })
  const chain = loadQARefineChain(model /*TODO: refinement prompt*/)

  // load documents and create memory store
  const docs = entries.map((entry: any) => {
    return new Document({
      pageContent: entry.content,
      metadata: {
        id: entry.id,
        createdAt: entry.createdAt,
      },
    })
  })

  const store = await MemoryVectorStore.fromDocuments(docs, embeddings)

  // Search relevant docs and return response
  const relevantDocs = await store.similaritySearch(question)
  const response = await chain.call({
    input_documents: relevantDocs,
    question,
  })

  return response.output_text
}
