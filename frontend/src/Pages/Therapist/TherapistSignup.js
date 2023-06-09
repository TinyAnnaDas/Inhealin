import React, { useState } from 'react'
import { useEffect } from 'react'
import Footer from '../../Components/Footer/Footer'
import Navbar from '../../Components/Navbar/Nabar'
import LoginDetails from '../../Components/TherapistSignup/LoginDetails'
import ProfessionalDetails1 from '../../Components/TherapistSignup/ProfessionalDetails1'
import ProfessionalDetails2 from '../../Components/TherapistSignup/ProfessionalDetails2'
import SignupSuccess from '../../Components/TherapistSignup/SignupSuccess'
import TherapistSignupConfirmation from './TherapistSignupConfirmation'

import axios from "../../Utils/axios"
import {retrievePreSignedUrl} from "../../Utils/constants"
const pdfMimeType = /application\/pdf/i

const TherapistSignup = () => {

    const [languages, setLanguages] = useState([])

    const [details, setDetails] = useState({
        step: 1,
        name: '',
        email: '', 
        phone: '',
        password: '',
        age: '',
        gender: '',
        qualification: '',
        experience: '',
        hoursPerWeek: '',
        specialization: [],
        technique: [],
        // therapyTechniques: '',
        describeYourSelf: '', 
        fluency: [], 
        videoCallInfrastructure: [], 

        chat2to3TimesADay: '',
        sessionPreferredTime: '',

        resume: ''
        
      })


    //   console.log(step)


    const prevStep = ()=>{
        const {step} = details
        setDetails({...details, step: step-1})
    }

    const nextStep = ()=> {
        const {step} = details
        setDetails({...details, step: step+1})
    }

    // const textFunction = ()=>{
    //    console.log("Tinuylksdgjsl;kgj;sdj")
    // }

    const [file, setFile] = useState(null);
    const [pdfUrl, setPdfUrl]=useState("")

    const changeHandlerResume = async (e) => {
        try {
          const file = e.target.files[0];
        //   console.log(file.name)
          if (!file.type.match(pdfMimeType)) {
            alert("Image mime type is not valid");
            return;
          }
          setFile(file);
          setDetails({...details, resume: file})
          
      
          const response = await axios.get(retrievePreSignedUrl);
          console.log(response.data);
          const preSignedUrl = response.data; // Ensure preSignedUrl is properly set
      
          const body = new FormData();
          body.append("file", file);
      
          await axios.put(preSignedUrl, body, {
            headers: { "Content-Type": "multipart/form-data" },
          });
      
          const url = preSignedUrl.split("?")[0];
          console.log(url);
          setPdfUrl(url)
          setDetails({...details, resume: url})
         
          
        } catch (error) {
          console.log(error);
        }
    };





    const handleChange = input => e => {
        console.log("slkjghsldglds;kjgsd;n")
        
        const { checked, type } = e.target;
        // console.log(value)
        // console.log(checked)
        // console.log(type)

        if (type === 'checkbox')  {

            if (checked){
                const label = e.target.getAttribute('data-label');
                console.log(e.target.checked)
                
                setDetails({ ...details, 
                    [input]: [...details[input],label]
                });

            

            }
            else{

                const label = e.target.getAttribute('data-label');

                setDetails({ ...details, 
                    [input]: details[input].filter(item => item !== label)
                });

              
            }
          
        }else if( type === 'radio') {
                const label = JSON.parse(e.target.getAttribute('data-label'));
                // console.log(typeof(label))
                const language = Object.keys(label)[0];
                // console.log(language)
                // console.log("tiny")
                // console.log(details[input])

                const updatedDetails = { ...details };
                const existingLabels = updatedDetails[input];

                const existingLabel = existingLabels.find(item => {
                //   const parsedItem = item;
                  return Object.keys(item)[0] === language;
                });
                
                if (existingLabel) {
                  existingLabels.splice(existingLabels.indexOf(existingLabel), 1);
                }
              
                // Add the new label
                updatedDetails[input].push(label);
              
                setDetails(updatedDetails);

                {console.log(updatedDetails[input].some(obj => obj.language)) }

                // setDetails({ ...details, [input]: [...details[input], label] });
        
        }else if(type === 'file'){
            const file = e.target.files[0];
            console.log(file)
            setDetails({...details, [input]: file})

        }else{
           
            
            if (Array.isArray(details[input])){
                setDetails({...details, 
                    [input]:[...details[input], e.target.value]
                });
            }else{
                console.log("hello....")
                setDetails({...details, [input]: e.target.value})
            }

        }
   // console.log(details[input])
        
       
    }



    const handleDelete = (input, dataIndex) => {
      
            setDetails({...details, [input]: details[input].filter((_, index) => index !== dataIndex)})
    }

   

    const handleLanguage = (e) => {
    //   console.log(e.target.value)
      if (!languages.includes(e.target.value)){
        setLanguages([...languages, e.target.value])

      }
      
  
    }

    

      const {step} =details 
    //   const { name, email, phone , password, age, gender, qualification, experience, hoursPerWeek, therapyTechniques, describeYourSelf} = details
    //   const values = { name, email, phone, password, age, gender, qualification, experience, hoursPerWeek, therapyTechniques, describeYourSelf}

      useEffect(()=>{

        console.log(details)

    }, [details])



  return (

    

    <div>
        <Navbar/>

        {
            (()=>{

                switch (step){
                    case 1:
                        return(

                            <div className="flex justify-center flex-wrap pt-40 pb-6">
                                <div>
                                    <LoginDetails 
                                    nextStep={nextStep}  
                                    handleChange={handleChange}
                                    details = {details}
                                    // values = {values}
                                    />
                                </div>
                            </div>

                        )
                    case 2:
                        return (

                            <div className="flex justify-center flex-wrap pt-10 pb-6">
                                <div className='w-full px-4'>
                                    <ProfessionalDetails1 
                                    prevStep={prevStep }
                                    nextStep={nextStep}  
                                    handleChange={handleChange}
                                    details = {details}
                                    handleDelete={handleDelete}
                                    />
                                </div>
                            </div>

                        )
                    case 3:
                        return (
                            <div className="flex justify-center flex-wrap pt-10 pb-6">
                                <div className='w-full px-4'>
                                    <ProfessionalDetails2
                                    prevStep={prevStep }
                                    nextStep={nextStep}  
                                    handleChange={handleChange}
                                    changeHandlerResume={changeHandlerResume}
                                    details = {details}
                                    handleDelete={handleDelete}
                                    handleLanguage={handleLanguage}
                                    languages={languages}
                                  
                                   
                                    />
                                </div>
                            </div>
                        )
                        
                    case 4:
                        return (
                            <div className="flex justify-center flex-wrap pt-40 pb-6">
                                <div className='w-full px-4'>
                                <TherapistSignupConfirmation 
                                    prevStep={prevStep }
                                    nextStep={nextStep}  
                                    handleChange={handleChange}
                                    resumeFile = {file}
                                    details = {details}
                                />
                                </div>
                            </div>
                        )

                    case 5:
                        return (
                            <div className="flex justify-center flex-wrap pt-40 pb-6">
                                <SignupSuccess details = {details} />
                            </div>
                        )
                    default: 
                    return 
                        


                }


            })()
        }
       
        <Footer/>
    </div>
  )
}

export default TherapistSignup