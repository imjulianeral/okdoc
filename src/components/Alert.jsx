import React from 'react'
import { useSnackbar } from 'notistack'

export default function Alert({ notifications, variant }) {
  const { enqueueSnackbar } = useSnackbar()

  return <>{enqueueSnackbar(notifications, { variant })}</>
}
