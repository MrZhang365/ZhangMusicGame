// 计分模块

var score = 0
var total = 0

async function totalAdd(num = 1) {
    total += num
}

async function scoreAdd(num = 1) {
    score += num
}

function get100Score() {
    return (score / total) * 100
}