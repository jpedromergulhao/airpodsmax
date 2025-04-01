export default async function handler(req, res) {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    const { zipCode } = req.query;
  
    if (!zipCode) {
      return res.status(400).json({ error: 'Zip code is required' });
    }
  
    const API_KEY = process.env.OPEN_CAGE_API_KEY;
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${zipCode}&key=${API_KEY}&language=en&limit=1`;
  
    try {
      const response = await fetch(url, { method: 'GET' });
  
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
  
      const data = await response.json();
  
      if (data.results.length > 0) {
        res.status(200).json(data.results[0].components);
      } else {
        res.status(404).json({ error: 'Address not found' });
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  