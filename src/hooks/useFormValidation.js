import { useState, useCallback } from 'react'

export const useFormValidation = () => {
  const [errors, setErrors] = useState({})

  const validateField = useCallback((fieldName, value, rules = {}) => {
    let error = ''
    
    // Required field validation
    if (rules.required && (!value || value.trim() === '')) {
      error = 'This field is required'
    }
    
    // Email validation
    else if (fieldName === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        error = 'Please enter a valid email address'
      }
    }
    
    // Phone validation
    else if (fieldName === 'phone' && value && value.trim() !== '') {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
      const cleanPhone = value.replace(/[\s\-\(\)]/g, '')
      if (!phoneRegex.test(cleanPhone)) {
        error = 'Please enter a valid phone number'
      }
    }
    
    // Custom validation
    if (rules.custom && typeof rules.custom === 'function') {
      const customError = rules.custom(value)
      if (customError) error = customError
    }

    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }))

    return !error
  }, [])

  const validateForm = useCallback((formData, requiredFields = []) => {
    const newErrors = {}
    let isValid = true

    // Check required fields
    requiredFields.forEach(fieldName => {
      const value = formData[fieldName]
      if (!value || value.trim() === '') {
        newErrors[fieldName] = 'This field is required'
        isValid = false
      }
    })

    // Email validation
    if (formData.email && !isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
      isValid = false
    }

    // Phone validation (if provided)
    if (formData.phone && formData.phone.trim() !== '' && !isValidPhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
      isValid = false
    }

    setErrors(newErrors)
    return { isValid, errors: newErrors }
  }, [])

  const clearErrors = useCallback(() => {
    setErrors({})
  }, [])

  const clearFieldError = useCallback((fieldName) => {
    setErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors[fieldName]
      return newErrors
    })
  }, [])

  return {
    errors,
    validateField,
    validateForm,
    clearErrors,
    clearFieldError
  }
}

// Helper functions
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const isValidPhone = (phone) => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '')
  return phoneRegex.test(cleanPhone)
}