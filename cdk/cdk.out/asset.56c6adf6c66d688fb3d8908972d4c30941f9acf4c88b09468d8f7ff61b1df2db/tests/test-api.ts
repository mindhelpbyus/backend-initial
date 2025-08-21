import axios from 'axios';

const API_URL = 'http://localhost:4566/restapis';

const testApi = async () => {
  try {
    // Get API ID from LocalStack
    const apisResponse = await axios.get(API_URL);
    const apiId = apisResponse.data.items[0].id;
    const baseUrl = `${API_URL}/${apiId}/local/_user_request_`;

    // Test signup
    const signupResponse = await axios.post(`${baseUrl}/auth/signup`, {
      email: "test@example.com",
      password: "password123",
      firstName: "Test",
      lastName: "User"
    });
    console.log('Signup Response:', signupResponse.data);

    // Store token for authenticated requests
    const token = signupResponse.data.token;

    // Test login
    const loginResponse = await axios.post(`${baseUrl}/auth/login`, {
      email: "test@example.com",
      password: "password123"
    });
    console.log('Login Response:', loginResponse.data);

    // Test get patient
    const patientId = signupResponse.data.patientId;
    const getPatientResponse = await axios.get(`${baseUrl}/patients/${patientId}`);
    console.log('Get Patient Response:', getPatientResponse.data);

  } catch (error: any) {
    console.error('Error:', error.response?.data || error.message);
  }
};

// Run tests
testApi();