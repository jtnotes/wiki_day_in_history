import React from "react";
import { connect } from "react-redux";
import { changeView } from "../../actions/Index";

import ReactHtmlParser from "react-html-parser";

class EventPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // var data = this.props.data;
    var content;
    console.log("in eventpanel render");
    var eventLists = this.props.eventLists;
    // console.log("muEvent=" + muEvent);
    if (eventLists != null) {
      console.log("eventLists not null");
      console.log(eventLists);
      content = eventLists.map((l) => {
        var events = l.events.map((e) => <li>{ReactHtmlParser(e)}</li>);
        return (
          <div>
            <h5 className="event-title">{l.title}</h5>
            <ul>{events}</ul>
          </div>
        );
      });
    }
    return <div>{content}</div>;
  }
}

const mapStateToProps = (state) => ({
  eventLists: state.eventLists,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  // changeView: (view) => dispatch(changeView(view)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventPanel);
