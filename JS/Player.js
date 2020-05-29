const resourceTypes = {
    WOOD: 'wood',
    STONE: 'stone'
}

let player = {
    stage: 0,
    level: {
        gather: 1,
        mine: 1
    },
    resources: {
        wood: 0,
        stone: 0
    },
    settings: {
        showLog: true
    },
    researchQueue: [],
    researches: []
}

let unResearched = {
    "W1": {
        name: "Workbench", res: [[resourceTypes.WOOD, 20]],
        func: function () {
            player.researchQueue.push(unResearched.G1)
            player.researchQueue.push(unResearched.M1)
        }
    },
    "G1": {
        name: "Wooden Axe", res: [[resourceTypes.WOOD, 25]],
        func: function () {
            player.level.gather++
        }
    },
    "M1": {
        name: "Wooden Pickaxe", res: [[resourceTypes.WOOD, 35]],
        func: function () {
            player.stage = 3
            player.researchQueue.push(unResearched.G2)
            player.researchQueue.push(unResearched.M2)
            update()
        }
    },
    "G2": {
        name: "Stone Axe", res: [[resourceTypes.WOOD, 10], [resourceTypes.STONE, 15]],
        func: function () {
            player.level.gather *= 3
        }
    },
    "M2": {
        name: "Stone Pickaxe", res: [[resourceTypes.WOOD, 15], [resourceTypes.STONE, 20]],
        func: function () {
            player.level.mine *= 4
        }
    }
}

function updateInventoryText(elementId) {
    let sb = ""
    if (player.resources.wood > 0) sb += "Wood: " + player.resources.wood + " <br>"
    if (player.resources.stone > 0) sb += "Stone: " + player.resources.stone + " <br>"
    document.getElementById(elementId).innerHTML = sb
}

function toggleLog() {
    player.settings.showLog = !player.settings.showLog
}