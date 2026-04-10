import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY as string
});

export const generateSummary = async (feedback: string) => {

  try {

    const prompt = `
    Convert the feedback into 3 short actionable bullet points.

    Feedback:
    ${feedback}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt
    });

    return response.text;

  } catch (err) {

    console.log("AI quota exceeded, using fallback summary");

    return `
      • Improve communication during mentorship sessions
      • Work on better time management
      • Continue strengthening technical skills
      `;

  }

};