function updateResearch() {
    if (player.stage >= 2) {
        document.getElementById("research").innerHTML = ''
        for (let i = 0; i < player.researchQueue.length; i++) {
            let cq = player.researchQueue[i]
            let label = cq.name + ": "
            for (let j = 0; j < cq.res.length; j++) {
                let res = cq.res[j]
                label += "[" + res[0] + ": " + res[1] + "]"
            }
            let inHtml =
                "<label>" + label + "</label><button style='margin-left: 7px' " +
                "onclick=\"research(" + i + ")\">Research</button><br>"
            console.log(inHtml)
            document.getElementById("research").innerHTML += inHtml
        }
    }
}

function research(cqPos) {
    let cq = player.researchQueue[cqPos]
    if (!resourceCheckAndRemove(cq.res)) return
    cq.func()
    addToPastLog("[Researched: " + cq.name + "]")
    player.researchQueue.splice(cqPos, 1)
    updateResearch()
}

function resourceCheckAndRemove(res) {
    if (!resourceCheck(res)) return false
    resourceRemove(res)
    return true;
}

function resourceCheck(res) {
    for (let i = 0; i < res.length; i++)
        switch (res[i][0]) {
            case resourceTypes.WOOD:
                if (player.resources.wood < res[i][1]) return false
                break
            case resourceTypes.STONE:
                if (player.resources.stone < res[i][1]) return false

        }
    return true
}

function resourceRemove(res) {
    for (let i = 0; i < res.length; i++)
        switch (res[i][0]) {
            case resourceTypes.WOOD:
                player.resources.wood -= res[i][1]
                break
            case resourceTypes.STONE:
                player.resources.stone -= res[i][1]
                break
        }
}