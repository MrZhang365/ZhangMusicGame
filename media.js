function m$() { return $('#bgm').play() }
function m$$() { return $('#bgm').pause() }

function onBeat() {
    aBlock('#44FF00', random(0, 6))
}

function getBeats() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const sourceNode = audioCtx.createMediaElementSource($('#bgm'));
    sourceNode.connect(audioCtx.destination);

    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 2048; // FFT大小设定为2048
    sourceNode.connect(analyser);
    analyser.connect(audioCtx.destination);
    
    // 将音频数据转换成Float32Array格式
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Float32Array(bufferLength);

    function calculateBeatStrength() {
        analyser.getFloatTimeDomainData(dataArray);
        
        let sumOfSquares = 0;
        for (let i = 0; i < bufferLength; ++i) {
            sumOfSquares += Math.pow(Math.abs(dataArray[i]), 2);
        }
        
        return sumOfSquares / bufferLength;
    }
    
    setInterval(() => {
        const currentBeatStrength = calculateBeatStrength();

        if (currentBeatStrength >= 0.1355) onBeat()
    }, 98);
}