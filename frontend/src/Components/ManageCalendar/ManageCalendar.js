import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import {EllipsisVerticalIcon} from '@heroicons/react/24/outline'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { listCreateTherapistAvailability, retrieveTherapistAvailability } from '../../Utils/constants'
import axios from "../../Utils/axios"


import {
    add,
    eachDayOfInterval,
    endOfMonth,
    format,
    getDay,
    isEqual,
    isSameDay,
    isSameMonth,
    isToday,
    parse,
    parseISO,
    startOfToday,
  } from 'date-fns'
  import { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'


  const meetings = [
    {
      id: 1,
      name: 'Leslie Alexander',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      startDatetime: '2023-06-15T13:00',
      endDatetime: '2023-06-15T14:30',
    },
    {
      id: 2,
      name: 'Michael Foster',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      startDatetime: '2023-06-16T09:00',
      endDatetime: '2023-06-16T11:30',
    },
    {
      id: 3,
      name: 'Dries Vincent',
      imageUrl:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      startDatetime: '2023-06-17T17:00',
      endDatetime: '2023-06-17T18:30',
    },
    {
      id: 4,
      name: 'Leslie Alexander',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      startDatetime: '2023-06-18T13:00',
      endDatetime: '2023-06-18T14:30',
    },
    {
      id: 5,
      name: 'Michael Foster',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      startDatetime: '2022-05-13T14:00',
      endDatetime: '2022-05-13T14:30',
    },
  ]


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }



