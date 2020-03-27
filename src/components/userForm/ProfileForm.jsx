import React, { useState, useContext, useEffect } from 'react'
import { FirebaseContext } from '../../firebase/context'
import useProfile from '../../hooks/useProfile'
import useFormValidator from '../../hooks/useFormValidator'
import validateCreateAccount from '../../validation/validateCreateAccount'

import AccountType from './AccountType'
import Children from './Children'
import Doctor from './Doctor'
import Summary from './Summary'
import Success from './Success'

export default function ProfileForm() {
  const { firebase } = useContext(FirebaseContext)
  const [formStep, setFormStep] = useState(1)
  const [authUser, setAuthUser] = useState({})
  const { userRecord, children, isLoading } = useProfile()
  const initialState = {
    birthday: new Date(),
    children: [],
    createdAt: new Date(),
    features: [],
    type: '',
    status: 'PENDIENTE',
    city: 'Aguascalientes',
    avatar: '',
    stars: '',
    cv: '',
    phone: '',
    name: '',
  }
  const {
    errors,
    values,
    setValues,
    handleChange,
    handleSubmit,
  } = useFormValidator(initialState, validateCreateAccount, createProfile)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setAuthUser(user)
      } else {
        setAuthUser(null)
      }
    })

    if (userRecord) setValues(userRecord)
  }, [firebase, userRecord])

  const nextStep = () => {
    setFormStep(formStep + 1)
  }

  const prevStep = () => {
    setFormStep(formStep - 1)
  }

  async function createProfile() {
    values.name = values.name ? values.name : authUser.displayName
    values.email = authUser.email
    await authUser.updateProfile({
      photoURL: values.avatar,
    })

    if (values.type === 'Paciente') {
      const { cv, features, children, ...userProfile } = values
      await firebase
        .firestore()
        .doc(`users/${authUser.uid}`)
        .set(userProfile)

      const parent = await firebase.firestore().doc(`/users/${authUser.uid}`)
      const boysAssigned = children.map(child => {
        return {
          ...child,
          parent,
        }
      })

      for (let i = 0; i < boysAssigned.length; i++) {
        if (!boysAssigned[i].id) {
          await firebase
            .firestore()
            .collection(`children`)
            .add(boysAssigned[i])
        }
      }

      const parentChildren = await firebase
        .firestore()
        .collection('children')
        .where('parent', '==', parent)
        .get()

      const boys = []
      parentChildren.docs.forEach(async child => {
        boys.push(firebase.firestore().doc(`/children/${child.id}`))
        await parent.update({
          children: boys,
        })
      })
    }

    if (values.type === 'Doctor') {
      const { children, cv, ...userProfile } = values
      const doctor = await firebase.firestore().doc(`/users/${authUser.uid}`)
      const userData = await doctor.get()

      console.log(userData.data())

      if (typeof userData.data() !== 'undefined') {
        await doctor.update({
          ...userProfile,
        })
        await firebase
          .storage()
          .ref()
          .child(`doctors/${authUser.uid}`)
          .put(cv)
      } else {
        await firebase
          .firestore()
          .doc(`users/${authUser.uid}`)
          .set(userProfile)
        await firebase
          .storage()
          .ref()
          .child(`doctors/${authUser.uid}`)
          .put(cv)
      }
    }
  }

  switch (formStep) {
    case 1:
      return (
        <AccountType
          nextStep={nextStep}
          handleChange={handleChange}
          user={values}
          setUser={setValues}
          isLoading={isLoading}
          userRecord={userRecord}
        />
      )
    case 2:
      return (
        <>
          {values.type === 'Paciente' ? (
            <Children
              nextStep={nextStep}
              prevStep={prevStep}
              handleChange={handleChange}
              user={values}
              setUser={setValues}
              boys={children}
            />
          ) : (
            <Doctor
              nextStep={nextStep}
              prevStep={prevStep}
              handleChange={handleChange}
              user={values}
              setUser={setValues}
            />
          )}
        </>
      )
    case 3:
      return (
        <Summary
          handleSubmit={handleSubmit}
          nextStep={nextStep}
          prevStep={prevStep}
          user={values}
          userRecord={userRecord}
          authUser={authUser}
        />
      )
    case 4:
      return <Success errors={errors} prevStep={prevStep} />

    default:
      break
  }
}
