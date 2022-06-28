import React from "react";
import HomeLayout from "../layout/HomeLayout";
import { useSelector, useDispatch } from "react-redux";
import { REMOVE_ALL, REMOVE_FROM_CART } from "../Redux/Slices/products";
import Link from "next/link";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.products.cart);

  // sub totol here
  let subTotal = 0;
  cart?.forEach((product) => (subTotal = product.price + subTotal));

  return (
    <div>
      <HomeLayout title="Cart">
        <div className="py-6 container mx-auto">
          <h2 className="text-3xl font-bold py-2 text-center">Your cart</h2>

          {/* all the cart products listing here   */}
          {!cart?.length ? (
            <div className="w-full py-20 flex items-center justify-center flex-col text-center">
              <h2>Your cart is empty! </h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <Link href="/">
                <button className="btn-1 bg-gray-700 w-40">Back Home</button>
              </Link>
            </div>
          ) : (
            <table className="py-6 w-11/12 md:w-2/3 lg:w-1/2 mx-auto">
              <thead className="border-b">
                <tr className="font-semibold">
                  <td className="w-28">Product</td>
                  <td className="w-6">Price</td>
                  <td className="w-8 text-right">Action</td>
                </tr>
              </thead>
              <tbody>
                {cart?.map((product) => (
                  <tr key={product.id} className="p-4">
                    <td className="py-3">{product.title}</td>
                    <td>{product.price}</td>
                    <td className="flex items-center justify-end">
                      <button
                        onClick={() => dispatch(REMOVE_FROM_CART(product.id))}
                        className="text-right bg-red-600 rounded-sm p-2 font-white text-white"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {/* sub total here and checkout btn here */}
          {cart?.length && (
            <div className="py-2 w-11/12 lg:w-1/2 mx-auto border-t mt-6 flex items-center justify-between">
              <p className="font-semibold">
                SubTotal: {subTotal ? subTotal : ""}
              </p>
              <div>
                <button
                  onClick={() => dispatch(REMOVE_ALL())}
                  className="btn-1 w-40"
                >
                  Checkout
                </button>
                <Link href="/">
                  <button className="btn-1 bg-gray-700 w-40">Back Home</button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </HomeLayout>
    </div>
  );
};

export default Cart;
