async function askForStart() {
    if (confirm('欢迎来到小张音游\n现在是否开始游戏？')) {
        // 科目三，启动！
        initChannels()    // 初始化所有方块通道
        initBeatLine()    // 初始化点击线

        document.onkeydown = handleKey    // 绑定事件监听器

        getBeats()    // 开始分析节拍
        $('#bgm').onpause = () => {    // 绑定事件监听器，计分
            alert(`方块数量：${total}\n命中数量：${score}\n命中率：${get100Score()}%`)
        }
        m$()    // 开始播放
    }
}

askForStart()