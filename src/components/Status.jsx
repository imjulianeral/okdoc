import React, { useContext } from 'react'

import { FirebaseContext } from '../firebase/context'

import { Switch } from '@material-ui/core'

export default function Status({ STATUS, ID }) {
  const { firebase } = useContext(FirebaseContext)
  const handleChange = async (status, id) => {
    const record = await firebase.firestore().doc(`/users/${id}`)
    if (status === 'PENDIENTE' || status === 'ELIMINADO') {
      record.update({
        status: 'ACTIVADO',
      })
    } else {
      record.update({
        status: 'ELIMINADO',
      })
    }
  }
  return (
    <Switch
      checked={STATUS === 'PENDIENTE' || STATUS === 'ELIMINADO' ? false : true}
      onChange={() => handleChange(STATUS, ID)}
      color="primary"
      name="status"
      inputProps={{ 'aria-label': 'primary checkbox' }}
    />
  )
}
