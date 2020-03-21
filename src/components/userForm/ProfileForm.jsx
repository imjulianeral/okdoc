import React, { useState, useContext } from 'react'
import { FirebaseContext } from '../../firebase/context'
import useAuth from '../../hooks/useAuth'

import AccountType from './AccountType'
import Children from './Children'
import Doctor from './Doctor'
import Summary from './Summary'
import Success from './Success'

export default function ProfileForm() {
  const { firebase } = useContext(FirebaseContext)
  const authUser = useAuth()
  const [user, setUser] = useState({
    birthday: new Date(),
    children: [],
    createdAt: new Date(),
    features: [],
    type: '',
    status: 'PENDIENTE',
    city: 'Aguascalientes',
    // available: '',
    stars: '',
    cv: '',
    phone: '',
  })

  const [formStep, setFormStep] = useState(1)

  const nextStep = () => {
    setFormStep(formStep + 1)
  }

  const prevStep = () => {
    setFormStep(formStep - 1)
  }

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  }

  const createProfile = async () => {
    if (user.type === 'Paciente') {
      const { cv, features, children, ...userProfile } = user
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
        await firebase
          .firestore()
          .collection(`children`)
          .add(boysAssigned[i])
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

    if (user.type === 'Doctor' && typeof user.cv !== 'undefined') {
      const { children, cv, ...userProfile } = user
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

  switch (formStep) {
    case 1:
      return (
        <AccountType
          nextStep={nextStep}
          handleChange={handleChange}
          user={user}
          setUser={setUser}
        />
      )
    case 2:
      return (
        <>
          {user.type === 'Paciente' ? (
            <Children
              nextStep={nextStep}
              prevStep={prevStep}
              handleChange={handleChange}
              user={user}
              setUser={setUser}
            />
          ) : (
            <Doctor
              nextStep={nextStep}
              prevStep={prevStep}
              handleChange={handleChange}
              user={user}
              setUser={setUser}
            />
          )}
        </>
      )
    case 3:
      return <Summary nextStep={nextStep} prevStep={prevStep} user={user} />
    case 4:
      return <Success createProfile={createProfile} />

    default:
      break
  }
}
