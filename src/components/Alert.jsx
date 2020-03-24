import { useSnackbar } from 'notistack'

export default function Alert({ text, variant }) {
  const { enqueueSnackbar } = useSnackbar()
  const Alert = enqueueSnackbar(text, { variant })

  return Alert
}
