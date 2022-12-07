import YouTube from "react-youtube";
import { useContext, useState, useEffect } from "react";
import { GlobalStoreContext } from "../store";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import StopIcon from "@mui/icons-material/Stop";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';


export default function YouTubePlayer() {
  const { store } = useContext(GlobalStoreContext);
  const [play, setPlay] = useState(false);

  useEffect(async () => {
    console.log(store);
  }, [store]);

  async function loadAndPlayCurrentSong(player) {
    let song = store.currentList.songs[store.currentPlayIndex].youTubeId;
    player.loadVideoById(song);
    player.playVideo();
  }

  const theme = createTheme({
    typography: {
      // In Chinese and Japanese the characters are usually larger,
      // so a smaller fontsize may be appropriate.
      fontSize: 12,
    },
  });

  async function incSong() {
    // setIndex((index + 1) % store.currentList.songs.length);
    await store.updatePlaySong(
      (store.currentPlayIndex + 1) % store.currentList.songs.length
    );
  }

  async function decSong() {
    if (store.currentPlayIndex - 1 == -1) {
      await store.updatePlaySong(store.currentList.songs.length - 1);
    } else {
      await store.updatePlaySong(
        (store.currentPlayIndex - 1) % store.currentList.songs.length
      );
    }
  }

  function onPlayerReady(event) {
    if (play) {
      loadAndPlayCurrentSong(event.target);
      event.target.playVideo();
    }
  }

  async function stop(event) {
    player.stopVideo();
  }

  async function resume(event) {
    player.playVideo();
  }
  let player= "";

  async function onPlayerStateChange(event) {
    let playerStatus = event.data;
    player = event.target;
    if (playerStatus === 0) {
      if (play) {
        await incSong();
        loadAndPlayCurrentSong(player);
      }
    }
  }

  const opts = {
    height: "250",
    width: "400",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  console.log("LIST",store.currentList);
  return (
    store.currentList &&
    store.currentList.songs.length > 0 && (
        <Grid container>
            <YouTube
            videoId={
                store.currentList.songs[store.currentPlayIndex].youTubeId
            }
            opts={opts}
            onReady={onPlayerReady}
            onStateChange={onPlayerStateChange}/>

            <Grid item xs={12}>
            <ThemeProvider theme={theme}>
                <Typography component={'span'} variant={'body'}> Playlist: {store.currentList.name}</Typography>
                <br />
                <Typography component={'span'} variant={'body'}>Song #: {store.currentPlayIndex + 1}</Typography>
                <br />
                <Typography component={'span'} variant={'body'}>Title: {store.currentList.songs[store.currentPlayIndex].title}</Typography>
                <br />
                <Typography component={'span'} variant={'body'}> Artist: {store.currentList.songs[store.currentPlayIndex].artist}</Typography>
                <br />
            </ThemeProvider>
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={2}>
                <Button onClick={decSong}>
                    <SkipPreviousIcon  />
                </Button>
            </Grid>
            <Grid item xs={2}>
                <Button onClick={stop}>
                    <StopIcon />
                </Button>
            </Grid>
            <Grid item xs={2}>
                <Button onClick={resume}>
                    <PlayArrowIcon />
                </Button>
            </Grid>
            <Grid item xs={2}>
                <Button onClick={incSong}>
                    <SkipNextIcon />
                </Button>
            </Grid>
        </Grid>
    )
  );
}