const ManageCalendar = () => {

    
    let [dateTime, setDateTime] = useState("")
    let [availableForThreapy, setAvailableForTherapy] = useState(false)

    let today = startOfToday()
    let [selectedDay, setSelectedDay] = useState(today)
    let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
    let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())
  
    let days = eachDayOfInterval({
      start: firstDayCurrentMonth,
      end: endOfMonth(firstDayCurrentMonth),
    })
  
    function previousMonth() {
      let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
      setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }
  
    function nextMonth() {
      let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
      setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }
  
    let selectedDayMeetings = meetings.filter((meeting) =>
      isSameDay(parseISO(meeting.startDatetime), selectedDay)
    )
    
    const therapist = useSelector(state=>state.therapistAuth.therapist)
    const authTokensTherapist = JSON.parse(localStorage.getItem('authTokensTherapist'))
    const access = authTokensTherapist.access

    useEffect(()=>{

    })

    let handleChange = (e) => {
        console.log(e.target.value)
        console.log(therapist.user_id)

        const dateString = e.target.value;

        const inputDate = new Date(dateString);

        // Step 2: Extract the individual date and time components
        const year = inputDate.getFullYear().toString().padStart(4, '0');
        const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
        const day = inputDate.getDate().toString().padStart(2, '0');
        const hours = inputDate.getHours().toString().padStart(2, '0');
        const minutes = inputDate.getMinutes().toString().padStart(2, '0');
        const seconds = inputDate.getSeconds().toString().padStart(2, '0');

        // Step 3: Create the formatted date string in the desired format
        const formattedDateString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

        console.log(formattedDateString)



        const body = new FormData()
        body.append('therapist', therapist.user_id)
        body.append('date_time', formattedDateString)


        axios.post(listCreateTherapistAvailability, body, {
            headers: { 
                "Authorization": `Bearer ${access}`,
                "Content-Type": "multipart/form-data"
            }
        })
        .then((response)=>{
            console.log(response.data)

            const dateTimeString = response.data.date_time;
            
            
            const dateTime = new Date(dateTimeString);

            const options = {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              };
              
              const formattedDateTime = dateTime.toLocaleString("en-US", options);
              console.log(formattedDateTime)
      
              setDateTime(formattedDateTime)
        })
        .catch((error)=> {
            console.log(error)
        })
    }

    useEffect(() => {
        const formattedSelectedDay = format(selectedDay, 'yyyy-MM-dd')
        // console.log(formattedSelectedDay)
        axios.get(`${retrieveTherapistAvailability}${formattedSelectedDay}/`, {
            headers: { 
                "Authorization": `Bearer ${access}`,
                "Content-Type": "multipart/form-data"
            }
        })
        .then((response)=>{
            console.log(response.data)

            if (response.data.date_time){
                const dateTimeString = response.data.date_time;
                const dateTime = new Date(dateTimeString);

                const options = {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                };
              
                const formattedDateTime = dateTime.toLocaleString("en-US", options);
                // console.log(formattedDateTime)
        
                setDateTime(formattedDateTime)
                setAvailableForTherapy(true)

            }else{
                setDateTime('')
                setAvailableForTherapy(false)
            }
            

              


        })
        .catch((error)=> console.log(error))

    },[selectedDay])


    // useEffect(()=> {
    //     console.log(dateTime)

    // }, [dateTime])

  return (
    <div className="relative bg-lightBlue-600  ">
        <div className="px-4 md:px-10 mx-auto w-full">
            <div className=" w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8">


                    <div className="pt-16">
                        <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6">
                            <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
                            <div className="md:pr-14">
                                <div className="flex items-center">
                                <h2 className="flex-auto font-semibold text-gray-900">
                                    {format(firstDayCurrentMonth, 'MMMM yyyy')}
                                </h2>
                                <button
                                    type="button"
                                    onClick={previousMonth}
                                    className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                                >
                                    <span className="sr-only">Previous month</span>
                                    <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
                                </button>
                                <button
                                    onClick={nextMonth}
                                    type="button"
                                    className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                                >
                                    <span className="sr-only">Next month</span>
                                    <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
                                </button>
                                </div>
                                <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
                                <div>S</div>
                                <div>M</div>
                                <div>T</div>
                                <div>W</div>
                                <div>T</div>
                                <div>F</div>
                                <div>S</div>
                                </div>
                                <div className="grid grid-cols-7 mt-2 text-sm">
                                {days.map((day, dayIdx) => (
                                    <div
                                    key={day.toString()}
                                    className={classNames(
                                        dayIdx === 0 && colStartClasses[getDay(day)],
                                        'py-1.5'
                                    )}
                                    >
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSelectedDay(day)
                                            // fetchAvailability()
                                        }}
                                        className={classNames(
                                        isEqual(day, selectedDay) && 'text-white',
                                        !isEqual(day, selectedDay) &&
                                            isToday(day) &&
                                            'text-red-500',
                                        !isEqual(day, selectedDay) &&
                                            !isToday(day) &&
                                            isSameMonth(day, firstDayCurrentMonth) &&
                                            'text-gray-900',
                                        !isEqual(day, selectedDay) &&
                                            !isToday(day) &&
                                            !isSameMonth(day, firstDayCurrentMonth) &&
                                            'text-gray-400',
                                        isEqual(day, selectedDay) && isToday(day) && 'bg-red-500',
                                        isEqual(day, selectedDay) &&
                                            !isToday(day) &&
                                            'bg-gray-900',
                                        !isEqual(day, selectedDay) && 'hover:bg-gray-200',
                                        (isEqual(day, selectedDay) || isToday(day)) &&
                                            'font-semibold',
                                        'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                                        )}
                                    >
                                        <time dateTime={format(day, 'yyyy-MM-dd')}>
                                        {format(day, 'd')}
                                        </time>
                                    </button>

                                    {/* <div className="w-1 h-1 mx-auto mt-1">
                                        {meetings.some((meeting) =>
                                        isSameDay(parseISO(meeting.startDatetime), day)
                                        ) && (
                                        <div className="w-1 h-1 rounded-full bg-sky-500"></div>
                                        )}
                                    </div> */}
                                    </div>
                                ))}
                                </div>
                            </div>
                            <section className="mt-12 md:mt-0 md:pl-14">
                                <h2 className="font-semibold text-gray-900">
                                Schedule for{' '}
                                <time dateTime={format(selectedDay, 'yyyy-MM-dd')}>
                                    {format(selectedDay, 'MMM dd, yyy')}
                                </time>
                                </h2>
                                
                                {/* <p className="text-gray-900 py-2 px-4">Available for theapy ?</p> */}
                                <div className="flex items-center   py-5 px-4">
                                    <input onChange={(e)=>setAvailableForTherapy(e.target.checked)} type="checkbox" checked={availableForThreapy} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  "/>
                                    <label htmlFor="default-checkbox" className="ml-2  text-sm font-medium text-gray-900 ">Available for therapy?</label>
                                </div>
                                {availableForThreapy && 

                                    <div className=" flex flex-col items-start mb-4  px-4">
                                                                
                                    <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 ">Choose your time</label>
                                    <select value={dateTime} onChange={(e)=>handleChange(e)}  id="countries" className="shadow border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-inset  focus:ring-[#9bd58b] block w-full p-1.5 ">

                                    
                                        <option value="" ></option>
                                        <option value= {format(selectedDay, 'MMM dd, yyy,')+" 7:00 AM"}>7 AM - 11 AM</option>
                                        <option value= {format(selectedDay, 'MMM dd, yyy,')+" 11:00 AM"}>11 AM - 3 PM</option>
                                        <option value= {format(selectedDay, 'MMM dd, yyy,')+" 3:00 AM"}>3 PM - 7 PM</option>
                                        <option value= {format(selectedDay, 'MMM dd, yyy,')+" 7:00 PM"}>7 PM - 3 AM</option>
                                        <option value= {format(selectedDay, 'MMM dd, yyy,')+" 11:00 PM"}>11 PM - 3 AM</option>
                                        <option value= {format(selectedDay, 'MMM dd, yyy,')+" 3:00 AM"}>3 AM - 7 AM</option>
                                    


                                    </select>

                                    </div>
                                }
                              

                                <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
                                {selectedDayMeetings.length > 0 ? (
                                    selectedDayMeetings.map((meeting) => (
                                    <Meeting meeting={meeting} key={meeting.id} />
                                    ))
                                ) : (
                                    <p>No meetings for today.</p>
                                )}
                                </ol>
                            </section>
                            </div>
                        </div>
                    </div>

            </div>
        </div>
    </div>
  )
}

