import React, { createContext } from 'react'
import { firebase } from './index'

export const FirebaseContext = createContext(null)

export const wrapRootElement = ({ element }) => {
  return (
    <FirebaseContext.Provider value={{ firebase }}>
      {element}
    </FirebaseContext.Provider>
  )
}
