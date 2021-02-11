import React from "react";
import {inject, observer} from "mobx-react";
import {
    Container
} from "@material-ui/core";
import Museum from "../components/MuseumCard";
import MyAppBar from "../components/MyAppBar";
import FloatingAddFab from "../components/FloatingAddFab";
import AddEditMuseumModal from "../components/AddEditMuseumModal";
import {withRouter} from "react-router-dom";
import {isExpired} from "react-jwt";
import MuseumCardSkeleton from "../components/Skeletons/MuseumCardSkeleton";


@inject('museumStore')
@observer
class Museums extends React.Component {

    async componentDidMount() {
        const {museumStore} = this.props;
        try {
            await museumStore.listMuseum();
        } catch (e) {
            console.error(e)
        }
    }

    handleAddMuseum = () => {
        const {museumStore} = this.props
        museumStore.openAddMuseumModal = true
    }

    render() {

        const {museumStore} = this.props
        const {loading} = this.props.museumStore

        return (
            <React.Fragment>
                <Container maxWidth="lg">

                    <MyAppBar action={'profile'}/>
                    {loading ? (
                        <React.Fragment>
                            <MuseumCardSkeleton />
                            <MuseumCardSkeleton />
                            <MuseumCardSkeleton />
                        </React.Fragment>
                    ) : (
                        <div style={{marginBottom: 40}}>
                            {museumStore.museums.map(museum => (
                                <Museum museum={museum}/>
                            ))}
                        </div>
                    )}

                    {!isExpired(localStorage.getItem('JWT')) ? (<FloatingAddFab handleFabClick={this.handleAddMuseum}/>) : null}
                    <AddEditMuseumModal/>


                </Container>
            </React.Fragment>

        )
    }
}

export default withRouter(Museums);