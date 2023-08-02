import SampleProductionInfo from "~/jsons/sample_productionInfo.json" assert { type: "json" };

// get back date to offset days ago
function getBackDate(offset) {
  const d = new Date();
  // date 2 days ago
  d.setDate(d.getDate() - offset);
  // set hours to 00:00:00
  d.setHours(0, 0, 0, 0);

  const isoDate = d.toISOString();
  return isoDate
}

// get forward date to given offset days from now
function getForwardDate(offset) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  // set hours to 23:59:59
  d.setHours(23, 59, 59, 999);
  const isoDate = d.toISOString();
  return isoDate;
}


function updateContents(movieToPost) {

  // skip storing url in db
  delete movieToPost.imgURL;

  const d = new Date();
  const isoDate = d.toISOString();
  movieToPost.created = isoDate;
  movieToPost.updated = isoDate;

  movieToPost.duration = {
    startDate: getBackDate(2),
    estimatedFinishDate: getForwardDate(30),
  }

  return movieToPost
}

//This function is used to load the demo production info to the database
//Import SampleProductionInfo from "~/jsons/sample_productionInfo.json";

// Function to shuffle the array using the Fisher-Yates algorithm
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

export const loadDemoProductionInfo = async () => {
  // Shuffle the 'SampleProductionInfo' array
  const shuffledProductionInfo = [...SampleProductionInfo];
  shuffleArray(shuffledProductionInfo);

  // console.log("shuffledProductionInfo:", shuffledProductionInfo);

  const movieToPost = shuffledProductionInfo[0];
  const updatedMovieToPost = updateContents(movieToPost)


  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productionInfo: [updatedMovieToPost],
    }),
  };

  const response = await fetch("/api/production/addProductionDemo", config);
  const data = await response.json();

  return data; // You can optionally return the response data if needed
};


export const getMovieImage = (movieTitle) => {
  
  const filterMovie = SampleProductionInfo.filter((movie) => movie.title === movieTitle);
  return filterMovie[0]?.imgURL;
}