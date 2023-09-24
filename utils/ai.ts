// We dont need langchain to muse openAi but it will make some things easier
import { OpenAI } from 'langchain/llms/openai'


export const analyze = async (prompt: string) => {
    const model = new OpenAI({temperature: 0, modelName: 'gpt-3.5-turbo'})
    const result = await model.call(prompt)
    console.log(result);
}