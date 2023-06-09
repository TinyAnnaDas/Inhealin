import React from 'react'
import { Document, Page } from 'react-pdf';
import { useLocation } from 'react-router-dom';



const ResumePdf = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const fileURL = queryParams.get('file');

  return (
    <div>
        <embed src={fileURL} type="application/pdf" width="100%" height="1000px" />
    </div>
  )
}

export default ResumePdf