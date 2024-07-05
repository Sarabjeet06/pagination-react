import React, { useContext } from 'react'
import SearchContext from '../context/SearchContext'
import Card from './Card';
import Product from '../types/ProductInterface';

interface SearchItemProps{
  addToCart: (product: Product)=>void;
}

const SearchItem: React.FC = () => {
  const contextSearch=useContext(SearchContext);
  return (
    <div className='searched-container'>
      {contextSearch?.value? contextSearch?.value.map((product)=>{
        return <div className='product-card'>
        <div className='image-container'>
            <img src={product.thumbnail}></img>
        </div>
        <div className='product-info'>
            <div className='product-title'>{product.title}</div>
            <div className='product-price'> $ {product.price}</div>
            {/* ----- for ruppees &#8377;----- */}
        </div>
    </div>
      }): <div>return (<div> No Product found </div>)</div>}
    </div>
  )
}

export default SearchItem
