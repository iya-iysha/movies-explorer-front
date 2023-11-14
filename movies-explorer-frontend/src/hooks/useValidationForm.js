import { useState, useCallback } from "react";

export default function useValidationForm ({ formData, setFormData }) {
  const [errors, setErrors] = useState([])
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormData({
      ...formData,
      [name]: value
    })

    setErrors({...errors, [name]: e.target.validationMessage });
    setIsValid(e.target.closest("form").checkValidity());
  }

  const resetValidation = useCallback(() => {
    setErrors([]);
    setIsValid(false);
  }, [])

  return { errors, isValid, handleChange, resetValidation, setIsValid }
}