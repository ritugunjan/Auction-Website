import React from 'react'
import { useNavigate } from 'react-router-dom';
import useStore from '../../Store/store';

const Logout = () =>
{
    let navigate = useNavigate();
    let setUserLoggedIn = useStore((state) => state.setUserLoggedIn);

    function handleLogout()
    {
        window.localStorage.clear();
        setUserLoggedIn(false)
        navigate("/login", { replace: true });

    }
    return (
        <button onClick={handleLogout}>Logout</button>
    )
}

export default Logout