// @ts-check

import axios from 'axios'
import React, { useContext, useReducer } from 'react'
import { createContext } from 'react'

const initialUser = {
  id: 'guest',
  role: 0,
}

function userReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      try {
      } catch (err) {
        console.log('Error', err)
        return initialUser
      }
    case 'LOGOUT':
      return initialUser
    default:
      return
  }
}

const UserStateContext = createContext()
const UserDispatchContext = createContext()

export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, initialUser)

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  )
}

export function useUserState() {
  return useContext(UserStateContext)
}

export function useUserDispatch() {
  return useContext(UserDispatchContext)
}
