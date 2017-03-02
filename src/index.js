import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import jQuery from 'jquery';
import 'hammerjs';
import 'font-awesome-webpack';

import Reindex from './Reindex';

import App from './components/App';

require("./css/materialize.css");
require("./css/style.css");

require("./js/materialize.js");
require("./js/init.js");


Relay.injectNetworkLayer(Reindex.getRelayNetworkLayer());

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
