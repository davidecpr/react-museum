import React from "react";
import LoginStyle from "../styles/LoginStyle";
import {Avatar, Button, Container, Grid, Typography, withStyles} from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {Field, Form} from 'react-final-form'
import TextFieldWrapper from "../components/Form/TextFieldWrapper";
import {inject, observer} from "mobx-react";
import {withRouter} from 'react-router-dom'

@inject('userStore')
@observer
class Signin extends React.Component {

    onSubmit = async (values) => {
        const {userStore} = this.props

        try {
            await userStore.signin(values)
            this.props.history.push('')
        } catch (e) {
            console.error(e)
        }
    }

    validate = values => {
        const error = {};
        if (!values.email) {
            Object.assign(error, {
                email: 'Field is required'
            })
        }

        if (!values.password) {
            Object.assign(error, {
                password: 'Field is required'
            })
        }

        return error
    }

    render() {

        const {classes} = this.props

        return (
            <Container maxWidth='sm' component='main' >
                <div className={classes.paper} >
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Accedi
                    </Typography>
                    <Form onSubmit={this.onSubmit} validate={this.validate} mutators={{}} render={({ handleSubmit, values, mutators, valid, form}) => {
                        return (
                            <form id='loginForm' onSubmit={handleSubmit} className={classes.form}>
                                <Grid container spacing={4}>
                                    <Grid item md={12}>
                                        <Field
                                            margin='normal'
                                            variant={'outlined'}
                                            fullWidth
                                            name={'email'}
                                            component={TextFieldWrapper}
                                            type='email'
                                            label='Email'
                                        />
                                    </Grid>
                                    <Grid item md={12}>
                                        <Field
                                            margin='normal'
                                            variant={'outlined'}
                                            fullWidth
                                            name={'password'}
                                            component={TextFieldWrapper}
                                            type='password'
                                            label='Password'
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={1}>
                                    <Grid item md={12}>
                                        <Button type={'submit'} variant={'contained'} color={'primary'} className={classes.submit} fullWidth>
                                            Accedi
                                        </Button>
                                    </Grid>
                                    <Grid item md={12}>
                                        <Button variant={'outlined'} color={'default'} className={classes.signup} onClick={() => this.props.history.push('/signup')} fullWidth>
                                            Registrati
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        )
                    }}
                    />
                </div>
            </Container>
        );
    }

}

export default withStyles(LoginStyle, {withTheme: true})(withRouter(Signin));