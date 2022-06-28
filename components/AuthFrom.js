import Head from "next/head";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import useFirebase from "../hooks/useFirebase";

// internal imports

const AuthFrom = ({ type }) => {
  const { registerUser, signIn, setError, error, loading } = useFirebase();

  // handle submit function here
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const submitHandler = (data) => {
    if (type === "signup") {
      if (data.password === data.password2) {
        registerUser(data.email, data.password, data.name);
      } else {
        setError("Password doesn't match!");
      }
    } else {
      signIn(data.email, data.password);
    }
    reset();
  };

  return (
    <div className="flex items-center justify-center flex-col">
      {/* head title here  */}
      <Head>
        <title>{type === "login" ? "Login" : "Signup"}</title>
      </Head>

      {/* auth page content start here  */}
      <div className="w-11/12 md:w-3/5 lg:w-1/3 py-12">
        {/* page body title  */}
        <h2 className="text-4xl text-center p-4">
          {type === "login" ? "Login Please" : "Signup Please"}
        </h2>

        <div className="bg-slate-100 p-6 rounded-md shadow-md">
          {/* form start here  */}
          <form onSubmit={handleSubmit(submitHandler)}>
            {type === "signup" && (
              <>
                <label htmlFor="name">
                  <p className={errors.name ? "text-red-700" : "text-black"}>
                    {errors?.name?.message
                      ? errors?.name?.message
                      : "Enter you name"}
                  </p>
                </label>
                <input
                  type="text"
                  name="name"
                  className="p-3 w-full rounded-sm mb-2"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "You have to give your name!",
                    },
                  })}
                  placeholder="Enter your name"
                />
              </>
            )}

            <label htmlFor="email">
              <p className={errors.email ? "text-red-700" : "text-black"}>
                {errors?.email?.message
                  ? errors?.email?.message
                  : "Enter you email"}
              </p>
            </label>
            <input
              type="email"
              name="email"
              className="p-3 w-full rounded-sm mb-2"
              {...register("email", {
                required: {
                  value: true,
                  message: "You have to give your email!",
                },
              })}
              placeholder="Enter your email"
            />

            <label htmlFor="password">
              <p className={errors.password ? "text-red-700" : "text-black"}>
                {errors?.password?.message
                  ? errors?.password?.message
                  : "Enter you password"}
              </p>
            </label>
            <input
              type="password"
              name="password"
              className="p-3 w-full rounded-sm mb-2"
              {...register("password", {
                required: {
                  value: true,
                  message: "You have to give your password!",
                },
              })}
              placeholder="Enter your password"
            />

            {type === "signup" && (
              <>
                <label htmlFor="password2">
                  <p
                    className={errors.password2 ? "text-red-700" : "text-black"}
                  >
                    {errors?.password2?.message
                      ? errors?.password2?.message
                      : "Re-enter you password"}
                  </p>
                </label>
                <input
                  type="password"
                  name="password2"
                  className="p-3 w-full rounded-sm mb-2"
                  {...register("password2", {
                    required: {
                      value: true,
                      message: "You have to confirm password",
                    },
                  })}
                  placeholder="Re-enter your password"
                />
              </>
            )}

            {type === "login" ? (
              <Link href="/signup">
                <p className="text-gray-700 underline cursor-pointer">
                  Dont have an account? please signup
                </p>
              </Link>
            ) : (
              <Link href="/login">
                <p className="text-gray-700 underline cursor-pointer">
                  Already have an account please login!
                </p>
              </Link>
            )}

            {error && <p className="text-red-700">{error}</p>}

            <input
              disabled={loading ? true : false}
              className="btn-1"
              type="submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthFrom;
