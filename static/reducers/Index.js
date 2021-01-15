import ActionConstants from "../actions/Constants";
import Constants from "../Constants";

const initialState = {
  view: Constants.VIEW_EVENTS,
  eventLists: null,
  births: null,
  deaths: null,
};

function rootReducer(state = initialState, action) {
  console.debug(action);
  switch (action.type) {
    //--------------------- admin actions -----------------------------------------
    case ActionConstants.LOAD_DATA:
      return Object.assign({}, state, {
        eventLists: action.eventLists,
        births: action.births,
        deaths: action.deaths
      });
    case ActionConstants.CHANGE_VIEW:
      return Object.assign({}, state, {
        view: action.view
      });
    //--------------------- xxx actions -----------------------------------------
    default:
      return state;
  }
  return state;
}

export default rootReducer;
