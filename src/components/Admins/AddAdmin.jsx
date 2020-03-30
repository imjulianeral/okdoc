import React, { useContext } from 'react'
import { navigate } from 'gatsby'
import {
  Container,
  Paper,
  Grid,
  FormControl,
  FormHelperText,
  TextField,
  Grow,
  Button,
  IconButton,
  Tooltip,
} from '@material-ui/core'
import { PersonAdd, AddAPhoto } from '@material-ui/icons'
import { formStyles } from '../material/Material.config'

import { FirebaseContext } from '../../firebase/context'

import useFormValidator from '../../hooks/useFormValidator'

import validateCreateAccount from '../../validation/validateCreateAccount'

import SEO from '../SEO'

export default function AddAdmin() {
  const { firebase } = useContext(FirebaseContext)
  const classes = formStyles()
  const initialState = {
    createdAt: new Date(),
    type: 'Admin',
    status: 'PENDIENTE',
    city: 'Aguascalientes',
    email: '',
    name: '',
    password: '',
  }

  const createProfile = async () => {
    const { cv, features, children, password, avatar, ...userProfile } = values
    const newAdmin = await firebase
      .auth()
      .createUserWithEmailAndPassword(values.email, values.password)

    await firebase
      .firestore()
      .doc(`/users/${newAdmin.user.uid}`)
      .set(userProfile)

    await firebase
      .storage()
      .ref()
      .child(`avatars/${newAdmin.user.uid}`)
      .put(avatar)

    const image = await firebase
      .storage()
      .ref(`avatars/${newAdmin.user.uid}`)
      .getDownloadURL()

    const admin = await firebase.firestore().doc(`/users/${newAdmin.user.uid}`)
    await admin.update({
      avatar: image,
    })

    await newAdmin.user.updateProfile({
      displayName: values.name,
      photoURL: image,
    })

    return firebase.auth().signOut()
  }

  const { values, setValues, handleChange, handleSubmit } = useFormValidator(
    initialState,
    validateCreateAccount,
    createProfile
  )

  const fileSelectedHandler = async e => {
    setValues({
      ...values,
      avatar: e.target.files[0],
    })
  }

  return (
    <Container
      maxWidth="xs"
      style={{ marginTop: '5rem', marginBottom: '5rem' }}
    >
      <SEO title="Crear Admin" />

      <Grow
        in={true}
        style={{ transformOrigin: '0 0 0' }}
        {...(true ? { timeout: 1000 } : {})}
      >
        <Paper variant="outlined">
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <h2 style={{ color: '#163a5f' }}>Crear nuevo Administrador</h2>

            <Grid item xs={12} lg={12}>
              <FormControl className={classes.formControl}>
                <TextField
                  required
                  variant="outlined"
                  name="name"
                  label="Nombre"
                  value={values.name}
                  onChange={handleChange}
                />
                <FormHelperText>
                  Escribe el nombre completo del nuevo Administrador
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} lg={12}>
              <FormControl className={classes.formControl}>
                <TextField
                  required
                  variant="outlined"
                  name="email"
                  label="Email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                />
                <FormHelperText>
                  Escribir correo electrónico del nuevo Administrador
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} lg={12}>
              <FormControl className={classes.formControl}>
                <TextField
                  required
                  variant="outlined"
                  name="password"
                  label="Contraseña"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                />
                <FormHelperText>
                  Escribir una contraseña segura de al menos 6 caracteres
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} lg={12}>
              <FormControl className={classes.formControl}>
                <TextField
                  required
                  variant="outlined"
                  name="phone"
                  label="Número celular"
                  value={values.phone}
                  onChange={handleChange}
                />
                <FormHelperText>
                  Escribir un número donde se pueda llamar al nuevo
                  Administrador
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={6} style={{ marginTop: '4rem' }}>
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
            <Grid item xs={12} lg={12} style={{ marginBottom: '1rem' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={
                  !values.name ||
                  !values.password ||
                  !values.email ||
                  !values.phone
                }
              >
                <PersonAdd />
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grow>
    </Container>
  )
}
