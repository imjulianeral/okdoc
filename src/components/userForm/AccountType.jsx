import React, { useContext } from 'react'
import { FirebaseContext } from '../../firebase/context'
import useAuth from '../../hooks/useAuth'

import {
  Container,
  Paper,
  Grid,
  FormControl,
  FormHelperText,
  TextField,
  Select,
  InputLabel,
  MenuItem,
  Button,
  Grow,
  Avatar,
  IconButton,
  Tooltip,
} from '@material-ui/core'
import { NavigateNext, AddAPhoto } from '@material-ui/icons'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import { formStyles, avatarStyles } from '../material/Material.config'
import MomentUtils from '@date-io/moment'
import moment from 'moment'
import 'moment/locale/es'
import Spinner from '../Spinner'

moment.locale('es')

export default function AccountType({
  nextStep,
  userValues,
  setUser,
  handleChange,
  isLoading,
  userRecord,
}) {
  const { user } = useAuth()
  const { firebase } = useContext(FirebaseContext)
  const classes = formStyles()
  const avatarClasses = avatarStyles()
  const next = e => {
    e.preventDefault()
    if (userValues.type === 'Paciente')
      setUser({ ...userValues, status: 'ACTIVADO' })
    else if (userValues.type === 'Doctor' && userValues.avatar !== '')
      setUser({ ...userValues })
    else if (userValues.type === 'Admin') setUser({ ...userValues })
    else setUser({ ...userValues, status: 'PENDIENTE' })
    nextStep()
  }
  const fileSelectedHandler = async e => {
    await firebase
      .storage()
      .ref()
      .child(`avatars/${user.uid}`)
      .put(e.target.files[0])

    const image = await firebase
      .storage()
      .ref(`avatars/${user.uid}`)
      .getDownloadURL()

    setUser({
      ...userValues,
      avatar: image,
    })
  }

  if (isLoading) return <Spinner />
  return (
    <Container
      maxWidth="xs"
      style={{ marginTop: '5rem', marginBottom: '5rem' }}
    >
      <MuiPickersUtilsProvider
        libInstance={moment}
        utils={MomentUtils}
        locale={moment.locale('es')}
      >
        <Grow
          in={true}
          style={{ transformOrigin: '0 0 0' }}
          {...(true ? { timeout: 1000 } : {})}
        >
          <Paper style={{ padding: '1rem' }}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={12}>
                {userRecord ? (
                  <h2 style={{ color: '#163a5f' }}>Edita tu cuenta</h2>
                ) : (
                  <h2 style={{ color: '#163a5f' }}>Configura tu cuenta</h2>
                )}
              </Grid>
              {!userRecord && (
                <Grid item xs={12}>
                  <KeyboardDatePicker
                    disableFuture
                    inputVariant="outlined"
                    openTo="year"
                    format="DD/MM/YYYY"
                    label="Fecha de Nacimiento"
                    views={['year', 'month', 'date']}
                    value={userValues.birthday}
                    defaultValue={moment(userValues.birthday).format(
                      'DD/MM/YYYY'
                    )}
                    onChange={handleChange}
                  />
                </Grid>
              )}
              <Grid item xs={12} style={{ marginTop: '1rem' }}>
                <FormControl className={classes.formControl}>
                  <TextField
                    required
                    variant="outlined"
                    name="phone"
                    label="Número celular"
                    value={userValues.phone}
                    onChange={handleChange}
                  />
                  <FormHelperText>
                    Escribir un número donde se te pueda llamar
                  </FormHelperText>
                </FormControl>
              </Grid>
              {userValues.type === 'Doctor' && (
                <Grid item xs={12}>
                  <FormControl
                    className={classes.formControl}
                    style={{ minWidth: '15.5rem' }}
                  >
                    <TextField
                      required
                      variant="outlined"
                      name="name"
                      label="Escribe tu nombre"
                      value={userValues.name}
                      onChange={handleChange}
                    />
                    <FormHelperText>Escribe tu nombre completo</FormHelperText>
                  </FormControl>
                </Grid>
              )}
              <Grid item xs={12}>
                {!userRecord && (
                  <FormControl
                    variant="outlined"
                    required
                    className={classes.formControl}
                  >
                    <InputLabel id="type">Tipo de Cuenta</InputLabel>
                    <Select
                      labelId="type"
                      id="type"
                      name="type"
                      value={userValues.type}
                      onChange={handleChange}
                      label="Tipo de Cuenta"
                      style={{ minWidth: '15.5rem' }}
                    >
                      <MenuItem value="">
                        <em>Seleccionar:</em>
                      </MenuItem>
                      <MenuItem value="Paciente">Paciente</MenuItem>
                      <MenuItem value="Doctor">Doctor</MenuItem>
                    </Select>
                    <FormHelperText>Doctor o Paciente</FormHelperText>
                  </FormControl>
                )}
              </Grid>
              <Grid item xs={12} style={{ marginTop: '1rem' }}>
                <FormControl
                  variant="outlined"
                  required
                  className={classes.formControl}
                  error
                >
                  <InputLabel id="city">Ciudad</InputLabel>
                  <Select
                    disabled
                    labelId="city"
                    id="city"
                    name="city"
                    value={userValues.city}
                    label="Tipo de Cuenta"
                  >
                    <MenuItem value={userValues.city}>
                      {userValues.city}
                    </MenuItem>
                  </Select>
                  <FormHelperText>
                    Debes de residir en Aguascalientes, México. De otra forma
                    cerraremos tu cuenta
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Avatar
                  className={avatarClasses.large}
                  src={userValues.avatar}
                />
              </Grid>
              <Grid item xs={12}>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  type="file"
                  onChange={fileSelectedHandler}
                />
                <Tooltip title="Subir imagen de perfil" placement="right">
                  <label htmlFor="contained-button-file">
                    <IconButton component="span">
                      <AddAPhoto />
                    </IconButton>
                  </label>
                </Tooltip>
              </Grid>
              <Grid item xs={12} style={{ marginTop: '4rem' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={next}
                  disabled={
                    !userValues.type ||
                    !userValues.phone ||
                    !userValues.birthday ||
                    !userValues.avatar
                  }
                >
                  <NavigateNext />
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grow>
      </MuiPickersUtilsProvider>
    </Container>
  )
}
