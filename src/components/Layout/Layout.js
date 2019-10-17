import React, {Component} from 'react';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Sidedrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    constructor(props){
        super(props);
        this.state = { sideDrawVisible: false};
    }

    sideDrawClosedHandler = () => {
        this.setState({sideDrawVisible: false});
    }

    toggleDrawVisible = () => {
        this.setState((prevState) =>{
            return {sideDrawVisible: !prevState.sideDrawVisible};
        }    
        )
    };

    render () {
        return(
    <>
        <Toolbar toggleDrawer={this.toggleDrawVisible}/>
        <Sidedrawer closed={this.sideDrawClosedHandler} sideDrawVisible={this.state.sideDrawVisible}/>
        <main className={classes.content}>
            {this.props.children}
        </main>
    </>);
    }
}

export default Layout;

