import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger';
import { Col, Row } from 'react-bootstrap';

import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import { Helmet } from 'react-helmet-async';
import MessageBox from '../components/MessageBox';
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
      <Helmet>
        <title>Marketplace</title>
      </Helmet>
      <h1>Featured products</h1>
      <div className="products">
        {loading ? (
          <div>
            <LoadingBox />
          </div>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                <Product product={product} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
