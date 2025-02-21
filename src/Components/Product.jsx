import React from 'react';

export default function Product(props) {
  return (
    <div className="col-span-3 border border-red-500 p-4">
      <div className="grid  md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2 ">
        {
          // props.product.length == 0
          //     // ------when user search product but product not then not loaded skeleton
          props.loader == true
            ? <>
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </>
            : (props.product.length == 0
              ? <h1>Product(s) not found</h1>
            : props.product.map(
                (prod) => {
                  // return<ProductCard name={prod.name}  img={prod.src} key={prod.id}/>
                  // --------or ------
                  return <ProductCard  {...prod} key={prod.id} />
                }
              )
            )
        }
      </div>
    </div>
  );
}

const ProductCard = (props) => {
  // console.log(props)
  return (
    <div className="bg-white  mt-2 shadow-lg rounded-lg border border-gray-200">
      {/* Product Image */}
      <img
        src={props.thumbnail}
        alt={props.title}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      {/* Product Details */}
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-800">
          {props.title}
        </h2>
        <p className="text-gray-600 text-sm mt-2">
          {props.description}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <div>
            <span className='text-lg font-bold text-green-600'>
              ${(props.price * (1 - props.discountPercentage / 100)).toFixed(2)}
            </span>
            <span className='text-sm line-through text-gray-400 ml-2'>$9.99</span>
          </div>
          <span className={`text-sm ${props.stock <= 5 ? "text-red-600" : "text-grey-600"}`}>
            {props.availabilityStatus}
            Low stock</span>
        </div>
        <div className="mt-3 flex items-center">
          <span className=" text-sm font-bold flex gap-2">4.94
            <b className='text-yellow-500'>★★★★★</b>
          </span>
        </div>
        {/* Actions */}
        <div className="mt-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
            Add to Cart
          </button>
          <button className="ml-2 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};



const ProductCardSkeleton = () => {
  return (
    <div className="bg-white mt-2 shadow-lg rounded-lg border border-gray-200 animate-pulse">
      {/* Skeleton for Product Image */}
      <div className="w-full h-48 bg-gray-200 rounded-t-lg"></div>

      {/* Skeleton for Product Details */}
      <div className="p-4">
        {/* Title skeleton */}
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>

        {/* Description skeleton */}
        <div className="h-3 bg-gray-200 rounded w-full mb-4"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6 mb-4"></div>

        {/* Price and stock skeleton */}
        <div className="mt-3 flex items-center justify-between">
          <div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-3 bg-gray-200 rounded w-1/4 mt-2"></div>
          </div>
          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
        </div>

        {/* Rating skeleton */}
        <div className="mt-3 flex items-center">
          <div className="h-4 bg-gray-200 rounded w-1/6"></div>
        </div>

        {/* Buttons skeleton */}
        <div className="mt-4 flex">
          <div className="h-10 bg-gray-200 rounded w-1/3 mr-2"></div>
          <div className="h-10 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
    </div>
  );
};
