// Personal API Key for OpenWeatherMap API
const key = "d33c95047408e0f529fb475613009185&units=metric";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

// Accessing the submit button
const btn = document.getElementById("generate");

// Function to post and get data from API
function run() {
  // Holding informations from the user 
  const code = document.querySelector("#zip");
  const feel = document.querySelector("#feelings");
  const url = `https://api.openweathermap.org/data/2.5/weather?zip=${code.value}&appid=`;
  // calling the function to get web API data
  collection(url)
    // calling the function to post data
    .then(function (linkres) {
      postdata("/saveData", {
        temperature: linkres.main.temp,
        date: newDate,
        feeling: feel.value,
      });
    })
    // calling the function to get project data
    .then(function () {
      retrieveData();
    });
}

// Function to GET Web API Data
async function collection(url) {
  const res = await fetch(url + key);
  try {
    const linkres = await res.json();
    console.log("We have get the data!");
    return linkres;
  // appropriately handle the error 
  } catch (error) {
    console.log("An error occurred");
  }
}

// Function to POST data
async function postdata(route = "", data = {}) {
  const res = await fetch(route, {
    method: "POST",
    credentials: "same-origin",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  });
  try {
    const infores = await res.json();
    console.log("Data has been sent!");
    return infores;
  // appropriately handle the error  
  } catch (error) {
    console.log("An error occurred");
  }
}

// Function to GET Project Data
async function retrieveData() {
  const request = await fetch("/returnData");
  try {
    // Transform into JSON
    const allData = await request.json();
    console.log(allData);
    // Write updated data to DOM elements
    document.getElementById("temp").innerHTML =
      Math.round(allData.temperature) + " degrees";
    document.getElementById("content").innerHTML = allData.feeling;
    document.getElementById("date").innerHTML = allData.date;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
}

// Calling the function when the button is clicked
btn.onclick = run;
