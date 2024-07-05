import React from "react";
import Product from "../types/ProductInterface";


interface SearchContextValue{
    value: Product[];
    setSearchedProducts: (product: Product[])=> void;
}

const SearchContext=React.createContext<SearchContextValue| null>(null);

export default SearchContext;