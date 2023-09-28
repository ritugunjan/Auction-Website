import { create } from 'zustand'

const useStore = create((set) => ({
    bids: [],
    setBids: (newBids) => set((state) => ({ bids: newBids })),
    isUserLoggedIn: false,
    setUserLoggedIn: (status) => set((state) => ({ isUserLoggedIn: status })),
    myListing: [],
    setMyListing: (myListing) => set((state) => ({ myListing: myListing })),


}))

export default useStore;