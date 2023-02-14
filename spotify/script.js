console.log("welcome to Spotify");

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let masterNext = document.getElementById('masterNext');
let masterPrev = document.getElementById('masterPrev');
let myProgressBar = document.getElementById('myProgressBar');
let musicGif = document.getElementById('musicGif');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName : "Pasoori", filePath: 'songs/1.mp3', coverPath:'cover/1.jpg'},
    {songName : "Har Har Shambhu Shiv", filePath: 'songs/2.mp3', coverPath:'cover/2.jpg'},
    {songName : "Jugni_320(PagalWorld.com.se)", filePath: 'songs/3.mp3', coverPath:'cover/3.jpg'},
    {songName : "Nazareey", filePath: 'songs/4.mp3', coverPath:'cover/4.jpg'}
]

songItems.forEach((element, i )=> {
    // console.log(element, i);
    element.getElementsByTagName("img")[0].src= songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText= songs[i].songName;
    // element.getElementsByClassName("timestamp")[0].innerText= songs[i].duration;

});

// SongTimmer(audioElement);

// //function to show the song timming
// function SongTimmer(track){
//     let totalDurationDiv = document.getElementById('totalDuration');
//     let currentTimingDiv = document.getElementById('currentTiming');
    
//     let currentTiming = Math.floor(track.currentTime).toString();
//     let totalDuration = Math.floor(track.duration).toString();

//     currentTimingDiv.innerHTML = formatTime(currentTiming);

//     if(isNaN(totalDuration)){
//         totalDurationDiv.innerHTML = '00:00';
//     }
    
//     else {
//         // totalDurationDiv.innerHTML = formatTime(totalDuration);
//     }

// }

// //function to convert duration in second and minutes

// function formatTime (secs){
//     let hr = Math.floor(secs/3600);
//     let min = Math.floor(secs - (hr*3600)/60);
//     let sec = Math.floor(secs - (hr*3600) - (min * 60));

//     if (min < 10){ 
//         min = "0" + min; 
//       }
//       if (sec < 10){ 
//         sec  = "0" + sec;
//       }

//     return min + ':'+ sec;
// }


// audio play
//Handle play/pause Click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime <=0){
        audioElement.play();
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        musicGif.style.opacity = 1;
        
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");
        musicGif.style.opacity = 0;
    }
});

//Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    //update seekbar
    Progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    console.log(Progress);
    
    // SongTimmer(audioElement);

    // timmer.innerHTML = 
    
    // `<span>
    // ${parseFloat(audioElement.currentTime/600).toFixed(2)} : ${parseFloat(audioElement.duration/100).toFixed(2)}

    // ${parseInt(audioElement.duration)}
    // </span>`;
    
    // updating progress bar 
    myProgressBar.value= Progress;
    
    if(myProgressBar.value == '100'){
        masterPlay.classList.add("fa-play-circle");
        masterPlay.classList.remove("fa-pause-circle");
    }
});

// forwarding song acording to progress bar
myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = (myProgressBar.value*audioElement.duration)/100;

});

//to paly song from playlist
const makeAllPlay = ()=>{
    Array.from(document.getElementsByClassName('playSong')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');

    })
}

Array.from(document.getElementsByClassName('playSong')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        console.log(e);
        makeAllPlay();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle'); 
        audioElement.src = `songs/${songIndex}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
    
    })
})

// to chagne next and prev

masterNext.addEventListener('click',()=>{
    if(songIndex >4){
    songIndex = 0;
    }
    else {
        songIndex += 1;
        audioElement.src = `songs/${songIndex}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
    }
});

masterPrev.addEventListener('click',()=>{
    if(songIndex <0){
    songIndex = 0;
    }
    else {
        songIndex -= 1;
        audioElement.src = `songs/${songIndex}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
    }
})


