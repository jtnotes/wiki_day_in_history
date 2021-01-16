import React from 'react';
import { connect } from "react-redux";
import { changeView } from '../actions/Index';

import Constants from '../Constants';

// import { Tab, Tabs } from "@blueprintjs/core";
import EventPanel from './Tabs/EventPanel';
import BirthPanel from './Tabs/BirthPanel';
import DeathPanel from './Tabs/DeathPanel';

class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick = (e) => {
        var tab = e.target.getAttribute('tab');
        if (tab == "event") {
            this.props.changeView(Constants.VIEW_EVENT);
        } else if (tab == "birth") {
            this.props.changeView(Constants.VIEW_BIRTH);
        } else if (tab == "death") {
            this.props.changeView(Constants.VIEW_DEATH);
        }
    }

    render() {
        var me = this;
        var panel;
        if (me.props.view == Constants.VIEW_EVENT) {
            panel = (<EventPanel />);
        } else if (me.props.view == Constants.VIEW_BIRTH) {
            panel = (<BirthPanel />);
        } else if (me.props.view == Constants.VIEW_DEATH) {
            panel = (<DeathPanel />);
        }
        console.log(panel);
        return (
            <div className="column">
                <div className="container">
                    <nav className="tabs is-full">
                        <a className={me.props.view == Constants.VIEW_EVENT ? "active" : ""} onClick={this.handleClick} tab="event">Events</a>
                        <a className={me.props.view == Constants.VIEW_BIRTH ? "active" : ""} onClick={this.handleClick} tab="birth">Births</a>
                        <a className={me.props.view == Constants.VIEW_DEATH ? "active" : ""} onClick={this.handleClick} tab="death">Deaths</a>
                    </nav>
                </div>
                <section class="section tab-content-container" id="mainTabs">
                    <div class="tab-content" id="aboutContent">
                        <div class="container">
                            {panel}
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    view: state.view,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    changeView: (data) => dispatch(changeView(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);