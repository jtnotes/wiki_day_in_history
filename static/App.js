import React from "react";

import SidePanel from "./components/SidePanel";
import Main from "./components/Main";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="viewport">
        <SidePanel />
        <Main />
      </div>
    );
  }
}

export default App;
