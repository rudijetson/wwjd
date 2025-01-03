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
    const { content, type } = await req.json()
    
    if (!content || typeof content !== 'string' || !type || typeof type !== 'string') {
      return NextResponse.json(
        { error: 'Prayer content and type must be non-empty strings' },
        { status: 400 }
      )
    }

    console.log('Sending prayer to Anthropic:', { content, type })

    try {
      const message = await anthropic.messages.create({
        model: "claude-3-sonnet-20240229",
        max_tokens: 3015,
        temperature: 0.5,
        system: "You are a compassionate Christian AI assistant with deep knowledge of the Bible, particularly focused on prayer and worship. Your role is to find scripture that resonates with people's prayers, offering comfort, encouragement, and spiritual connection. For each prayer, find a Bible verse that mirrors the prayer's heart and intention, helping to deepen their connection with God through scripture.",
        messages: [{
          role: "user",
          content: [
            {
              type: "text",
              text: `Given this heartfelt ${type} prayer:
"${content.trim()}"

Please:
1. Find a Bible verse that echoes the spirit and intention of this prayer
2. Share the complete verse text
3. Explain the spiritual significance and context of this scripture
4. Show how this verse connects with and amplifies their prayer's meaning

Format your response as valid JSON like this:
{
  "verse": "Book Chapter:Verse",
  "text": "The full Bible verse text",
  "context": "Brief explanation of the spiritual significance and biblical context",
  "application": "How this scripture resonates with and strengthens their prayer"
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
    console.error('Error in scripture API:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to generate scripture'
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
} 