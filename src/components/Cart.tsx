import React, { useContext, useEffect } from 'react'
import cartContext from '../context/CartContext'
import Product from '../types/ProductInterface';

const Cart: React.FC = () => {
  const context = useContext(cartContext);

  const removeFromCart = (productId: number) => {
    const cartItems: Product[] = JSON.parse(localStorage.getItem('cart') || '{}');
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    console.log(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert("Item removed successfully");
  }


  useEffect(()=>{
    context?.setCart(JSON.parse(localStorage.getItem('cart') || '{}'));
  },[removeFromCart])
 
  return (
    <div className='cart-container'>
      <div className='cart-page-title'>Items in cart</div>
      <div className='cart-products'>{context?.value.map((product) => {
        return <div className='cart-card'>
          <img src={product.thumbnail}></img>
          <div className='cart-card-content'>
            <div className='cart-card-title'>
              {product.title}
            </div>
            <div className='cart-card-description'>{product.description}</div>
            <div className='cart-card-price'>
              {product.price}
            </div>
            <div className='cart-remove-button-container'>
              <button onClick={() => {
                removeFromCart(product.id)
              }} className='cart-remove-button'>Remove from cart</button>
            </div>
          </div>
        </div>
      })}</div>
    </div>
  )
}

export default Cart
