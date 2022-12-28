import React, { useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logger from 'use-reducer-logger';
//import data from '../data';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, laoding: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const HomeScreen = () => {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    loading: true,
    error: '',
    products: [],
  });
  //const [products, setProducts] = useState([]);

  useEffect(() => {
    dispatch({ type: 'FETCH_REQUEST' });
    try {
      const fectData = async () => {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      };
      fectData();
    } catch (error) {
      dispatch({ type: 'FETCH_FAIL', payload: error.message });
    }
  }, []);
  return (
    <div>
      <h1>Featured products</h1>
      <div className="products">
        {loading ? (
          <div>Loading</div>
        ) : error ? (
          <div>{error} </div>
        ) : (
          products.map((product) => (
            <div className="product" key={product.slug}>
              <Link to={`/product/${product.slug}`}>
                <img src={product.image} alt={product.name} />
              </Link>
              <div className="product-info">
                <Link to={`product/${product.slug}`}>
                  <p>{product.name}</p>
                </Link>

                <p>
                  <strong>${product.price}</strong>
                </p>
                <button>Add to cart</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HomeScreen;