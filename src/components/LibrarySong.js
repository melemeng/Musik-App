import React from 'react';
//import {playAudio} from "../util";

const LibrarySong = ({song,songs,setcurrentsong, id,   audioRef,isPlaying, setsongs}) =>{
    const songSelectHandler = async () =>{
      await  setcurrentsong(song);
      //adding active state
        const newsongs = songs.map((song) =>{
            if(song.id === id){
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

        if (isPlaying){
            audioRef.current.play();
        }
    };
    return(
        <div onClick={songSelectHandler} className={`library-song ${song.active ? 'selected':""}`}>
            <img src={song.cover} alt={song.name}></img>
            <div className="song-description">
                 <h3>{song.name}</h3>
                 <h4>{song.artist}</h4>
             </div>
        </div>
    );
};

export default LibrarySong;