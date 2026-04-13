//Welcome to the start of too many comments I AM NOT STYLING THIS FUCK OFF
//This executes function when window loads
window.onload = function(){
    //Select an element from our page
    let btnDisplay = document.querySelector("#btnDisplayName");
    //Add an event listener
    btnDisplay.addEventListener("click", DisplayButtonClick);

    //More button register but one line
    document.querySelector("#btnDrinkDisplay").addEventListener("click", DisplayDrink);

    //This also doesnt clear our array so if you want to see its effects refresh
    document.querySelector("#btnClear").addEventListener("click", () => localStorage.clear());//Dw about this its a lambda if your curious   

    //Standard AJAX Call
    let url = 'VeryCoolJS.json';
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        JsonParse(xhr.responseText)//Remember this is all you need to change but i like to have a method just for JSON Parse
    }
    };
    xhr.open("GET", url, true);
    xhr.send();
}
//Declare a empty global array for later
let names = [];
let VeryCoolJason = [];

function JsonParse(text){
    //Parse the JSON
    VeryCoolJason = JSON.parse(text);
    //confirm it was parsed
    console.log("Data Parsed");
    //Call the first thing we do with our JSON
    BuildRadioButtons();
}

//New function called by the button
//This will display our stored names in our <div id="names">
function DisplayButtonClick(){
    //Call StorageGet first as if we dont it would overwrite our stored array
    StorageGet();
    //Select the value from the input !!Value is needed for all inputs!!
    let user = document.querySelector("#userName").value;
    //Console log most times you grab an input to make sure its actually being pulled
    console.log(user);
    //Empty strings are dumb and i dont like em so we arent gonna let it push the user variable to our array
    //Checks if user isnt empty
    if(user !== ''){
        //Pushes our user variable to names
        names.push(user);
    }
    //Anotha console log check
    console.log(names);
    //Call storage set function. We dont need to send the array in since its global
    StorageSet();
    //Now were gonna display all users
    DisplayUsers();
}
function StorageSet(){
    //Set our localStorage with our array
    //Notice the string is just the name for it in localStorage does not have to be the same
    localStorage.setItem("someUsers", JSON.stringify(names));
}
function StorageGet(){
    //grab our locally stored array
    //Must be the same name otherwise will not get the correct item
    let stored = localStorage.getItem("someUsers");
    //check to make sure it isnt null (kinda not important did it anyway)
    if (stored === null)
        //example of alert (The message box of JS)
        alert("Empty Storage");
    else
        //parse our stored variable which is our users
        names = JSON.parse(stored);
}
function DisplayUsers(){
    //Gonna select our p id="names" but through the parent div just to show it off
    let namesHtmlParent = document.querySelector("#parentOfNames");
    //You can query selector elements not just document
    let namesHtml = namesHtmlParent.querySelector("#names");
    //Console log everything im gonna keep leaving this comment everywhere
    console.log(namesHtml);

    //Now we are gonna build some html with JS
    let html = "";
    //The goal of this is to build a new p element for every name we have
    for(let i = 0; i < names.length; i++){
        html += "<p>";
        html += names[i];
        html += "</p>";
    }
    //Now were gonna overwrite the html of namesHtml variable
    namesHtml.innerHTML = html;

    //See below this for why this is here and what it does
    NameClickEventListener();
}

//Now its time for very cool target stuff the goal here is to have it alert everytime we click a name
//Importantly we have to call this after the names are made so we have to call it in DisplayUsers
function NameClickEventListener(){
    //Notice we can addEventListener to a Div and it will apply it to all clicked elements
    document.querySelector("#names").addEventListener('click', NameClick);
}
//'e' here represents the element clicked but the whole element including html
function NameClick(e){
    //Assign selectedName the innerHTML of our target
    let selectedName =  e.target.innerHTML;//Importantly if we dont do innerHTML it would read out the html element (Aka an htmlObject)
    //CONSOLE LOG PLEASE ITS SO HELPFUL
    console.log(selectedName);
    //Another JS message box for reading clicked element
    alert(selectedName);
    //This is for later but calls MakeObj when you click a Name
    MakeObj(selectedName);
}

//Radio button time
//You may notice we have no radio buttons we are gonna build them here
function BuildRadioButtons(){
    //More document query
    let radio = document.querySelector("#radioEX");
    //If you look at my JSON we first need to select drinks from it this is likely to be used multiple times so we should put it in a variable
    let drinks = VeryCoolJason.drinks;
    //Now were gonna make some radio button html
    let html = "";
    for(let i = 0; i < drinks.length; i++){
        //I highly reccomend you make and example in your html page
        //My example html I made to make this "<input type="radio" name="drinks" id="drinkName"> Drink"
        html += '<input type="radio" ' //note using ' ' lets you use " " in your html
        html += 'name="drinks" ';//they all need the same name or else we could select multiple
        html += 'value="' + drinks[i] + '">'; //remember to close your html still (Also remeber to make sure your html in places like this are still using " " around values)
        html += drinks[i]; //if you look at the JSON this should always be our drink name
        html += '<br>'; //puts a break inbetween our radio buttons
    }
    //finally write to our html
    radio.innerHTML += html;//Note += or else it will overwrite our title
}

function DisplayDrink(){
    //CONSOLE LOG!!!!!!!!!!!!!!!!!!!!!!!!!!
    console.log("DisplayDrinkClick");
    //Slect where we are writing too
    let favDrinkHTML = document.querySelector("#favDrink");
    //This selects any checked input with the name drinks
    let selectedDrink = document.querySelector('input[name="drinks"]:checked');//You could totally copy this and replace name with whatever you want
    //Checking if you didnt select an option
    if(!selectedDrink){
        //Setting the html to a message instead of a variable
        favDrinkHTML.innerHTML = "Please select a option";
        //early return to prevent below code fromexecuting
        return;
    }
    //Finally set innerHtml and remeber its a input so .value is needed
    favDrinkHTML.innerHTML = selectedDrink.value;
}

//This totally isnt me making this all come together last second
//Goal here is make an object using stuff weve already done
//This function accepts a variable
function MakeObj(name){
    //so the goal here is make a object with the name and fav drink
    //first we need our two values in the object
    let favDrink = document.querySelector("#favDrink").innerHTML;
    //If the user hasnt selected a favDrink we dont wanna do anything else so we return
    if(favDrink === "")//Need to check for empty string here since we are using innerHtml and null or no value is an empty string
        return;
    //This will be our objects structure
    let person = {
        //Properties of our object
        PersonName: name,
        FavoriteDrink: favDrink
    }
    //Send in our person we made
    DisplayPerson(person);
}
//This will display our person
function DisplayPerson(person){
    //i feel like i can stop commenting document.querySelector by now
    let objDisplay = document.querySelector("#objEX");
    //remeber this is just like C# person is just a generic person object so we can use person.PersonName
    let html = "<h4>"+person.PersonName+' ';
    html += person.FavoriteDrink+"</h4>";
    objDisplay.innerHTML = html;
}