import { NavLink } from "react-router-dom";
import Profile from "../Profile";

const NavBar = () =>
{

    return <>


        <div className="grid grid-cols-7 w-90 h-[10vh] items-center px-8 border-sm shadow-sm">
            <div className="logo col-span-1">
                Auction
            </div>
            <div className="grid col-span-3 grid-cols-5 items-center h-100 justify-center text-center gap-0">
                <NavLink
                    to="/"
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active border-b-2 border-slate-500 py-3" : ""
                    }
                >
                    Home
                </NavLink>
                <NavLink
                    to="/products"
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active border-b-2 border-slate-500 py-3" : ""
                    }
                >
                    Bids
                </NavLink>
                <NavLink
                    to="/addbids"
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active border-b-2 border-slate-500 py-3" : ""
                    }
                >
                    Add Bids
                </NavLink>
                <NavLink
                    to="/mylisting"
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active border-b-2 border-slate-500 py-3" : ""
                    }
                >
                    My Listing
                </NavLink>
              

            </div>
            <div className="logo col-span-3 justify-center text-end px-8">
                <Profile />

            </div>

        </div>
    </>

}

export default NavBar;