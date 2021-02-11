import React from "react";
import {
    Card,
    CardActionArea,
    Grow,
    IconButton,
    Typography,
    withStyles
} from "@material-ui/core";
import UserMuseumCardStyle from "../styles/UserMuseumCardStyle";
import EditIcon from '@material-ui/icons/Edit'

class UserMuseumCard extends React.Component {

    render() {

        const {classes, museum, editHandle} = this.props

        return(
            <Grow in={true}>
                <Card elevation={4} className={classes.Card}>
                    <CardActionArea style={{position: 'relative'}}>
                        <img className={classes.coverImage}
                             src={museum.cover}
                             alt="museum img"/>
                        <div style={{backgroundColor: "rgba(0, 0, 0, 0.5)", right: 0, left: 0, top: 0, bottom: 0, position: 'absolute'}}>

                        </div>
                        <div style={{position: 'absolute',top: 15, bottom: 15, right: 15, left: 15}}>
                            <div style={{justifyContent: 'space-between', display: 'flex'}}>
                                <Typography gutterBottom variant="h5" component="h2" style={{color: "#fff"}}>
                                    {museum.name}
                                </Typography>
                                <IconButton style={{color: "#fff"}} onClick={() => editHandle(museum)}>
                                    <EditIcon />
                                </IconButton>
                            </div>
                            <Typography variant="body2" color="textSecondary" component="p"
                                        style={{marginTop: 10, marginBottom: 20, textAlign: "left", color: "#fff"}}>
                                {museum.address}
                            </Typography>
                            <Typography variant="body1" color="textSecondary" component="p" style={{color: "#fff", maxHeight: '100px', overflow: 'hidden'}}>
                                {museum.description}
                            </Typography>
                        </div>
                    </CardActionArea>
                </Card>
            </Grow>
        )
    }
}

export default withStyles(UserMuseumCardStyle)(UserMuseumCard)