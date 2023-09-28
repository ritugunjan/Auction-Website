import { Outlet, useLocation, Navigate } from "react-router-dom";
import useStore from "../../Store/store";
import { useEffect } from "react";

const AuthRequired = () =>
{

    const setUserLoggedIn = useStore((state) => state.setUserLoggedIn);
    const isUserLoggedIn = useStore((state) => state.isUserLoggedIn);

    let accessToken = window.localStorage.getItem("accessToken");
    let name = window.localStorage.getItem("name");
    if (accessToken && name)
    {
        setUserLoggedIn(true);
    } else
    {
        window.localStorage.clear();
        setUserLoggedIn(false);
    }


    if (isUserLoggedIn)
    {
        return (
            <Outlet />
        );
    } else
    {
        return <Navigate to='/login' />;
    }
};

export default AuthRequired;
