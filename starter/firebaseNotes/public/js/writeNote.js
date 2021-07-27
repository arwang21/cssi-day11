const notesRef = firebase.database().ref();
const writeButton = document.querySelector("#writeButton");
const noteTitle = document.querySelector("#noteTitle");
const noteText = document.querySelector("#noteText");
/************* MEDIUM 1 ****************/
const noteLabel = document.querySelector("#noteLabel");

window.onload = (e) => {
    console.log("window loaded");
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log('Logged in as: ' + user.displayName);
            /************* MILD 2 ****************/
            alert(`Welcome ${user.displayName}!`)
        } else {
            window.location = "index.html";
        }
    })
}

/************* MILD 1 ****************/
function timeStamp() { 
    var today = new Date();
    var date = (today.getYear()+1900)+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = (today.getHours()%12) + ":" + Math.floor(today.getMinutes()/10) + today.getMinutes()%10;
    var dateTime = date+' T '+time;
    console.log(dateTime);
    return dateTime;
}

const handleNoteSubmit = () => {
    //collect text in form after user clicks button
    let title = noteTitle.value;
    let text = noteText.value;
    let label = noteLabel.value;
    console.log(title);
    console.log(text);
    console.log(label);
    notesRef.push({
        title: title,
        text: text,
        label: label,
        time: timeStamp()
    })
    noteTitle.value = "";
    noteText.value = "";
    noteLabel.value = "";
}

writeButton.addEventListener('click', handleNoteSubmit);

