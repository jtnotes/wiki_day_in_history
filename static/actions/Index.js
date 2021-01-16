import Constants from "./Constants";

//--------------------- common -----------------------------------------
export const changeView = (view) => ({
  type: Constants.CHANGE_VIEW,
  view,
});

export const changeNavigation = (navigation) => ({
  type: Constants.CHANGE_NAVIGATION,
  navigation,
});

export const changeDate = (date) => ({
  type: Constants.CHANGE_DATE,
  date,
});

export const loadData = (data) => ({
  type: Constants.LOAD_DATA,
  eventLists: data.eventLists,
  births: data.births,
  deaths: data.deaths,
});
