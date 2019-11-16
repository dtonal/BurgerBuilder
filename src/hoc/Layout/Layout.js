import React, { useState } from 'react';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Sidedrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

const Layout = props => {
    const [sideDrawVisible, setSideDrawVisible] = useState(false);

    return (
        <>
            <Toolbar
                toggleDrawer={() => setSideDrawVisible(!sideDrawVisible)}
                isAuthenticated={props.isAuthenticated}
            />
            <Sidedrawer
                closed={() => setSideDrawVisible(false)}
                sideDrawVisible={sideDrawVisible}
                isAuthenticated={props.isAuthenticated}
            />

            <main className={classes.content}>
                {props.children}
            </main>
        </>);

}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);

