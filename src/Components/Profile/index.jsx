import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Credits from '../Credits';
import Logout from '../Logout';
import useStore from '../../Store/store';

const Profile = () =>
{
    let [visible, setVisible] = useState(false);
    //let [isUserLoggedIn,] = useState(window.localStorage.getItem("accessToken"));
    let isUserLoggedIn = useStore((state) => state.isUserLoggedIn);

    console.log(isUserLoggedIn)
    return (
        <div className='relative' onClick={() => { setVisible(!visible) }}>
            <span >Profile</span>
            {
                visible &&
                <div className='absolute z-10 grid grid-rows-2 items-center justify-center py-2 gap-2 left-[75%] top-8 w-40  overflow-hidden rounded-md bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5'>
                    <div className='divide-y divide-gray-100'>
                        {
                            isUserLoggedIn ?
                                <Logout />
                                :
                                <NavLink
                                    to="/login"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "active" : ""
                                    }
                                >
                                    Sign in
                                </NavLink>

                        }

                    </div>
                    {
                        isUserLoggedIn && <Credits />
                    }
                </div>
            }

        </div>
    )
}

export default Profile