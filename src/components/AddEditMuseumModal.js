import React from "react";
import {Button, Dialog, DialogContent, DialogTitle, Grid} from "@material-ui/core";
import {Field, Form} from "react-final-form";
import TextFieldWrapper from "./Form/TextFieldWrapper";
import {inject, observer} from "mobx-react";
import {decodeToken} from "react-jwt";

@inject('museumStore')
@observer
class AddEditMuseumModal extends React.Component {

    onSubmit = async (values) => {
        const {museumStore} = this.props

        try {
            const JWT = localStorage.getItem('JWT')
            const payload = decodeToken(JWT)
            Object.assign(values, {
                cover: "https://www.visitberlin.de/system/files/styles/visitberlin_hero_visitberlin_desktop_2x/private/image/NaturkundeMuseum_Sauriersaal_04__Foto_%C2%A9_Carola-Radke-MfN_DL_PPT_0.jpg?h=10d202d3&itok=3r9Pr0Ht",
                photos: [
                    "https://www.visitberlin.de/system/files/styles/visitberlin_hero_visitberlin_desktop_2x/private/image/NaturkundeMuseum_Sauriersaal_04__Foto_%C2%A9_Carola-Radke-MfN_DL_PPT_0.jpg?h=10d202d3&itok=3r9Pr0Ht",
                    "https://www.visitberlin.de/system/files/styles/visitberlin_hero_visitberlin_desktop_2x/private/image/NaturkundeMuseum_Sauriersaal_04__Foto_%C2%A9_Carola-Radke-MfN_DL_PPT_0.jpg?h=10d202d3&itok=3r9Pr0Ht",
                    "https://www.visitberlin.de/system/files/styles/visitberlin_hero_visitberlin_desktop_2x/private/image/NaturkundeMuseum_Sauriersaal_04__Foto_%C2%A9_Carola-Radke-MfN_DL_PPT_0.jpg?h=10d202d3&itok=3r9Pr0Ht",
                    "https://www.visitberlin.de/system/files/styles/visitberlin_hero_visitberlin_desktop_2x/private/image/NaturkundeMuseum_Sauriersaal_04__Foto_%C2%A9_Carola-Radke-MfN_DL_PPT_0.jpg?h=10d202d3&itok=3r9Pr0Ht"
                ],
                userId: payload.sub
            })
            await museumStore.addEditMuseum(values)
            if (museumStore.currentMuseum) {
                museumStore.currentMuseum = null
                await museumStore.getUserMuseums()
            } else {
                await museumStore.listMuseum()
            }
        } catch (e) {
            console.error(e)
        }
    }

    validate = values => {
        const error = {};
        if (!values.name) {
            Object.assign(error, {
                name: 'Field is required'
            })
        }

        if (!values.address) {
            Object.assign(error, {
                address: 'Field is required'
            })
        }

        if (!values.description) {
            Object.assign(error, {
                description: 'Field is required'
            })
        }

        return error
    }

    render() {

        const {museumStore} = this.props

        return (
            <Dialog
                fullWidth={true}
                maxWidth={'sm'}
                open={museumStore.openAddMuseumModal}
                onClose={() => console.log("close")}
                aria-labelledby="max-width-dialog-title"
            >
                <DialogTitle id="max-width-dialog-title">{museumStore.currentMuseum ? 'Update' : 'Add'} Museum</DialogTitle>
                <DialogContent>
                    <Form
                        onSubmit={this.onSubmit}
                        validate={this.validate}
                        mutators={{

                        }}
                        initialValues={museumStore.currentMuseum || {}}
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
                                                name={'name'}
                                                component={TextFieldWrapper}
                                                type='text'
                                                label='Name'
                                            />
                                        </Grid>
                                        <Grid item md={6}>
                                            <Field
                                                variant={'outlined'}
                                                fullWidth
                                                name={'address'}
                                                component={TextFieldWrapper}
                                                type='text'
                                                label='Address'
                                            />
                                        </Grid>
                                        <Grid item md={12}>
                                            <Field
                                                multiline
                                                rows={4}
                                                variant={'outlined'}
                                                fullWidth
                                                name={'description'}
                                                component={TextFieldWrapper}
                                                type='text'
                                                label='Description'
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} style={{ marginTop: 20, marginBottom: 20 }}>
                                        <Grid item xs={6}>
                                            <Button color={'secondary'} onClick={() => museumStore.resetMuseum()} variant={'outlined'} fullWidth>Dismiss</Button>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button type={'submit'} color={'primary'} variant={'outlined'} fullWidth>Save</Button>
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

export default AddEditMuseumModal