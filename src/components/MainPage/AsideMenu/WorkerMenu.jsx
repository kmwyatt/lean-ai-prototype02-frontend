// @ts-check

import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

function WorkerMenu() {
  return (
    <Box sx={{ width: 200, bgcolor: '#30a9de' }}>
      <List sx={{ pt: 4 }}>
        <ListItem disablePadding>
          <ListItemButton>
            <Link
              to="/main/project"
              style={{
                textDecoration: 'none',
                width: '100%',
                color: '#333',
                textAlign: 'center',
              }}
            >
              <ListItemText primary="신청 가능 작업 목록" />
            </Link>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <Link
              to="/main/assigned"
              style={{
                textDecoration: 'none',
                width: '100%',
                color: '#333',
                textAlign: 'center',
              }}
            >
              <ListItemText primary="할당된 작업 목록" />
            </Link>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <Link
              to="/main/work"
              style={{
                textDecoration: 'none',
                width: '100%',
                color: '#333',
                textAlign: 'center',
              }}
            >
              <ListItemText primary="작업 현황" />
            </Link>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <Link
              to="/main/mypage"
              style={{
                textDecoration: 'none',
                width: '100%',
                color: '#333',
                textAlign: 'center',
              }}
            >
              <ListItemText primary="회원 정보" />
            </Link>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <Link
              to="/main/notice"
              style={{
                textDecoration: 'none',
                width: '100%',
                color: '#333',
                textAlign: 'center',
              }}
            >
              <ListItemText primary="공지사항" />
            </Link>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )
}

export default WorkerMenu
