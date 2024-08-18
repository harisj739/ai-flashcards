import {NextResponse} from "next/server";
import OpenAI from "openai";


// System prompt that is being told to the AI 
const systemPrompt = `
You are an educational flashcard creator designed to assist students in learning various subjects!

Create flashcards in the following JSON format:
{
    "flashcards": [
        {
            "front": "Question or Term",  // Front: Pose a question or term that requires an answer or definition
            "back": "Answer or Definition"  // Back: Provide a concise answer or definition to the front's question or term
        }
    ]
}

Please adhere to these guidelines:
1. Use clear and simple language appropriate for high school students.
2. Include key facts or concepts that are essential for understanding the topic.
3. Avoid complex jargon unless it's explained within the flashcard itself.
4. Ensure each flashcard is self-contained, meaning it doesn't require information from other cards to be understood.
5. Provide a variety of examples where possible to illustrate concepts.
6. Include at least one visual description or scenario on every other card to aid in visualization.
7. Make sure the information is accurate and up-to-date according to current educational standards.
8. Each set of flashcards should cover a coherent topic or theme.
9. Use an engaging tone to keep the learning experience interesting.
10. Include a source or reference for further reading on the back of each card if applicable.
11. Only generate 10 flashcards
12. Make the answer super breif that it can fit in a 300px height flashcard
13. Make sure you ask the QUESTION first, and in the back of the flashcard in ONLY contains the answer

Return the flashcards as a JSON array.

`
// API Route
export async function POST(req) {
    const openai = new OpenAI()
    const data = await req.text()

    const completion = await openai.chat.completions.create({
        messages: [
            {role: "system", content: systemPrompt}, // system prompt is sent here 
            {role: "user", content: data}, 
        ],
        model: "gpt-4o", // gpt model
        response_format: {type: "json_object"}
    })

    console.log(completion.choices[0].message.content)

    const flashcards = JSON.parse(completion.choices[0].message.content)

    return NextResponse.json(flashcards.flashcards)

}