import { Fragment, useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

const DropDownRating = ({setRated, rated}) => {

    const ratings = [1,2,3,4,5]

    

    useEffect(()=>{
        console.log(rated)

    },[rated])

  return (
    <Menu as="div" className="relative inline-block text-left w-full my-5">
    <div >
      <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none">
        { rated ? <span>{rated}</span> : <span>How do you rate the experience out of 5?</span> }
          
        {/* <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" /> */}
      </Menu.Button>
    </div>

    <div className='flex flex-row m-3 justify-between'> 
    {ratings.map((rating, index)=> {
        return (
            <div key={index} onClick={() => setRated(rating)} className="flex items-center mr-2">
                <input id="green-radio" type="radio" value="" name="colored-radio" className="w-8 h-8 accent-green-600 bg-green-600     "/>
                <label htmlFor="green-radio" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{rating}</label>
            </div>

        )
    })}

    </div>


  </Menu>
  )
}

export default DropDownRating