import { useState, useEffect } from 'react'

export default function useFormValidator(initialState, validate, fn) {
  const [values, setValues] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [submitForm, setSubmitForm] = useState(false)

  useEffect(() => {
    if (submitForm) {
      if (Object.keys(errors).length === 0) fn()
      setSubmitForm(false)
    }
  }, [errors])

  const handleChange = e => {
    if (e.target) {
      setValues({
        ...values,
        [e.target.name]: e.target.value,
      })
    } else {
      setValues({
        ...values,
        birthday: new Date(e),
      })
    }
  }

  // Function that is executed when the user submits a form
  const handleSubmit = () => {
    // e.preventDefault()
    const validationErrors = validate(values)
    setErrors(validationErrors)
    setSubmitForm(true)
  }

  return {
    values,
    errors,
    setValues,
    handleSubmit,
    handleChange,
  }
}
