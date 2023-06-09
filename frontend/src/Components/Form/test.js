const [file, setFile] = useState(null);
    const [preSignedUrl, setPreSignedUrl] = useState(null)
    const [imageURL, setImageUrl]=useState(null)

    const [fileDataURL, setFileDataURL] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);

    const changeHandler = async (e) => {

        try{
            const file = e.target.files[0];
            if (!file.type.match(pdfMimeType)) {
                alert("Image mime type is not valid");
                return;
              }
              setFile(file);

            const response = await axios.get(retrievePreSignedUrl)
            console.log(response.data)
            setPreSignedUrl(response.data)

        } catch (error) {
            console.log(error);
            return;
        }

        try{

            // const body = new FormData();
            // body.append("file", file);

            const body = file

            const putResponse = await axios.put(preSignedUrl, body, {
                headers: { "Content-Type": "multipart/form-data" },
              });

            console.log(putResponse.data);
            const imgUrl = preSignedUrl.split("?")[0];
            console.log(imgUrl);

        }catch(error){
            console.log(error);
            
        }
    
        
    }

    useEffect(()=>{

        console.log(preSignedUrl)

    }, [preSignedUrl])

