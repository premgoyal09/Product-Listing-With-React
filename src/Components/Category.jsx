import React from 'react';

export default function Category(props) {
    // console.log("props.categoryUrl", props.categoryUrl)
    return (
        <div>
            <div className='text-xl text-center font-bold'>Category</div>
            <ul>
                <li onClick={() => props.onCategorySelector(null)}
                    className={`p-2 shadow cursor-pointer mt-2 ${props.categoryUrl == null ? 'bg-blue-500 text-white' : ''}`}>All</li>
                {
                    props.category.map(
                        (cat, index) => {
                            return (
                                <li onClick={
                                    () => props.onCategorySelector(cat.url)
                                } key={index} className={`${
                                    props.categoryUrl == cat.url ? 'bg-blue-500 text-white' : ''
                                  } duration-100 p-2 shadow cursor-pointer mt-2`}
                                  >{cat.name}</li>
                            )
                        }
                    )
                }
            </ul>
        </div>
    );
}