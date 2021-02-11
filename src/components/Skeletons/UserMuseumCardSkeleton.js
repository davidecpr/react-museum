import React from "react";
import {Skeleton} from "@material-ui/lab";

class UserMuseumCardSkeleton extends React.Component {
    render() {
        return(
            <div style={{marginTop: 40}}>
                <Skeleton variant="rect" height={250} />
            </div>
        )
    }
}

export default UserMuseumCardSkeleton;