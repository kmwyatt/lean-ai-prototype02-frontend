// @ts-check

import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material'
import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

const Logo = styled.img`
  width: 108px;
  height: 30px;
`

function Header() {
  const pages = ['공지사항', '메인 페이지']

  return (
    <AppBar position="fixed" color="inherit">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Button href="/">
            <Logo src="./images/logo.png" alt="LEAN-AI" />
          </Button>
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              justifyContent: 'right',
              mr: 5,
            }}
          >
            <Link to="/notice" style={{ textDecoration: 'none' }}>
              <Button sx={{ color: '#333', display: 'block' }}>공지사항</Button>
            </Link>
            <Link to="/main" style={{ textDecoration: 'none' }}>
              <Button sx={{ color: '#333', display: 'block' }}>
                메인 페이지
              </Button>
            </Link>
          </Box>

          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
            <Badge badgeContent={100} color="error" overlap="circular">
              <IconButton sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: 'royalblue' }}>G</Avatar>
              </IconButton>
            </Badge>
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1, my: 0, ml: 1, mr: 1.5, color: '#333' }}
            >
              guest
            </Typography>
            <Button variant="contained">로그아웃</Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
