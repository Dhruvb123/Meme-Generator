import React,{useState,useEffect} from 'react'

export default function Meme() {
    
    const [memeImg,setmeme]=useState({
      toptext:"",
      bottomtext:"",
      ranurl:"https://i.imgflip.com/30b1gx.jpg"
    })
    const [allMemes, setAllMemes] = React.useState([])
    function handlechange(event){
         setmeme(prevmeme=>({
          ...prevmeme,
          [event.target.name]:event.target.value
         }))
    }

    function getimg(){
        // const memesArray=allMemes;
        const random=Math.floor(Math.random() * allMemes.length);
        const url=allMemes[random].url;
        setmeme(prevmeme=>({
          ...prevmeme,
          ranurl:url
        }))
    }

    useEffect(()=>{
        fetch("https://api.imgflip.com/get_memes")
        .then(res=>res.json())
        .then(d=>setAllMemes(d.data.memes));
    },[])
   
  return (
    <main>
            <div className="form">
              
                <input type="text" placeholder="Top text" className="form--input" name="toptext" value={memeImg.toptext} onChange={handlechange}/>
                <input type="text" placeholder="Bottom text" className="form--input" name="bottomtext" value={memeImg.bottomtext} onChange={handlechange}/>
                <button className="form--button" onClick={getimg}>Get a new meme image :)</button>
                
                <div className="meme">
                  <img src={memeImg.ranurl} alt="404" className='meme--image'/>
                  <h2 className="meme--text top">{memeImg.toptext}</h2>
                  <h2 className="meme--text bottom">{memeImg.bottomtext}</h2>
                </div>
            </div>
        </main>
  )
}

