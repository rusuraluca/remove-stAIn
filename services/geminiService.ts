import { GoogleGenAI, Type } from "@google/genai";
import { Material, AnalysisResult } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

function buildPrompt(materials: Material[], context: string, language: string): string {
  const materialLines = materials
    .filter(m => m.name && m.percentage)
    .map(m => `- ${m.name}: ${m.percentage}%`)
    .join('\n');

  return `You are an expert in fabric care and stain removal. Your task is to analyze an image of a clothing stain, its fabric composition, and any user-provided context to give the best removal instructions.

Analyze the image to determine the approximate size of the stain (e.g., small, medium, large) and factor this into your recommendations. For example, a larger stain might require pre-soaking.

Provide clear, safe, step-by-step instructions. Recommend specific cleaning agents and techniques suitable for the fabric to avoid damage.

Here is the information:

**Fabric Composition:**
${materialLines || 'Not specified'}

**User Context:**
${context || 'No context provided.'}

Please analyze the attached image and provide your expert stain removal guide. 
IMPORTANT: The entire response, including all keys and values in the JSON object, must be in ${language}.`;
}

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        summary: {
            type: Type.STRING,
            description: "A brief summary of the stain situation, including its perceived size from the image, and a high-level overview of the approach. For example: 'Given that you have a medium-sized fresh oil stain on a 100% cotton garment, here are the steps for removal...'"
        },
        materialsNeeded: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of materials and cleaning agents needed for the stain removal process."
        },
        steps: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING, description: "A short, clear title for the step, e.g., 'Blot the Stain'." },
                    description: { type: Type.STRING, description: "A detailed description of how to perform this step." }
                },
                required: ['title', 'description']
            },
            description: "A step-by-step guide to removing the stain."
        },
        additionalTip: {
            type: Type.STRING,
            description: "One final important tip or a concluding encouraging remark. For example: 'Always test cleaning solutions on an inconspicuous area first! With these steps, you should be able to remove the stain.'"
        }
    },
    required: ['summary', 'materialsNeeded', 'steps', 'additionalTip']
};

export const analyzeStain = async (
  imageBase64: string,
  materials: Material[],
  context: string,
  language: string,
): Promise<AnalysisResult> => {
  try {
    const prompt = buildPrompt(materials, context, language);

    const imagePart = {
      inlineData: {
        mimeType: 'image/jpeg',
        data: imageBase64,
      },
    };

    const textPart = {
      text: prompt,
    };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [imagePart, textPart] },
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      }
    });

    const jsonString = response.text;
    return JSON.parse(jsonString) as AnalysisResult;
  } catch (error) {
    console.error("Error analyzing stain:", error);
    throw error;
  }
};