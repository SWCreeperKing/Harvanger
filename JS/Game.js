let past = []
let isDebugger = false

setInterval(function () {
    document.getElementById("log").hidden = !player.settings.showLog
    if (past.length > 15) past.pop()
    updateLogText()
    updateInv()
}, 250)

function update() {
    switch (player.stage) {
        case 3:
            document.getElementById("mineButton").hidden = false
        case 2:
            document.getElementById("mainResearchTabButton").hidden = false
        case 1:
            document.getElementById("mainTabDiv").style.display = ""
            document.getElementById("sideGameStuff").style.display = ""
    }
}

function init() {
    let jString = localStorage.getItem("player")
    if (jString !== null) player = JSON.parse(jString)
    let before = {...player.settings};
    if (before.showLog) document.getElementById("showLogCheck").click()
    player.settings = before
    update()
}

function wipeSave() {
    if (confirm("Are you sure you want to wipe your save?")) {
        localStorage.removeItem("player")
        location.reload()
    }
}

function updateLogText() {
    let sb = ""
    for (let i = 0; i < past.length && i < 10; i++) {
        if (past[i] === undefined) continue
        if (i !== 0) sb += "<br>"
        sb += past[i]
    }
    if (past.length > 10) past.pop()
    document.getElementById("log").innerHTML = sb
}

function addToPastLog(text) {
    updateInv()
    if (!player.settings.showLog) return
    past.unshift(text)
    updateLogText()
}

function updateInv() {
    updateInventoryText("inv")
}