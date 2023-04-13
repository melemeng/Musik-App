import React  from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay,faPause,faAngleLeft,faAngleRight} from "@fortawesome/free-solid-svg-icons";
//import {playAudio} from "../util";
const Player = ({setsongs,
                    currentsong,
                    isPlaying,
                    setIsPlaying,
                    audioRef,
                    setSongInfo,
                    songInfo,
                    songs,
                    setcurrentsong}) =>{

            const activeLibraryHandler = (nextPrev) =>{
                    const newsongs = songs.map((song) => {
                        if(song.id === nextPrev.id){
                            return{
                                ...song,
                                active:true,
                            };
                        }
                        else{
                            return{
                                ...song,
                                active:false,
                            };
                        }
                    });
                    setsongs(newsongs);
                };


    // drag handler
    const dragHandler = (e)=>{
        // update audioRef
        audioRef.current.currentTime = e.target.value;
        setSongInfo({...songInfo, currentTime: e.target.value})

    };



    //Event handler to play the audio and manage pause
    const playSonghandler = () =>{
        if(isPlaying){
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        }else{
            audioRef.current.play();
            setIsPlaying(!isPlaying);        }
    }
    // format the time display

    const displayTime = (time) =>{
        return(
            Math.floor(time/60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        );
    }
    // skip function
    const skipTrackHandler = async (direction) =>{
        let currentIndex = songs.findIndex((song) => song.id === currentsong.id);
        if (direction === "skip-forward"){
          await  setcurrentsong(songs[(currentIndex + 1) % songs.length]);
            activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);

        }
        if (direction === "skip-back"){
            if ((currentIndex - 1) % songs.length === -1 ){
               await setcurrentsong(songs[songs.length - 1]);
                activeLibraryHandler(songs[songs.length - 1]);
                if (isPlaying){
                    audioRef.current.play();
                }
                return;
            }
           await setcurrentsong(songs[(currentIndex - 1) % songs.length]);
            activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
        }
        if (isPlaying){
            audioRef.current.play();
        }
    };

    // add the Styles
    const trackAnim =   {
        transform:`translateX(${songInfo.animationPercentage}%)`
    }
     return(
        <div className="Player">
           <div className="time-control">
               <p>{displayTime(songInfo.currentTime) || 0}</p>
               <div style={{background: `linear-gradient(to right, ${currentsong.color[0]},${currentsong.color[1]})`}} className="track">
                    <input min={0} max={songInfo.duration || 0}
                      value={songInfo.currentTime}
                      onChange={dragHandler}
                      type="range"/>
                   <div style={trackAnim} className="animate-track"></div>
               </div>
               <p>{songInfo.duration ? displayTime(songInfo.duration) : "0:00"}</p>
           </div>
            <div className="play-control">
                <FontAwesomeIcon onClick={() => skipTrackHandler("skip-back")} className="skip-back" size="2x"
                                 icon={faAngleLeft} />
                <FontAwesomeIcon onClick={playSonghandler}
                                 className="Play" size="2x"
                                 icon={isPlaying ? faPause:faPlay} />
                <FontAwesomeIcon onClick={ () => skipTrackHandler("skip-forward")} className="skip-forward"
                                 size="2x"  icon={faAngleRight} />
            </div>



        </div>
    );
};

export default Player;