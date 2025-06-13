import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

interface EssayPrompt {
  topic: string
  context: string
  requirements: string[]
}

export async function generateEssay(prompt: EssayPrompt): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert college essay writing assistant."
        },
        {
          role: "user",
          content: `Write a college essay about ${prompt.topic}. Context: ${prompt.context}. Requirements: ${prompt.requirements.join(', ')}`
        }
      ],
    })

    return completion.choices[0]?.message?.content || 'Failed to generate essay'
  } catch (error) {
    console.error('Error generating essay:', error)
    throw new Error('Failed to generate essay')
  }
}

// Add your AI-related functions here

export const processAIRequest = async (data: any) => {
  // Implement your AI request processing logic here
  return { message: 'AI request processed successfully' };
}; 