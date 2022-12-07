import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'
import PropTypes from 'prop-types';
// import YoutubePlayer from './YoutubePlayer';

import AddIcon from '@mui/icons-material/Add';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SortOutlinedIcon from '@mui/icons-material/SortOutlined';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SortIcon from '@mui/icons-material/Sort';
import Button from '@mui/material/Button';


import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import Search from '@mui/icons-material/Search'
import SearchIcon from '@mui/icons-material/Search';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper';
import { Card, Grid } from '@mui/material';
import Statusbar from './Statusbar';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
const GuestScreen = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const { store } = useContext(GlobalStoreContext);

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto',
        },
      }));
      function a11yProps(index) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
      }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNameSort = () =>{
        store.sortName();
        handleClose();
    }

    const handleSortDate = () => {
        handleClose()
    }
      
    
        const SearchIconWrapper = styled('div')(({ theme }) => ({
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }));

      TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
      };
      
      const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
          padding: theme.spacing(1, 1, 1, 0),
          // vertical padding + font size from searchIcon
          paddingLeft: `calc(1em + ${theme.spacing(4)})`,
          transition: theme.transitions.create('width'),
          width: '100%',
          [theme.breakpoints.up('md')]: {
            width: '20ch',
          },
        },
      }));
       

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    let listCard = "";
    if (store) {
        listCard =
            <List sx={{overflow: 'scroll'}}>
                {
                    store.idNamePairs.map((pair) => (
                        <ListCard
                            key={pair._id}
                            idNamePair={pair}
                            selected={false}
                        />
                    ))
                }
            </List>;
    }
    return (
        <div id="playlist-selector">
            <div id="list-selector-list">
                <Grid container>
                    <Grid id="home-toolbar" item sx={{ flexGrow: 1, backgroundColor:'gray' }} xs={12}>
                        <AppBar position="static" sx={{backgroundColor:'#adadae'}}>
                            <Toolbar>
                                <IconButton
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="open drawer"
                                    sx={{ mr: 2}}
                                >
                                    {/* <HomeOutlinedIcon /> */}
                                </IconButton>
                                <IconButton
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="open drawer"
                                    sx={{ mr: 2}}
                                >
                                    <GroupsOutlinedIcon />
                                </IconButton>
                                <IconButton
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="open drawer"
                                    sx={{ mr: 2}}
                                >
                                    <PermIdentityOutlinedIcon />
                                </IconButton>
                                <Search>
                                    <SearchIconWrapper>
                                        <SearchIcon />
                                            </SearchIconWrapper>
                                                <StyledInputBase
                                                placeholder="Search…"
                                                inputProps={{ 'aria-label': 'search' }}
                                                />
                                </Search>
                                <Button
                                    id="basic-button"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                >
                                    <SortIcon />
                                </Button>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}>
                                    <MenuItem onClick={handleNameSort}>Name (A-Z)</MenuItem>
                                    <MenuItem onClick={handleClose}>Publish Date(Newest)</MenuItem>
                                    <MenuItem onClick={handleClose}>Listens (High-Low)</MenuItem>
                                    <MenuItem onClick={handleClose}>Likes (High-Low)</MenuItem>
                                    <MenuItem onClick={handleClose}>DisLikes (High-Low)</MenuItem>
                                </Menu>
                                <Box sx={{ flexGrow: 1 }} />
                            </Toolbar>        
                        </AppBar>    
                    </Grid>
                    <Grid item xs={7} sx={{height: '50vh'}}>
                        {
                            listCard
                        }   
                    </Grid>
                    <Grid item xs={5} sx={{height: '50vh', flexGrow: 1}}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Player" {...a11yProps(0)} />
                                <Tab label="Comments" {...a11yProps(1)} />
                            </Tabs>
                        </Box>

                        <TabPanel value={value} index={0}>
                            {/* <YoutubePlayer /> */}
                            YoutubePlayer
                        </TabPanel>

                        <TabPanel value={value} index={1}>
                            Comments
                        </TabPanel>
                    </Grid>
                </Grid>
            </div>
        </div>
    )}

export default GuestScreen;

// //{
//     listCard
// }
// <MUIDeleteModal />