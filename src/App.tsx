import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './store';
import PostList from './components/Postlist';
import 'bootstrap/dist/css/bootstrap.min.css';
const  App:React.FC=()=> {
  return (
    <Provider store={store}>
        <div>
          <PostList />
        </div>
    </Provider>
  );
}

export default App;
