import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';
import Backdrop from '../../UI/Backdrop/Backdrop';

import classes from './SideDrawer.module.css'

const sideDrawer = (props) => {

    const sideDrawClasses = [classes.SideDrawer, props.sideDrawVisible ? classes.Open : classes.Close].join(' ');

    return (
        <>
            <Backdrop backHandler={props.closed} show={props.sideDrawVisible} />
            <div className={sideDrawClasses.concat(' ')} onClick={props.closed}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuthenticated} />
                </nav>
            </div>
        </>
    );
}

export default sideDrawer;