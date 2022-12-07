import React, { useContext, useState } from 'react'
import HomeScreen from './HomeScreen'
import GuestScreen from './GuestScreen'
import SplashScreen from './SplashScreen'
import AuthContext from '../auth'
import { GlobalStoreContext } from '../store'

export default function HomeWrapper() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    console.log("HomeWrapper auth.loggedIn: " + auth.loggedIn);
    
    if (auth.loggedIn)
        return <HomeScreen />
    if(store.guestStatus)
        return <GuestScreen />
    else
        return <SplashScreen />
}