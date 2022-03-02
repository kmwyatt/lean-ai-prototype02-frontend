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

function AdminMenu() {
  return (
    <Box sx={{ width: '200px', bgcolor: '#30a9de' }}>
      <List sx={{ pt: 4, width: 200 }}>
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
              <ListItemText primary="프로젝트 관리" />
            </Link>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <Link
              to="/main/joinrequest"
              style={{
                textDecoration: 'none',
                width: '100%',
                color: '#333',
                textAlign: 'center',
              }}
            >
              <ListItemText primary="프로젝트 신청 승인" />
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

export default AdminMenu
