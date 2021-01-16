import React from "react";
import { connect } from "react-redux";
import ReactHtmlParser from "react-html-parser";

class BirthPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var items;
    if (this.props.births != null) {
      items = this.props.births.map((b) => <li>{ReactHtmlParser(b)}</li>);
    }
    return (
      <div className="data-panel">
        <ul>{items}</ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  births: state.births,
  deaths: state.deaths,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  // changeView: (view) => dispatch(changeView(view)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BirthPanel);
