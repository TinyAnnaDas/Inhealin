
import React, { useEffect, useState } from 'react'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

import {v4 as uuidv4} from "uuid"

const FormInputTherapist1 = ({handleChange, details, handleDelete}) => {

  const numbers = []
  
   
  const [specialization, setSpecialization] = useState("")
  const [techniques, setTechniques] = useState()

  useEffect(()=> {
    console.log(specialization)
  }, [specialization])

    
  const handleSpecializationChange=(value)=>{
    setSpecialization(value);
  }
 

  const inputs = [
    {
      id:1,
      name:"age",
      label:"How old are you ?",
      values: Array.from({ length: 65 - 18 + 1 }, (_, index) => index + 18)
     
    },
    {
      id:2,
      name:"gender",
      label:"What is your gender ?",
      values: ["Male","Female", "Non-Binary", "Transgender", "Intersex", "Neutral", "I prefer not to say", "Others",]

    },
    {
      id:3,
      name:"qualification",
      label:"What is your most relevant qualification for this job ?",
      values: ["Bachelors in Pyschology","Masters in Psychology", "PHD in Psychology"]
    },
    {
      id:4,
      name:"experience",
      label:"How much actual counselling work experience do you have ?",
      values: ["0 year","Less than a year", "1-3 years", "3-6 years", "6-10 years", "10-15 years", "More than 15 years"]
    },
    {
      id:5,
      name:"hoursPerWeek",
      label:"How many hours can you commit to counselling on Felicity per week ?",
      values: ["Less than 9 hours","9-18 hours", "18-27 hours", "27-36 hours", "36-45 hours"]
    },
    {
      id:6,
      name:"specialization",
      label:"Are there any specific areas that you specialise in ?",
      values: ["Anxiety","Stress", "Depression", "Relationship Issues", "Adolescent Issues"]
    },
    {
      id:7,
      name:"technique",
      label:"What therapy techniques are you experienced in ?",
      values: ["Cognitive Behavioral Therapy","Client Centered", "Existential"]
    },
   
    
  ]



  return (
  
    <div className="flex justify-center">
      <div className='flex flex-col w-9/12'>
      
        {
          inputs.map((input)=>
          (<div key={input.id} className="w-full  px-4 mb-10">
              <div className="flex w-full flex-col gap-2">

                <label htmlFor="countries" className="block text-sm font-medium text-gray-900 ">{input.label}</label>
                  <select value={Array.isArray (details[input.name]) ? details[input.name][details[input.name].length - 1] : details[input.name] }  onChange={handleChange(input.name)} id="countries" className="shadow border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-inset  focus:ring-[#9bd58b] block w-full p-2.5 ">

                    <option defaultValue=""></option>
                        {input.values.map((data) => {

                          return (
                            
                            <option key={uuidv4()} value={data} >{data}</option>
                          )
                      })}
                  </select>


                  {(input.id===6 || input.id===7)&&
                  <table>      
                    {details[input.name].map((data, index)=>{
                      return (

                        <tr  className="bg-white " key={index}>
                          <td className="px-6 py-4">
                            <ControlPointIcon/>
                          </td>
                          <td className="px-6 py-4">
                              {data}
                          </td>
                          <td className="px-6 py-4">
                              <DeleteOutlineIcon onClick={() => handleDelete(input.name, index)}/>
                          </td>
                        </tr>

                      )
                    })}               
                   
                  </table>}

              </div>
            </div>


          ))

          
          
        }

    
          <div className="w-full lg:w-12/12 px-4 mb-10">
              <div className="relative w-full mb-3">
                  <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 ">Describe Yourself</label>
                  <textarea typeof='text' placeholder='Describe yourself in 40-50 words *'
                    onChange={handleChange('describeYourSelf')} 
                    className='shadow border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-inset  focus:ring-[#9bd58b] block w-full p-7'
                    />
              </div>
          </div>



      </div>

 

  

 
   

  </div>

 
  )
}

export default FormInputTherapist1


