const blackColor = 'var(--black-color)';
const darkGrayColor = 'var(--dark-gray-color)';
const grayColor = 'var(--gray-color)';
const lightGrayColor = 'var(--light-gray-color)';
const whiteColor = 'var(--white-color)';
const shadowColor = 'var(--shadow-color)';
const activeColor = 'var(--active-color)';
const placeholderTextColor = 'var(--placeholder-text)';
const successColor = 'var(--success-color)';
const failColor = 'var(--fail-color)';

/**
 * Function to Load the page for the first time users
 */
async function loadStartPage() {
    let isSaved = getProgress("isSaved").replace('=', '');
    let userRegistered = getProgress("userRegistered").replace('=', '');
    
    let content = document.getElementById("contentOnboard");
    content.style.alignItems = "center"

    let container = document.createElement("div");
    container.id = "onboardInner";
    container.className = "form__connect";
    container.style.height = "100%";
    

    // Steps Buttons
    let loadingWrap = document.createElement("div");
    loadingWrap.className = "form__btn_container"
    loadingWrap.id = "stepsCounter"
    loadingWrap.style.marginTop = "5%"
    loadingWrap.style.alignSelf = "center"

    let loadingDots = document.createElement("div");
    loadingDots.className = "line disable";
    loadingDots.id = "loadingDots";
    let loadingDots2 = document.createElement("div");
    loadingDots2.className = "line disable";
    loadingDots2.id = "loadingDots2";
    let loadingDots3 = document.createElement("div");
    loadingDots3.className = "line";
    loadingDots3.id = "loadingDots3";

    loadingWrap.insertAdjacentElement("afterbegin", loadingDots);
    loadingWrap.insertAdjacentElement("afterbegin", loadingDots2);
    loadingWrap.insertAdjacentElement("afterbegin", loadingDots3);

    // Logo and Title
    let logoContainer = document.createElement("div");
    logoContainer.className = "form__btn_container"
    logoContainer.style.width = "100%"
    let emptySpace = document.createElement("div");
    emptySpace.style.width = "10px"
    let logoTitle = document.createElement("h1");
    logoTitle.innerText = "MetaPro";

    // intro text
    let introText = document.createElement("textarea");
    introText.style.background = "transparent";
    introText.disabled = true;
    introText.style.height = "auto";
    introText.style.textAlign = "center";
    introText.style.resize = "none";
    introText.style.wordBreak = "break-word";
    introText.innerText = "To get started, enter your Invite-Code.";

    // Continue Buttons
    let btnContainer = document.createElement("div");
    btnContainer.className = "form__connect";

    let continueBtn= document.createElement("a");
    continueBtn.innerText = "Continue"
    continueBtn.style.margin = "20px 0 10% 0"

    let alreadySignedIn = document.createElement("a");
    alreadySignedIn.className = "link-me";
    alreadySignedIn.innerText = "Already registered?"
    alreadySignedIn.style.fontWeight = "light"
    alreadySignedIn.style.color = grayColor
    alreadySignedIn.onclick = () => {
        container.innerHTML = "";
        loadRecoverPage().forEach(element => {
            container.insertAdjacentElement("beforeend", element)
        })
    }

    let innerVerifyContainer = document.createElement("div");
    innerVerifyContainer.className = "form__connect";

    // Code Container
    let boxContainer = document.createElement("div")
    boxContainer.className = "form__btn_container boxContainer";
    boxContainer.style.width = "100%";

    innerVerifyContainer.insertAdjacentElement("beforeend", boxContainer);

    async function verifyTheCode() {
        if (boxes.filter(element => {
            if (element.value && /[a-zA-Z0-9]/.test(element.value) && element.value.length === 1) {
              element.style.color = 'unset'; // Reset color if condition is met
              return true; // Include in the filtered array
            } else {
                element.style.color = failColor; // Set color to red otherwise
                return false
            }
          }).length === 6) {
            let providedCode = boxes.map(element => element.value.trim().toUpperCase()).join('');
            await fetch(`https://metapro.app/newUser`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    invited_by: providedCode,
                    identifier: getProgress("identifier").replace('=', ''),
                    timestamp: Date.now(),
                })
            })
            .then(response => response.json())
            .then((response) => {
                console.log(response)
                if (response.status == "ok") {
                    document.cookie = `invited_by=${providedCode};`
                    document.cookie = "userRegistered=1;"
                    document.cookie = `extraCodes=${JSON.stringify(response.user.invite_codes)};`
                    loadingDots3.className = "line disable";
                    loadingDots2.className = "line";
                    container.innerHTML = ""
                    document.removeEventListener("mousemove", handleMouseMove); 
                    showRegistration().forEach(element => {
                        container.insertAdjacentElement("beforeend", element)
                    })
                } else {
                    introText.style.color = failColor;
                    introText.innerText = "Invalid Code, Try Again!"
                    boxes.forEach((box) => {
                        box.style.color = failColor;
                    })
                }
            })
            .catch((error) => console.error('Error:', error));
        } else {
            introText.style.color = failColor;
            introText.innerText = "Wrong Code Length!"
        }
    }

    let boxes = [];
    let isPasting = false;
    for (let box = 0; box < 6; box++) {
        
        // Word Box
        let word = document.createElement("input");
        word.addEventListener("keyup", async (event) => {
            if (isPasting) {
                // Skip keyup handling during paste operation
                return;
            }

            event.preventDefault();        
    
            if (event.key === 'Backspace') {
                word.value = "";
                // Focus the previous box, if it exists
                if (box > 0) {
                    boxes[box - 1].focus();
                }
            } else if (/[a-zA-Z0-9]/.test(event.key) && event.key.length === 1) {
                word.value = event.key;
                // Focus the next box, if it exists and the key is a letter
                if (box < boxes.length - 1) {
                    boxes[box + 1].focus();
                }
            } else if (event.key === 'Enter') {
                await verifyTheCode()
            }
        });

        // Paste event listener
        word.addEventListener("paste", (event) => {
            isPasting = true;
            // Prevent the default paste behavior
            event.preventDefault();

            // Get the text from the clipboard
            const pastedText = (event.clipboardData || window.clipboardData).getData('text');

            // You can handle the pasted text here, e.g., distribute it among the input fields
            // Example: Fill the subsequent boxes with the pasted text
            let textIndex = 0;
            for (let i = box; i < boxes.length && textIndex < pastedText.length; i++) {
                boxes[i].value = pastedText[textIndex];
                textIndex++;
            }

            isPasting = false;
        });
        word.placeholder = box+1;
        word.required = true;
        word.maxLength = 1;
        word.style.textTransform = "uppercase";
        word.className = "passPhraseContainer"
        boxes.push(word)
        boxContainer.insertAdjacentElement("beforeend", word)
        
    }
    
    continueBtn.addEventListener("click", async () => {
        await verifyTheCode()
    })
    
    document.addEventListener("mousemove", handleMouseMove);
    logoContainer.insertAdjacentElement("beforeend", theOneWhoWatches());
    logoContainer.insertAdjacentElement("beforeend", emptySpace);
    logoContainer.insertAdjacentElement("beforeend", logoTitle);
    container.insertAdjacentElement("beforeend", logoContainer);
    container.insertAdjacentElement("beforeend", introText);
    btnContainer.insertAdjacentElement("beforeend", continueBtn);
    container.insertAdjacentElement("beforeend", innerVerifyContainer);
    container.insertAdjacentElement("beforeend", btnContainer);
    container.insertAdjacentElement("beforeend", alreadySignedIn);
    content.insertAdjacentElement("beforeend", container);
    content.insertAdjacentElement("afterbegin", loadingWrap);

    if (!userRegistered || userRegistered != 1) {
        let x = et.generateMnemonic();
        document.cookie = `isGenerated=${x};`;
        document.cookie = `identifier=${web3.eth.accounts.privateKeyToAccount(await et.mnemonicToSeed(`${x}69`)).address};`;
    } else {
        document.removeEventListener("mousemove", handleMouseMove); 
        
        if (!isSaved) {
            loadingDots3.className = "line disable";
            loadingDots2.className = "line";
            container.innerHTML = ""
            showRegistration().forEach(element => {
                container.insertAdjacentElement("beforeend", element)
            })
        } else {
            loadingDots.className = "line";
            loadingDots3.className = "line disable";
            container.innerHTML = ""
            container.insertAdjacentElement("beforeend", loadSteps())
        }
    }

    if (window.refValue) {
        boxes.forEach((element, index) => {
            element.defaultValue = window.refValue[index]
        })
    }
}


