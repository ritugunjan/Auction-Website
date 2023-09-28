import React, { useRef, useState } from 'react'
import apiRequest from '../../Api';
import { Navigate, json, useNavigate } from 'react-router-dom';
import { validateUserDataForLogin } from '../../Utils/formvalidation';
import useStore from '../../Store/store';





const Login = () =>
{
    let [formError, setFormError] = useState({ error: false, message: "" });
    let setUserLoggedIn = useStore((state) => state.setUserLoggedIn);
    const navigate = useNavigate();
    let [loading, setLoading] = useState(false);
    let email = useRef("");
    let password = useRef("");




    let handleSubmit = async (e) =>
    {
        e.preventDefault();
        // console.log(name.current.value, password.current.value, email.current.value)
        let validationResponse = validateUserDataForLogin(password.current.value, email.current.value);
        if (validationResponse.error)
        {
            setFormError(validationResponse)
            return
        };

        let data = {
            "password": password.current.value,
            "email": email.current.value
        }
        setLoading(true);
        try
        {
            let response = await apiRequest("/api/v1/auction/auth/login", 'POST', data)
            window.localStorage.setItem("accessToken", response.accessToken);
            window.localStorage.setItem("credits", response.credits);
            window.localStorage.setItem("email", response.email);
            window.localStorage.setItem("name", response.name);
            setUserLoggedIn(true);
            navigate('/products', { replace: true });
        } catch (error)
        {
            setFormError({
                error: true,
                message: error.message
            })
            //window.alert(error.message)
        }

        setLoading(false)
    }

    return <>
        <div className="isolate bg-white px-6 py-12">

            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Login to use Auction App</h2>
                <p className="mt-2 text-lg leading-8 text-gray-600">Please fill out the form, to login</p>
            </div>
            <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
                <div className='text-center'>
                    <span className='text-red-500'>{formError.error && formError.message}</span>
                </div>
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">

                    <div className="sm:col-span-2">
                        <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">Email</label>
                        <div className="mt-2.5">
                            <input ref={email} type="email" name="email" id="email" autoComplete="email" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></input>
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="password" className="block text-sm font-semibold leading-6 text-gray-900">Password</label>
                        <div className="mt-2.5">
                            <input ref={password} type="password" name="password" id="password" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></input>
                        </div>
                    </div>


                </div>
                <div className="mt-10">
                    <button disabled={loading} type="submit" onClick={(e) => { handleSubmit(e) }} className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{loading ? "please wait" : "Login"}</button>
                </div>
            </form >
        </div >
    </>

}

export default Login