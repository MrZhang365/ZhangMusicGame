async function askForStart() {
    alert('欢迎来到小张音游\n屏幕上会出现6个通道，方块会随着音乐节奏而出现并且下落，当方块底部下落到红线下时，按下数字键或点击红线以下的区域即可将其消除\n请单击屏幕来开始游戏')
    
    document.onclick = start
}

async function start(e) {
    e.preventDefault()
    document.onclick = () => {}
    await document.requestFullscreen()
    initBeatLine()
    initChannels()
    document.onkeydown = handleKey
    $('#paper').onclick = handleClick
    
    $('#bgm').onpause = async () => {    // 绑定事件监听器，计分
	await document.exitFullscreen()
        alert(`方块数量：${total}\n命中数量：${score}\n命中>率：${get100Score()}%`)
    }
    getBeats()
    m$()
}

askForStart()