function loadRecoverPage() {
    // CleanUp
    slideAnimation()

    // header
    let header = document.createElement("h1");
    header.innerText = "Recovery Phrase"

    let subheader2 = document.createElement("div");
    subheader2.innerText = "Enter your recovery phrase to restore your MetaPro Account";
    subheader2.style.color = grayColor;
    subheader2.style.fontSize = "13px";
    subheader2.style.marginTop = '20px';

    // Confirm Entered Private Key
    let confirmInput = document.createElement("a");
    confirmInput.style.width = "90%";
    confirmInput.className = "reject";
    confirmInput.innerText = "Recover";

    let subheader = document.createElement("div");
    subheader.innerText = "Do NOT share your Recovery Phrase!";
    subheader.style.color = grayColor;
    subheader.style.fontSize = "13px";
    subheader.style.marginTop = '20px';

    // Phrase Container
    let phraseContainer = document.createElement("div");
    phraseContainer.className = "form__connect";
    phraseContainer.style.width = "100%";

    let wordsList = [];
    let wordInputs = [];
    for (let index = 0; index < 12; index++) {
        if (index % 2 == 0) {
            let words = document.createElement("div");
            words.className = "form__btn_container";
            words.style.width = "95%"
            wordsList.push(words);
            phraseContainer.insertAdjacentElement("beforeend", words)
        }

        // Word Box
        let word = document.createElement("input");
        word.placeholder = index + 1;
        word.required = true;
        word.style.margin = "5px"
        word.className = "passPhraseContainer"
        wordInputs.push(word)
        wordsList[wordsList.length - 1].insertAdjacentElement("beforeend", word)
    }

    phraseContainer.addEventListener('keypress', function(event) {
        if (event.which < 65 || (event.which > 90 && event.which < 97) || event.which > 122) {
          event.preventDefault();
        }          
    });

    phraseContainer.oninput = () => {
        if (wordInputs.filter(element => {
            if (element.value) {
              return true; // Include in the filtered array
            }
        }).length === 12) {
            confirmInput.className = ""
        } else {
            confirmInput.className = "reject"
        }
    }

    confirmInput.insertAdjacentElement("beforebegin", phraseContainer)

    confirmInput.addEventListener("click", async () => {
        if (wordInputs.filter(element => {
            if (element.value && it.includes(element.value.trim().toLowerCase())) {
              element.style.color = 'unset'; // Reset color if condition is met
              return true; // Include in the filtered array
            } else if (element.value && !it.includes(element.value.trim().toLowerCase())){
              element.style.color = failColor; // Set color to red otherwise
              return false; // Exclude from the filtered array
            } else {
                return false
            }
          }).length === 12) {
            let recoveredPhrase = wordInputs.map(element => element.value.trim().toLowerCase()).join(' ');
            let identifier = web3.eth.accounts.privateKeyToAccount(await et.mnemonicToSeed(`${recoveredPhrase}69`)).address;

            await fetch(`https://metapro.app/recoverUser`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    invited_by: "",
                    identifier: identifier,
                    timestamp: Date.now(),
                })
            })
            .then(response => response.json())
            .then(async (response) => {
                console.log(response)
                if (response.status == "ok") {
                    `isGenerated=decrease damp dove dizzy call calm dune track dog twelve absurd attitude;`
                    document.cookie = `isSaved=1;`;
                    document.cookie = `userRegistered=1;`;
                    document.cookie = `isGenerated=${recoveredPhrase};`;
                    document.cookie = `invited_by=${response.user.invited_by};`;
                    document.cookie = `identifier=${identifier};`;
                    document.cookie = `extraCodes=${JSON.stringify(response.user.invite_codes)};`;
                    document.cookie = `isClaimed=${response.user.claimed ? 1 : 0};`;
                    if (response.user.twitter && response.user.discord) {
                        document.cookie = `userProgress=2;`;
                    } else if (response.user.twitter) {
                        document.cookie = `userProgress=1;`;
                    } else {
                        document.cookie = `userProgress=0;`;
                    }
                    window.location.reload();
                }
            })
            .catch((error) => console.error('Error:', error));
        }
    });

    return [header, phraseContainer, subheader, confirmInput]
}

