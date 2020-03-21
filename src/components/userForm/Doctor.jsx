import React, { useState, useContext } from 'react'
import { FirebaseContext } from '../../firebase/context'

import {
  Container,
  Paper,
  Grid,
  FormControl,
  TextField,
  Button,
} from '@material-ui/core'
import {
  NavigateNext,
  NavigateBefore,
  Add,
  Delete,
  CloudUpload,
} from '@material-ui/icons'
import { formStyles, RedButton } from '../material/Material.config'

export default function Doctor({ nextStep, prevStep, user, setUser, uid }) {
  const { firebase } = useContext(FirebaseContext)
  const [features, setFeature] = useState(user.features)
  const classes = formStyles()
  const next = e => {
    e.preventDefault()
    nextStep()
    setUser({
      ...user,
      features,
    })

    console.log(user.cv)
  }
  const back = e => {
    e.preventDefault()
    prevStep()
    setUser({
      ...user,
      features,
    })
  }

  const fileSelectedHandler = e => {
    setUser({
      ...user,
      cv: e.target.files[0],
    })
  }

  const handleFeatureChange = idx => e => {
    const newFeature = features.map((feature, index) => {
      if (idx !== index) return feature
      return {
        ...feature,
        name: e.target.value,
      }
    })
    setFeature(newFeature)
  }
  const addFeature = () => {
    setFeature([...features, ''])
  }
  const deleteFeature = idx => () => {
    setFeature(features.filter((feature, index) => idx !== index))
  }

  return (
    <Container maxWidth="xs" style={{ marginTop: '7rem' }}>
      <Paper style={{ padding: '1rem' }}>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item xs={12}>
            <h2 style={{ color: '#163a5f' }}>
              Añade tu experiencia profesional
            </h2>
          </Grid>
          {features.map((feature, idx) => {
            return (
              <Paper style={{ padding: '1rem' }} variant="outlined" key={idx}>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs={10}>
                    <FormControl className={classes.formControl}>
                      <TextField
                        required
                        variant="outlined"
                        id="standard-basic"
                        label="Escribe un logro destacado"
                        value={feature.name}
                        onChange={handleFeatureChange(idx)}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={2}>
                    <RedButton variant="contained" onClick={deleteFeature(idx)}>
                      <Delete />
                    </RedButton>
                  </Grid>
                </Grid>
              </Paper>
            )
          })}
          <Grid item xs={12} style={{ marginTop: '2rem' }} onClick={addFeature}>
            <Button variant="outlined" color="primary">
              <Add />
            </Button>
          </Grid>
          <Grid item xs={12} style={{ marginTop: '2rem' }}>
            <input
              accept="application/pdf"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
              onChange={fileSelectedHandler}
            />
            <label htmlFor="contained-button-file">
              <Button
                variant="contained"
                color="secondary"
                component="span"
                startIcon={<CloudUpload />}
              >
                CV
              </Button>
            </label>
          </Grid>
          <Grid item xs={12} style={{ marginTop: '2rem' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={back}
              style={{ marginRight: '1rem' }}
            >
              <NavigateBefore />
            </Button>
            <Button variant="contained" color="primary" onClick={next}>
              <NavigateNext />
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}
