import React, {useRef, useState} from 'react';
//import musik
import data from "./data";
//styles
import "./style/app.scss"
//Adding components
import Player  from "./components/Player";
import Songs from "./components/Songs";

import Library from "./components/Library";
import Nav from "./components/Nav";




function App() {
  //state
  const audioRef = useRef(null);


  const [songs, setsongs] = useState(data());
  //current song, setcurrentsong
  const [currentsong,setcurrentsong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  //state for duration and current time
  const [songInfo, setSongInfo] = useState({
    currentTime : 0,
    duration : 0,
    animationPercentage: 0
  });
  const [libraryStatus,setLibraryStatus] = useState(false)

  // update and display time on screen
  const timeUpdateHandler = (e)=>{
    const current = e.target.currentTime;
    const duration = e.target.duration;
    // calculate Percentage
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animation  = Math.round((roundedCurrent / roundedDuration) * 100);

    setSongInfo({...songInfo,
      currentTime: current,
      duration: duration,
      animationPercentage: animation});
  };

  const songEndedToNextHandler = async ()=>{
    let currentIndex = songs.findIndex((song) => song.id === currentsong.id);
    await setcurrentsong(songs[(currentIndex + 1) % songs.length]);

  };



  return (
      <div className={`App ${libraryStatus ? "labrary-active" : ""}`}>
        <Nav libraryStatus={libraryStatus}
             setLibraryStatus={setLibraryStatus}/>
        <Songs currentsong={currentsong}/>
        <Player isPlaying={isPlaying}
                audioRef={audioRef}
                setIsPlaying={setIsPlaying}
                currentsong={currentsong}
                songInfo={songInfo}
                setSongInfo={setSongInfo}
                songs={songs}
                setcurrentsong={setcurrentsong}
                setsongs={setsongs}
        />
        <Library  libraryStatus={libraryStatus}
                  setLibraryStatus={setLibraryStatus} setsongs={setsongs}
                  isPlaying={isPlaying}
                  audioRef={audioRef}
                  songs={songs}
                  setcurrentsong={setcurrentsong}/>
        <audio
            onLoadedMetadata={timeUpdateHandler}
            onTimeUpdate={timeUpdateHandler}
            // update time initially

            ref={audioRef}
            src={currentsong.audio}
            onEnded={songEndedToNextHandler}
            onCanPlayThrough={() => {
              if (isPlaying) {
                audioRef.current.play();
              }
            }}
        >

        </audio>
      </div>
  );
}

export default App;
