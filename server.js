import express from 'express';
import cors from 'cors';

const app = express();
const port = 4000;
app.use(cors());


import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAsKZyXuZZ2AP-DpmPYT8z7q5odDliOdEg",
  authDomain: "mida-c36cb.firebaseapp.com",
  projectId: "mida-c36cb",
  storageBucket: "mida-c36cb.appspot.com",
  messagingSenderId: "522567904542",
  appId: "1:522567904542:web:f511ab34db094dd2686d0f"
};


const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

app.get('/fetchData', async (req, res) => {
  try {
    const startupCollection = collection(db, 'startups'); 

    const snapshot = await getDocs(startupCollection);
    const data = snapshot.docs.map(doc => doc.data());

    const filteredData = data.map(row => ({
      'Title': row['Title'],
      'Under_Offer': row['Under_Offer'],
      'TTM_REVENUE': row['TTM_REVENUE'],
      'TTM_PROFIT': row['TTM_PROFIT'],
      'ASKING_PRICE': row['ASKING_PRICE'],
      'Description': row['Description'],
      'Date_Founded': row['Date_Founded'],
      'Team_Size': row['Team_Size'],
      'BUSINESS_MODEL': row['BUSINESS_MODEL'],
      'Tech_Stack': row['Tech_Stack'],
      'COMPETITORS': row['COMPETITORS'],
      'GROWTH_OPPORTUNITY': row['GROWTH_OPPORTUNITY'],
      'SELLING_REASONING': row['SELLING_REASONING'],
      'Financing': row['Financing'],
      'TTM_gross_revenue': row['TTM_gross_revenue'],
      'TTM_net_profit': row['TTM_net_profit'],
      'Last_months_gross_revenue': row['Last_months_gross_revenue'],
      'Last_months_net_profit': row['Last_months_net_profit'],
      'Customers': row['Customers'],
      'Annual_recurring_revenue': row['Annual_recurring_revenue'],
      'Annual_growth_rate': row['Annual_growth_rate'],
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