import React, { useState, useReducer } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Axios from 'axios'
Axios.defaults.baseURL = 'http://localhost:8080'

import StateContext from './StateContext'
import DispatchContext from './DispatchContext'

import Header from './components/Header'
import Guest from './components/Guest'
import Home from './components/Home'
import About from './components/About'
import CreatePost from './components/CreatePost'
import ViewSinglePost from './components/ViewSinglePost'
import Terms from './components/Terms'
import Footer from './components/Footer'
import FlashMessages from './components/FlashMessages'

function Main() {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem('blogToken')),
    flashMessages: [],
  }
  function stateReducer(state, action) {
    switch (action.type) {
      case 'login':
        return { loggedIn: true, flashMessages: state.flashMessages }
      case 'logout':
        return { loggedIn: false, flashMessages: state.flashMessages }
      case 'flashMessage':
        return {
          loggedIn: state.loggedIn,
          flashMessages: state.flashMessages.concat(action.value),
        }
    }
  }
  const [state, dispatch] = useReducer(stateReducer, initialState)

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <FlashMessages messages={state.flashMessages} />
          <Header />
          <Switch>
            <Route path="/" exact>
              {state.loggedIn ? <Home /> : <Guest />}
            </Route>
            <Route path="/create-post">
              <CreatePost />
            </Route>
            <Route path="/post/:id">
              <ViewSinglePost />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/terms">
              <Terms />
            </Route>
          </Switch>
          <Footer />
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

ReactDOM.render(<Main />, document.querySelector('#app'))

if (module.hot) {
  module.hot.accept()
}
