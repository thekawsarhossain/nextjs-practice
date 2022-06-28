import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import useFirebase from "../hooks/useFirebase";

const Header = () => {
  const cartLength = useSelector((state) => state.products.cart?.length);

  const { logoutUser } = useFirebase();

  return (
    <div className="border-b shadow-md py-4 sticky top-0 bg-white">
      <div className="container mx-auto flex justify-between items-center">
        {/* logo here  */}
        <Link href="/">
          <h2 className="text-3xl font-bold text-blue-600 cursor-pointer">
            Commerce
          </h2>
        </Link>
        {/* cart btn */}
        <Link href="/cart">
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-600 relative"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>

            <span className="text-white bg-black px-2 rounded-2xl absolute top-11">
              {cartLength}
            </span>
          </button>
        </Link>
        {/* logout btn  */}
        <button onClick={logoutUser} className="btn-1 w-40">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
