import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { loadData, changeNavigation, changeDate } from "../actions/Index";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import "@blueprintjs/datetime/lib/css/blueprint-datetime.css";

import Constants from '../Constants';

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    // load data at initalization
    this.props.loadData(this.props.data);
  }

  handleDateChange = (date) => {
    var me = this;
    var variant = 'zh-tw'; //TODO
    axios
      .get("/data/wiki_" + (date.getMonth() + 1) + "_" + date.getDate() + '_' + variant + ".json")
      .then(function (resp) {
        var data = resp.data;
        me.props.changeDate(date);
        me.props.loadData(data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }

  handleDayClick = (day, { selected }) => {
    this.handleDateChange(day);
  }

  handleMonthSelect = (e) => {
    //TODO: change year if needed
    var date = new Date(this.props.date.getTime());
    date.setMonth(e.target.value);
    this.handleDateChange(date);
  }

  handleDaySelect = (e) => {
    //TODO: change year if needed
    var date = new Date(this.props.date.getTime());
    date.setDate(e.target.value);
    this.handleDateChange(date);
  }

  toggleMode = () => {
    if (this.props.navigation == Constants.NAVIGATION_NORMAL) {
      this.props.changeNavigation(Constants.NAVIGATION_WITH_CALENDAR);
    } else {
      this.props.changeNavigation(Constants.NAVIGATION_NORMAL);
    }
  }

  handleChangeOld = (day) => {
    // console.debug(day);
    var me = this;
    var variant = 'zh-tw'; //TODO
    axios
      .get("/data/wiki_" + (day.getMonth() + 1) + "_" + day.getDate() + '_' + variant + ".json")
      .then(function (resp) {
        var data = resp.data;
        // console.debug(data);
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
    var calendar;
    var navigation = this.props.navigation;
    var date = this.props.date;
    console.debug('in render');
    var me = this;
    if (navigation == Constants.NAVIGATION_NORMAL) {
      calendar = null;
    } else {
      calendar = (<DayPicker selectedDays={me.props.date}
        onDayClick={me.handleDayClick} />)
    }

    var len;
    if (this.props.date.getMonth() + 1 == 2) {
      len = 29;
    } else if ([4, 6, 9, 11].includes(this.props.date.getMonth() + 1)) {
      len = 30;
    } else {
      len = 31;
    }

    return (
      <div className="column is-3">
        <div>
          <div className="select">
            <select key={"msel" + this.props.date.getMonth()} onChange={this.handleMonthSelect} value={this.props.date.getMonth()}>
              <option value="0">Jan</option>
              <option value="1">Feb</option>
              <option value="2">March</option>
              <option value="3">April</option>
              <option value="4">May</option>
              <option value="5">June</option>
              <option value="6">July</option>
              <option value="7">August</option>
              <option value="8">September</option>
              <option value="9">October</option>
              <option value="10">November</option>
              <option value="11">December</option>
            </select>
          </div>
          <div className="select">
            <select key={"dsel" + this.props.date.getDay()} onChange={this.handleDaySelect} value={this.props.date.getDate()}>
              {Array.from({ length: len }, (_, i) => i + 1).map((n) => <option value={n}>{n}</option>)}
            </select>
          </div>
          <button onClick={me.toggleMode}>Full</button>
        </div>
        {calendar}
        {/* <DayPicker onDayClick={this.handleChange} /> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  navigation: state.navigation,
  date: state.date
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadData: (data) => dispatch(loadData(data)),
  changeNavigation: (navigation) => dispatch(changeNavigation(navigation)),
  changeDate: (date) => dispatch(changeDate(date))
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
