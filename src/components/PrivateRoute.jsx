import React, { useEffect, useState } from 'react'
import { navigate } from 'gatsby'

import useAuth from '../hooks/useAuth'

export default function PrivateRoute({
  component: Component,
  location,
  ...rest
}) {
  const [render, setRender] = useState()

  const { user, fetchingUser } = useAuth()
  useEffect(() => {
    if (!user && !fetchingUser) {
      setRender(false)
      return navigate('login')
    }
    setRender(true)
  }, [user, fetchingUser])

  return <>{render && <Component {...rest} />}</>
}
