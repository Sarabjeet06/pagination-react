import React, { useEffect, useRef, useState, useCallback } from 'react'
import Card from './Card';
import Pagination from './Pagination';
import Product from '../types/ProductInterface';


interface Range {
  upperRange: number;
  lowerRange: number;
}


interface CardContainerProps {
  products: Product[];
  fetchProducts: (page: number) => void;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
  totalPage: number;
  scrollPositions: { [key: number]: number };
  setScrollPositions: React.Dispatch<React.SetStateAction<{ [key: number]: number }>>
  pagePositions: { [key: number]: Range };
  setPagePositions: React.Dispatch<React.SetStateAction<{ [key: number]: Range }>>
  addToCart: (product: Product) => void
  totalPages: number;
  activePage: number;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
}


const CardContainer: React.FC<CardContainerProps> = ({ products, fetchProducts, currentPage, setCurrentPage, isLoading, totalPage, scrollPositions, setScrollPositions, pagePositions, setPagePositions, addToCart, totalPages, activePage, setActivePage }) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const allScrollPositions:number[]=[];
  const [initialPixels, setInitialPixels] = useState<number>(0);

  const lastDivRef = useCallback((node: HTMLDivElement | null) => {
    // if (observer.current) observer.current.disconnect();
    // observer.current = new IntersectionObserver(enteries => {
    //   if (enteries[0].isIntersecting) {
    //     console.log("working");
    //   }
    // })
    // // console.log(node);
    // if (node) {
    //   console.log(node);
    //   console.log(node.getAttribute("key"));
    //   if (currentPage === 1) setInitialPixels(node.offsetTop);
    //   let page;
    //   page = Math.ceil(node.offsetTop / initialPixels);
    //   console.log("page is", page);
    //   allScrollPositions.push(node.offsetTop);
    //   observer.current.observe(node);
    //   // setPagePositions(prevScrollpos=>({
    //   //   ...prevScrollpos,
    //   //   [currentPage]:{
    //   //     lowerRange: currentPage===1?0:pagePositions[currentPage-1].upperRange,
    //   //     upperRange: node.offsetTop,
    //   //   }
    //   // }))
    // }
  //   // console.log(node.accessKey);




  }, [isLoading]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const prevScrollTop = useRef(0);
  const [scrollTos, setScrollTos] = useState<number[]>([]);
  // const [currentClientHeight, setCurrentClientHeight]=useState<number>(0);
  // let prevClientHeight=0;

  const handleScroll = () => {
    const current = scrollRef.current;
    if (current) {
      const currentScrollTop = current?.scrollHeight;

      //console.log(currentScrollTop);
      // if (currentScrollTop > prevScrollTop.current) {
      //   //for downward
      //   console.log(current.clientHeight);
      //   current.scrollTo({
      //     top: pagePositions[currentPage]-100,
      //     behavior: 'smooth'
      //   })

      // } else {

      //   //for upward


      // }
      prevScrollTop.current = currentScrollTop
    }

    // let scrollSize
    // if(current?.clientHeight) scrollSize=current?.clientHeight * currentPage;
    // if(scrollSize) scrollTos[currentPage]=scrollSize;
    if (current && current.scrollTop + current.clientHeight >= current.scrollHeight) {
      // setScrollPositions(prevScrollPositions => (
      //   {
      //     ...prevScrollPositions,
      //     [currentPage]: current.scrollTop
      //   }
      // ))

      // setPagePositions(prevPagePositions=>(
      //   {
      //     ...prevPagePositions,
      //     [current.scrollTop]: currentPage
      //   }
      // ))
      // setCurrentPage(pagePositions[current.scrollTop]);

      fetchNextPage();
    }


  }

  const fetchNextPage = () => {
    const nextPage = currentPage + 1;
    if (nextPage > totalPage) return;
    setCurrentPage(currentPage + 1);
    setActivePage(currentPage + 1);
    // fetchProducts(nextPage);
  }

  console.log(pagePositions);


  useEffect(() => {
    console.log()
    const current = scrollRef.current;
    const ContainerObserver = new IntersectionObserver(enteries => {
      if (enteries[0].isIntersecting) {
        console.log("working");
      }
    })

    if(current) ContainerObserver.observe(current);
    // const throttle = (callback: Function, delay: number) => {
    //   let lastCall = 0;
    //   return function (...args: any[]) {
    //     const now = new Date().getTime();
    //     if (now - lastCall < delay) {
    //       return;
    //     }
    //     lastCall = now;
    //     callback(...args);
    //   };
    // };
    // const throttleScroll=throttle(handleScroll, 200)
    if (current) current.addEventListener("scroll", handleScroll);


    return () => {
      if (current) {
        current.removeEventListener("scroll", handleScroll);
      }
    }
  }, [isLoading, currentPage]);

  const handleScroll2 = (): void => {
    const cardContainer = document.getElementById('cardContainer');
    const currentClientHeight = cardContainer?.clientHeight;
    // console.log("scroll heigtht", cardContainer?.scrollHeight);
    const currentScrollHeight = cardContainer?.scrollHeight;
    // console.log("client heigtht", cardContainer?.clientHeight);
    const currentScrollTop = cardContainer?.scrollTop;
    if (currentPage === 1 &&currentClientHeight) setInitialPixels(currentClientHeight);
    console.log("scroll Top", cardContainer?.scrollTop);
    let pageValue=1;
    if(currentScrollTop){
      console.log("initial",initialPixels)
      if(currentScrollTop>initialPixels){
        pageValue = Math.ceil(currentScrollTop/initialPixels);
      }
    }
    console.log("page number", pageValue)

    // let prevPos=0;
    // if(currentScrollTop){
    //   allScrollPositions.map((scollPos,i)=>{
    //     if(prevPos===0||currentScrollTop>prevPos&&currentScrollTop<=scollPos){
    //       setCurrentPage(i);
    //     }
    //     prevPos=scollPos;
    //   })
    // }
    

    // if (!pagePositions[currentPage]) {
    //   setPagePositions(prevPagePositions => ({
    //     ...prevPagePositions,
    //     [currentPage]: {
    //       upperRange: currentPage === 1 ? 0 : pagePositions[currentPage - 1].lowerRange,
    //       lowerRange: currentClientHeight ? currentClientHeight : 0,
    //     }
    //   }))
    // }
    // Object.entries(pagePositions).map(entry => {
    //   const key = entry[0];
    //   const value = entry[1];
    //   if (currentScrollTop && value.upperRange <= currentScrollTop && value.lowerRange >= currentScrollTop) {
    //     setCurrentPage(Number(key));
    //     console.log("yes yes yes");
    //   }
    // })
    // if(currentScrollTop&&currentClientHeight&&currentScrollHeight&&currentScrollTop<currentClientHeight&&currentScrollTop<currentScrollHeight){
    //   pageValue=1;
    // }
    // if(currentScrollTop===0){
    //   if(currentScrollHeight) setInitialPixels(currentScrollHeight);
    // }
    // if(currentClientHeight&&currentScrollTop){
    //   pageValue=Math.ceil((currentScrollTop)/initialPixels);
    // }
    // setCurrentPage(pageValue);
    // if(currentScrollTop&&currentClientHeight&&currentScrollHeight&&(currentScrollHeight-(currentScrollTop+currentPage*currentClientHeight))>=currentScrollTop){
    //   setCurrentPage(currentPage-1);
    // }
    // console.log("page value: ", pageValue);
    // setActivePage(pageValue);
    // if(prevClientHeight==0||currentClientHeight>prevClientHeight){
    //   // console.log(prevClientHeight);
    // }
    // prevClientHeight=currentClientHeight
  }

  console.log(pagePositions);

  // useEffect(() => {
  //   const cardContainer = document.getElementById('cardContainer');
  //   cardContainer?.addEventListener("scroll", handleScroll2);
  // }, [])

  return (<>
    <div className='outer-card-container'>
      <div ref={scrollRef} className='card-container' id='cardContainer' >
        {products.map((product: Product, index: number) => {
          if (products.length === index + 1) {
            return <div ref={lastDivRef} key={product.id} className='product-card'>
              <div className='image-container'>
                <img src={product.thumbnail}></img>
              </div>
              <div className='product-info'>
                <div className='product-title'>{product.title}</div>
                <div className='product-price'> $ {product.price}</div>
                {/* ----- for ruppees &#8377;----- */}
              </div>
              <div className='button-container'>
                <button className='card-button' onClick={() => {
                  addToCart(product)
                }}>Add to cart</button>
              </div>
            </div>
          } else {
            return <div key={product.id} className='product-card'>
              <div className='image-container'>
                <img src={product.thumbnail}></img>
              </div>
              <div className='product-info'>
                <div className='product-title'>{product.title}</div>
                <div className='product-price'> $ {product.price}</div>
                {/* ----- for ruppees &#8377;----- */}
              </div>
              <div className='button-container'>
                <button className='card-button' onClick={() => {
                  addToCart(product)
                }}>Add to cart</button>
              </div>
            </div>
          }
        })}


      </div>
      {isLoading && <div className='card-loader'>loading...</div>}
    </div>

    <Pagination
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      totalPages={totalPages}
      fetchProducts={fetchProducts}
      scrollPositions={scrollPositions}
    /></>
  )
}

export default CardContainer
