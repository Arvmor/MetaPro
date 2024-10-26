/**
 * Dynamic Eye
 */
function theOneWhoWatches() {

    // Build Eye Elements
    let wrap = document.createElement("div");
    wrap.className = "wrap";
    wrap.id = "theEye";

    let eye = document.createElement("div");
    eye.id = "eye";
    eye.className = "eye blink";

    let pupil = document.createElement("div");
    pupil.id = "pupil";

    // Nest & Insert
    eye.insertAdjacentElement("afterbegin", pupil);
    wrap.insertAdjacentElement("afterbegin", eye);
    
    return wrap;
}

/**
 * Follows the users mouse and adjust Styles
 */
function handleMouseMove(event) {
    // Select all elements with the class 'pupil'
    const pupils = document.querySelectorAll("#pupil");

    pupils.forEach(pupil => {
        // Get the bounding box of the current pupil element
        const eyeRect = pupil.getBoundingClientRect();

        // Calculate the eye's center point
        const eyeCenterX = eyeRect.left + eyeRect.width / 2;
        const eyeCenterY = eyeRect.top + eyeRect.height / 2;

        // Calculate the percentage position of the mouse relative to the eye's center
        let mouseY = (event.clientY - eyeCenterY) / (window.innerHeight - eyeCenterY) * 100;
        let mouseX = (event.clientX - eyeCenterX) / (window.innerWidth - eyeCenterX) * 100;

        // Limit the movement of the pupil to make it more natural
        if (mouseY > 60) mouseY = 60;
        if (mouseY < -60) mouseY = -60;
        if (mouseX > 75) mouseX = 75;
        if (mouseX < -75) mouseX = -75;

        // Update the pupil's position
        pupil.style.left = `${mouseX}%`;
        pupil.style.top = `${mouseY}%`;
    });
}

/**
 * Gets the % of scrolled
 */
function getScrollPercentage() {
    // Get the scroll position of the current document
    const scrollTop = document.body.scrollTop;
    
    // Get the total scrollable height of the document
    const scrollHeight = document.body.scrollHeight;
    
    // Get the client height of the document (visible part of the browser window)
    const clientHeight = window.innerHeight;
    
    // Calculate the total scrollable distance
    const scrollableHeight = scrollHeight - clientHeight;
    
    // Calculate the current scroll percentage
    const scrollPercentage = (scrollTop / scrollableHeight) * 100;
    
    return scrollPercentage;
}

function buildFAQ() {
    let questions = [
        ["What is Private Transactions?", "Answer 1"],
        ["How does blockchain work?", "Answer 2"],
        ["What is cryptocurrency?", "Answer 3"],
        ["How to buy Bitcoin?", "Answer 4"],
        ["What is Ethereum?", "Answer 5"],
    ];
    
    let answers = [];
    
    let FAQsection = document.getElementById("FAQsection");
    
    questions.forEach((value, index) => {
        let question = document.createElement("h4");
        question.className = "question";
        question.innerText = `${index + 1}. ${value[0]}`;
    
        let answer = document.createElement("p"); // Changed to <p> for semantic correctness
        answer.className = "answer";
        answer.innerText = value[1];
    
        // Store both the answer element and its visibility state
        answers.push([answer, false]);
    
        question.onclick = () => {
            answers.forEach((element) => {
                if (element[0] === answer) {
                    // Toggle the clicked answer
                    const isCurrentlyAnswered = element[1];
                    element[0].style.display = isCurrentlyAnswered ? "none" : "block";
                    element[1] = !isCurrentlyAnswered; // Update the state accordingly
                } else {
                    // Hide all other answers
                    element[0].style.display = "none";
                    element[1] = false; // Reset their state
                }
            });
        };
    
        FAQsection.appendChild(question);
        FAQsection.appendChild(answer);
    });
    
}

function getProgress(name) {
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}