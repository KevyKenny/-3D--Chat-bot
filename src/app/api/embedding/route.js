import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
	apiKey: process.env.OPEN_AI_KEY,
});

export async function POST(req) {
	const request = await req.json();
	try {
		const result = await openai.embeddings.create({
			input: request.text,
			model: "text-embedding-ada-002",
		});
		const embedding = result.data[0].embedding;
		const token = result.usage.total_tokens;
		return NextResponse.json({token,embedding});
	} catch {
		return NextResponse.json(
			{message: "Something went wrong",},
			{status: 400 }
		);
	}
}
