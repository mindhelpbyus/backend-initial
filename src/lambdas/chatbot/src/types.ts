export interface ChatMessage {
  id: string;
  sessionId: string;
  message: string;
  sender: 'user' | 'bot';
  timestamp: string;
  metadata?: {
    intent?: string;
    confidence?: number;
    entities?: any[];
  };
}

export interface ChatSession {
  sessionId: string;
  patientId?: string;
  startTime: string;
  lastActivity: string;
  status: 'active' | 'completed' | 'abandoned';
  messages: ChatMessage[];
  intakeData?: IntakeData;
}

export interface IntakeData {
  personalInfo?: {
    name?: string;
    age?: number;
    gender?: string;
    contactInfo?: string;
  };
  mentalHealthHistory?: {
    previousTherapy?: boolean;
    currentMedications?: string[];
    diagnosedConditions?: string[];
    familyHistory?: string[];
  };
  currentConcerns?: {
    primaryConcern?: string;
    severity?: number; // 1-10 scale
    duration?: string;
    triggers?: string[];
    symptoms?: string[];
  };
  goals?: {
    shortTerm?: string[];
    longTerm?: string[];
  };
  preferences?: {
    therapyType?: string;
    communicationStyle?: string;
    availability?: string[];
  };
}

export interface AIResponse {
  message: string;
  intent?: string;
  confidence?: number;
  nextQuestions?: string[];
  extractedData?: Partial<IntakeData>;
  shouldScheduleAppointment?: boolean;
}

export interface ChatbotConfig {
  openaiApiKey: string;
  model: string;
  maxTokens: number;
  temperature: number;
  systemPrompt: string;
}