/**
 * Function to load the Steps page
 */
function loadSteps() {
    slideAnimation()
    let progress = getProgress("userProgress").replace('=', '');
    let isClaimed = getProgress("isClaimed").replace('=', '');
    if (isClaimed && isClaimed == 1) {
        showClaimedPage()

        let emptySpace = document.createElement("div");
        emptySpace.style.display = "none"
        return emptySpace
    }

    // Poins
    let pointsOuter = document.createElement("div");
    pointsOuter.className = "columnContainer";
    let containerTitle = document.createElement("div");
    containerTitle.innerText = "Rewards"
    containerTitle.style.textAlign = "left";
    containerTitle.style.height = "auto";
    containerTitle.style.width = "95%";
    containerTitle.style.fontSize = "18px";
    containerTitle.style.margin = "0 0 5px 0";
    let container2Title = document.createElement("div");
    container2Title.innerText = "Verify"
    container2Title.style.textAlign = "left";
    container2Title.style.height = "auto";
    container2Title.style.width = "95%";
    container2Title.style.fontSize = "18px";
    let containerSubTitle = document.createElement("div");
    containerSubTitle.innerText = "To be staked & yield MEV-Share"
    containerSubTitle.style.color = grayColor
    containerSubTitle.style.textAlign = "left";
    containerSubTitle.style.fontSize = "14px";
    containerSubTitle.style.width = "95%";
    containerSubTitle.style.marginBottom = "5%";
    let pointsContainer = document.createElement("div");
    pointsContainer.className = "form__btn_container";
    pointsContainer.style.justifyContent = "space-around";
    pointsContainer.style.width = "95%";
    pointsContainer.innerHTML = `
    <img src="./img/icon-128.png" style="height: 40px; width: 40px; border-radius: 50%;"><div class="form__connect" style="width: 80%; position: relative; text-align: left;"><div style="width: 100%; font-size: 17px;">MetaPro</div><div style="width: 100%; font-size: 16px; color: var(--gray-color);">586 $PRO</div><div style="position: absolute; top: 0px; right: 0px; font-size: 12px; color: var(--gray-color);"></div></div>
    `


    let container = document.createElement("div");
    container.className = "form__connect";
    container.style.justifyContent = "space-between";
    container.style.height = "90%";
    container.style.width = "100%";

    // Header
    let headerContainer = document.createElement("div");
    headerContainer.className = "header";
    headerContainer.style.justifyContent = "space-evenly"
    headerContainer.style.width = "100%";

    let header = document.createElement("h1");
    header.innerText = "Early Access";
    header.style.color = grayColor;
    header.style.marginTop = '0';

    let stepsContainer = document.createElement("div");
    stepsContainer.className = "form__connect stepsContainer";
    stepsContainer.style.width = "100%";

    let stepStats = document.createElement("div");
    stepStats.className = "rowContainer";
    stepStats.style.width = "95%";
    stepStats.style.marginBottom = "10px";
    stepStats.style.justifyContent = "space-between";
    let refreshBtn = document.createElement("a")
    refreshBtn.style.color = grayColor
    refreshBtn.style.background = shadowColor
    refreshBtn.style.width = "auto"
    refreshBtn.style.padding = "5px"
    refreshBtn.style.margin = "0"
    refreshBtn.style.transition = "rotate .5s"
    let currentRotation = 0;
    refreshBtn.innerHTML = '<i class="fa-solid fa-arrow-rotate-right"></i>';
    let stepNumbers = document.createElement("div");
    stepNumbers.style.color = grayColor
    stepNumbers.innerHTML = `${progress ? progress : 0}/3`;


    let stepX = document.createElement("a")
    stepX.innerHTML = `Follow our <i class="fa-brands fa-x-twitter" style="place-self: center; margin-left: 5px;"></i>`

    let stepDiscord = document.createElement("a")
    stepDiscord.innerHTML = `Join our <i class="fa-brands fa-discord" style="place-self: center; margin-left: 5px;"></i>`

    let stepInviteCode = document.createElement("a")
    stepInviteCode.innerHTML = `Register`

    if (progress && progress == 1) {
        stepDiscord.onclick = () => {
            // Authorize
            window.open('https://discord.com/oauth2/authorize?client_id=1211903133697966151&response_type=code&redirect_uri=https%3A%2F%2Fmetapro.app%2F&scope=identify+guilds.join')
        }
        stepX.className = `reject`
        stepX.style.color = `var(--success-color)`
        stepX.innerHTML = `<i class="fa-solid fa-check"></i>`
        stepInviteCode.className = `reject`
    } else if (progress && progress == 2) {
        stepX.className = `reject`
        stepX.style.color = `var(--success-color)`
        stepX.innerHTML = `<i class="fa-solid fa-check"></i>`
        stepDiscord.className = `reject`
        stepDiscord.style.color = `var(--success-color)`
        stepDiscord.innerHTML = `<i class="fa-solid fa-check"></i>`
        stepInviteCode.onclick = () => {
            fetch("https://metapro.app/claim", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    invited_by: getProgress("invited_by").replace('=', ''),
                    identifier: getProgress("identifier").replace('=', ''),
                    timestamp: Date.now(),
                })
            })
            .then(response => response.json())
            .then(data => { 
                if (data.status == "ok") {
                    document.cookie = `isClaimed=1`;
                    showClaimedPage()

                    let emptySpace = document.createElement("div");
                    emptySpace.style.display = "none"
                    return emptySpace
                }
            }).catch ((error) => console.log(error));
        }
    } else {
        stepX.onclick = () => {
            // Authorize
            window.open('https://twitter.com/i/oauth2/authorize?response_type=code&client_id=UGY3dHoxRE5EX0tzd19qcTZ1dGw6MTpjaQ&redirect_uri=https://metapro.app/&scope=tweet.read%20tweet.write%20users.read%20like.write&state=state&code_challenge=challenge&code_challenge_method=plain')
        }
        stepDiscord.className = `reject`
        stepDiscord.style.color = grayColor
        stepInviteCode.className = `reject`
        stepInviteCode.style.color = grayColor
    }

    headerContainer.insertAdjacentElement("beforeend", header);
    pointsOuter.insertAdjacentElement("beforeend", containerTitle);
    pointsOuter.insertAdjacentElement("beforeend", containerSubTitle);
    pointsOuter.insertAdjacentElement("beforeend", pointsContainer);
    container.insertAdjacentElement("beforeend", pointsOuter);
    stepStats.insertAdjacentElement("beforeend", stepNumbers);
    stepStats.insertAdjacentElement("beforeend", refreshBtn);
    stepsContainer.insertAdjacentElement("beforeend", container2Title);
    stepsContainer.insertAdjacentElement("beforeend", stepStats);
    stepsContainer.insertAdjacentElement("beforeend", stepX);
    stepsContainer.insertAdjacentElement("beforeend", stepDiscord);
    stepsContainer.insertAdjacentElement("beforeend", stepInviteCode);
    container.insertAdjacentElement("beforeend", stepsContainer);

    refreshBtn.onclick = () => {
        let progress = getProgress("userProgress").replace('=', '');
        let isClaimed = getProgress("isClaimed").replace('=', '');
        if (isClaimed && isClaimed == 1) {
            showClaimedPage()
        }
        stepNumbers.innerHTML = `${progress ? progress : 0}/3`;
        currentRotation += 360;
        refreshBtn.style.rotate = `${currentRotation}deg`;
        if (progress && progress == 1) {
            stepDiscord.className = ""
            stepDiscord.style.color = whiteColor
            stepDiscord.onclick = () => {
                // Authorize
                window.open('https://discord.com/oauth2/authorize?client_id=1211903133697966151&response_type=code&redirect_uri=https%3A%2F%2Fmetapro.app%2F&scope=identify+guilds.join')
            }
            stepX.className = `reject`
            stepX.style.color = `var(--success-color)`
            stepX.innerHTML = `<i class="fa-solid fa-check"></i>`
            stepInviteCode.className = `reject`
        } else if (progress && progress == 2) {
            stepInviteCode.className = ""
            stepInviteCode.style.color = whiteColor
            stepX.className = `reject`
            stepX.style.color = `var(--success-color)`
            stepX.innerHTML = `<i class="fa-solid fa-check"></i>`
            stepDiscord.className = `reject`
            stepDiscord.style.color = `var(--success-color)`
            stepDiscord.innerHTML = `<i class="fa-solid fa-check"></i>`
            stepInviteCode.onclick = () => {
                fetch("https://metapro.app/claim", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        invited_by: getProgress("invited_by").replace('=', ''),
                        identifier: getProgress("identifier").replace('=', ''),
                        timestamp: Date.now(),
                    })
                })
                .then(response => response.json())
                .then(data => { 
                    if (data.status == "ok") {
                        document.cookie = `isClaimed=1`;
                        showClaimedPage();
                    }
                }).catch ((error) => console.log(error));
            }
        } else {
            stepX.onclick = () => {
                // Authorize
                window.open('https://twitter.com/i/oauth2/authorize?response_type=code&client_id=UGY3dHoxRE5EX0tzd19qcTZ1dGw6MTpjaQ&redirect_uri=https://metapro.app/&scope=tweet.read%20tweet.write%20users.read%20like.write&state=state&code_challenge=challenge&code_challenge_method=plain')
            }
            stepDiscord.className = `reject`
            stepDiscord.style.color = grayColor
            stepInviteCode.className = `reject`
            stepInviteCode.style.color = grayColor
        }
    };
    refreshBtn.ontransitionend = () => {
    }

    return container;
}

