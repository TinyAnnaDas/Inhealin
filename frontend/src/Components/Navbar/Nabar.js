import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { Disclosure} from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import {NavLink} from 'react-router-dom'
import { useSelector } from 'react-redux'
import {v4 as uuidv4} from "uuid"

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}



export default function Navbar() {
    const navigate = useNavigate()
    const client = useSelector(state=>state.clientAuth.client)


    const navigation = [
        { name: 'Home', navigate: '/'},
        { name: 'How it works', navigate: '/how-it-works'},
        { name: 'Pricing and plans', navigate: '/pricing-and-plans'},
        { name: 'Our therapists', navigate: '/our-therapists' },
        client ?  { name: 'Dashboard', navigate: '/client/dashboard'}
        : [{ name: 'Signup', navigate: '/signup' }, { name: 'Login', navigate: '/login' }]
     
        
      ]



    const [isScrolled, setIsScrolled] = useState(false)
    window.onscroll = ()=>{
        setIsScrolled(window.pageYOffset === 0 ? false: true)
        return () => window.onscroll = null
    }



  return (
    <nav className="fixed w-full z-10 ">
    <Disclosure as="nav" className= {classNames(
        'bg-[#325343]', isScrolled && 'bg-white shadow-md animate'
      )}>
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center  lg:justify-between ">
                <div className="flex flex-col  flex-shrink-0 items-center ">
                    <img alt='logo' className='h-14'  src= {require("../../assets/Logo.png")}/>
                    {/* <h1 className='text-white text-3xl font-extralight'>InhealIn</h1>
                    <p className='text-white text-xs'>Heal your inner self</p> */}
                </div>
                <div className="hidden lg:ml-15 lg:block ">
                  <div className="flex space-x-4">
                    {navigation.map((item) => {
                          if (Array.isArray(item)){
                           
                           
                            return item.map((subItem)=>(
                              
                              <NavLink
                               
                                  key={subItem.name}
                                  
                                  to={subItem.navigate}

                                  className={({isActive})=>{
                                    return (
                                        isScrolled ?
                                        'rounded-md px-3 py-2 ' +  
                                        (isActive ? 'bg-[#325343] text-white px-3 py-2' :  'text-[#325343] hover:text-[#325343] hover:bg-slate-100')
                                        : 
                                        'rounded-md px-3 py-2 ' +  
                                        (isActive ? 'bg-white text-[#325343] px-3 py-2' :  'text-white hover:text-[#325343] hover:bg-slate-100')
                                    )
                                }}
                                
                                onClick={()=>{
                                    navigate(item.navigate) 
                                  
                                    
                                   
                                }}
                                >
                                  {subItem.name}
                              </NavLink>
                            ))
                          }
                          else{
                            
                              return (<NavLink
                                  key={item.name}
                                  to={item.navigate}
                       
                                  className={({isActive})=>{
                                      return (
                                          isScrolled ?
                                          'rounded-md px-3 py-2 ' +  
                                          (isActive ? 'bg-[#325343] text-white px-3 py-2' :  'text-[#325343] hover:text-[#325343] hover:bg-slate-100')
                                          : 
                                          'rounded-md px-3 py-2 ' +  
                                          (isActive ? 'bg-white text-[#325343] px-3 py-2' :  'text-white hover:text-[#325343] hover:bg-slate-100')
                                      )
                                  }}
                                  
                                  onClick={()=>{
                                      navigate(item.navigate) 

                                  }}
                                >
                                  {item.name}
                              </NavLink>)

                          }
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={uuidv4()}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
    </nav>
  )
}
