import React from 'react'
import { useEffect, useState } from 'react'
import {Navbar, Products} from './components'
import {commerce} from './lib/commerce'

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const fetchProducts = async() => {
    const {data} = await commerce.products.list();
    setProducts(data);
  }
  const fetchCart = async() => {
    setCart(await commerce.cart.retrieve());
  }
  const handleAddToCart = async(productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item);
  }
  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);
  // console.log(cart);
  return (
    <div>
      <Navbar total_items={cart.total_items} />
      <Products products={products} onAddToCart={handleAddToCart} />
    </div>
  )
}

export default App