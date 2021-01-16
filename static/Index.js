import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import axios from "axios";

import Store from "./store/Store";
import App from "./App";
import Util from "./Util";


var locale = 'zh_tw'
Util.initI18(locale);

var variant = 'zh-tw'; //TODO
var today = new Date();
axios
  .get("/data/wiki_" + (today.getMonth() + 1) + "_" + today.getDate() + '_' + variant + ".json")
  .then(function (resp) {
    var data = resp.data;
    ReactDOM.render(
      <Provider store={Store}>
        <App data={data} />
      </Provider>,
      document.getElementById("main")
    );
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
    // always executed
  });

