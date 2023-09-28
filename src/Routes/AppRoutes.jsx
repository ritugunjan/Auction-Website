import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainScreen from "../Pages/MainScreen";
import Home from "../Pages/Home";
import Products from "../Pages/Products";
import RegisterUser from "../Pages/RegisterUser";
import Login from "../Pages/Login";
import Bidding from "../Pages/BIdding";
import AddBid from "../Pages/Addbid";
import MyListing from "../Pages/MyListing";
import AuthRequired from "../Components/AuthRequired";


const AppRoutes = () =>
{
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<MainScreen />}>
                        <Route path="/" element={<Home />} /> {/* 👈 Renders at /app/ */}
                        <Route path="/products" element={<Products />} />
                        <Route element={<AuthRequired />}>
                            <Route path="/addbids" element={<AddBid />} />
                            <Route path="/mylisting" element={<MyListing />} />
                            <Route path="/makebid/:id" element={<Bidding />} />
                        </Route>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<RegisterUser />} />

                    </Route>
                    {/* <Route element={<CheckAuth />}> */}

                    {/* </Route> */}
                    {/* <Route path="/login" element={<LoginPage />} /> {/* 👈 Renders at /app/ */}
                    {/* <Route path={'/logout'} element={<Logout />} /> */}
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default AppRoutes