import React from "react";
import LibrarySong from "./LibrarySong";



const Library = ({songs,setcurrentsong, audioRef, isPlaying, setsongs, libraryStatus,setLibraryStatus}) =>{

    return(
        <div className={`library ${libraryStatus ? 'active-library': ''}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map((song) =>
                    (<LibrarySong setsongs={setsongs} isPlaying={isPlaying}
                                  audioRef={audioRef} songs={songs}
                                  setcurrentsong={setcurrentsong}
                                  song={song}
                                  id={song.id}
                                  key={song.id}
                    />))}
            </div>
        </div>
    )
}

export default Library;