import React, { useState } from 'react'
import AccountType from './AccountType'

export default function ProfileForm() {
  const [user, setUser] = useState({
    birthday: '',
    children: [],
    createdAt: '',
    medicalHistory: [],
    type: '',
    status: 'PENDIENTE',
    city: 'Aguascalientes',
    available: '',
    stars: '',
    cv: [],
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

  switch (formStep) {
    case 1:
      return (
        <AccountType
          nextStep={nextStep}
          handleChange={handleChange}
          user={user}
        />
      )
    case 2:
      return <h2>Children Form</h2>
    case 3:
      return <h2>Confirm</h2>
    case 4:
      return <h2>Success</h2>

    default:
      break
  }
}
