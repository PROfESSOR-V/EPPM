import OpenAI from 'openai';

export async function callLLM(content: string, prompt: string): Promise<any> {
  const apiKey = process.env.OPENAI_API_KEY!;
  const openai = new OpenAI({ apiKey });

  const messages = [
    { role: 'system', content: prompt },
    { role: 'user', content },
  ];

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages,
    temperature: 0,
  });

  const raw = completion.choices[0].message.content || '{}';
  const jsonStr = raw.trim().replace(/^```json|```$/g, '');
  return JSON.parse(jsonStr);
}
