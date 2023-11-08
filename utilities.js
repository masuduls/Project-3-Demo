let userStrength = 6;
let userCunning = 6;
let userSpeed = 6;
let userFatigue = 30;
let userDefense;
let userOriginalFatigue;
let userDamage;
let cpuStrength = 6;
let cpuCunning = 6;
let cpuSpeed = 6;
let cpuFatigue = 30;
let cpuDefense;
let cpuOriginalFatigue;
let cpuDamage;
let isFinish = false;
let log = "";
let cpuResponse;

function randomizeStats() {
    let randomNum = Math.floor(Math.random() *2) + 1;
    if (randomNum === 1) {
        userStrength += Math.floor(Math.random() * 2);
        userCunning += Math.floor(Math.random() * 2);
        userSpeed -= Math.floor(Math.random() * 2);
        userFatigue -= Math.floor(Math.random() * 7);
    } else if (randomNum === 2) {
        userStrength -= Math.floor(Math.random() * 2);
        userCunning -= Math.floor(Math.random() * 2);
        userSpeed += Math.floor(Math.random() * 2);
        userFatigue += Math.floor(Math.random() * 7);
    }

    userOriginalFatigue = userFatigue;

    let cpuRandomNum = Math.floor(Math.random() * 2) + 1;
    if (cpuRandomNum === 1) {
        cpuStrength += Math.floor(Math.random() * 2);
        cpuCunning += Math.floor(Math.random() * 2);
        cpuSpeed -= Math.floor(Math.random() * 2);
        cpuFatigue -= Math.floor(Math.random() * 7);
    } else if (cpuRandomNum === 2) {
        cpuStrength -= Math.floor(Math.random() * 2);
        cpuCunning -= Math.floor(Math.random() * 2);
        cpuSpeed += Math.floor(Math.random() * 2);
        cpuFatigue += Math.floor(Math.random() * 7);
    }
 
    cpuOriginalFatigue = cpuFatigue;

    document.querySelector("#playerStrength").innerHTML = userStrength;
    document.querySelector("#playerSpeed").innerHTML = userSpeed;
    document.querySelector("#playerCunning").innerHTML = userCunning;
    document.querySelector("#playerFatigue").value = userFatigue;
    document.querySelector("#playerFatigue").max = userOriginalFatigue;
    
    document.querySelector("#cpuStrength").innerHTML = cpuStrength;
    document.querySelector("#cpuSpeed").innerHTML = cpuSpeed;
    document.querySelector("#cpuCunning").innerHTML = cpuCunning;
    document.querySelector("#cpuFatigue").value = cpuFatigue;
    document.querySelector("#cpuFatigue").max = cpuOriginalFatigue;

}

function attack() {
    document.querySelector("#attackButton").disabled = true;
    document.querySelector("#blockButton").disabled = true;
    document.querySelector("#finishingMoveButton").disabled = true;
    playerSwitchImage("punchP1.png", "stillP1.png");
    cpuSwitchImage("blockCPU.png", "stillCPU.png");
    userDamage = Math.floor((userStrength + userSpeed + userCunning) / (Math.floor((Math.random() * 3) + 1)));
    userDefense = userSpeed + (Math.floor(Math.random() * 6) + 1);
    log = log + "&gt; Player attacked and dealt " + userDamage + " damage. <hr>";
    playTurn(1);
}

function defend() {
    document.querySelector("#attackButton").disabled = true;
    document.querySelector("#blockButton").disabled = true;
    document.querySelector("#finishingMoveButton").disabled = true;
    playerSwitchImage("blockP1.png", "stillP1.png");
    userDefense = userSpeed + userCunning;
    log = log + "&gt; Player blocked. <hr>";
    playTurn(2);
}

function finishingMove() {
    document.querySelector("#attackButton").disabled = true;
    document.querySelector("#blockButton").disabled = true;
    document.querySelector("#finishingMoveButton").disabled = true;
    playerSwitchImage("uppercutP1.png", "stillP1.png");
    userDamage = Math.floor((userStrength + userSpeed) / (1 + Math.floor(Math.random() * 3)));
    userDefense = userSpeed + (Math.floor(Math.random() * 6) + 1);
    log = log + "&gt; Player attacked with a finishing move and dealt " + userDamage + " damage. <hr>";
    playTurn(3);
}

