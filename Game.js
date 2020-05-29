let past = []

setInterval(function () {
    document.getElementById("log").hidden = !player.settings.showLog
    if (past.length > 15) past.pop()
    updateLogText()
    updateInv()
}, 250)

function updateCrafting() {
    if (player.stage >= 2) {
        document.getElementById("craft").innerHTML = ''
        for (let i = 0; i < player.craftingQueue.length; i++) {
            let cq = player.craftingQueue[i]
            let label = cq.name + ": "
            for (let j = 0; j < cq.res.length; j++) {
                let res = cq.res[j]
                label += "[" + res[0] + ": " + res[1] + "]"
            }
            let inHtml =
                "<label class=crafting." + cq.name.replace(" ", "_") + ".label'>" + label + "</label>" +
                "<button id='crafting." + cq.name.replace(" ", "_") + ".button' style='margin-left: 5px' " +
                "onclick=\"craft(" + i + ")\">Craft</button><br>"
            console.log(inHtml)
            document.getElementById("craft").innerHTML += inHtml
        }
    }
}

function craft(cqPos) {
    let cq = player.craftingQueue[cqPos]
    for (let i = 0; i < cq.res.length; i++)
        switch (cq.res[i][0]) {
            case resourceTypes.WOOD:
                if (player.resources.wood < cq.res[i][1]) return
                break
            case resourceTypes.STONE:
                if (player.resources.stone < cq.res[i][1]) return
                break
        }
    for (let i = 0; i < cq.res.length; i++)
        switch (cq.res[i][0]) {
            case resourceTypes.WOOD:
                player.resources.wood -= cq.res[i][1]
                break
            case resourceTypes.STONE:
                player.resources.stone -= cq.res[i][1]
                break
        }
    cq.func()
    addToPastLog("[Crafted: " + cq.name + "]")
    player.craftingQueue.splice(cqPos, 1)
    updateCrafting()
}

function update() {
    switch (player.stage) {
        case 3:
            document.getElementById("mineButton").hidden = false
        case 2:
            document.getElementById("mainCraftingTabButton").hidden = false
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

function save() {
    localStorage.setItem("player", JSON.stringify(player))
    localStorage.setItem("uncraft", JSON.stringify(unCrafted))
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

function gather() {
    let gain = player.level.gather
    player.resources.wood += gain
    if (player.stage === 0) player.stage = 1
    else if (player.stage === 1 && player.resources.wood >= 20) {
        player.stage = 2
        player.craftingQueue.push(unCrafted.W1)
        updateCrafting()
    }
    update()
    addToPastLog("[+" + gain + " wood]")
}

function mine() {
    let gain = player.level.mine
    player.resources.stone += gain
    update()
    addToPastLog("[+" + gain + " stone]")
}