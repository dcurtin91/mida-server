import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const port = 3000;
app.use(cors());

app.get('/fetchData', async (req, res) => {
  try {
    const response = await fetch('https://sheetdb.io/api/v1/cdjii4pfg6xp5');
    const data = await response.json();

    // Extract only the "TTM REVENUE" and "ASKING PRICE" columns
    const filteredData = data.map(row => ({
      'Title': row['Title'],
      'TTM REVENUE': row['TTM REVENUE'],
      'ASKING PRICE': row['ASKING PRICE'],
    }));

    const origin = 'http://localhost:5173';
    res.setHeader('Access-Control-Allow-Origin', origin);

    // Send the filtered data as a JSON response
    res.json(filteredData);
  } catch (error) {
    console.error('Error fetching data: ', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
