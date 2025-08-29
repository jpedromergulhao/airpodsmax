export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { cardNumber } = req.query;
  if (!cardNumber) {
    return res.status(400).json({ error: 'Card number is required' });
  }

  try {
    const response = await fetch(`https://lookup.binlist.net/${cardNumber}`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    });

    if (response.status === 429) {
      // Return a custom message for rate limit exceeded, without throwing an error
      return res.status(429).json({ error: 'The API limit has been exceeded. Please try again later, or you can ignore it' });
    }

    if (!response.ok) {
      console.error(`Error ${response.status}: ${response.statusText}`);
      return res.status(response.status).json({ error: `API error: ${response.statusText}` });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching card data:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}
