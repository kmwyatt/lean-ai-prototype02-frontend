// @ts-check

import { Container } from '@mui/material'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { useUserState } from '../../context/UserContext'
import AdminMenu from './AsideMenu/AdminMenu'
import CheckerMenu from './AsideMenu/CheckerMenu'
import WorkerMenu from './AsideMenu/WorkerMenu'
import CheckDataSection from './Section/CheckDataSection/CheckDataSection'
import CheckSection from './Section/CheckSection/CheckSection'
import JoinRequestSection from './Section/JoinRequestSection/JoinRequestSection'
import MyPageSection from './Section/MyPageSection/MyPageSection'
import NoticeContent from './Section/NoticeSection/NoticeContent'
import NoticeSection from './Section/NoticeSection/NoticeSection'
import AdminProjectSection from './Section/ProjectSection/AdminProjectSection'
import CheckerProjectSection from './Section/ProjectSection/CheckerProjectSection'
import JoinedProjectSection from './Section/ProjectSection/JoinedProjectSection'
import WorkerProjectSection from './Section/ProjectSection/WorkerProjectSection'
import WorkHistorySection from './Section/WorkHistorySection/WorkHistorySection'
import WorkSection from './Section/WorkSection/WorkSection'

function MainPage() {
  const userState = useUserState()
  return (
    <Container
      maxWidth="lg"
      sx={{ minHeight: '100vh', display: 'flex', pt: 8 }}
    >
      {userState.role === 1 && <WorkerMenu />}
      {userState.role === 2 && <CheckerMenu />}
      {userState.role === 3 && <AdminMenu />}
      <Switch>
        <Route exact path="/main/project">
          {userState.role === 1 && <WorkerProjectSection />}
          {userState.role === 2 && <CheckerProjectSection />}
          {userState.role === 3 && <AdminProjectSection />}
        </Route>
        <Route exact path="/main/joined" component={JoinedProjectSection} />
        <Route exact path="/main/work" component={WorkSection} />
        <Route exact path="/main/workhistory" component={WorkHistorySection} />
        <Route exact path="/main/check" component={CheckSection} />
        <Route exact path="/main/checkdata" component={CheckDataSection} />
        <Route exact path="/main/mypage" component={MyPageSection} />
        <Route exact path="/main/notice" component={NoticeSection} />
        <Route exact path="/main/noticecontent" component={NoticeContent} />
        <Route exact path="/main/joinrequest" component={JoinRequestSection} />
      </Switch>
    </Container>
  )
}

export default MainPage