function Meeting({ meeting }) {
    let startDateTime = parseISO(meeting.startDatetime)
    let endDateTime = parseISO(meeting.endDatetime)
  
    return (
      <li className="flex items-center px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100">
        <img
          src={meeting.imageUrl}
          alt=""
          className="flex-none w-10 h-10 rounded-full"
        />
        <div className="flex-auto">
          <p className="text-gray-900">{meeting.name}</p>
          <p className="mt-0.5">
            <time dateTime={meeting.startDatetime}>
              {format(startDateTime, 'h:mm a')}
            </time>{' '}
            -{' '}
            <time dateTime={meeting.endDatetime}>
              {format(endDateTime, 'h:mm a')}
            </time>
          </p>
        </div>
        <Menu
          as="div"
          className="relative opacity-0 focus-within:opacity-100 group-hover:opacity-100"
        >
          <div>
            <Menu.Button className="-m-2 flex items-center rounded-full p-1.5 text-gray-500 hover:text-gray-600">
              <span className="sr-only">Open options</span>
              <EllipsisVerticalIcon className="w-6 h-6" aria-hidden="true" />
            </Menu.Button>
          </div>
  
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 origin-top-right bg-white rounded-md shadow-lg w-36 ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      Edit
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      Cancel
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </li>
    )
  }

  let colStartClasses = [
    '',
    'col-start-2',
    'col-start-3',
    'col-start-4',
    'col-start-5',
    'col-start-6',
    'col-start-7',
  ]

export default ManageCalendar