import React from "react";
import { Grid, CircularProgress } from '@material-ui/core'
import { useSelector } from "react-redux";
import Forum from "./Forum/Forum";
import useStyles from './styles';

const Forums = () => {
    const { forums, isLoading } = useSelector((state) => state.forums);
    const classes = useStyles();
    if(!forums.length && !isLoading) return 'No Forums';
    return (
        isLoading ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {
                    forums.map((forum) => (
                        <Grid key={forum._id} item xs={12} sm={12} md={6} lg={4} style={{ height: 400 }}>
                            <Forum forum={forum} />
                        </Grid>
                    ))
                }
            </Grid>
        )
    );
}

export default Forums;