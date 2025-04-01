import fetch from 'node-fetch';

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

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching card data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
