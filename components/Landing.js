/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import HomeLayout from "../layout/HomeLayout";
import { ADD_TO_CART, fetchProducts } from "../Redux/Slices/products";
import { useDispatch, useSelector } from "react-redux";

const Landing = () => {
  // redux hook
  const dispatch = useDispatch();

  // calling the api here for getting products
  useEffect(() => {
    dispatch(fetchProducts(5));
  }, [dispatch]);

  // getting all the products here
  const products = useSelector((state) => state.products);

  return (
    <div>
      <HomeLayout title="Home">
        <div className="py-6 container mx-auto">
          {/* about section here  */}
          <div className="text-center">
            <h2 className="text-3xl font-bold py-2">
              Grab the products you want!
            </h2>
            <p className="text-gray-700">
              All your favourite products that you need are here just grab them
              from here !
            </p>
          </div>
          {/* all the products listing here  */}
          {products.status ? (
            <div className="w-full py-20 flex items-center justify-center">
              <img src="https://i.ibb.co/YTJwbsX/loading.gif" alt="loading" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-6">
              {products?.products?.map((product) => (
                <div
                  key={product.id}
                  className="shadow-lg rounded-md flex items-center justify-center flex-col p-4"
                >
                  <img
                    src={product.image}
                    alt="productImage"
                    className="h-60	w-52 object-fill p-4"
                  />
                  <h2 className="text-blue-600 text-lg font-semibold">
                    {product.title}
                  </h2>
                  {/* price and btn */}
                  <div className="flex justify-between items-center my-2 w-full">
                    <p className="text-base text-semibold text-gray-700">
                      Price: {product.price}
                    </p>
                    <button
                      onClick={() => dispatch(ADD_TO_CART(product))}
                      className="bg-gray-800 text-white font-semibold rounded-sm p-2 hover:bg-gray-700 duration-200 hover:ring-2"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </HomeLayout>
    </div>
  );
};

export default Landing;
