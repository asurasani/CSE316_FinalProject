import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { Typography } from '@mui/material'
import Button from '@mui/material/Button';
import AddIcon from "@mui/icons-material/Add";
import AuthContext from "../auth";

/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    let text ="";
    if (store.currentList){
        text = store.currentList.name;
    }

    function textDisable() {
        if (store.isListNameEditActive || store.currentList) {
          return { opacity: 0.5 };
        }
        return {};
    }
    function handleCreateNewList() {
        store.createNewList();
      }
    
    return (
        <div id= "status-bar">
            <Button
                color="primary"
                aria-label="add"
                id="add-list-button"
                onClick={handleCreateNewList}
                //disabled={store.isListNameEditActive || store.currentList}
                size="small"
                style={{ color: "black" }}
            >
                <AddIcon style={{ color: "black", fontSize: "50px" }} />
            </Button>
            <Typography style={textDisable()} variant="h4">
                Your Lists
            </Typography>
        </div>
    );
}

export default Statusbar;