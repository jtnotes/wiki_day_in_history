import React from "react";

// import SidePanel from "./components/SidePanel";
import Main from "./components/Main";
import Navigation from "./components/Navigation";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="columns is-multiline">
        <Navigation data={this.props.data} />
        <Main />
      </div>
    );
  }
}

export default App;
