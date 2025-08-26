const { artists, songs } = window;

window.onload = function () {
  var navbar = document.querySelector("#menu");
  var selectedArtist = document.querySelector("#selected-artist");
  var artistSongsTable = document.querySelector("#songs");
  const emailInput = document.querySelector("#email-input");
  if (emailInput) {
    emailInput.value = "";
  }
  selectedArtist.innerHTML = artists[0].name + " (";
  artists[0].urls.forEach((link, index) => {
    selectedArtist.innerHTML += `<a href="${link.url}" target="_blank">${link.name}</a>`;
    if (index < artists[0].urls.length - 1) {
      selectedArtist.innerHTML += ", ";
    }
  });

  selectedArtist.innerHTML += ")";

  artists.forEach((artist) => {
    var navbtn = document.createElement("button");
    navbtn.textContent = artist.name;
    navbtn.addEventListener("click", () => {
      displayArtistInfo(artist);
    });
    navbar.appendChild(navbtn);
  });

  function displayArtistInfo(artist) {
    selectedArtist.innerHTML = artist.name + " (";
    artistSongsTable.innerHTML = "";
    const artistsSongs = songs.filter(
      (song) => song.artistId === artist.artistId && song.explicit === false
    );

    artist.urls.forEach((link, index) => {
      selectedArtist.innerHTML += `<a href="${link.url}" target="_blank">${link.name}</a>`;
      if (index < artist.urls.length - 1) {
        selectedArtist.innerHTML += ", ";
      }
    });

    selectedArtist.innerHTML += ")";

    artistsSongs.forEach((song) => {
      const card = createSongCard(song);
      artistSongsTable.appendChild(card);
    });
  }
};

function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function createSongCard(song) {
  const card = document.createElement("div");
  card.classList.add("card");

  const songImg = document.createElement("img");
  songImg.src = song.imageUrl;
  songImg.classList.add("card-image");

  const songLink = document.createElement("a");
  songLink.href = song.url;
  songLink.target = "_blank";
  songLink.appendChild(songImg);
  card.appendChild(songLink);

  const songTitle = document.createElement("h2");
  songTitle.innerHTML = song.title;
  card.appendChild(songTitle);

  const songDuration = document.createElement("span");
  songDuration.innerHTML = formatDuration(song.duration);
  card.appendChild(songDuration);

  return card;
}

// For debugging, display all of our data in the console. You can remove this later.
console.log({ artists, songs }, "App Data");
