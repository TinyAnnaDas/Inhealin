import React, { useRef, Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import AgoraRTC from 'agora-rtc-sdk-ng';
import { appId } from '../Utils/AgoraConfig';
// import { token } from '../Utils/AgoraConfig';
// import { channel } from '../Utils/AgoraConfig';
import { VideoPlayer } from './VideoPlayer';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { ReactSVG } from 'react-svg';
import microphoneIcon from '../assets/microphone.svg';
import videoIcon from '../assets/video.svg';
import leaveIcon from "../assets/leave.svg"
import { getToken } from '../Utils/constants';
import axios from '../Utils/axios';
import { createMemberURL } from '../Utils/constants';
import { getMemberURL } from '../Utils/constants';
import { deleteMemberURL } from '../Utils/constants'; 
import { useSelector } from 'react-redux';


const client = AgoraRTC.createClient({
    mode:'rtc', 
    codec:'vp8'
})

const VideoRoom = ({joined, setJoined, sessionId}) => {

    const client1 = useSelector(state=>state.clientAuth.client)
    console.log("client1..", client1?.name)
    const therapist = useSelector(state=>state.therapistAuth.therapist)
    console.log("therapist....", therapist?.name )

    let name = client1?client1.name:therapist.name

    let [nameJ, setNameJ] = useState("")

    let [member, setMember] = useState("")




    const [users, setUsers] = useState([]);
    const [localTracks, setLocalTracks] = useState([]);
    let channel = String(sessionId)

    const [token, setToken] = useState('')
    const [uid, setUid] = useState('')


    const handleUserJoined = async (user, mediaType) => {
        console.log("handleUserJoined", user.name)
        await client.subscribe(user, mediaType)

        name =  await getMember(user)
       
        console.log("geMember Name...", name)

        
        const updatedUser = { ...user, "name": name }

        if (mediaType === 'video'){
            
            // console.log("updatedUser....", updatedUser)
            // let player = users.filter((u)=> u.uid===user.uid)
            // if (player != null){
            //     player.remove()
            // }
            setUsers((previousUsers) => [...previousUsers, updatedUser]);
        }

       

        if (mediaType === 'audio') {
            user.audioTrack.play()
          }

    }

    const handleUserLeft = (user) => {
        setUsers((previousUsers) =>
          previousUsers.filter((u) => u.uid !== user.uid)
        );

        
      };

    const leaveAndRemoveLocalStream = async () => {

        for (let i = 0; localTracks.length > i; i++){
            localTracks[i].stop()
            localTracks[i].close()
        }
        await client.leave()

        deleteMember(uid)

        setJoined(false)

    }

    let toggleCamera = async (e) => {
        if(localTracks[1].muted){
            await localTracks[1].setMuted(false)
            e.target.style.backgroundColor = '#fff'
        }else{
            await localTracks[1].setMuted(true)
            e.target.style.backgroundColor = 'rgb(255, 80, 80, 1)'
        }
    }

    let toggleMic = async (e) => {
        console.log('TOGGLE MIC TRIGGERED')
        if(localTracks[0].muted){
            await localTracks[0].setMuted(false)
            e.target.style.backgroundColor = '#fff'
        }else{
            await localTracks[0].setMuted(true)
            e.target.style.backgroundColor = 'rgb(255, 80, 80, 1)'
        }
    }

    // let name = client1?client1.name:therapist.name
    console.log("name", name)

    let body = {
        'name': name,
        'room_name': sessionId, 
        "uid":uid


    }


    let createMember = () => {
        console.log("uid..", body.uid)
        axios.post(createMemberURL, body, {
            headers:{
                "Authorization": `Bearer ${access}`,
            }
        } )
        .then((response)=> {
            console.log("memberfromback", response.data)
            setMember(response.data.name)
            setUid(response.data.uid)
        })
        .catch((error)=> console.log(error))
    }

    let getMember = (user) => {

        // axios.get(`${getMemberURL}${user.uid}/${channel}/`, {
        //     headers:{
        //         "Authorization": `Bearer ${access}`,
        //     }
        // })
        // .then((response)=>{
        //     console.log("getMember...", response.data)
        //     return response.data.name
        //     // setNameJ(response.data.name)
        // })
        // .catch((error)=>console.log(error))

        // return nameJ


        return new Promise((resolve, reject) => {
            axios
              .get(`${getMemberURL}${user.uid}/${channel}/`, {
                headers: {
                  "Authorization": `Bearer ${access}`,
                },
              })
              .then((response) => {
                console.log("getMember...", response.data);
                resolve(response.data.name);
              })
              .catch((error) => {
                console.log(error);
                reject(error);
              });
          });



    }

    let deleteMember =  (uid) => {
        console.log("uid..", uid)

        axios.delete(`${deleteMemberURL}${uid}/${sessionId}/${name}/`, {
            headers:{
                "Authorization": `Bearer ${access}`,
            }
        })
        .then((response)=> {
            console.log(response)
        })
    }


    let joinAndDisplayLocalStream = async () => {
        console.log("token...", token)

       await client.join(appId, channel, token, uid)

        const tracks = await AgoraRTC.createMicrophoneAndCameraTracks()

         createMember()
        



        const [audioTrack, videoTrack] = tracks;
        setLocalTracks(tracks);

        setUsers((previousUsers) => [
            ...previousUsers,
            {
                name,
                uid,
                videoTrack,
                audioTrack,
            },
        ]);

        await client.publish(tracks)
    


    }

    let access 

    const authTokensClient = JSON.parse(localStorage.getItem('authTokensClient'))
    const authTokensTherapist = JSON.parse(localStorage.getItem('authTokensTherapist'))

    authTokensClient? access = authTokensClient.access : access = authTokensTherapist.access





    useEffect(()=> {

        client.on('user-published', handleUserJoined)
        client.on('user-left', handleUserLeft)

       
        axios.get(`${getToken}${sessionId}/`,  {
            headers: {
                "Authorization": `Bearer ${access}`
              }
        })
        .then((response)=> {
            console.log("uid...", response.data)
            setToken(response.data.token)
            setUid(Number(response.data.uid))
            
            
        })
        .catch((error)=> console.log(error))



       

        // UID = await client.join(APP_ID, CHANNEL, TOKEN, UID)

        // localTracks = await AgoraRTC.createMicrophoneAndCameraTracks()


        // client
        // .join(appId, channel, token, null)
        // .then((uid) =>
        //   Promise.all([
        //     AgoraRTC.createMicrophoneAndCameraTracks(),
        //     uid,
        //   ])
        // )
        // .then(([tracks, uid]) => {
        //   const [audioTrack, videoTrack] = tracks;
        //   setLocalTracks(tracks);
        //   setUsers((previousUsers) => [
        //     ...previousUsers,
        //     {
        //       uid,
        //       videoTrack,
        //       audioTrack,
        //     },
        //   ]);
        //   client.publish(tracks);
        // });


        const currentUid = uid

        return () => {
            for (let localTrack of localTracks) {
              localTrack.stop();
              localTrack.close();
            }
            client.off('user-published', handleUserJoined);
            client.off('user-left', handleUserLeft);
            client.unpublish(localTracks).then(() => client.leave());
            deleteMember(currentUid)
          };

    }, [access, sessionId ])
    const cancelButtonRef = useRef(null)

    useEffect(()=>{
        console.log("uid... ", uid)
    }, [uid])

    useEffect(() => {
        if (token) {
          joinAndDisplayLocalStream();
        }
      }, [token]);

  return (
    <Transition.Root show={joined} as={Fragment}>
    <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setJoined}>
        <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto" >
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                {users.length===0 ? (

                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-center justify-center">
                        
                            <div className=" flex flex-col mt-3  sm:ml-4 sm:mt-0 ">
                                <Dialog.Title as="h3" className="text-base  font-semibold leading-6 text-gray-900">
                                    Your Video Is loading
                                </Dialog.Title>
                                <div className="mt-2 flex justify-center">
                                 
                                    <HourglassEmptyOutlinedIcon/>
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                   
                    </Dialog.Panel>

                ):(
                
                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full ">
                    
                    <div className="bg-white px-4 pb-4 pt-5 p-6 ">
                        <div className="sm:flex sm:items-start">
                            {/* <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 sm:mx-0 sm:h-10 sm:w-10">
                            
                                <CancelIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                            
                            </div> */}
                            <div className="mt-3  sm:ml-4 sm:mt-0 sm:text-left w-full">
                        
                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900 mb-5">
                                Sesson Id - {channel}
                                </Dialog.Title>


                            
                                    <div className="video-streams flex flex-wrap h-85vh w-3/4 mx-auto">
                                        {member&& users.map((user, index) => (
                                            <VideoPlayer key={index} user={user} client={client1} therapist={therapist} member={member}/>
                                        ))}
                                    </div>

                                    <div id='controls-wrapper ' className='p-5' style={{ display: "flex", width: "100%", justifyContent: "center", columnGap: "1em", position: "fixed", bottom: "20px"}}>

                                        <div class="icon-wrapper" onClick={toggleMic}>
                                            <img src={microphoneIcon} className="w-12 h-12" style={{ backgroundColor:" #fff", cursor: "pointer", padding: "10px", borderRadius: "5px"}} id="mic-btn"  alt="mic"/>
                                        </div>

                                        <div class="icon-wrapper" onClick={toggleCamera}>
                                            <img src={videoIcon} className="w-12 h-12" style={{ backgroundColor:" #fff", cursor: "pointer", padding: "10px", borderRadius: "5px", }}  />
                                        </div>

                                        <div class="icon-wrapper" onClick={leaveAndRemoveLocalStream}>
                                            <img src={leaveIcon}  className="w-12 h-12 " style={{ backgroundColor: "rgb(255, 80, 80, 1)", cursor: "pointer", padding: "10px", borderRadius: "5px"}}  />
                                        </div>

                                    </div>





                                {/* <div className='video-streams flex flex-wrap h-85vh w-3/4 mx-auto'>
                                    

                                        {users.map((user) => (
                                            <VideoPlayer key={user.uid} user={user} />
                                            ))}

                                
                                    
                            

                                </div> */}
                            
                                {/* <div
                                style={{ display: 'flex', justifyContent: 'center' }}
                                >
                                    <div
                                        style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(2, 200px)',
                                        }}
                                    >
                                        {users.map((user) => (
                                        <VideoPlayer key={user.uid} user={user} />
                                        ))}
                                    </div>
                                </div> */}
                            

                                
                                
                                    {/* <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 justify-center">
                                        <button
                                            type="button"
                                            className=" rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 sm:ml-3 sm:w-auto"
                                            onClick={(e) => {
                                                setJoined(false)
                                                // setTimeout(setDeleteJournal(false), 5000)
                                                // setDeleteJournal(false)
                                                
                                                
                                                
                                                
                                            }}
                                        
                                        >
                                            Close
                                        </button>

                                        <button
                                    
                                        type="button"
                                        className=" rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"

                                        >
                                        Cancel
                                        </button>
                                    </div> */}
                            

                            </div>
                        </div>
                    </div>

                    </Dialog.Panel>

                )}
                </Transition.Child>
            </div>
        </div>
    </Dialog>
    </Transition.Root>
  )
}

export default VideoRoom