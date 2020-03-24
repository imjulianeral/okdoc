import React from 'react'

import { useSnackbar } from 'notistack'
import { Grow, Button } from '@material-ui/core'

export default function Alert({ text, variant, idx }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  return enqueueSnackbar(text, {
    variant,
    anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
    TransitionComponent: Grow,
    transitionDuration: 1000,
    preventDuplicate: true,
    persist: true,
    key: <p style={{ display: 'none' }}>{idx}</p>,
    action: key => (
      <Button
        onClick={() => {
          closeSnackbar(key)
        }}
        style={{ color: 'white' }}
      >
        Cerrar
      </Button>
    ),
  })
}
