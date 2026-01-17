import type { APIRoute } from 'astro';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI("AIzaSyA4TT4TB-3laeq7d0rdQP82sp7x0FfWwWo");

export const POST: APIRoute = async ({ request }) => {
  try {
    const { message } = await request.json();

    if (!message) {
      return new Response(JSON.stringify({ error: 'Message is required!' }), { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(message);
    const response = result.response;
    const text = response.text();

    return new Response(JSON.stringify({ reply: text }), { status: 200 });
  } catch (error) {
    console.error('Error communicating with Gemini API:', error);
    return new Response(JSON.stringify({ error: 'Failed to get response from Gemini API' }), { status: 500 });
  }
};