import React, {useContext, useState} from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useHistory } from "react-router-dom";
import Copyright from './Copyright'
import { GlobalStoreContext } from '../store'

export default function SplashScreen() {
    // const { auth } = useContext(AuthContext);
    const history = useHistory();
    const { store } = useContext(GlobalStoreContext);
    
    const handleLogin = () => {
       history.push('/login/');
    }

    const handleCreateAccount = () =>{
        console.log("clis")
        history.push('/register/');
    }

    const handleGuestLogin = () => {
        store.setGuest();
        history.push('/');
    }

    return (
        <div id="splash-screen">
            Playlister
            <div>
                A fun place to make playlists for all your favorite songs
            </div>
            <Stack spacing={30} direction="row">
                <Button onClick={handleGuestLogin} variant="contained" size="Large" sx={{ color: 'black', backgroundColor: 'white', "&:hover": { backgroundColor: "lightgray" }}}>
                    Guest Login
                </Button>
                <Button  onClick={handleLogin} variant="contained" size="Large" sx={{ color: 'black', backgroundColor: 'white', "&:hover": { backgroundColor: "lightgray"}}}>
                    Login
                </Button>
                <Button onClick={handleCreateAccount} variant="contained" size="Large" sx={{ color: 'black', backgroundColor: 'white', "&:hover": { backgroundColor: "lightgray"}}}>
                    Create Account
                </Button>
            </Stack>
            <Copyright sx={{ mt: 5, position: 'relative', bottom: 0, center: 0}} />
        </div>
    )
}