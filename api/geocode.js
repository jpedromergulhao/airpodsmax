import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const zipCode = req.query.zipCode;

    if (!zipCode) {
      return res.status(400).json({ error: 'Zip code is required' });
    }

    const API_KEY = process.env.OPEN_CAGE_API_KEY;
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${zipCode}&key=${API_KEY}&language=en&limit=1`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.results.length > 0) {
        res.status(200).json(data.results[0].components); // Return location data to the frontend
      } else {
        res.status(404).json({ error: 'Address not found' });
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}