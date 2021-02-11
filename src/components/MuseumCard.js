import React from "react";
import {Button, Card, CardActionArea, CardContent, Grid, Grow, Typography, withStyles} from "@material-ui/core";
import MuseumCardStyle from '../styles/MuseumCardStyle'
import {NavLink} from "react-router-dom";

class MuseumCard extends React.Component {

    render() {

        const {classes, museum} = this.props

        return (
            <Grow in={true}>
                <Card raised={true} className={classes.Card}>
                    <CardActionArea>
                        <img className={classes.coverImage}
                             src={museum.cover}
                             alt="museum img"/>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {museum.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p"
                                        style={{marginTop: 10, marginBottom: 20}}>
                                {museum.address}
                            </Typography>
                            <Typography variant="body1" color="textSecondary" component="p">
                                {museum.description}
                            </Typography>
                            <Typography gutterBottom variant="h5" component="h2" style={{marginTop: 30}}>
                                Media
                            </Typography>
                            <Grid container spacing={2}>
                                {museum.photos.map(photo => {
                                    return (
                                        <Grid item md={2}>
                                            <img className={classes.photo}
                                                 src={photo}
                                                 alt="museum img"/>

                                        </Grid>
                                    )
                                })}
                            </Grid>
                            <Grid container spacing={2} style={{marginTop: 30}}>
                                <Grid item xs={12}>
                                    <NavLink to={`/museum/${museum.id}`} style={{color: "#fff"}}>
                                        <Button variant={'contained'} color={'primary'} fullWidth
                                                style={{padding: 15}}>Visita</Button>
                                    </NavLink>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grow>
        )

    }
}

export default withStyles(MuseumCardStyle)(MuseumCard);