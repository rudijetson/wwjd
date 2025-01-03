import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { ScriptureResponse, FALLBACK_RESPONSE } from '@/app/lib/scripture-generation'

if (!process.env.ANTHROPIC_API_KEY) {
  throw new Error('ANTHROPIC_API_KEY is not set in environment variables');
}

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: Request) {
  if (req.method !== 'POST') {
    return NextResponse.json(
      { error: 'Method not allowed' },
      { status: 405 }
    )
  }

  try {
    const { question } = await req.json()
    
    if (!question || typeof question !== 'string') {
      return NextResponse.json(
        { error: 'Question must be a non-empty string' },
        { status: 400 }
      )
    }

    if (question.trim().length < 3) {
      return NextResponse.json(
        { error: 'Question must be at least 3 characters long' },
        { status: 400 }
      )
    }

    console.log('Sending question to Anthropic:', question)

    try {
      const message = await anthropic.messages.create({
        model: "claude-3-sonnet-20240229",
        max_tokens: 3015,
        temperature: 0.5,
        system: "You are a compassionate Christian AI assistant with deep knowledge of Jesus' teachings. Your role is to help people find relevant guidance from Jesus' direct teachings in the Gospels for their modern-day situations. Always maintain a respectful, empathetic tone and focus on practical applications of Jesus' wisdom.",
        messages: [{
          role: "user",
          content: [
            {
              type: "text",
              text: `Given this modern situation or question: "${question.trim()}"

I need guidance based on Jesus' teachings. Please:
1. Find a relevant Bible verse where Jesus directly teaches about this topic or a similar situation
2. Provide the full text of the verse
3. Explain the historical and spiritual context of Jesus' teaching
4. Show how to apply this teaching to the modern situation

Format your response as valid JSON like this:
{
  "verse": "Book Chapter:Verse",
  "text": "The full Bible verse text",
  "context": "Brief explanation of the historical and spiritual context",
  "application": "How to apply this teaching today"
}`
            }
          ]
        }]
      });

      console.log('Received response from Anthropic:', message)

      // Extract the text content from the message
      const textContent = message.content[0].type === 'text' ? message.content[0].text : '';
      
      try {
        // Clean the response to ensure it's valid JSON
        const cleanedContent = textContent.replace(/```json\n?|\n?```/g, '').trim();
        const parsedResponse = JSON.parse(cleanedContent) as ScriptureResponse;

        // Validate response structure
        if (!parsedResponse.verse || !parsedResponse.text || !parsedResponse.context || !parsedResponse.application) {
          console.error('Invalid response structure:', parsedResponse)
          throw new Error('Invalid response structure from AI');
        }

        console.log('Successfully parsed response:', parsedResponse)
        return NextResponse.json(parsedResponse);
      } catch (parseError) {
        console.error('Error parsing AI response:', parseError, 'Raw content:', textContent)
        return NextResponse.json(FALLBACK_RESPONSE);
      }
    } catch (anthropicError) {
      console.error('Anthropic API error:', anthropicError)
      throw new Error('Failed to get response from AI service')
    }
  } catch (error) {
    console.error('Error in guidance API:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to generate guidance'
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}

