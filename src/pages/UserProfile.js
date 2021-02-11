import React from "react";
import {Avatar, Button, Container, Grid, TextField, Typography, withStyles} from "@material-ui/core";
import {inject, observer} from "mobx-react";
import UserProfileStyle from "../styles/UserProfileStyle";
import moment from "moment";
import UserMuseumCard from "../components/UserMuseumCard";
import AddEditMuseumModal from "../components/AddEditMuseumModal";
import EditUserModal from "../components/EditUserModal";
import MyAppBar from "../components/MyAppBar";
import {withRouter} from "react-router-dom";
import UserMuseumCardSkeleton from "../components/Skeletons/UserMuseumCardSkeleton";

@inject('userStore')
@inject('museumStore')
@observer
class UserProfile extends React.Component {

    async componentDidMount() {
        const {userStore, museumStore} = this.props

        try {
            await userStore.getUser()
            await museumStore.getUserMuseums()
        } catch (e) {
            console.error(e)
        }
    }

    editMuseum = (museum) => {
        const {museumStore} = this.props
        museumStore.openEditMuseum(museum)
    }

    logOut = () => {
        localStorage.clear()
        this.props.history.push('')
    }

    render() {

        const {userStore, classes, museumStore} = this.props
        const {loading} = this.props.museumStore

        return (
            <Container maxWidth={'lg'} component={'main'}>
                <MyAppBar action={'home'} handleLogOut={this.logOut}/>
                <div className={classes.paper}>
                    <Avatar
                        src='/logo512.png'
                        className={classes.avatar}/>
                    <Grid container spacing={2}>
                        <Grid item md={12} style={{ display: 'none' }}>
                            <TextField
                                fullWidth
                                name={'id'}
                                type='text'
                                label='ID'
                            />
                        </Grid>
                        <Grid item md={12}>
                            <TextField
                                value={userStore.currentUser.email}
                                disabled
                                margin='normal'
                                variant={'outlined'}
                                fullWidth
                                name={'email'}
                                type='email'
                                label='Email'
                            />
                        </Grid>
                        <Grid item md={12}>
                            <TextField
                                value={userStore.currentUser.firstName}
                                disabled
                                margin='normal'
                                variant={'outlined'}
                                fullWidth
                                name={'firstName'}
                                type='text'
                                label='First Name'
                            />
                        </Grid>
                        <Grid item md={12}>
                            <TextField
                                value={userStore.currentUser.lastName}
                                disabled
                                margin='normal'
                                variant={'outlined'}
                                fullWidth
                                name={'lastName'}
                                type='text'
                                label='Last Name'
                            />
                        </Grid>
                        <Grid item md={12}>
                            <TextField
                                value={moment(userStore.currentUser.birthDate).format('DD-MM-YYYY')}
                                disabled
                                margin='normal'
                                variant={'outlined'}
                                fullWidth
                                name={'birthDate'}
                                type='text'
                                label='Birth Date'
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid item md={12}>
                            <Button onClick={() => userStore.getUserAndEdit()} variant={'outlined'} color={'primary'} className={classes.edit} fullWidth>
                                Modifica
                            </Button>
                        </Grid>
                    </Grid>
                </div>
                <div className={classes.userMuseum}>
                    <Typography variant={'h5'}>
                        I tuoi musei
                    </Typography>
                    {loading ? (
                        <React.Fragment>
                            <UserMuseumCardSkeleton />
                            <UserMuseumCardSkeleton />
                            <UserMuseumCardSkeleton />
                        </React.Fragment>
                    ) : (
                        museumStore.museums.length > 0 ? (
                            museumStore.museums.map(museum => (
                                <UserMuseumCard museum={museum} editHandle={this.editMuseum}/>
                            ))
                        ) : (<Typography variant="body1" color="textSecondary" component="p" style={{marginTop: 20}}> No museums found. </Typography>)
                    )}
                </div>
                <AddEditMuseumModal/>
                <EditUserModal />
            </Container>
        )
    }
}

export default withStyles(UserProfileStyle)(withRouter(UserProfile));