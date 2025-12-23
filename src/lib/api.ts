const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface TranslateRequest {
  text: string;
  sourceLanguage: string;
  targetLanguage: string;
}

export interface TranslateResponse {
  success: boolean;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
}

export interface ApiError {
  error: string;
  message: string;
}

/**
 * Translate text using the backend API
 */
export async function translateText(
  text: string,
  sourceLanguage: string,
  targetLanguage: string
): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/api/translate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text,
      sourceLanguage,
      targetLanguage,
    }),
  });

  if (!response.ok) {
    const error: ApiError = await response.json();
    throw new Error(error.message || 'Translation failed');
  }

  const data: TranslateResponse = await response.json();
  return data.translatedText;
}

