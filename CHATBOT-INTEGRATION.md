# Kadhaippoma Chatbot Integration

This document describes the integration of the Kadhaippoma mental health intake chatbot with the telehealth backend system.

## Overview

The Kadhaippoma chatbot is designed to provide compassionate, AI-powered mental health intake conversations. It helps patients share their concerns, gather essential information for healthcare providers, and determine when professional intervention is needed.

## Architecture

### Components

1. **Frontend**: `frontend/kadhaippoma-intake.html`
   - Beautiful, responsive chat interface
   - Real-time messaging with typing indicators
   - Appointment scheduling suggestions
   - Fallback to demo mode if backend is unavailable

2. **Backend Lambda**: `src/lambdas/chatbot/`
   - Handles chat session management
   - Processes user messages and generates AI responses
   - Stores conversation data and extracted intake information
   - Integrates with OpenAI API (configurable)

3. **Database**: `ChatSessionsTable` (DynamoDB)
   - Stores chat sessions, messages, and intake data
   - Partition key: `sessionId`

### API Endpoints

- `POST /chat/start` - Initialize a new chat session
- `POST /chat/message` - Send a message and get AI response
- `GET /chat/sessions/{sessionId}` - Retrieve chat session data

## Features

### AI-Powered Conversations
- Empathetic, non-judgmental responses
- Structured intake data extraction
- Mental health assessment capabilities
- Appointment recommendation logic

### Data Collection
The chatbot extracts and structures the following intake data:

```typescript
interface IntakeData {
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
```

### Security & Privacy
- JWT-based authentication (optional)
- CORS enabled for cross-origin requests
- Comprehensive logging for monitoring
- Secure data storage in DynamoDB

## Configuration

### Environment Variables

The chatbot Lambda function uses these environment variables:

```bash
CHAT_SESSIONS_TABLE=ChatSessionsTable
OPENAI_API_KEY=your-openai-api-key-here
OPENAI_MODEL=gpt-3.5-turbo
MAX_TOKENS=1000
TEMPERATURE=0.7
JWT_SECRET=your-jwt-secret
REGION=us-east-1
NODE_ENV=production
LOG_LEVEL=INFO
SERVICE_NAME=chatbot
```

### AI Model Integration

Currently configured for OpenAI GPT-3.5-turbo, but can be adapted for:
- OpenAI GPT-4
- Anthropic Claude
- AWS Bedrock models
- Custom fine-tuned models

## Deployment

The chatbot is automatically deployed as part of the CDK stack:

```bash
# Build and deploy the entire stack including chatbot
./scripts/build-and-deploy.sh
```

### Manual Deployment

```bash
# Build chatbot Lambda
cd src/lambdas/chatbot
npm run build

# Deploy CDK stack
cd cdk
cdk deploy TelehealthBackend-dev
```

## Usage

### Frontend Integration

```html
<!-- Include the Kadhaippoma intake page -->
<iframe src="frontend/kadhaippoma-intake.html" width="100%" height="600px"></iframe>
```

### API Usage

```javascript
// Start a new chat session
const response = await fetch('/chat/start', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({})
});
const { sessionId, message } = await response.json();

// Send a message
const messageResponse = await fetch('/chat/message', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    sessionId: sessionId,
    message: "I've been feeling anxious lately"
  })
});
const { message: botResponse, shouldScheduleAppointment, intakeData } = await messageResponse.json();
```

## Demo Mode

The frontend includes a demo mode that works without the backend:
- Rule-based responses for common mental health topics
- Simulated typing indicators and delays
- Appointment scheduling suggestions
- Graceful fallback when API is unavailable

## Monitoring & Logging

The chatbot includes comprehensive logging:
- Request/response tracking
- Performance monitoring
- Error handling and reporting
- Business logic tracking

View logs using:
```bash
./scripts/logs-quick-reference.sh tail chatbot
```

## Customization

### Modifying AI Responses

Edit the system prompt in `src/lambdas/chatbot/src/config.ts`:

```typescript
SYSTEM_PROMPT: `You are Kadhaippoma, a compassionate AI assistant...`
```

### Adding New Intake Fields

1. Update the `IntakeData` interface in `src/lambdas/chatbot/src/types.ts`
2. Modify the AI response logic in `src/lambdas/chatbot/src/handler.ts`
3. Update the frontend to handle new data fields

### Styling the Frontend

The chat interface uses CSS custom properties for easy theming:

```css
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --background-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

## Integration with Existing System

The chatbot integrates seamlessly with the existing telehealth system:

1. **Patient Records**: Chat sessions can be linked to patient IDs
2. **Appointments**: Intake data can pre-populate appointment forms
3. **Provider Dashboard**: Healthcare providers can review intake conversations
4. **Analytics**: Conversation data provides insights into patient needs

## Future Enhancements

- **Voice Integration**: Add speech-to-text and text-to-speech
- **Multi-language Support**: Internationalization for diverse populations
- **Advanced Analytics**: Sentiment analysis and trend detection
- **Provider Handoff**: Seamless transition from chatbot to human provider
- **Mobile App**: Native mobile application with push notifications
- **Integration with EHR**: Direct integration with electronic health records

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure the API Gateway has proper CORS configuration
2. **OpenAI API Limits**: Monitor API usage and implement rate limiting
3. **DynamoDB Throttling**: Consider provisioned capacity for high traffic
4. **Lambda Timeouts**: Increase timeout for complex AI processing

### Debug Mode

Enable debug logging by setting `LOG_LEVEL=DEBUG` in the Lambda environment.

## Support

For technical support or questions about the chatbot integration:
- Review the logs using the provided scripts
- Check the API documentation in `API_DOCUMENTATION.md`
- Refer to the deployment guides in the `scripts/` directory

---

**Note**: This chatbot is designed for intake and initial assessment only. It should not replace professional mental health diagnosis or treatment. Always encourage users to seek professional help when appropriate.
