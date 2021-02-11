import React from "react";
import {Fab} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add'
import PropTypes from 'prop-types'

class FloatingAddFab extends React.Component {

    render() {

        const {handleFabClick} = this.props

        return (
            <Fab color={'primary'} aria-label={'add'} style={{position: 'fixed', right: 40, bottom: 40}}
                 onClick={handleFabClick}>
                <AddIcon/>
            </Fab>
        )
    }

}

FloatingAddFab.propTypes = {
    handleFabClick: PropTypes.func
}

export default FloatingAddFab