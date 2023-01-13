import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Setup from './Setup';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Setup>
      <App/>
    </Setup>
  </React.StrictMode>,
)
;
