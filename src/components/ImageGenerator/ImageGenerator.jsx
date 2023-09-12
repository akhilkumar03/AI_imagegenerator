import React, { useRef, useState } from 'react'
import "./ImageGenerator.css"
import default_image from "../Assets/default_image.svg"

const ImageGenerator = () => {

    const [image_url, setimage_url] = useState("/")

    let inputRef = useRef(null)

    const imageGenerator = async () =>{
        if (inputRef.current.value === "") {
            return 0;
        }

        const response = await fetch(
          "https://api.openai.com/v1/images/generations",
          {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization : "Bearer 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",
                "User-Agent": "Chrome"


            },
            body:JSON.stringify({
                prompt: `${inputRef.current.value}`,
                n:1,
                size:"512x512",
            }),
          }
        );
        let data = await response.json();
        // console.log(data);
        let data_array = data.data
        setimage_url(data_array[0].url)
    }


  return (
    <div className='ai_image_generator'>
    <div className="header">AI Image <span>Generator</span></div>
    <div className="image-loading">
        <div className="image">
            <img src={image_url === "/" ? default_image : image_url} alt="" />
        </div>
    </div>
    <div className="search-box">
        <input type="text " ref={inputRef} className='search-input' placeholder='Enter your prompt'/>
        <div className="generate-btn" onClick={()=>{imageGenerator()}}>
            Generate
        </div>
    </div>
    </div>
  )
}

export default ImageGenerator
