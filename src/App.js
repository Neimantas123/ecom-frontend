import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';

function App() {
  return (
    <BrowserRouter>
      <header>
        <Link to="/">Marketplace</Link>;
      </header>
      <main>
        <Routes>
          <Route path="/product/:slug" element={<ProductScreen />} />
          <Route path="/" element={<HomeScreen />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
