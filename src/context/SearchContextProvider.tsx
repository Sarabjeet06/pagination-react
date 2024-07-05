import React, { useState } from 'react'
import SearchContext from './SearchContext'
import Product from '../types/ProductInterface'

interface SearchContextProps {
    children: React.ReactNode
}

const SearchContextProvider: React.FC<SearchContextProps> = (props) => {
    const [searchedProducts, setSearchedProducts] = useState<Product[]>([]);
    return (
        <SearchContext.Provider value={{
            value: searchedProducts,
            setSearchedProducts,
        }}>
            {props.children}
        </SearchContext.Provider>
    )
}

export default SearchContextProvider
