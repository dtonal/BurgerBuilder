import React, { Component } from 'react';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Sidedrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = { sideDrawVisible: false };
    }

    sideDrawClosedHandler = () => {
        this.setState({ sideDrawVisible: false });
    }

    toggleDrawVisible = () => {
        this.setState((prevState) => {
            return { sideDrawVisible: !prevState.sideDrawVisible };
        }
        )
    };

    render() {
        return (
            <>
                <Toolbar toggleDrawer={this.toggleDrawVisible} isAuthenticated={this.props.isAuthenticated} />
                <Sidedrawer closed={this.sideDrawClosedHandler} sideDrawVisible={this.state.sideDrawVisible} isAuthenticated={this.props.isAuthenticated} />
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </>);
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);