function playTurn(modifier) {
    let cpuFinish = cpuFatigue >= 2 * userFatigue || userFatigue < 0;
    if (cpuFinish) {
        cpuSwitchImage("uppercutCPU.png", "stillCPU.png");
        cpuDamage = Math.floor((cpuStrength + cpuSpeed) / (1 + Math.floor(Math.random() * 3)));
        log = log + "&gt; AI attacked with a finishing move and dealt " + cpuDamage + " damage. <hr>";
        if (cpuDamage - userDefense > 1) {
            cpuWin();
        } else if (cpuDamage - userDefense === 1) {
            playerSwitchImage("blockP1.png", "stillP1.png");
            userFatigue--;
            log = log + "&gt; Player took 1 damage. <hr>";
        } else {
            playerSwitchImage("blockP1.png", "stillP1.png");
            regainFatigue(1);
            log = log + "&gt; Player blocked all damage. Regaining Fatigue. <hr>";
        }
    } else {
        cpuResponse = Math.floor((Math.random() * 2) + 1);
        if (modifier === 1) {
            if (cpuResponse === 1) {
                cpuSwitchImage("punchCPU.png", "stillCPU.png");
                playerSwitchImage("blockP1.png", "stillP1.png");
                cpuDamage = Math.floor((cpuStrength + cpuSpeed + cpuCunning) / (1 + Math.floor(Math.random() * 3)));
                cpuDefense = cpuSpeed + (Math.floor((Math.random() * 6) + 1));
                log = log + "&gt; AI attacked and dealt " + cpuDamage + " damage. <hr>";
                calculateDamage(1);
                calculateDamage(2);
            } else {
                cpuDefense = cpuSpeed + cpuCunning;
                calculateDamage(1);
            }
        } else if (modifier === 2) {
            if (cpuResponse === 1) {
                cpuSwitchImage("punchCPU.png", "stillCPU.png");
                playerSwitchImage("blockP1.png", "stillP1.png");
                cpuDamage = Math.floor((cpuStrength + cpuSpeed + cpuCunning) / (1 + Math.floor(Math.random() * 3)));
                cpuDefense = cpuSpeed + (Math.floor(Math.random() * 6) + 1);
                log = log + "&gt; AI attacked and dealt " + cpuDamage + " damage. <hr>";
                calculateDamage(2);
            } else {
                cpuSwitchImage("blockCPU.png", "stillCPU.png");
                log = log + "&gt; AI blocked. <hr>";
                log = log + "&gt; AI and Player both blocked. Regaining fatigue. <hr>";
                regainFatigue(1);
                regainFatigue(2)
            }
        } else if (modifier === 3) {
            if (cpuResponse === 1) {
                cpuSwitchImage("punchCPU.png", "stillCPU.png");
                playerSwitchImage("blockP1.png", "stillP1.png");
                cpuDamage = Math.floor((cpuStrength + cpuSpeed + cpuCunning) / (1 + Math.floor(Math.random() * 3)));
                cpuDefense = cpuSpeed + (Math.floor(Math.random() * 6) + 1);
                log = log + "&gt; AI attacked and dealt " + cpuDamage + " damage. <hr>";
                calculateDamage(2);
                calculateDamage(3);
            } else {
                cpuDefense = cpuSpeed + cpuCunning;
                calculateDamage(3);
            }
        }
    }

    display();

}

