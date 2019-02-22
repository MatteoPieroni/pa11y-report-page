import React from "react";
import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'

import Index from './pages/Index';
import './sass/index.scss';

library.add([
  faCaretDown,
  faCaretUp
])

const App = () => {
  return <Index />;
};

ReactDOM.render(<App />, document.getElementById("index"));