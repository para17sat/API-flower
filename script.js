const express = require('express');
const axios = require('axios');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

const FLOWERS_API_URL = 'https://farmgirlflowers.com/';


app.use(express.static(path.join(__dirname, 'public')));

app.get('/search', async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ error: 'Query parameter q is required' });
  }

  try {
    const response = await axios.get(`${FLOWERS_API_URL}?search=${encodeURIComponent(query)}`);
    const flowers = response.data.map(flower => ({
      name: flower.name,
      imageUrl: flower.image
    }));

    res.json({ results: flowers });
  } catch (error) {
    console.error('Error fetching flower data:', error.message);
    res.status(500).json({ error: 'Failed to fetch flower data' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);



fs.writeFileSync(path.join(publicDir, 'index.html'), htmlContent);
fs.writeFileSync(path.join(publicDir, 'styles.css'), cssContent);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
