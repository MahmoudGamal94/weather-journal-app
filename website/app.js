/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Define the URL and API Key for OpenWeatherMap API
const key = 'ca0e9fb02576807f2e34b12df13c3954';
// Event listener to run function generate() when button with id #generate clicked
document.getElementById('generate').addEventListener('click', generate);

// function to be called after #generate btn is clicked
function generate(e) {
    e.preventDefault();
    // get user input values (ZIP,Feelings)
    const zipInput = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipInput}&appid=${key}&units=metric`;
    getData(url)
        .then(function(userData) {
            // add data to POST request
            postData('/add', { date: newDate, temp: userData.main.temp, content })
        }).then(function(newData) {
            // call updateUI to update UI
            updateUI()
        })
        // reset form to input another data
        // form.reset();
}

// Function to get Data from API

const getData = async(url) => {
    // res equals to the result of fetch function
    const res = await fetch(url);
    try {
        // userData equals to the result of fetch function
        const userData = await res.json();
        return userData;
    } catch (error) {
        console.log("error", error);
    }
}

// Function for Posting data 
const postData = async(url = '', data = {}) => {
    const req = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            date: data.date,
            temp: data.temp,
            content: data.content
        })
    })
    try {
        const newData = await req.json();
        return newData;
    } catch (error) {
        console.log(error);
    }
};
// function for updating UI
const updateUI = async() => {
    const request = await fetch('/all');
    try {
        const allData = await request.json()
            // show icons on the page
            // update new entry values
        document.getElementById('date').innerHTML = 'Today Is ' + allData.date;
        document.getElementById('temp').innerHTML = 'Temp is ' + allData.temp + ' c';
        document.getElementById('content').innerHTML = 'Feeling ' + allData.content;
    } catch (error) {
        console.log("error", error);
    }
};