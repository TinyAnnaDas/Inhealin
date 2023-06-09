import React, { useEffect, useState } from 'react'

import {v4 as uuidv4} from "uuid"
import { useNavigate } from 'react-router-dom';
import ResumePdf from '../TherapistSignup/ResumePdf';

import axios from "../../Utils/axios"

import {retrievePreSignedUrl} from "../../Utils/constants"
import { isEqual } from 'lodash';


 const pdfMimeType = /application\/pdf/i

const FormInputTherapist2 = ({handleChange,changeHandlerResume, details, handleDelete, handleLanguage, languages}) => {

    const navigate = useNavigate()




    // const [file, setFile] = useState(null);
    // const [pdfUrl, setPdfUrl]=useState("")
    // const [preSignedUrl, setPreSignedUrl] = useState(null)
    


    // let preSignedUrl

    // const changeHandler = async (e) => {
    //     try {
    //       const file = e.target.files[0];
    //       if (!file.type.match(pdfMimeType)) {
    //         alert("Image mime type is not valid");
    //         return;
    //       }
    //       setFile(file);
    //       handleChange('resume')(e)
      
    //       const response = await axios.get(retrievePreSignedUrl);
    //       console.log(response.data);
    //       const preSignedUrl = response.data; // Ensure preSignedUrl is properly set
      
    //       const body = new FormData();
    //       body.append("file", file);
      
    //       await axios.put(preSignedUrl, body, {
    //         headers: { "Content-Type": "multipart/form-data" },
    //       });
      
    //       const url = preSignedUrl.split("?")[0];
    //       console.log(url);
    //       setPdfUrl(url)
    //       handleChange('resume')
          
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   };

    //   const handlePreviewClick = () => {
    //       const pdffileURL = URL.createObjectURL(file);
    //       window.open(`/therapist/get-onboard/questions/pdf-review?file=${encodeURIComponent(pdffileURL)}`);
       
    //   };
      

    // const changeHandler = async (e) => {
    //     try{
    //         const file = e.target.files[0];
    //         if (!file.type.match(pdfMimeType)) {
    //             alert("Image mime type is not valid");
    //             return;
    //           }
    //           setFile(file);

    //         await axios.get(retrievePreSignedUrl)
    //         .then((response)=> {

    //                 setPreSignedUrl(response.data)
                    
    //         })
            


    //          const body=file

    //         // await fetch(preSignedUrl, {
    //         //     method:"PUT",
    //         //     headers: {"Content-Type" : "multipart/form-data"},
    //         //     body:file
    //         // })

    //         // const imgUrl = preSignedUrl.split("?")[0]
    //         // console.log(imgUrl)

    //         await axios.put(preSignedUrl, body, {
    //             headers: {"Content-Type" : "multipart/form-data"}
    //         })
    //         .then((response)=>{
    //             console.log(response)
    //             const imgUrl = preSignedUrl.split("?")[0]
    //             console.log(imgUrl)
                
    //         }).catch((err)=>console.log(err))
            

            

            

    //     }catch{
    //         return
    //     }
    
        
    //   }

    //   useEffect(()=>{
    //     console.log(preSignedUrl)
    //   }, [preSignedUrl])

    //   useEffect(() => {
    //     let fileReader, isCancel = false;
    //     if (file) {
    //       fileReader = new FileReader();

    //       fileReader.onload = (e) => {
    //         const { result } = e.target;
    //         if (result && !isCancel) {
    //           setFileDataURL(result)
    //         }
    //       }
    //       fileReader.readAsDataURL(file);
    //     }
    //     return () => {
    //       isCancel = true;
    //       if (fileReader && fileReader.readyState === 1) {
    //         fileReader.abort();
    //       }
    //     }
    
    //   }, [file]);




    

    useEffect(()=>{
        console.log(languages)
        

    },[languages])



    const inputs = [
        {
          id:1,
          name:"fluency",
          label:"How would you rate your fluency in English and other languages ",
          values: ["English","Malayalam", "Hindi", "Tamil", "Kannada", "Telugu", "Gujarati","Marathi"]
         
        },
        {
          id:2,
          name:"videoCallInfrastructure",
          label:"Do you have the required infrastructure for a video call?",
          values: [" Device(laptop/smartphone/desktop with webcam)"," High speed Internet", "Transgen Conducive environment(quiet personal spot)"]
    
        },
        {
          id:3,
          name:"chat2to3TimesADay",
          label:"Are you comfortable checking and responding to chat messages and email 2-3 times a day apart from your scheduled calls?",
          values: ["Yes","No"]
        },
        {
          id:4,
          name:"sessionPreferredTime",
          label:"What is your preferred time for a session?",
          values: ["7 AM -11 AM","11 AM - 3 PM", "3 PM - 7 PM", "7 PM - 3 AM", "11 PM - 3 AM", "3 AM - 7 AM"]
        },
     
       
        
      ]

     

    

  return (

    <div className="flex justify-center">
        <div className='flex flex-col w-9/12'>
        
        {
            inputs.map((input)=>
            (<div key={input.id} className="w-full  px-4 mb-10">
                <div className="flex w-full flex-col gap-2">

                    <label htmlFor="countries" className="block  text-md font-medium text-gray-900">{input.label}</label>

                    {input.id===2 ?
                    <div>

                        {input.values.map((data, index) => {
                                return (
                                    
                                    <div key={index} className="flex items-center">
                                    <input checked={details[input.name].includes(data)} type="checkbox"  data-label={data}  onChange={handleChange(input.name)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "/>
                                    <label htmlFor="checked-checkbox" className="ml-2 text-sm font-medium text-gray-900 ">{data}</label>
                                </div>
                                )
                            })}
                    </div>
                            
                    :


                    <select  
                        value={Array.isArray (details[input.name]) ? details[input.name][details[input.name].length - 1] : details[input.name] } 
                        onChange={input.id !== 1 ?  handleChange(input.name):  handleLanguage }
                        className="shadow border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-inset  focus:ring-[#9bd58b] block w-full p-2.5">

                        <option defaultValue="" ></option>
                    
                        {input.values.map((data) => {
                            return (                          
                            <option key={uuidv4()} value={data} >{data}</option>
                            )
                        })}
                    </select>


                   
                    
                    }   

                    {input.id===1&&<div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                    Language
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Native
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Fluent 
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Average
                                    </th>
                                </tr>
                            </thead>
                    
                            {languages && 
                            (<tbody key={uuidv4()}>
                        
                            
                            
                                {languages.map((language, index)=>{

                                    // const parsedData = JSON.parse(language)

                                    return (
                                        < >
                                              
                                            {/* {Object.entries(parsedData).map(([key, value]) => (
                                                <dd key={key} className="text-sm font-semibold">
                                                {key} -  {value}
                                                </dd>
                                            ))} */}

                                          
                                            <tr key={index} className="bg-white border-b  ">
                                                
                                                    {/* { console.log( array.some(obj => isEqual(obj, objectToFind) ) } */}
                                                    {/* {console.log(details[input.name][index][language]==="Native") } */}
                                                    {/* { details[input.name][index] ? console.log(details[input.name][index][language]) : console.log("tiny") } */}
                                                    {/* {console.log(typeof(details[input.name][0][language])) } */}
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                                    {language}
                                                </th>
                                                <td className="px-6 py-4">
                                                    <input checked={details[input.name][index] ? details[input.name][index][language] ==='Native' : ""}  data-label = {`{"${language}": "Native"}`} onChange={handleChange(input.name)} type="radio" name={`${language}-"Native"`} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"/>

                                                </td>
                                                <td className="px-6 py-4">
                                                    <input checked={details[input.name][index] ? details[input.name][index][language]==='Fluent' : ""} data-label = {`{"${language}": "Fluent"}`} onChange={handleChange(input.name)} type="radio" name={`${language}-"Fluent"`} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"/>

                                                </td>
                                                <td className="px-6 py-4">
                                                    <input checked={details[input.name][index] ? details[input.name][index][language]==="Average" : ""} data-label = {`{"${language}": "Average"}`} onChange={handleChange(input.name)}  type="radio" name={`${language}-"Average"`} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"/>

                                                </td>

                                            </tr>
                                         
                                        
                                        </>
                                    )

                                })}
                            
                        
                            </tbody>)
                            }
                        
                        </table>
                    </div>
                    }

                    
                    {/* <div class="flex">
                        <div class="flex items-center mr-4">
                            <input id="inline-radio" type="radio" value="" name="inline-radio-group" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                            <label for="inline-radio" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Inline 1</label>
                        </div>
                        <div class="flex items-center mr-4">
                            <input id="inline-2-radio" type="radio" value="" name="inline-radio-group" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                            <label for="inline-2-radio" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Inline 2</label>
                        </div>
                        <div class="flex items-center mr-4">
                            <input checked id="inline-checked-radio" type="radio" value="" name="inline-radio-group" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                            <label for="inline-checked-radio" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Inline checked</label>
                        </div>
                        <div class="flex items-center">
                            <input disabled id="inline-disabled-radio" type="radio" value="" name="inline-radio-group" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                            <label for="inline-disabled-radio" class="ml-2 text-sm font-medium text-gray-400 dark:text-gray-500">Inline disabled</label>
                        </div>
                    </div> */}


                </div>
            </div>

            ))
            
        }

           
            <div className="w-full lg:w-12/12 px-4 mb-10">
                <div className="relative w-full mb-3">
                    <label htmlFor="countries" className="block mb-2 text-md font-medium text-gray-900 ">Upload your resume</label>
                    {console.log(details['resume'].name)}
                    <input   type="file" onChange={changeHandlerResume} accept=".pdf"
                   
                    className='shadow border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-inset  focus:ring-[#9bd58b] block w-full p-2.5'
                    />
                    <br/>
                    <label className='text-sm'>Selected File - {details['resume'] && details['resume'].name}</label>
                </div>
      
            </div>



        </div>
    </div>

  )
}

export default FormInputTherapist2