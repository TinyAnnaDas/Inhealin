import React from 'react'

function SignupConfirmationDetails({details, resumeFile}) {

    const handlePreviewClick = () => {
        const pdfFileUrl = URL.createObjectURL(resumeFile);
        window.open(`/therapist/get-onboard/questions/pdf-review?file=${encodeURIComponent(pdfFileUrl)}`);
     
    };

  return (
    <div className="flex justify-center">
      <dl class="w-3/5 text-gray-900 divide-y divide-gray-200  ">
        <div className='flex flex-row justify-between'>
            <div class="flex flex-col py-3 ">
                <dt class="mb-1 text-gray-500 md:text-lg">Name</dt>
                <dd class="text-sm font-semibold">{details.name}</dd>
            </div>

            <div class="flex flex-col py-3">
                <dt class="mb-1 text-gray-500 md:text-lg">Email address</dt>
                <dd class="text-sm font-semibold">{details.email}</dd>
            </div>

        </div>
         
         
        <div class="flex flex-col pt-3">
            <dt class="mb-1 text-gray-500 md:text-lg ">Phone number</dt>
            <dd class="text-sm font-semibold">{details.phone}</dd>
        </div>

        <div className='flex flex-row justify-between'>
            <div class="flex flex-col py-3 ">
                <dt class="mb-1 text-gray-500 md:text-lg">How old are you ?</dt>
                <dd class="text-sm font-semibold">{details.age}</dd>
            </div>

            <div class="flex flex-col py-3">
                <dt class="mb-1 text-gray-500 md:text-lg">What is your gender ?</dt>
                <dd class="text-sm font-semibold">{details.gender}</dd>
            </div>

        </div>



        <div class="flex flex-col pt-5 ">
          <dt class="mb-1 text-gray-500 md:text-lg ">What is your most relevant qualification for this job ?</dt>
          <dd class="text-sm font-semibold">{details.qualification}</dd>
        </div>

        <div class="flex flex-col pt-5">
          <dt class="mb-1 text-gray-500 md:text-lg ">How much actual counselling work experience do you have ?</dt>
          <dd class="text-sm font-semibold">{details.experience}</dd>
        </div>


          <div class="flex flex-col pt-5">
              <dt class="mb-1 text-gray-500 md:text-lg ">How many hours can you commit to counselling on Felicity per week ?</dt>
              <dd class="text-sm font-semibold">{details.hoursPerWeek}</dd>
          </div>
          <div class="flex flex-col pt-5">
              <dt class="mb-1 text-gray-500 md:text-lg ">Are there any specific areas that you specialise in ?</dt>
              {details.specialization.map((data, index)=>
                <dd key={index} class="text-sm font-semibold">{data}</dd>
              )}
              
              
          </div>
     
          <div class="flex flex-col pt-5">
              <dt class="mb-1 text-gray-500 md:text-lg ">What therapy techniques are you experienced in ?</dt>
              {details.technique.map((data, index)=>
                <dd key={index} class="text-sm font-semibold">{data}</dd>
              )}
              
          </div>
          <div class="flex flex-col pt-5">
              <dt class="mb-1 text-gray-500 md:text-lg ">Describe Yourself</dt>
              <dd class="text-sm font-semibold">{details.describeYourSelf}</dd>
          </div>
          <div class="flex flex-col pt-5">
              <dt class="mb-1 text-gray-500 md:text-lg ">How would you rate your fluency in English and other languages</dt>
              {details.fluency.map((data, index)=>{
                // const parsedData = JSON.parse(data)
                // console.log(parsedData)

                // {console.log(Object.entries(parsedData))}
                return (
                    <div key={index}>
                       
                      {Object.entries(data).map(([key, value]) => (
                        <dd key={key} className="text-sm font-semibold">
                          {key} -  {value}
                        </dd>
                      ))}
                    </div>
                  );

              })}
          </div>
          <div class="flex flex-col pt-5">
              <dt class="mb-1 text-gray-500 md:text-lg ">Do you have the required infrastructure for a video call?</dt>
              {details.videoCallInfrastructure.map((data, index)=>
               <dd key={index} class="text-sm font-semibold">{data}</dd>
              )}
             
          </div>
          <div class="flex flex-col pt-5">
              <dt class="mb-1 text-gray-500 md:text-lg ">Are you comfortable checking and responding to chat messages and email 2-3 times a day apart from your scheduled calls?</dt>
              <dd class="text-sm font-semibold">{details.chat2to3TimesADay}</dd>
          </div>
          <div class="flex flex-col pt-5">
              <dt class="mb-1 text-gray-500 md:text-lg ">What is your preferred time for a session?</dt>
              <dd class="text-sm font-semibold">{details.sessionPreferredTime}</dd>
          </div>
          <div class="flex flex-col pt-5">
              <dt class="mb-1 text-gray-500 md:text-lg ">Your Resume</dt>
              <dd class="text-sm font-semibold underline cursor-pointer text-blue-600" onClick={handlePreviewClick}>View Your Uploaded Resume</dd>
          </div>
      </dl>
    </div>
  )
}

export default SignupConfirmationDetails