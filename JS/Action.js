function gather() {
    let gain = player.level.gather
    player.resources.wood += gain
    if (player.stage === 0) player.stage = 1
    else if (player.stage === 1 && player.resources.wood >= 20) {
        player.stage = 2
        player.researchQueue.push(unResearched.W1)
        updateResearch()
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