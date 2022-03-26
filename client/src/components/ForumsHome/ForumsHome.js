import React, { useState } from "react";
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import { useDispatch } from "react-redux";
import { useNavigate, useLocation, Link } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import { getForumsBySearch } from '../../actions/forums';
import Pagination from '../Pagination';

import Forums from "../Forums/Forums";
//import Form from "../Forms/Form";

import useStyles from './styles';
//import Sidebar from "./Sidebar";
//import { Public, Stars, Favorite } from "@material-ui/icons";

function useQuery() {
    return new URLSearchParams(useLocation().search);
};

const ForumsHome = () => {
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();
    const query = useQuery();
    const history = useNavigate();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const classes = useStyles();
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);
    const user = JSON.parse(localStorage.getItem('profile'));

    const searchForum = () => {
        if(search.trim() || tags) {
            dispatch(getForumsBySearch({ search, tags: tags.join(',') }));
            history(`/forums/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        } else {
            history('/');
        }
    };

    const handleKeyPress = (e) => {
        if(e.keyCode === 13) {
            searchForum();
        }
    };

    const handleAdd = (tag) => setTags([...tags, tag]);
    const handleDelete = (tagToDelete) => setTags([tags.filter((tag) => tag !== tagToDelete)]);
    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                    <Grid item xs={12} sm={6} md={9}>
                        {/*<AppBar className={classes.appBarSearch} position="static" style={{ backgroundColor: 'lightgrey', color: 'darkblue', fontWeight: 'bold' }}>All | My | Followed</AppBar>*/}
                        {/*<Sidebar />*/}
                        <Forums setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Grid item >
                            <Button 
                                disabled={!user?.user?._id} 
                                className={classes.appBarSearch} 
                                fullWidth 
                                variant="contained" 
                                color="primary"
                                component={Link} to="/form">
                                    Ask Question
                            </Button>
                        </Grid>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                            <TextField 
                                name="search" 
                                variant="outlined" 
                                label="Search Memories" 
                                onKeyPress={handleKeyPress} 
                                fullWidth 
                                value={search} 
                                onChange={(e) => setSearch(e.target.value)} 
                            />
                            <ChipInput
                                style={{ margin: '10px 0' }}
                                value={tags}
                                onAdd={handleAdd}
                                onDelete={handleDelete}
                                label="Search Tags"
                                variant="outlined"
                            />
                            <Button onClick={searchForum} className={classes.searchButton} variant="contained" color="primary">Search</Button>
                        </AppBar>
                        {/*<Form currentId={currentId} setCurrentId={setCurrentId} />*/}
                        {(!searchQuery && !tags.length) && (
                            <Paper elevation={6} className={classes.pagination}>
                                <Pagination page={page} />
                            </Paper>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
}
export default ForumsHome;