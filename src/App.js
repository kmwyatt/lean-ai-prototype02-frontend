// @ts-check

import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import IntroPage from './components/IntroPage/IntroPage'
import MainPage from './components/MainPage/MainPage'
import NoticePage from './components/NoticePage/NoticePage'
import { UserProvider } from './context/UserContext'

function App() {
  return (
    <UserProvider>
      <Route path="/" component={Header} />
      <Switch>
        <Route exact path="/" component={IntroPage} />
        <Route exact path="/main" component={MainPage} />
        <Route exact path="/notice" component={NoticePage} />
      </Switch>
      <Route path="/" component={Footer} />
    </UserProvider>
  )
}

export default App