function showRegistration() {
    slideAnimation()
    let isGenerated = getProgress("isGenerated").replace('=', '');

    // Container
    let container = document.createElement("div");
    container.className = "form__connect";
    container.style.justifyContent = "space-between";
    container.style.height = "100%";
    container.style.width = "100%";

    // Confirm Saved info
    let confirmbtnContainer = document.createElement("div")
    confirmbtnContainer.className = "form__connect";
    confirmbtnContainer.style.width = "90%";

    let confirmInput = document.createElement("a");
    confirmInput.className = "reject";
    confirmInput.innerText = "Done";
    confirmbtnContainer.insertAdjacentElement("beforeend", confirmInput)

    // Header
    let headerContainer = document.createElement("div");
    headerContainer.className = "header";
    headerContainer.style.justifyContent = "space-evenly"
    headerContainer.style.width = "100%";

    let header = document.createElement("h1");
    header.innerText = "Recovery Phrase";
    header.style.color = grayColor;
    header.style.margin = '10px 0';
    
    let copyContainer = document.createElement("div");
    copyContainer.innerHTML = `<i class="fa-solid fa-clipboard" style="margin-right: 5px"></i> Click to Copy`;
    copyContainer.className = "copyContainer"

    copyContainer.onclick = () => {
        navigator.clipboard.writeText(isGenerated)
        copyContainer.innerHTML = `<i class="fa-solid fa-clipboard" style="margin-right: 5px"></i> Copied`
    }

    // TOS agreements 
    let tosContainer = document.createElement("div");
    tosContainer.style.display = "flex"
    tosContainer.style.justifyContent = "flex-start"
    tosContainer.style.width = "100%"
    tosContainer.style.paddingBottom = "1%"
    tosContainer.style.marginTop = "5%"
    tosContainer.style.alignItems = "center"
    let tosCheck = document.createElement("input");
    tosCheck.required = true;
    tosCheck.type = "checkbox";
    let tosText = document.createElement("span");
    tosText.innerHTML = `&nbsp; I've <a class="link-me" disabled style="cursor: default; color: var(--dark-gray-color); opacity: .8">Saved</a> the Recovery Phrase`
    tosCheck.addEventListener('change', function() {
        if (this.checked) {
            confirmInput.classList.remove("reject");
            confirmInput.style.cursor = "pointer"
            confirmInput.onclick = () => {
                document.cookie = "isSaved=1;"
                document.getElementById("onboardInner").innerHTML = "";
                document.getElementById("loadingDots").className = "line";
                document.getElementById("loadingDots2").className = "line disable";
                document.getElementById("loadingDots3").className = "line disable";
                document.getElementById("onboardInner").insertAdjacentElement("beforeend", loadSteps());
            };
        } else {
            confirmInput.classList.add("reject");
            confirmInput.style.cursor = "not-allowed"
            confirmInput.onclick = () => {};
        }
    });
    tosContainer.insertAdjacentElement("beforeend", tosCheck);
    tosContainer.insertAdjacentElement("beforeend", tosText);
    confirmbtnContainer.insertAdjacentElement("afterbegin", tosContainer);

    let importInput = document.createElement("div");
    importInput.className = "form__connect";
    importInput.style.width = "100%";
    importInput.id = "recoveryPhraseContainer"

    let wordsList = [];
    isGenerated.split(" ").forEach((element, index) => {
        if (index % 2 == 0) {
            let words = document.createElement("div");
            words.className = "form__btn_container";
            words.style.width = "95%"
            wordsList.push(words);
            importInput.insertAdjacentElement("beforeend", words)
        }

        // Word Box
        let word = document.createElement("div");
        word.className = "passPhraseContainer"
        word.style.margin = "5px"
        word.style.position = "relative"
        word.innerHTML += `<x>${index + 1}.</x> ${element}`;
        wordsList[wordsList.length - 1].insertAdjacentElement("beforeend", word)
    });

    headerContainer.insertAdjacentElement("beforeend", header)

    return [header, headerContainer, importInput, copyContainer, confirmbtnContainer]
}

