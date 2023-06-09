import React from 'react'
import { useState } from 'react'

const FormInput = (props) => {
    const [focused, setFocused] = useState(false)
    const {label,errorMessage, onChange, id, ...inputProps } = props
    const handleFocus = (e)=> {
        setFocused(true)
    }

  return (

    <div>
        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
         {label}
        </label>
        <div className="mt-2">
            <input
                { ...inputProps }
                onChange={onChange}
                className="peer block w-full rounded-md border px-3 py-2 text-gray-900 shadow  ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:outline-none focus:ring-[#9bd58b] sm:text-sm sm:leading-6"
                onBlur={handleFocus}
                focused={focused.toString()}
                
            />
            <span   className={ ` hidden peer-valid:hidden  ${focused && "peer-invalid:block"} text-xs text-red-600` }>{errorMessage}</span>
        </div>

    </div>
  )
}

export default FormInput