const express = require('express');
const cors = require('cors'); // Import CORS middleware
const axios = require('axios');

const app = express();
const port = 8001;

app.use(cors()); // Enable CORS for all origins
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });
app.use(express.json());

app.get('/api/cards', async (req, res) => {
  try {
    const response = await axios({
      method: 'get',
      url: 'https://core.mend.zone/client/getMachineTestDetail/1/110001/N/OFFER',
      headers: {
        'Content-Type': 'application/json',
        'api-key': 'dU9Aq8mxlFtAH9Vybr7OyUezYB5CE4qTdU9Aq8mxlFtAH9Vybr7OyUezYB5CE4qT',
      },
      data: {
        clientKey: "9IEcgUVWNOjW-lnmP_KiMw==",
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'An error occurred' });
  }
  
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
