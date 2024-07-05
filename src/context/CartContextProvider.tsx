import React, { useState } from 'react'
import cartContext from './CartContext'
import Product from '../types/ProductInterface'

interface CartContextProps{
  children: React.ReactNode
}


const CartContextProvider: React.FC<CartContextProps> = (props) => {

  const [cart, setCart]=useState<Product[]>([]);  

  return (
    <cartContext.Provider value={{
      value: cart,
      setCart,
    }}>
      {props.children}
    </cartContext.Provider>
  )
}

export default CartContextProvider

