// @ts-check

import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import IntroPage from './components/IntroPage/IntroPage'
import MainPage from './components/MainPage/MainPage'
import RegisterPage from './components/RegisterPage/RegisterPage'
import { UserProvider } from './context/UserContext'

function App() {
  return (
    <UserProvider>
      <Route path="/" component={Header} />
      <Switch>
        <Route exact path="/" component={IntroPage} />
        <Route path="/main" component={MainPage} />
        <Route exact path="/register" component={RegisterPage} />
      </Switch>
      <Route path="/" component={Footer} />
    </UserProvider>
  )
}

export default App
