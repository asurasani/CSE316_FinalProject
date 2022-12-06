import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';


function NewSongCard(props) {
    const { song, index } = props;
    const { store } = useContext(GlobalStoreContext);
    const [ draggedTo, setDraggedTo ] = useState(0);

    function handleDragStart(event) {
        event.dataTransfer.setData("song", index);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDragEnter(event) {
        event.preventDefault();
        setDraggedTo(true);
    }

    function handleDragLeave(event) {
        event.preventDefault();
        setDraggedTo(false);
    }

    function handleDrop(event) {
        event.preventDefault();
        let targetIndex = index;
        let sourceIndex = Number(event.dataTransfer.getData("song"));
        setDraggedTo(false);

        // UPDATE THE LIST
        store.addMoveSongTransaction(sourceIndex, targetIndex);
    }

    function handleClick(event) {
        // DOUBLE CLICK IS FOR SONG EDITING
        console.log(event.detail);
        event.stopPropagation();
        if (event.detail === 2) {
            store.showEditSongModal(index, song);
        }
    }

    function handleRemoveSong(event) {
        event.stopPropagation();
        store.showRemoveSongModal(index, song);
    }

    return (
        <div>
        <Box
            style={{
                backgroundColor: "darkBlue",
                borderRadius: "5px",
                margin: "5px",
                fontSize: "25pt",
                fontWeight: "bold",
                fontFamily: "Arial, Helvetica, sans-serif",
                color: "gold",
                height: "10",
                width: "100%",
                }}
                        key={index}
                        id={'song-' + index + '-card'}
                        onDragStart={handleDragStart}
                        onDragOver={handleDragOver}
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        draggable="true"
                        onDoubleClick={(event) => handleClick(event)}
                        >
            {index + 1}. {song.title} by {song.artist}                 

            <input
                type="button"
                id={"remove-song-" + index}
                className="list-card-button"
                value={"\u2715"}
                sx={{transform:"translate(-5%, -5%)", width:"5px", height:"30px"}}
                onClick={handleRemoveSong}
            />
        </Box>
        </div>
    );
}

export default NewSongCard;