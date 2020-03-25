import React, { useState } from 'react'
import {
  Container,
  Paper,
  Grid,
  FormControl,
  TextField,
  Button,
  Grow,
} from '@material-ui/core'
import {
  NavigateNext,
  NavigateBefore,
  Add,
  Delete,
  CloudUpload,
} from '@material-ui/icons'
import { formStyles, RedButton } from '../material/Material.config'

export default function Doctor({ nextStep, prevStep, user, setUser }) {
  const [features, setFeature] = useState(user.features)
  const classes = formStyles()
  const next = e => {
    e.preventDefault()
    nextStep()
    setUser({
      ...user,
      features,
    })
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
                          label="Escribe un logro"
                          value={feature.name}
                          onChange={handleFeatureChange(idx)}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                      <RedButton
                        aria-label="delete"
                        onClick={deleteFeature(idx)}
                      >
                        <Delete />
                      </RedButton>
                    </Grid>
                  </Grid>
                </Paper>
              )
            })}
            <Grid
              item
              xs={12}
              style={{ marginTop: '2rem' }}
              onClick={addFeature}
            >
              <Button variant="outlined" color="primary">
                <Add />
              </Button>
            </Grid>
            <Grid item xs={12} style={{ marginTop: '2rem' }}>
              <input
                accept="application/pdf"
                className={classes.input}
                id="contained-button-file"
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
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={next}
                disabled={features.length === 0 || !user.cv}
              >
                <NavigateNext />
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grow>
    </Container>
  )
}
