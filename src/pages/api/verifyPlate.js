import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { plateNumber } = req.body;
  if (!plateNumber) {
    return res.status(400).json({ error: 'No plate number provided' });
  }

  try {
    const response = await axios.post(
      'https://api.api-ninjas.com/v1/chat',
      {
        message: `Analyze the license plate: "${plateNumber}". Is it valid? Which region/state is it from? Is the format correct?`
      },
      {
        headers: {
          'X-Api-Key': process.env.NINJA_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );

    res.status(200).json({ result: response.data.response });
  } catch (err) {
    console.error('Ninja API error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch plate info from AI API.' });
  }
}