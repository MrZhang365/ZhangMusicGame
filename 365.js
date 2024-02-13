async function askForStart() {
    alert('欢迎来到小张音游\n屏幕上会出现6个通道，方块会随着音乐节奏而出现并且下落，当方块底部下落到红线下时，按下数字键或点击红线以下的区域即可将其消除\n请单击屏幕来开始游戏')
    
    // 科目三，启动！
    initBeatLine()    // 初始化点击线
    initChannels()    // 初始化所有方块通道

    document.onkeydown = handleKey    // 绑定事件监听器
    $('#paper').onmousedown = handleClick    // 绑定事件监听器 点击
    document.onclick = e => { e.preventDefault(); getBeats(); m$(); document.onclick = () => {} }

    $('#bgm').onpause = () => {    // 绑定事件监听器，计分
        alert(`方块数量：${total}\n命中数量：${score}\n命中率：${get100Score()}%`)
    }
    getBeats()
    m$()
}

askForStart()
