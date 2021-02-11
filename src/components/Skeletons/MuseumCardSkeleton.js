import React from "react";
import {Skeleton} from "@material-ui/lab";

class MuseumCardSkeleton extends React.Component {
    render() {
        return(
            <div style={{marginTop: 40}}>
                <Skeleton variant="rect" height={250} />
                <Skeleton variant="text" height={40} />
                <Skeleton variant="text" height={40} />
                <Skeleton variant="text" height={40} />
            </div>
        )
    }
}

export default MuseumCardSkeleton;