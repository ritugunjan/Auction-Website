import React from 'react'
import { NavLink } from 'react-router-dom'

const Home = () =>
{
    return (
        <div className='w-100 h-[88vh] flex items-center justify-center'>
            <div className='w-[90%] h-[95%] bg-slate-400 grid grid-cols-5'>
                <div className='col-span-3 h-full grid items-center justify-center text-center'>
                    <div className='text-white'>
                        <h1 className='text-5xl mb-3 font-bold'>Best place to buy and sell</h1>
                        <p className='text-2xl '>Register to get 1000 credits in your account</p>
                    </div>
                </div>
                <div className='col-span-2 grid items-center justify-center text-center '>
                    <NavLink
                        to="/register"
                        className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : "" + "bg-orange-500 px-12 py-8 text-white font-extrabold text-xl"}>
                        Register
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default Home