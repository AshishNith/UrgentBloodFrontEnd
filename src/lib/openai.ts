import { OpenAI } from 'openai'; // Corrected import statement

const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY; // Use environment variable for API key

const openai = new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true
});

export const generateChatResponse = async (userMessage: string) => {
  try {
    console.log('Sending request to OpenAI...');
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful blood donation assistant. Keep responses concise and focused on blood donation topics."
        },
        {
          role: "user",
          content: userMessage
        }
      ],
      temperature: 0.7,
      max_tokens: 200
    });

    console.log('Response received:', completion.choices[0]?.message?.content);
    return completion.choices[0]?.message?.content || "I couldn't generate a response.";
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('Failed to get response from OpenAI');
  }
};
