import React from "react";
import {AppBar, IconButton, Toolbar, Typography, withStyles} from "@material-ui/core";
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {AccountCircle} from "@material-ui/icons";
import MyAppBarStyle from "../styles/MyAppBarStyle";
import {NavLink} from "react-router-dom";
import { isExpired } from "react-jwt";

class MyAppBar extends React.Component {
    render() {

        const {classes, action, handleLogOut} = this.props

        return (
            <AppBar position="sticky" style={{top: 0}}>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6">
                        React - Museum
                    </Typography>
                    <div>
                        <NavLink to={action === 'home' ? ('/') : (isExpired(localStorage.getItem('JWT')) ? ('/signin') : ('/profile'))}>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="primary-search-account-menu"
                                aria-haspopup="true"
                                className={classes.link}
                            >
                                {action === 'home' ? (<HomeIcon />) : (<AccountCircle/>)}
                            </IconButton>
                        </NavLink>
                        {action === 'home' && handleLogOut ? (
                            <IconButton
                                onClick={handleLogOut}
                                aria-label="account of current user"
                                aria-controls="primary-search-account-menu"
                                aria-haspopup="true"
                                className={classes.link}
                            >
                                <ExitToAppIcon />
                            </IconButton>
                        ) : null}
                    </div>
                </Toolbar>
            </AppBar>
        )
    }

}

export default withStyles(MyAppBarStyle)(MyAppBar);