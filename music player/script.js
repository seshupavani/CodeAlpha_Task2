let files = [];
let currentIndex = 0;
const audio = document.getElementById("audio");
const fileInput = document.getElementById("fileInput");
const songName = document.getElementById("songName");
const playlist = document.getElementById("playlist");

fileInput.addEventListener("change", () => {
  files = Array.from(fileInput.files);
  currentIndex = 0;
  loadSong(currentIndex);
  buildPlaylist();
});

function loadSong(index) {
  const file = files[index];
  if (file) {
    const url = URL.createObjectURL(file);
    audio.src = url;
    songName.textContent = file.name;
  }
}

function togglePlay() {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

function prev() {
  currentIndex = (currentIndex - 1 + files.length) % files.length;
  loadSong(currentIndex);
  audio.play();
}

function next() {
  currentIndex = (currentIndex + 1) % files.length;
  loadSong(currentIndex);
  audio.play();
}

function buildPlaylist() {
  playlist.innerHTML = "";
  files.forEach((file, index) => {
    const li = document.createElement("li");
    li.textContent = file.name;
    li.onclick = () => {
      currentIndex = index;
      loadSong(index);
      audio.play();
    };
    playlist.appendChild(li);
  });
}