function calculateDamage(modifier) {
    if (modifier === 1) {
        if (userDamage - cpuDefense > 0) {
            let damage = userDamage - cpuDefense;
            log = log + "&gt; AI took " + damage + " damage. Reducing Fatigue. <hr>";
            cpuFatigue = cpuFatigue - (userDamage - cpuDefense);
        } else {
            log = log + "&gt; AI blocked all damage. Regaining Fatigue. <hr>";
            regainFatigue(2);
        }
    } else if (modifier === 2) {
        if (cpuDamage - userDefense > 0) {
            let damage = cpuDamage - userDefense;
            log = log + "&gt; Player took " + damage + " damage. Reducing Fatigue. <hr>";
            userFatigue = userFatigue - (cpuDamage - userDefense);
        } else {
            log = log + "&gt; Player blocked all damage. Regaining Fatigue. <hr>";
            regainFatigue(1);
        }
    } else if (modifier === 3) {
        if (userDamage - cpuDefense > 1) {
            playerWin();
        } else if (userDamage - cpuDefense === 1) {
            cpuSwitchImage("blockCPU.png", "stillCPU.png");
            cpuFatigue--;
            log = log + "&gt; AI took 1 damage. <hr>";
        } else {
            cpuSwitchImage("blockCPU.png", "stillCPU.png");
            regainFatigue(2);
            log = log + "&gt; AI blocked all damage. Regaining Fatigue. <hr>";
        }
    }
}
function regainFatigue(modifier) {
    if (modifier === 1) {
        if (userFatigue < userOriginalFatigue) {
            userFatigue += Math.floor((Math.random() * 6) + 1);
            if (userFatigue >= userOriginalFatigue) {
                userFatigue = userOriginalFatigue;
            }
        }
    }
    if (modifier === 2) {
        if (cpuFatigue < cpuOriginalFatigue) {
            cpuFatigue += Math.floor((Math.random() * 6) + 1);
            if (cpuFatigue >= cpuOriginalFatigue) {
                cpuFatigue = cpuOriginalFatigue;
            }
        }
    }
}
function playerSwitchImage(imageLink, imageLink2) {
    document.getElementById("playerSprite").src = "Boxer-Sprites/" + imageLink;

    setTimeout(function(){
        document.getElementById("playerSprite").src = "Boxer-Sprites/" + imageLink2;
    }, 1000);
}

function cpuSwitchImage(imageLink, imageLink2) {
    document.getElementById("cpuSprite").src = "Boxer-Sprites/" + imageLink;

    setTimeout(function(){
        document.getElementById("cpuSprite").src = "Boxer-Sprites/" + imageLink2;
    }, 500);
}

function cpuWin() {
    document.querySelector("#attackButton").style.display = "none";
    document.querySelector("#blockButton").style.display = "none";
    document.querySelector("#finishingMoveButton").style.display = "none";

    playerSwitchImage("stumbleP1.png", "knockdownP1.png");
    
    setTimeout(function() {
        alert("AI has won! Refresh to try again!");
        console.log (`AI has won the match with a fatigue of : ${cpuFatigue}`);
    }, 1000);
}

function playerWin() {
    document.querySelector("#attackButton").style.display = "none";
    document.querySelector("#blockButton").style.display = "none";
    document.querySelector("#finishingMoveButton").style.display = "none";

    cpuSwitchImage("stumbleCPU.png", "knockdownCPU.png");

    setTimeout(function() {
        alert("You have won! Refresh to try again!");
        console.log (`You have won the match with a fatigue of : ${userFatigue}`);
    }, 1000);
}


function display() {
    document.querySelector("#attackButton").disabled = false;
    document.querySelector("#blockButton").disabled = false;
    
    isFinish = (userFatigue >= 2 * cpuFatigue || cpuFatigue < 0) ? true : false;

    if (isFinish) {
        document.getElementById("finishingMoveButton").disabled = false;
    } else {
        document.getElementById("finishingMoveButton").disabled = true;
    }
    if (userFatigue < 0) {
        document.querySelector("#playerFatigue").value = 0;
    } else {
        document.querySelector("#playerFatigue").value = userFatigue;
    }
    if (cpuFatigue < 0) {
        document.querySelector("#cpuFatigue").value = 0
    } else {
        document.querySelector("#cpuFatigue").value = cpuFatigue;
    }
    document.getElementById("logContent").innerHTML = log;
}

document.getElementById("attackButton").addEventListener("click", attack);
document.getElementById("blockButton").addEventListener("click", defend);
document.getElementById("finishingMoveButton").addEventListener("click", finishingMove);

