import React from 'react'

import { useSnackbar } from 'notistack'
import { Grow, IconButton } from '@material-ui/core'
import { Cancel } from '@material-ui/icons'

export default function Alert({ text, variant }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  return enqueueSnackbar(text, {
    variant,
    anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
    TransitionComponent: Grow,
    transitionDuration: 1000,
    preventDuplicate: true,
    persist: true,
    key: key => <p style={{ display: 'none' }}>{key}</p>,
    action: key => (
      <IconButton
        onClick={() => {
          closeSnackbar(key)
        }}
      >
        <Cancel />
      </IconButton>
    ),
  })
}