function showClaimedPage() {

    let extraCodes = getProgress("extraCodes").replace('=', '');
    extraCodes = JSON.parse(extraCodes);

    let stepsCounter = document.getElementById("stepsCounter");
    stepsCounter.remove()
    let onboardInner = document.getElementById("onboardInner");
    onboardInner.innerHTML = "";
    onboardInner.style.justifyContent = "space-between"

    // Header
    let headerContainer = document.createElement("div");
    headerContainer.style.placeSelf = "baseline"
    headerContainer.style.textAlign = "left"
    headerContainer.style.width = "100%"
    let header = document.createElement("div");
    header.style.fontSize = '16px'
    header.innerText = "Current Status"
    let subHeader = document.createElement("div");
    subHeader.style.fontSize = '14px'
    subHeader.style.color = grayColor
    subHeader.style.marginTop = '1px'
    subHeader.innerText = "Early-Access MetaPro User"

    // User Status
    let statusContainer = document.createElement("div");
    statusContainer.style.fontSize = "15px"
    statusContainer.style.marginTop = "10px"
    statusContainer.style.width = "100%"
    statusContainer.style.height = "100%"
    statusContainer.style.position = "relative"

    // balanceContainer
    let balanceContainer = document.createElement("div");
    balanceContainer.className = "balance-container columnContainer";
    let balanceHeader = document.createElement("div");
    balanceHeader.className = "balance-header";
    balanceHeader.innerText = " PRO";
    let balance = document.createElement("div");
    balance.className = "balance";
    balance.innerText = "My Points";

    let registered = document.createElement("div");
    registered.className = "rowContainer UserInfo";
    registered.innerHTML = `Registered <div></div>`
    let invited = document.createElement("div");
    invited.className = "rowContainer UserInfo";
    invited.innerHTML = `Referrals <a class="link-me"></a>`
    let allowlist = document.createElement("div");
    allowlist.className = "rowContainer UserInfo";
    allowlist.style.marginTop = "0";
    allowlist.innerHTML = `Private Sale <i style="color: var(--gray-color)" class="fa-solid fa-clock"></i>`
    let tokenType = document.createElement("div");
    tokenType.className = "rowContainer UserInfo";
    tokenType.style.marginTop = "8%"
    tokenType.innerHTML = `Token Type <a class="link-me">$PRO PRE-TOKEN</a>`
    let inviteReward = document.createElement("div");
    inviteReward.className = "rowContainer UserInfo";
    inviteReward.innerHTML = `<div class="rowContainer" style="width: auto;">Invite Bonus <div style="padding-left: 4px; filter: brightness(.7)">(per.)</div></div> <a class="link-me">+207 PRO</a>`
    // Invite
    let invite = document.createElement("div");
    invite.style.fontSize = '16px'
    invite.style.textAlign = "left"
    invite.innerText = "Invite Codes"
    let subInvite = document.createElement("div");
    subInvite.style.textAlign = "left"
    subInvite.style.fontSize = '14px'
    subInvite.style.color = grayColor
    subInvite.innerText = "Share and earn referral points"

    let inviteChart = document.createElement("div");
    inviteChart.className = 'progress-bar';
    inviteChart.style.background = `radial-gradient(closest-side, var(--black-color) 79%, transparent 80% 100%), conic-gradient(var(--dark-gray-color) 0.001%, var(--active-color) 0)`
    const style = document.createElement('style');
    document.head.appendChild(style);
    style.sheet.insertRule(`
    .progress-bar::before {
        content: '${extraCodes.filter(code => code[1]).length}/${extraCodes.length}';
        color: ${darkGrayColor};
        font-size: 17px;
    }
    `, 0);

    let inviteContainer = document.createElement("div");
    inviteContainer.className = "inviteContainer"
    inviteContainer.style.placeSelf = "baseline"
    inviteContainer.style.width = "100%"
    let rows = [];
    extraCodes.forEach((code, index) => {

        let codeElement = document.createElement("a");
        codeElement.className = "reject";
        codeElement.innerText = code[0];
        codeElement.style.fontSize = "14px";
        codeElement.style.margin = "10px 5px 0 0";

        if (code[1]) {
            codeElement.className = "reject used"
        } else {
            codeElement.onclick = () => {
                navigator.clipboard.writeText(`https://metapro.app/?ref=${code[0]}`)
            }
        }

        if (index % 2 == 0) {
            let rowContainer = document.createElement("div");
            rowContainer.className = "rowContainer";
            rows.push(rowContainer);
            inviteContainer.insertAdjacentElement("beforeend", rowContainer)
        } 
        rows[rows.length - 1].insertAdjacentElement("beforeend", codeElement)
    })

    // Private Sale
    let privateSaleContainer = document.createElement("div")
    
    let privateSaleBTN = document.createElement("a");
    privateSaleBTN.className = "privateSaleBTN"
    privateSaleBTN.style.margin = "0"

    let buttonText = document.createElement("div");
    buttonText.style.width = '100%'
    buttonText.style.textWrap = "pretty"
    buttonText.style.color = grayColor
    buttonText.style.fontSize = "13px"
    buttonText.style.padding = "10px 0px"
    buttonText.innerHTML = `Get notified through our <a class="link-me" target="_blank" href="https://twitter.com/theMetaPro" style="color: var(--light-gray-color); opacity: .8">Twitter</a>.`

    headerContainer.insertAdjacentElement("beforeend", header);
    // headerContainer.insertAdjacentElement("beforeend", subHeader);
    balanceContainer.insertAdjacentElement("beforeend", balance);
    balanceContainer.insertAdjacentElement("beforeend", balanceHeader);
    onboardInner.insertAdjacentElement("beforeend", balanceContainer);
    balanceContainer.insertAdjacentElement("beforeend", tokenType);
    balanceContainer.insertAdjacentElement("beforeend", inviteReward);
    statusContainer.insertAdjacentElement("beforeend", allowlist);
    statusContainer.insertAdjacentElement("beforeend", registered);
    statusContainer.insertAdjacentElement("beforeend", invited);
    // statusContainer.insertAdjacentElement("beforeend", inviteChart);
    headerContainer.insertAdjacentElement("beforeend", statusContainer);
    onboardInner.insertAdjacentElement("beforeend", headerContainer);
    inviteContainer.insertAdjacentElement("afterbegin", subInvite);
    inviteContainer.insertAdjacentElement("afterbegin", invite);
    onboardInner.insertAdjacentElement("beforeend", inviteContainer);
    privateSaleContainer.insertAdjacentElement("beforeend", privateSaleBTN);
    privateSaleContainer.insertAdjacentElement("beforeend", buttonText);
    onboardInner.insertAdjacentElement("beforeend", privateSaleContainer);

    fetch("https://metapro.app/recoverUser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            invited_by: "",
            identifier: getProgress("identifier").replace('=', ''),
            timestamp: Date.now(),
        })
    })
    .then(response => response.json())
    .then(async (response) => {
        console.log(response)
        if (response.status == "ok") {
            document.cookie = `extraCodes=${JSON.stringify(response.user.invite_codes)};`
            extraCodes = response.user.invite_codes;
            balanceHeader.innerText = response.user.points + " PRO";
            inviteChart.style.background = `radial-gradient(closest-side, var(--black-color) 79%, transparent 80% 100%), conic-gradient(var(--dark-gray-color) ${extraCodes.filter(code => code[1]).length / extraCodes.length * 100}%, var(--active-color) 0)`
            invited.innerHTML = `Referrals <a class="link-me">${extraCodes.filter(code => code[1]).length}/${extraCodes.length}</a>`
            allowlist.innerHTML = `Private Sale <i style="color: var(--gray-color)" class="fa-solid fa-clock"></i>`
            registered.innerHTML = `Registered <i class="fa-solid fa-check"></i>`
        }
    })
    .catch((error) => console.error('Error:', error));
}

function slideAnimation() {
    document.getElementById("onboardInner").classList.add("slideLeftAnimation")
    document.getElementById("onboardInner").onanimationend = () => {
        document.getElementById("onboardInner").classList.remove("slideLeftAnimation")
    }
}