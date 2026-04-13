//Welcome to the start of too many comments I AM NOT STYLING THIS FUCK OFF
//This executes function when window loads
window.onload = function(){
    //Select an element from our page
    let btnDisplay = document.querySelector("#btnDisplayName");
    //Add an event listener
    btnDisplay.addEventListener("click", DisplayButtonClick);
    //Same thing as above but oneline
    //This also doesnt clear our array so if you want to see its effects refresh
    document.querySelector("#btnClear").addEventListener("click", () => localStorage.clear());//Dw about this its a lambda if your curious
}
//Declare a empty global array for later
let names = [];
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
        //Pushes out user variable to names
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
}
