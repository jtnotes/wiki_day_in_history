import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { loadData } from "../actions/Index";
import DayPicker from "react-day-picker";

import Util from "../Util";

import "react-day-picker/lib/style.css";

import "@blueprintjs/datetime/lib/css/blueprint-datetime.css";

class SidePanel extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(day) {
    console.log(day);
    var me = this;
    var variant = 'zh-cn'; //TODO
    axios
      .get("/data/wiki_" + (day.getMonth() + 1) + "_" + day.getDate() +'_' + variant + ".json")
      .then(function (resp) {
        console.log(resp);
        var data = resp.data;
        console.log(data);
        me.props.loadData(data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }

  render() {
    return (
      <div className="side-panel">
        <DayPicker onDayClick={this.handleChange} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  adminView: state.adminView,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadData: (data) => dispatch(loadData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SidePanel);
