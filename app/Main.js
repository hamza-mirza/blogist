import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Header from './components/Header'
import Guest from './components/Guest'
import Home from './components/Home'
import About from './components/About'
import Terms from './components/Terms'
import Footer from './components/Footer'

function Main() {
  const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem('blogToken')))
  return (
    <BrowserRouter>
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
      <Switch>
        <Route path='/' exact>
          { loggedIn ? <Home/> : <Guest/> }
        </Route>
        <Route path='/about'>
          <About/>
        </Route>
        <Route path='/terms'>
          <Terms/>
        </Route>
      </Switch>
      <Footer/>
    </BrowserRouter>
  )
}

ReactDOM.render(<Main />, document.querySelector("#app"))

if (module.hot) {
  module.hot.accept()
}
