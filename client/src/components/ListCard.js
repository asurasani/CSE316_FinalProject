import { useContext, useState, React } from 'react'
import { GlobalStoreContext } from '../store'
import { useHistory } from 'react-router-dom'
import AuthContext from '../auth';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import CardContent from '@mui/material/CardContent';
import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'
import MUIDeleteModal from './MUIDeleteModal'
import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';

import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import Collapse from '@mui/material/Collapse';
import MuiAccordion from '@mui/material/Accordion';
import { Stack } from '@mui/system';
import SongCard from './SongCard.js'
import { Typography } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair, selected } = props;
    const [open, setOpen]= useState(false);
    const ExpandMore = styled((props) => {
        const { expand, ...other } = props;
        return <IconButton {...other} />;
      })(({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      }));


    // if(idNamePair.songs[0].length !== 0){
    //     console.log('idNamePair:', idNamePair);  
    // }  
    const [expanded, setExpanded] = useState(false);
      
    const handleExpandClick = async function (event, id){
        await store.setCurrentList(id);
        console.log(store.currentList);
        setExpanded(!expanded);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST
            console.log("SONGS: ", idNamePair.songs);
            // store.setCurrentList(id);
        }
    };

    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }
    else if (store.isDeleteListModalOpen()){
        modalJSX = <MUIDeleteModal />; 
    }

    const handlelike = (event, id) => {
        event.stopPropagation();
        const foundiD = idNamePair.likes.find(id=> id == auth.user._id);
        const disliked = idNamePair.dislikes.find(id=> id == auth.user._id);
        if(disliked){return}
        console.log(auth.user._id);
        if(!foundiD){store.like(id);}
        if(idNamePair.likes.length !== 0 && foundiD){store.unlike(id)}
    }  
    
    const handleDislike = (event, id) => {
        event.stopPropagation();
        const foundID = idNamePair.dislikes.find(id=> id == auth.user._id);
        const liked = idNamePair.likes.find(id=> id == auth.user._id);
        if(liked){return}
        if(!foundID){store.disLike(id);}
        if(idNamePair.dislikes.length !== 0 && foundID){store.undisLike(id)}
    }  

    function handleDuplicate(){
        store.duplicate();
    }

    function makeOpen(){
        setOpen(true);
    }
    let songCard ="";
    if(store.currentList !== null){
        songCard =
        <List sx={{overflow: 'scroll'}}>
                {
                    store.currentList.songs.map((song, index) => (
                        <SongCard
                        id={'playlist-song-' + (index)}
                        key={'playlist-song-' + (index)}
                        index={index}
                        song={song}
                        />
                    ))
                }
                { modalJSX }

        </List>
    }
    let publishStatus="";
    let addSongs="";
    let publishDate="";
    let likeCard = "";
    let dislikeCard = "";

    if(store.currentList !== null){
        if(store.currentList.publish){
            publishStatus=
            <Grid item xs={12}>
                <button>Delete</button> 
                <button>Duplicate</button>
            </Grid>
        }
        else{
            publishStatus=
            <Grid item xs={12}>
                <button onClick={handleUndo} >Undo</button> 
                <button onClick={handleRedo}>Redo</button>
                <button onClick={(event) => handlePublish(event, idNamePair._id)}>Publish</button>
                <button onClick={(event) => {handleDeleteList(event, idNamePair._id)}}>Delete</button> 
                <button onClick={() => handleDuplicate()}>Duplicate</button>
            </Grid>
        }
    }

    if(store.currentList !== null){
        if(store.currentList.publish){
           addSongs="";
        }
        else{
            addSongs=
            <Button 
                style={{
                    backgroundColor: "darkBlue", 
                    width: "100%", 
                    color: "white",
                    borderRadius: "5px",
                    margin: "5px",
                    height: "10"
                }}
                onClick={(event) => handleAddSong(event, idNamePair._id)}> 
                <AddIcon />
            </Button>
        }
    }

    if(store.currentList !== null){
        if(store.currentList.publish){
            publishDate=
            <Grid item xs={6} sx={{ p: 1 }}>
                <Typography
                  style={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    color: "black",
                  }}
                >
                  Published: &nbsp;
                </Typography>
                <Typography
                  sx={{ p: 0.0, flexGrow: 1 }}
                  style={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "right",
                    color: "#ab0000",
                  }}
                >
                  {idNamePair.publishDate}
                </Typography>
            </Grid>
        }
        else{
            <Grid item xs={6} sx={{ p: 1 }}></Grid>;
        }
    }

    if(store.currentList !== null){
        if(store.currentList.publish){
            likeCard=
            <Grid item xs={2}
                sx={{p: 5}}
                style={{
                    fontSize: '12pt'
                }}>
                    <IconButton aria-label="like" onClick={(event) => {handlelike(event, idNamePair._id)}} >
                        <ThumbUpIcon/>
                    </IconButton>

                    <Typography
                        style={{
                            fontSize: "20px",
                            fontWeight: "bold",
                            display: "flex",
                            alignItems: "center",
                            color: "black",
                        }}
                        sx={{ pr: 6 }}>
                        {idNamePair.likes.length}
                    </Typography>
                </Grid>
            dislikeCard = 
            <Grid item xs={2}
                        sx={{p: 5}} 
                style={{
                    fontSize: '12pt'
                }}>

                        <IconButton aria-label="dislike" onClick={(event) => {handleDislike(event, idNamePair._id)}}>
                            <ThumbDownIcon/>
                        </IconButton>
                        
                        <Typography
                        style={{
                            fontSize: "20px",
                            fontWeight: "bold",
                            display: "flex",
                            alignItems: "center",
                            color: "black",
                        }}
                        sx={{ pr: 6 }}
                        >
                            {idNamePair.dislikes.length}
                        </Typography>
                </Grid>

        }
        else{
            likeCard = 
            <Grid item xs={2}
                sx={{p: 5}}
                style={{
                    fontSize: '12pt'
                }}></Grid>;
            dislikeCard = 
                <Grid item xs={2}
                    sx={{p: 5}} 
                    style={{
                    fontSize: '12pt'}}> </Grid>
        }
    }

    function handleLoadList() {}



    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }
    
    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
        // modalJSX = <MUIDeleteModal />;
        
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleAddSong(event, id){
        store.addNewSong();
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    function handlePublish(event, id){
        store.publishDate(id);
        event.currentTarget.disabled = true;
    }

    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }
    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }

    function handleUndo() {
        store.undo();
      }
    
      function handleRedo() {
        store.redo();
      }

    console.log(idNamePair.likes);
    let cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            
            sx={{ marginTop: '0px',flexGrow: 1, display: 'flex', p: 1, borderRadius:'25px', border: "1px solid"}}
            style={{ width: '100%',fontSize: '24pt', backgroundColor:"white" }}
            button
            // onClick={(event) => {
            //     handleLoadList(event, idNamePair._id)
            // }}
            onDoubleClick={toggleEdit}
        >
            <Grid container spacing={1}>
           <Grid item xs={6}
                sx={{ p: 1, flexGrow: 1 }}
                style={{
                    fontSize: '24pt'
                }}>
                    
                    <Typography variant="h5" style={{ fontWeight: "bold" }}>
                        {idNamePair.name}
                    </Typography>
                    <Typography style={{ fontSize: "12px", fontWeight: "bold" }}>
                            By: 
                        </Typography>
                        <Typography
                            style={{
                                fontSize: "12px",
                                fontWeight: "bold",
                                textDecoration: "underline",
                                color: "blue",
                            }}
                            >
                                {idNamePair.email}
                    </Typography>
                    
                </Grid>
                <br />
                        {likeCard}
                        {dislikeCard}
                        
                    {publishDate}
                <Grid item xs={3}>
                <Typography
                  style={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    color: "black",
                  }}
                >
                  Listens: &nbsp;
                </Typography>
                <Typography
                  sx={{ p: 0.0, flexGrow: 1 }}
                  style={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "right",
                    color: "#ab0000",
                  }}
                >
                  {idNamePair.views}
                </Typography>
            </Grid>
                
            <Grid item xs={3}>  
                <ExpandMore 
                    onClick={(event) => {handleExpandClick(event, idNamePair._id)}} 
                    expand={expanded} 
                    aria-expanded={expanded}
                    style={{alignItems: "bottom", }}
                    aria-label="show more">
                  <KeyboardDoubleArrowDownIcon />
                </ExpandMore>
                </Grid> 
                <Grid item xs={12}>        
                
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    
                    <Stack direction="row">
                        <Box
                        style={{
                            backgroundColor: "white",
                            borderRadius: "5px",
                            margin: "5px",
                            fontSize: "25pt",
                            fontWeight: "bold",
                            fontFamily: "Arial, Helvetica, sans-serif",
                            color: "gold",
                            height: "10",
                            width: "100%",
                        }}
                        >
                            {songCard}
                            {addSongs}
                        </Box>
                    </Stack>
                    {publishStatus}
            </Collapse>
            </Grid> 
        </Grid>
        {modalJSX}
        <MUIDeleteModal />
        </ListItem>

    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Playlist Name"
                name="name"
                autoComplete="Playlist Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }
    return (
        cardElement
    );
    
}

export default ListCard;