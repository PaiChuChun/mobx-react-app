
import React from 'react';

import { Provider } from "mobx-react"
import store from "./store"

import Home from "./pages/home"

import './App.css';


// Provider 提供一个上下文 在Provider中的变量都受到mobx 管理

function App() {
  return (
    <div className="App">
      <Provider store={store}>
            {/* 其中的变量都收到store管理*/}
            <Home />
      </Provider>
    </div>
  );
}

export default App;