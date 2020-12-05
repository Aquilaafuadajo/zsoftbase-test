import React, {useState} from 'react'

export const InputField = ({label, textArea, onChange, value, ...props}) => {

  return (
    <div className='input-section'>
      <label htmlFor={label}>{`Your ${label}`}</label>
      {
        textArea?
        <textarea {...props} onChange={onChange} className='text text-area' name={label} cols="30" rows="10"></textarea>
        :
        <input {...props} className='text input' name={label} type="text" onChange={onChange} value={value}/>
      }
    </div>
  )
}