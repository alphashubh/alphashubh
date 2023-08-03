import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import {BrowserRouter, Route, Routes} from 'react-router-dom'

import App from './app/app';

ReactDOM.render(
  <StrictMode>
     <BrowserRouter basename={window.location.pathname || ""}>
      <Routes>
        <Route path="/" Component={App} />
      </Routes>
     </BrowserRouter>
     {/* <App /> */}
  </StrictMode>,
  document.getElementById('root')
);
