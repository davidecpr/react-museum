import React from "react";
import {Container} from "@material-ui/core";
import {inject, observer} from "mobx-react";
import MyAppBar from "./components/MyAppBar";
import Museums from "./pages/Museums";

@inject('museumStore')
@observer
class App extends React.Component {
  render() {
    return(
        <React.Fragment>

            <Container maxWidth="lg">
                <MyAppBar />
                <Museums />
            </Container>

        </React.Fragment>
    )
  }
}

export default App;
