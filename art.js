// 好吧 原谅我没什么美术能力还用art来命名这个脚本

function a$() {
    return $('#paper')
}

function a$$() {
    const paper = a$()
    
    paper.width = window.innerWidth
    paper.height = window.innerHeight

    const ctx = paper.getContext('2d')

    ctx.width = paper.width
    ctx.height = paper.height

    return ctx
}

const ctx = a$$()
var blocks = []
const channelNum = 6    // 建立6个通道
const channelX = []
const channelWidth = Math.round(window.innerWidth / channelNum)
const beatLine = window.innerHeight - channelWidth * 0.8

function aClear(x1 = 0, y1 = 0, w = window.innerWidth, h = window.innerHeight) {
    ctx.clearRect(x1, y1, w, h)
}

function aXY2Cav(x, y) { return { x: Math.round(x - a$().getBoundingClientRect().left), y: Math.round(y - a$().getBoundingClientRect().top) } }

function aDraw(color, x, y, w, h) {
    ctx.fillStyle = color
    ctx.fillRect(x, y, w, h)
}

function aAutoMove(block) {
    return setInterval(() => {
        if (block.y >= window.innerHeight) {
            clearInterval(block.taskId)
            aClear(block.x, block.y, block.width, block.height)
            blocks = blocks.filter(b => b !== block)
            return
        }

        aClear(block.x, block.y, block.width, 10)
        aDraw(block.color, block.x, block.y + block.height, block.width, 10)
        block.y += 10
    }, 10)
}

function aBlock(color, channel) {
    ctx.fillStyle = color
    const newBlock = {
        color, channel,
        x: channel * channelWidth + channelWidth * 0.3,
        y: 0,
        width: channelWidth * 0.6,
        height: channelWidth * 0.6,
    }

    aDraw(color, newBlock.x, newBlock.y, newBlock.width, newBlock.height)
    const index = blocks.push(newBlock) - 1
    blocks[index].taskId = aAutoMove(blocks[index])
    totalAdd()
}

function aDrawLine(color, x1, y1, x2, y2) {
    ctx.strokeStyle = color
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)

    ctx.stroke()
}

function initChannels() {
    // 初始化所有通道
    for (let i = 0; i < channelNum; i++) {
        channelX.push((i + 1) * channelWidth)
    }

    for (let x of channelX) {
        aDrawLine('#44FF00', x, 0, x, ctx.height)
    }
}

function initBeatLine() {
    aDrawLine('#FF0000', 0, beatLine, window.innerWidth, beatLine)
}

function beatChannel(channel) {
    for (let block of blocks.filter(b => b.channel === channel)) {
        if (block.y + block.height >= beatLine) {
            clearInterval(block.taskId)
            aClear(block.x, block.y, block.width, block.height)
            blocks = blocks.filter(b => b !== block)
            scoreAdd()
        }
    }
}

function handleKey(ee) {
    // 离谱 我为什么要把event写成ee
    if (ee.key.toLowerCase() === 'f12' || ee.key.toLowerCase() === 'f5') return      // 不要禁用F12和F5
    ee.preventDefault()
    const key = ee.key.toLowerCase()
    const allowKeys = ['1', '2', '3', '4', '5', '6']

    if (!allowKeys.includes(key)) return
    const channel = allowKeys.indexOf(key)

    beatChannel(channel)
}