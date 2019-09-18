import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;

// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import reducer from './reducer';

// const store = createStore(reducer, applyMiddleware(thunk));

// export default store;
