import React from "react";
import {NavLink, withRouter} from "react-router-dom";
import {inject, observer} from "mobx-react";
import MyAppBar from "../components/MyAppBar";
import {Avatar, Box, Button, Card, CardContent, Container, Grid, Typography, withStyles} from "@material-ui/core";
import MuseumDetailsStyle from "../styles/MuseumDetailsStyle";
import {AvatarGroup, Rating, Skeleton} from "@material-ui/lab";

@inject('museumStore')
@observer
class MuseumDetails extends React.Component {

    async componentDidMount() {

        const {museumStore} = this.props

        try {
            await museumStore.getMuseumDetails(this.props.match.params.id)
        } catch (e) {
            console.error(e)
        }

    }

    render() {

        const {museumStore, classes} = this.props

        return (
            <Container maxWidth={'lg'}>
                <MyAppBar action='home'/>
                <Card className={classes.card} raised={true}>
                    <img className={classes.coverImage}
                         src={museumStore.museumDetails ? museumStore.museumDetails.cover : null}
                         alt="museum img"/>
                </Card>
                {museumStore.museumDetails ? (
                    <div className={classes.info}>
                        <Typography gutterBottom variant="h5" component="h2">
                            {museumStore.museumDetails.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p"
                                    style={{marginTop: 10, marginBottom: 20}}>
                            {museumStore.museumDetails.address}
                        </Typography>
                        <Rating value={5} readOnly/>
                        <Typography variant="body1" color="textSecondary" component="p" style={{marginTop: 20}}>
                            {museumStore.museumDetails.description}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="h2" style={{marginTop: 30}}>
                            Media
                        </Typography>
                        <Grid container spacing={2}>
                            {museumStore.museumDetails.photos.map(photo => {
                                return (
                                    <Grid item md={2}>
                                        <img className={classes.photo}
                                             src={photo}
                                             alt="museum img"/>

                                    </Grid>
                                )
                            })}
                        </Grid>
                        <Typography variant={'h5'} component={'h2'} style={{marginTop: 30}}>
                            Visitors
                        </Typography>
                        <AvatarGroup max={10} style={{marginTop: 10}}>
                            <Avatar alt="Remy Sharp" src="/images/avatar/1.jpg" className={classes.visitor}/>
                            <Avatar alt="Travis Howard" src="/images/avatar/2.jpg" className={classes.visitor}/>
                            <Avatar alt="Remy Sharp" src="/images/avatar/1.jpg" className={classes.visitor}/>
                            <Avatar alt="Travis Howard" src="/images/avatar/2.jpg" className={classes.visitor}/>
                            <Avatar alt="Remy Sharp" src="/images/avatar/1.jpg" className={classes.visitor}/>
                            <Avatar alt="Travis Howard" src="/images/avatar/2.jpg" className={classes.visitor}/>
                            <Avatar alt="Travis Howard" src="/images/avatar/2.jpg" className={classes.visitor}/>
                            <Avatar alt="Cindy Baker" src="/images/avatar/3.jpg" className={classes.visitor}/>
                            <Avatar alt="Travis Howard" src="/images/avatar/2.jpg" className={classes.visitor}/>
                            <Avatar alt="Cindy Baker" src="/images/avatar/3.jpg" className={classes.visitor}/>
                            <Avatar alt="Travis Howard" src="/images/avatar/2.jpg" className={classes.visitor}/>
                            <Avatar alt="Travis Howard" src="/images/avatar/1.jpg" className={classes.visitor}/>
                            <Avatar alt="Travis Howard" src="/images/avatar/1.jpg" className={classes.visitor}/>
                            <Avatar alt="Remy Sharp" src="/images/avatar/3.jpg" className={classes.visitor}/>
                        </AvatarGroup>
                        <NavLink to={'/'} style={{color: "#fff"}}>
                            <Button variant={'contained'} color={'primary'} fullWidth
                                    style={{padding: 15, marginTop: 40}}>Back to home</Button>
                        </NavLink>
                    </div>
                ) : (
                    <div style={{marginTop: 40}}>
                        <Skeleton variant="text" height={40}/>
                        <Skeleton variant="text" height={40}/>
                        <Skeleton variant="text" height={40}/>
                    </div>
                )}
            </Container>
        )
    }

}

export default withStyles(MuseumDetailsStyle)(withRouter(MuseumDetails));