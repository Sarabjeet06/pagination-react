import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import SearchContext from '../context/SearchContext';
import Product from '../types/ProductInterface';

interface ApiResponse {
    products: any[];
    total: number;
    skip: number;
    limit: number;
}

interface HeaderProps{
    addToCart: (product: Product)=>void;
}

const Header: React.FC<HeaderProps> = ({addToCart}) => {
    const [searchText, setSearchText] = useState<string>("");
    const contextSearch= useContext(SearchContext);

    const handleSearch = async () => {
        const url = `https://dummyjson.com/products/search?q=${searchText}`;
        const data = await fetch(url);
        const searchedProducts: ApiResponse = await data.json();
        const productsData = searchedProducts.products
        console.log(searchedProducts);
        const requiredProducts: Product[] = productsData.map((product: any) => ({
            id: product.id,
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail,
            description: product.description,
        }))
        contextSearch?.setSearchedProducts(requiredProducts);
    }
    return (
        <div className='header-container'>
            <div></div>
            <div className='inputs-container'>
                <input placeholder='search products' onChange={(e) => {
                    setSearchText(e.target.value)
                }} />
                <Link to='/search' >
                    <button onClick={() => {
                        handleSearch();
                    }}>Search</button>
                </Link>
            </div>
            <div>
                <Link to='/cart' >
                    <button className='cart-button'>View Cart</button>
                </Link>
            </div>
        </div>
    )
}

export default Header
