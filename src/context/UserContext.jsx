// @ts-check

// @ts-ignore
import axios from 'axios'
import React, { useContext, useReducer } from 'react'
import { createContext } from 'react'

const initialUser = {
  index: 0,
  id: 'guest',
  name: '',
  email: '',
  role: 0,
  point: 0,
}

// @ts-ignore
function userReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return action.data
    case 'LOGOUT':
      return initialUser
    default:
      return state
  }
}

// @ts-ignore
const UserStateContext = createContext()
// @ts-ignore
const UserDispatchContext = createContext()

// @ts-ignore
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

// @ts-ignore
export async function login(dispatch, body) {
  try {
    console.log(body)
    const res = await axios.post('/api/account/login', body)
    console.log(res.data)
    dispatch({ type: 'LOGIN', data: res.data })
  } catch (err) {
    alert('로그인에 실패했습니다.')
    throw err
  }
}

// @ts-ignore
export async function logout(dispatch) {
  try {
    dispatch({ type: 'LOGOUT' })
    alert('로그아웃 되었습니다.')
  } catch (err) {
    alert('로그아웃에 실패했습니다.')
    throw err
  }
}
