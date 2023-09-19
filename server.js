import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const port = 4000;
app.use(cors());

app.get('/fetchData', async (req, res) => {
  try {
    const response = await fetch('https://sheetdb.io/api/v1/eiqpxcfg1r8i8');
    const data = await response.json();

    
    const filteredData = data.map(row => ({
      'Title': row['Title'],
      'TTM_REVENUE': row['TTM_REVENUE'],
      'ASKING_PRICE': row['ASKING_PRICE'],
      'ID': row['ID']
    }));

    const origin = 'http://localhost:5173';
    res.setHeader('Access-Control-Allow-Origin', origin);

    
    res.json(filteredData);
  } catch (error) {
    console.error('Error fetching data: ', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
