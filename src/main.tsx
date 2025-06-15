
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux';
import { store } from './store';

// Load persisted state from localStorage
const persisted = localStorage.getItem('reduxState');
if (persisted && typeof persisted === "string") {
  const state = JSON.parse(persisted);
  // The following hydrates per-slice if existing
  Object.keys(state).forEach(slice =>{
    if (store.getState()[slice]) {
      store.dispatch({ type: `hydrate/${slice}`, payload: state[slice] });
    }
  });
}

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
