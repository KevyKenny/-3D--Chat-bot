import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
	apiKey: process.env.OPEN_AI_KEY,
});

export async function POST(req) {
	const { prompt } = await req.json();
	try {
		const res = await openai.completions.create({
			prompt,
			model: "gpt-3.5-turbo-instruct",
			max_tokens: 512,
			temperature: 0,
		});
		return NextResponse.json({ choices: res.choices });
	} catch {
		return NextResponse.json(
			{ message: "Something went wrong!" },
			{ status: 400 }
		);
	}
}

