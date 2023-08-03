import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom'

import App from './app/app';

ReactDOM.render(
  <StrictMode>
     <BrowserRouter basename={process?.env?.['PUBLIC_URL'] + '/'}>
      <Route path="/alphashubh" Component={App} />
     </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);
