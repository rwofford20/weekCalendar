import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App/App';
import './index.css';

// Load the material ui picker support library
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

// pick a date util library
// Pro-tip
//import MomentUtils from '@date-io/moment';
//import LuxonUtils from '@date-io/luxon';
import DateFnsUtils from '@date-io/date-fns';


ReactDOM.render(
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <App />
    </MuiPickersUtilsProvider>,
    document.getElementById('root')
);