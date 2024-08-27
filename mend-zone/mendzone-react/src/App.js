// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8001/api/cards');
        setCards(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      {loading ? <p>Loading...</p> : (
        <div className="card-container">
          <div className="cards">
            {cards.map((crd) => (
              <div className="card" key={crd.id}>
                <div className="card-header">
                  <img src={crd.PROVIDER_LOGO} alt="Logo" className="logo" />
                  <div className="compare">
                    <input type="checkbox" id={`compare-${crd.id}`} />
                    <label htmlFor={`compare-${crd.id}`}>Compare</label>
                  </div>
                </div>
                <div className="card-title">{crd.OURPACKAGE}</div>
                <p className="description">{crd.TEST_NAME}</p>
                <p className="tests-count">{crd.TEST_COUNT} Tests</p>
                <div className="price-section">
                  <p className="price">₹{crd.OFFER_PRICE}/-</p>
                  <p className="discount">
                    {Math.round(((crd.ACT_PRICE - crd.OFFER_PRICE) / crd.ACT_PRICE) * 100)}% Off <span className="strike">₹{crd.ACT_PRICE}</span>
                  </p>
                </div>
                <p className="fasting">
                  {crd.FASTING_FLAG === 'CF' ? 'Fasting Not Required' : 'Fasting Required'}
                </p>
                <button className="add-to-cart">
                  <div className="image-wrapper">
                    <img src="./images/shopping-cart.png" alt="Cart" className="image1" />
                    <img src="./images/shopping-cart.png" alt="Checked" className="image2" />
                  </div>
                  ADD
                </button>
                <div className="certifications">
                  <img src="./images/Iso.png" alt="ISO" />
                  <img src="./images/cap.png" alt="CAP Accredited" />
                  <img src="./images/Nabl.png" alt="NABL" />
                  <img src="./images/ngsp.jpg" alt="NGSP" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
