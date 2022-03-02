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

function CheckerMenu() {
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
              <ListItemText primary="데이터 검수" />
            </Link>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <Link
              to="/main/checkedupload"
              style={{
                textDecoration: 'none',
                width: '100%',
                color: '#333',
                textAlign: 'center',
              }}
            >
              <ListItemText primary="검수완료 데이터 업로드" />
            </Link>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <Link
              to="/main/check"
              style={{
                textDecoration: 'none',
                width: '100%',
                color: '#333',
                textAlign: 'center',
              }}
            >
              <ListItemText primary="나의 검수 현황" />
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

export default CheckerMenu
