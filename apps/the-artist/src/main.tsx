import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom'

import App from './app/app';

ReactDOM.render(
  <StrictMode>
     <BrowserRouter basename={"/alphashubh/"}>
      <Route path="/" Component={App} />
     </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);
