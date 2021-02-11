import React from "react";
import {inject, observer} from "mobx-react";
import {Button, Dialog, DialogContent, DialogTitle, Grid} from "@material-ui/core";
import {Field, Form} from "react-final-form";
import TextFieldWrapper from "./Form/TextFieldWrapper";
import DatePickerWrapper from "./Form/DatePickerWrapper";

@inject('userStore')
@observer
class EditUserModal extends React.Component {

    onSubmit = async (values) => {
        const {userStore} = this.props

        try {
            await userStore.updateUser(values)
        } catch (e) {
            console.error(e);
        }
    }

    validate = values => {

        const error = {};
        if (!values.email) {
            Object.assign(error, {
                email: 'Field is required'
            })
        }

        if (!values.firstName) {
            Object.assign(error, {
                firstName: 'Field is required'
            })
        }

        if (!values.lastName) {
            Object.assign(error, {
                lastName: 'Field is required'
            })
        }

        if (!values.birthDate) {
            Object.assign(error, {
                birthDate: 'Field is required'
            })
        }

        return error
    }

    async componentDidMount() {
        const {userStore} = this.props;
        try {
            await userStore.getUser();
        } catch (e) {
            console.error(e)
        }
    }

    render() {

        const {userStore} = this.props

        return(
            <Dialog
                fullWidth={true}
                maxWidth={'sm'}
                open={userStore.openEditUserModal}
                onClose={() => console.log("close")}
                aria-labelledby="max-width-dialog-title"
            >
                <DialogTitle id="max-width-dialog-title">Aggiorna profilo</DialogTitle>
                <DialogContent>
                    <Form
                        onSubmit={this.onSubmit}
                        validate={this.validate}
                        mutators={{

                        }}
                        initialValues={userStore.currentUser || {}}
                        render={({ handleSubmit, values, mutators, valid, form }) => {
                            return (
                                <form id='editUserProfile' onSubmit={handleSubmit}>
                                    <Grid container spacing={2}>
                                        <Grid item md={6} style={{ display: 'none' }}>
                                            <Field
                                                fullWidth
                                                name={'id'}
                                                component={TextFieldWrapper}
                                                type='text'
                                                label='ID'
                                            />
                                        </Grid>
                                        <Grid item md={6}>
                                            <Field
                                                variant={'outlined'}
                                                fullWidth
                                                name={'email'}
                                                component={TextFieldWrapper}
                                                type='email'
                                                label='Email'
                                            />
                                        </Grid>
                                        <Grid item md={6}>
                                            <Field
                                                variant={'outlined'}
                                                fullWidth
                                                name={'firstName'}
                                                component={TextFieldWrapper}
                                                type='text'
                                                label='First Name'
                                            />
                                        </Grid>
                                        <Grid item md={6}>
                                            <Field
                                                variant={'outlined'}
                                                fullWidth
                                                name={'lastName'}
                                                component={TextFieldWrapper}
                                                type='text'
                                                label='Last Name'
                                            />
                                        </Grid>
                                        <Grid item md={6}>
                                            <Field
                                                inputVariant='outlined'
                                                fullWidth
                                                name={'birthDate'}
                                                component={DatePickerWrapper}
                                                native={false}
                                                type="text"
                                                label={'Birth Date'}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} style={{ marginTop: 20, marginBottom: 20 }}>
                                        <Grid item xs={6}>
                                            <Button color={'secondary'} onClick={() => userStore.openEditUserModal = false} variant={'outlined'} fullWidth>Annulla</Button>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button type={'submit'} color={'primary'} variant={'outlined'} fullWidth>Salva</Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            )
                        }}
                    />
                </DialogContent>
            </Dialog>
        )
    }

}

export default EditUserModal;