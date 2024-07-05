import React, { useRef } from 'react'

interface paginationProps {
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    totalPages: number;
    fetchProducts: (page: number)=>void;
    scrollPositions: { [key: number]: number };
}


const Pagination: React.FC<paginationProps> = ({ currentPage ,setCurrentPage ,totalPages , fetchProducts, scrollPositions }) => {
    return (
        <div className='pagination-container'>
            <div>
                {currentPage > 1 && <button className='pagination-button' onClick={()=>{
                    setCurrentPage(currentPage-1);
                    
                }}>Prev</button>}
            </div>
            {Array.from({length: totalPages},(v,i)=>(
                <div className={`page-number ${currentPage===i+1?'active-page':''}`} key={i} onClick={()=>{
                    setCurrentPage(i+1);
                    const scrollRef=document.getElementById('cartContainer');
                    console.log(scrollRef);
                    scrollRef?.scrollTo({
                        top: scrollPositions[currentPage],
                        behavior: 'smooth'
                    })
                }}>{i+1}</div>
            ))}
            <div>
                {currentPage<totalPages&&<button className='pagination-button' onClick={()=>{
                    setCurrentPage(currentPage+1);
                }}>Next</button>}
            </div>
        </div>
    )
}

export default Pagination
