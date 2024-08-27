import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const CardList = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get('https://core.mend.zone/client/getMachineTestDetail/1/110001/N/OFFER', {
          headers: {
            'Content-Type': 'application/json',
            'api-key': 'dU9Aq8mxlFtAH9Vybr7OyUezYB5CE4qTdU9Aq8mxlFtAH9Vybr7OyUezYB5CE4qT'
          },
          params: {
            clientKey: '9IEcgUVWNOjW-lnmP_KiMw=='
          }
        });
        
        setCards(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCards();
  }, []);

  return (
    <div className="card-container">
      <div className="cards">
        {cards.map((card, index) => {
          const discountPercentage = Math.round(((card.ACT_PRICE - card.OFFER_PRICE) / card.ACT_PRICE) * 100);

          return (
            <div className="card" key={card.id || index}>
              <div className="card-header">
                <img src={card.PROVIDER_LOGO} alt="Provider Logo" className="logo" />
                <div className="compare">
                  <input type="checkbox" id={`compare-${card.id}`} />
                  <label htmlFor={`compare-${card.id}`}>Compare</label>
                </div>
              </div>
              <div className="card-title">{card.OURPACKAGE}</div>
              <p className="description">{card.TEST_NAME}</p>
              <p className="tests-count">{card.TEST_COUNT} Tests</p>
              <div className="price-section">
                <p className="price">₹{card.OFFER_PRICE}/-</p>
                &nbsp;
                <p className="discount">
                  {discountPercentage}% Off 
                  <span className="strike">₹{card.ACT_PRICE}</span>
                </p>
              </div>
              <p className="fasting">
                {card.FASTING_FLAG === 'CF' ? 'Fasting Not Required' : 'Fasting Required'}
              </p>
              <button className="add-to-cart">
                <div className="image-wrapper">
                  <img src="/shopping-cart.png" alt="Cart" className="image1" />
                  <img src="/shopping-cart.png" alt="Checked" className="image2" />
                </div>
                ADD
              </button>
              <div className="certifications">
                <img src="/Iso.png" alt="ISO" />
                <img src="/cap.png" alt="CAP Accredited" />
                <img src="/Nabl.png" alt="NABL" />
                <img src="/ngsp.jpg" alt="NGSP" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardList;
