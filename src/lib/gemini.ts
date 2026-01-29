import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

// Get the generative model
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

/**
 * Analyze farm damage using AI
 */
export async function analyzeDamage(params: {
    farmName: string;
    areaAcres: number;
    damagePercentage: number;
    floodSeverity: string;
}): Promise<string> {
    const prompt = `
    You are an agricultural expert analyzing flood damage to farmland.
    
    Farm Details:
    - Name: ${params.farmName}
    - Total Area: ${params.areaAcres} acres
    - Damage Percentage: ${params.damagePercentage}%
    - Flood Severity: ${params.floodSeverity}
    
    Provide a detailed damage assessment including:
    1. Impact on crop yield
    2. Expected recovery time
    3. Recommended immediate actions
    4. Long-term soil health implications
    
    Keep the response professional and actionable for farmers.
  `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Gemini AI error:', error);
        return 'AI analysis temporarily unavailable. Our agricultural experts will review your case manually.';
    }
}

/**
 * Generate insurance recommendation
 */
export async function generateInsuranceRecommendation(params: {
    farmName: string;
    areaAcres: number;
    damagePercentage: number;
    affectedAcres: number;
}): Promise<{ amount: number; reasoning: string }> {
    const prompt = `
    Calculate fair insurance compensation for a flood-damaged farm:
    
    - Farm: ${params.farmName}
    - Total Area: ${params.areaAcres} acres
    - Damage: ${params.damagePercentage}%
    - Affected Area: ${params.affectedAcres} acres
    
    Base insurance rate: ₹50,000 per acre of damaged land
    
    Provide:
    1. Recommended compensation amount (in Indian Rupees)
    2. Brief reasoning for the amount
    
    Format: Just state the amount and reasoning clearly.
  `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Calculate base amount
        const baseAmount = params.affectedAcres * 50000;

        return {
            amount: Math.round(baseAmount),
            reasoning: text
        };
    } catch (error) {
        const baseAmount = params.affectedAcres * 50000;
        return {
            amount: Math.round(baseAmount),
            reasoning: 'Standard compensation based on affected area: ₹50,000 per acre.'
        };
    }
}

/**
 * Get crop advisory after flood
 */
export async function getCropAdvisory(damageLevel: string): Promise<string> {
    const prompt = `
    Provide post-flood crop advisory for farmers whose fields experienced ${damageLevel} flood damage.
    Include:
    1. Recommended crops for next season
    2. Soil treatment steps
    3. Timeline for replanting
    4. Government schemes they can access
    
    Keep it practical and specific to Indian agriculture.
  `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        return 'Crop advisory temporarily unavailable.';
    }
}

/**
 * Chat with AI assistant
 */
export async function chatWithAssistant(message: string, context?: string): Promise<string> {
    const prompt = `
    You are a helpful assistant for the PM Kisan Yojana insurance platform.
    ${context ? `Context: ${context}` : ''}
    
    Farmer's question: ${message}
    
    Provide a helpful, clear response about farming, insurance claims, or the platform.
  `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        return 'I apologize, I am temporarily unable to respond. Please try again or contact support.';
    }
}
