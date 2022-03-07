// @ts-check

import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  Popover,
  Toolbar,
  Typography,
} from '@mui/material'
// @ts-ignore
import React, { useEffect } from 'react'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import {
  login,
  logout,
  useUserDispatch,
  useUserState,
} from '../../context/UserContext'
import axios from 'axios'
import { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Notifications } from '@mui/icons-material'
import AlertList from './AlertList'

const Logo = styled.img`
  width: 108px;
  height: 30px;
`

// @ts-ignore
function Header(props) {
  const userState = useUserState()
  const userDispatch = useUserDispatch()
  const [alertCount, setAlertCount] = useState(0)
  const [alertContent, setAlertContent] = useState([])
  const [profileColor, setProfileColor] = useState('gray')
  const [anchorEl, setAnchorEl] = useState(null)

  useEffect(() => {
    if (userState.role === 1) {
      setProfileColor('royalblue')
    } else if (userState.role === 2) {
      setProfileColor('darkorange')
    } else if (userState.role === 3) {
      setProfileColor('darkgreen')
    } else {
      setProfileColor('gray')
    }
  }, [userState])

  useEffect(() => {
    if (userState.index) {
      getAlert()
      const body = {
        id: userState.id,
      }
      login(userDispatch, body)
    }
  }, [props])

  // @ts-ignore
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const logoutHandler = () => {
    logout(userDispatch)
    setAlertCount(0)
    setAlertContent([])
    props.history.push('/')
  }

  async function getAlert() {
    const body = {
      index: userState.index,
    }
    const res = await axios.post('/api/account/alert', body)
    if (res.data && alertCount !== res.data.count) {
      setAlertCount(res.data.length)
      setAlertContent(res.data)
      console.log(res.data)
      console.log(alertCount)
    }
  }

  return (
    <>
      <AppBar position="fixed" color="inherit">
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Link to="/">
              <Button>
                <Logo src="../images/logo.png" alt="LEAN-AI" />
              </Button>
            </Link>
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                justifyContent: 'right',
                mr: 5,
              }}
            >
              {/* <Link to="/main/project" style={{ textDecoration: 'none' }}>
                <Button sx={{ color: '#333', display: 'block' }}>
                  메인 페이지
                </Button>
              </Link> */}
            </Box>

            <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
              {userState.index !== 0 && (
                <Box sx={{ mr: 2 }}>
                  <Badge
                    badgeContent={alertCount}
                    color="error"
                    overlap="circular"
                  >
                    <IconButton sx={{ p: 0 }} onClick={handleClick}>
                      <Notifications sx={{ width: 28, height: 28 }} />
                    </IconButton>
                  </Badge>
                </Box>
              )}
              <Avatar sx={{ bgcolor: profileColor }}>
                {userState.id[0].toUpperCase()}
              </Avatar>
              <Typography
                variant="h5"
                component="div"
                sx={{ flexGrow: 1, my: 0, ml: 1, mr: 1.5, color: '#333' }}
              >
                {userState.id}
              </Typography>
              {userState.index !== 0 && (
                <Button variant="contained" onClick={logoutHandler}>
                  로그아웃
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        onClick={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        sx={{ width: 350, height: 250 }}
      >
        <AlertList alertList={alertContent} />
      </Popover>
    </>
  )
}

export default withRouter(Header)
