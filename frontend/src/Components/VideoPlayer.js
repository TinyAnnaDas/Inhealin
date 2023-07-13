import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

export const VideoPlayer = ({ user, client1, therapist, updatedUser }) => {

  console.log("user...", user)

  console.log("user...Video", user._videoTrack)


 
  
  const ref = useRef();
  

  useEffect(() => {
    if (user._videoTrack){
      user._videoTrack.play(ref.current) 
    }else if (user.videoTrack) {
      user.videoTrack.play(ref.current) 
    }
   
    // user.videoTrack?.play(ref.current)
    
  }, []);

  return (

    <div key={user.id} className='video-container flex flex-grow border border-solid border-blue-500 rounded-md m-2 bg-blue-200 relative' style={{ flexBasis: '440px', maxHeight: '100%', minHeight:'500px' }}>
        {/* <p>UID - {user.uid}</p> */}
       <div className='username-wrapper ' style={{position:"absolute",  top: "10px", left: '10px',  zIndex: "9999", backgroundColor: "rgba(0,0,0,0.3)", width: "fit-content", padding: "10px",  borderRadius: "5px", color: "#fff", fontSize: "14px"}}><span  className='user-name'>{user.name}</span></div>
        {/* {therapist&&<div className='username-wrapper ' style={{position:"absolute",  top: "10px", left: '10px',  zIndex: "9999", backgroundColor: "rgba(0,0,0,0.3)", width: "fit-content", padding: "10px",  borderRadius: "5px", color: "#fff", fontSize: "14px"}}><span  className='user-name'>{therapist.name}</span></div>} */}

        <div className='video-player [&>*]:rounded-md' ref={ref} style={{ height: '100%', width:"100%"}}>

        </div>

    </div>
    // <div>
    //   Uid: {user.uid}
    //   <div
    //     ref={ref}
    //     style={{ width: '500px', height: '500px' }}
    //   ></div>
    // </div>
  );
};