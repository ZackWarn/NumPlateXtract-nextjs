// pages/api/verifyPlate.js
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { plateNumber } = req.body;

  if (!plateNumber) {
    return res.status(400).json({ error: 'No plate number provided' });
  }

  const apiKey = process.env.NINJA_API_KEY;

  console.log("🔍 Plate:", plateNumber);
  console.log("🔐 API key exists?", !!apiKey); // should be true

  if (!apiKey) {
    return res.status(500).json({ error: 'API key is missing in environment variables.' });
  }

  try {
    const response = await axios.post(
      'https://api.api-ninjas.com/v1/chat',
      {
        message: `Check the license plate: "${plateNumber}". Is it in valid Indian format? Which state is it from?`
      },
      {
        headers: {
          'X-Api-Key': apiKey,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log("✅ API Success:", response.data);

    res.status(200).json({ result: response.data.response });
  } catch (err) {
    console.error("❌ API call failed");
    console.error("Error message:", err.message);
    if (err.response) {
      console.error("Status code:", err.response.status);
      console.error("Response data:", err.response.data);
    }

    res.status(500).json({
      error: 'Failed to fetch plate info from Ninja API.',
      details: err.response?.data || err.message,
    });
  }
}
