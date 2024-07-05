import React from "react";
import Product from "../types/ProductInterface";

interface CartContextValue{
    value: Product[];
    setCart: (product: Product[])=> void;
}

const cartContext=React.createContext<CartContextValue|null>(null);

export default cartContext;