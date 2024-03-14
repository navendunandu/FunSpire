import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Guest from "./Guest/App";
import User from "./User/App";
import { Grid } from '@mui/material';
import "./style/style.css";
import NotFound from './NotFound';

const routes = () => {
    return (
        <Grid className="r-body">
            <Grid container className="r-container">
                <Routes>
                    <Route path="/*" element={<Guest />} />
                    <Route path="/User/*" element={<User />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Grid></Grid>
    )
}

export default routes