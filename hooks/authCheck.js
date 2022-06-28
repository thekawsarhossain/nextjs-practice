/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useEffect } from "react";
import useFirebase from "./useFirebase";

const authCheck = (WrappedComponent) => {
  const PrivateRoute = () => {
    const router = useRouter();

    const { user, loading } = useFirebase();

    useEffect(() => {
      if (!loading) {
        if (!user?.email) {
          router.replace("/login");
        }
      }
    }, [router, user?.email, loading]);

    if (user?.email) {
      return <WrappedComponent />;
    }

    return (
      <div className="w-full py-20 flex items-center justify-center">
        <img src="https://i.ibb.co/YTJwbsX/loading.gif" alt="loading" />
      </div>
    );
  };
  return PrivateRoute;
};

export default authCheck;
