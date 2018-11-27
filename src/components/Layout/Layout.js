import React from 'react';
import classes from './Layout.module.css';
const layout = (props) => (
    <>
        <div>Tolbar, SideDrawer, Backdrop</div>
        <main className={classes.content}>
            {props.children}
        </main>
    </>
);

export default layout;

