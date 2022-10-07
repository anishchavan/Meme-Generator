import React, { useEffect, useState } from "react";

function Meme() {
  let url;
  // const [memeImage, setmemeImage] = useState("https://i.imgflip.com/30b1gx.jpg");
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "https://i.imgflip.com/2cp1.jpg",
  });

  const [allMemes, setAllMemes] = useState([]);

  useEffect(()=>{
    fetch("https://api.imgflip.com/get_memes")
      .then(res => res.json())
      .then(data => setAllMemes(data.data.memes))
  },[])

  function getNewImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    let url = allMemes[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }
  return (
    <main>
      <p>{url}</p>
      <div className="form">
        <input
          type="text"
          placeholder="top text"
          className="form-input"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="bottom text"
          className="form-input"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
        />
        <button onClick={getNewImage} className="form-btn">
          Click to new meme
        </button>
      </div>
      <div className="meme-container">
        <img src={meme.randomImage} className="meme-image" />
        <h2 className="meme-text top">{meme.topText}</h2>
        <h2 className="meme-text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
}

export default Meme;
