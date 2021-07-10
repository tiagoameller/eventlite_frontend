import React from "react"

const FormErrors = (props) =>
  <div>
    <ul>
      {Object.keys(props.formErrors).map((formErrorField) => {
        if(Array.isArray(props.formErrors[formErrorField])) {
          return (
            props.formErrors[formErrorField].map((error) => {
              return (
                <li key={formErrorField}>{formErrorField} {error}</li>
              )
            })
          )
        } else {
          return (
            <li key={0}>{props.formErrors[formErrorField]}</li>
          )
        }
      })}
    </ul>
  </div>

export default FormErrors
