import React, { useEffect, useState } from 'react';
import Category from './Components/Category';
import Product from './Components/Product';


export default function App() {
  const [category, setCategory] = useState([]);
  const [product_data, setProductData] = useState([]);
  const lsCategoryUrl = localStorage.getItem("categoryUrl");
  const [categoryUrl, setCategoryUrl] = useState(lsCategoryUrl ?? null);
  const lssearch = localStorage.getItem("searchQuery");
  const [search_query, setSearchQuery] = useState(lssearch ?? null);
  const [loader, setLoader] = useState(false);
  const limit = 30;
  const [page, setPage] = useState(0);

  // --------------data categories product--------------------
  const fetchCategory = async () => {
    // setLoader(true);
    const response = await fetch('https://dummyjson.com/products/categories');
    const data = await response.json();
    // console.log(data);
    setCategory(data)
  }

  const pageBtn = [];
  if (product_data.total) {
    const total_products = product_data.total;
    const total_pages = Math.ceil(total_products / limit);
    // console.log(total_pages);
    for (let i = 0; i < total_pages; i++) {
      pageBtn.push(
        <li key={i}
          onClick={() => setPage(i)} 
          style={{ color: i == page ? 'red' : "" }}
          className="flex items-center cursor-pointer justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          {i + 1}
        </li>

      )
    }
  }



  const searchHandler = (e) => {
    // console.log(e.target.value)
    if(e.target.value == "") localStorage.removeItem("searchQuery")
    setSearchQuery(e.target.value)
  }

  const fetchProduct = async () => {
    // setProduct([]);
    // ------when user search product but product not then not loaded skeleton
    setLoader(true);
    let response;
    // console.log("categoryUrl, page,search_query")
    // console.log(categoryUrl, page,search_query)
    // console.log("categoryUrl", categoryUrl);
    if (search_query == "") {
      response = await fetch(categoryUrl ?? `https://dummyjson.com/products?limit=${limit}&skip=${limit * page}`);
    }
    else {
      response = await fetch(`https://dummyjson.com/products/search?q=${search_query}`);
    }
    // console.log('-------------------------')
    // null safe optr
    const data = await response.json();
    // console.log(categoryUrl,data,page,search_query,);
    setLoader(false);
    // setProduct(data.products);
    // ---limit page -----
    setProductData(data);
    // console.log("end")
  };




  const categoryChangeHandler = (category_url) => {
    if(category_url == null) localStorage.removeItem("categoryUrl");
    // console.log(category_url);
    setCategoryUrl(category_url);
    setSearchQuery("");
    localStorage.removeItem("searchQuery");
  }

  useEffect(
    () => {
      fetchCategory();
    }, []
  )

  useEffect(
    () => {
      if (categoryUrl != null) localStorage.setItem("categoryUrl", categoryUrl);
    }, [categoryUrl]
  )
  useEffect(
    () => {
      if(search_query != "") localStorage.setItem("searchQuery", search_query);
    },[search_query]
  )
  useEffect(
    () => {
      fetchProduct();
    }, [categoryUrl, page, search_query, categoryUrl]
  )

  return (
    <>
      <div className='max-w-[1200px] grid grid-cols-4 mx-auto  p-3 gap-3'>
        <div className=""></div>
        <div className="col-span-3">
          <>
            <nav aria-label="Page navigation example">
              <ul className="inline-flex -space-x-px text-base h-10">
                <li
                  onClick={() => setPage(page - 1)}
                  className="cursor-pointer flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Previous
                </li>
                {pageBtn}
                <li
                  onClick={() => setPage(page + 1)}
                  className="cursor-pointer flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Next
                </li>
              </ul>
            </nav>
          </>
          <div className='my-2'>
            <input value={search_query} onChange={searchHandler} type="text" className='w-full p-2 border focus:outline-none' placeholder='Search Here. eg. Mobile, Tablet etc..' />
          </div>
        </div>
      </div>
      <div className='max-w-[1200px] grid grid-cols-4 mx-auto  p-3 gap-3'>
        <Category categoryUrl={categoryUrl} category={category} onCategorySelector={categoryChangeHandler} />
        <Product loader={loader} product={product_data.products ?? []} />
      </div>
    </>
  );
}