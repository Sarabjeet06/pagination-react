import React, { useContext, useEffect, useState } from 'react'
import CardContainer from './CardContainer';
import Header from './Header';
import Pagination from './Pagination';
import cartContext from '../context/CartContext';
import Product from '../types/ProductInterface';

interface ApiResponse {
  products: any[];
  total: number;
  skip: number;
  limit: number;
}

interface Range{
  upperRange: number;
  lowerRange: number;
}

const Home: React.FC = () => {

  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<{ [key: number]: Product[] }>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage, setProductsPerPage] = useState<number>(20);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [scrollPositions, setScrollPositions] = useState<{ [key: number]: number }>({});
  const [pagePosition, setPagePosition] = useState<{ [key: number]: Range }>({});
  const contextCart = useContext(cartContext);
  const [activePage, setActivePage]=useState<number>(0);


  const addToCart = (product: Product) => {
    const cartItems: Product[] = JSON.parse(localStorage.getItem('cart') || '{}')
    const isProductPresent = cartItems.find(item => item.id === product.id);
    if (!isProductPresent) {
      contextCart?.value.push(product);
      localStorage.setItem('cart', JSON.stringify(contextCart?.value));
      alert('successfully added to cart');
    }
    else {
      alert('is already there in cart');
    }
  }

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      if (!allProducts[currentPage]) {
        console.log("yes api call");
        const skipCount = productsPerPage * (currentPage - 1);
        console.log(currentPage);
        const url = `https://dummyjson.com/products?limit=${productsPerPage}&skip=${skipCount}`;
        const response = await fetch(url);
        const data: ApiResponse = await response.json();
        const productData = data.products;
        const requiredProducts: Product[] = productData.map((product: any) => ({
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
          description: product.description,
        }))
        setProducts(prevProducts => [...prevProducts, ...requiredProducts]);
        setTotalPages(Math.ceil(data.total / productsPerPage));
        setAllProducts(prevAllProducts => ({
          ...prevAllProducts,
          [currentPage]: requiredProducts
        }))

      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  // console.log(products);

  useEffect(() => {
    fetchProducts();
  }, [currentPage])

  // console.log(products);
  // console.log(allProducts);

  return (
    <div className='outer-container'>
      <Header addToCart={addToCart} />
      <CardContainer
        products={products}
        fetchProducts={fetchProducts}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isLoading={isLoading}
        totalPage={totalPages}
        scrollPositions={scrollPositions}
        setScrollPositions={setScrollPositions}
        pagePositions={pagePosition}
        setPagePositions={setPagePosition}
        addToCart={addToCart}
        totalPages={totalPages}
        activePage={activePage}
        setActivePage={setActivePage}

      />
      
    </div>
  )
}

export default Home
