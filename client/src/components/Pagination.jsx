import React, { useEffect } from "react";
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getForums } from '../actions/forums';

import useStyles from './styles';

const Paginate = ({ page }) => {
    const { numberOfPages } = useSelector((state) => state.forums);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        if(page) dispatch(getForums(page));
    }, [page]);
    return (
        <Pagination 
                classes={{ ul: classes.ul }}
                count={numberOfPages}
                page={Number(page) || 1}
                variant="outlined"
                color="primary"
                renderItem={(item) => (
                    <PaginationItem {...item} component={Link} to={`/forums?page=${item.page}`} />
                )}
        />
    );
};
export default Paginate;