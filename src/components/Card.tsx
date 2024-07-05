import React from 'react'
import Product from '../types/ProductInterface';

interface CardProps {
    product: Product;
    addToCart: (product: Product)=>void
    
}

const Card: React.FC<CardProps> = ({ product ,addToCart }) => {
    return (
        <div className='product-card'>
            <div className='image-container'>
                <img src={product.thumbnail}></img>
            </div>
            <div className='product-info'>
                <div className='product-title'>{product.title}</div>
                <div className='product-price'> $ {product.price}</div>
                {/* ----- for ruppees &#8377;----- */}
            </div>
            <div className='button-container'>
                <button className='card-button' onClick={()=>{
                    addToCart(product)}}>Add to cart</button>
            </div>
        </div>
    )
}

export default Card
