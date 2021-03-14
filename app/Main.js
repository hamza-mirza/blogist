import React, { useState, useReducer } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Axios from 'axios'
Axios.defaults.baseURL = 'http://localhost:8080'

import Context from './Context'

import Header from './components/Header'
import HomeGuest from './components/HomeGuest'
import Home from './components/Home'
import Footer from './components/Footer'
import About from './components/About'
import Terms from './components/Terms'
import CreatePost from './components/CreatePost'
import ViewSinglePost from './components/ViewSinglePost'
import FlashMessages from './components/FlashMessages'

function Main() {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem('blogToken')),
    flassMessages: [],
  }
  function appReducer(state, action) {
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
  const [state, dispatch] = useReducer(appReducer, initialState)

  function addFlashMessage(msg) {
    setFlashMessages((prev) => prev.concat(msg))
  }

  return (
    <Context.Provider value={{ addFlashMessage, setLoggedIn }}>
      <BrowserRouter>
        <FlashMessages messages={flashMessages} />
        <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <Switch>
          <Route path="/" exact>
            {loggedIn ? <Home /> : <HomeGuest />}
          </Route>
          <Route path="/post/:id">
            <ViewSinglePost />
          </Route>
          <Route path="/create-post">
            <CreatePost />
          </Route>
          <Route path="/about-us">
            <About />
          </Route>
          <Route path="/terms">
            <Terms />
          </Route>
        </Switch>
        <Footer />
      </BrowserRouter>
    </Context.Provider>
  )
}

ReactDOM.render(<Main />, document.querySelector('#app'))

if (module.hot) {
  module.hot.accept()
}
