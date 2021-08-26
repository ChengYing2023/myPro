//主體與蘋果的大小
const blockSize = 20;
//格子數
const blockCount = 30;
//玩家人數
let Player;
//取得難度
let Difficulty;
//更新速率變數
let gameInterval;
//Player1分數變數
let score;
//Plyaer2分數變數
let score2;
//挑戰模式變數
let challMoulde;
//遊戲時間
let playTime;
//計時器
let timeCount;
//Player1的物件
let snake = {};
//Player2的物件
let snake2 = {};
//蘋果的物件 
let apple = {};

//遊戲開始
function gameStart() {
    //取得玩家人數
    Player = parseInt(document.getElementById("Player").options.selectedIndex);
    //取得速度
    Difficulty = parseInt(document.getElementById("Difficulty").options.selectedIndex);

    if (Player === 0) {
        snake = {
            body: [
                { x: Math.floor(Math.random() * blockCount), y: Math.floor(Math.random() * blockCount) }
            ],
            size: 1,
            direction: { x: 0, y: 0 }
        }
    } else {
        do {
            snake = {
                body: [
                    { x: Math.floor(Math.random() * blockCount), y: Math.floor(Math.random() * blockCount) }
                ],
                size: 1,
                direction: { x: 0, y: 0 }
            }
            snake2 = {
                body: [
                    { x: Math.floor(Math.random() * blockCount), y: Math.floor(Math.random() * blockCount) }
                ],
                size: 1,
                direction: { x: 0, y: 0 }
            }
        } while ((snake.body[0].x === snake2.body[0].x) && (snake.body[0].y === snake2.body[0].y));
        console.log(snake.body[0].x);
        console.log(snake.body[0].y);
    }

    score = 0;
    document.getElementById('score_id').innerHTML = `玩家1:${score}`;
    score2 = 0;
    document.getElementById('score_id2').innerHTML = `玩家2:${score2}`;

    clearInterval(playTime);
    timeCount = 0;
    gameTime();
    updateGameLevel(Difficulty);
    putApple();
}

//場景製作
function updateCanvas() {
    let canvas = document.getElementById('canvas_id')
    let context = canvas.getContext('2d')

    context.fillStyle = 'rgb(102, 102, 102)'
    context.fillRect(0, 0, canvas.width, canvas.height)

    //fillRect (左上角開始計算 X ,左上角開始計算 Y , 寬 , 高)

    if (parseInt(Player) === 0) {
        context.fillStyle = 'black';
        for (let i = 0; i < snake.body.length; i++) {
            context.fillRect(
                snake.body[i].x * blockSize,
                snake.body[i].y * blockSize,
                blockSize - 1,
                blockSize - 1
            )
        }
    } else {
        context.fillStyle = 'black';
        for (let i = 0; i < snake.body.length; i++) {
            context.fillRect(
                snake.body[i].x * blockSize,
                snake.body[i].y * blockSize,
                blockSize - 1,
                blockSize - 1
            )
        }
        context.fillStyle = 'blue';
        for (let i = 0; i < snake2.body.length; i++) {
            context.fillRect(
                snake2.body[i].x * blockSize,
                snake2.body[i].y * blockSize,
                blockSize - 1,
                blockSize - 1
            )
        }
    }


    context.fillStyle = 'red'
    context.fillRect(
        apple.x * blockSize,
        apple.y * blockSize,
        blockSize - 1,
        blockSize - 1
    )
}

//設定頁面更新速率
function updateGameLevel(newLevel) {
    let speed;
    clearInterval(gameInterval);
    gameInterval = undefined;
    switch (newLevel) {
        case 0:
            speed = 0;
            gameInterval = setInterval(gameRoutine, 1000 / (10 + speed));
            break;
        case 1:
            speed = 5;
            gameInterval = setInterval(gameRoutine, 1000 / (10 + speed));
            break;
        case 2:
            speed = 10;
            gameInterval = setInterval(gameRoutine, 1000 / (10 + speed));
            break;
        case 3:
            speed = 15;
            gameInterval = setInterval(gameRoutine, 1000 / (10 + speed));
            break;
        default:
            challenge(0);
    }
}

//頁面更新
function gameRoutine() {
    moveSnake();

    if (snakeIsDead()) {
        gameOver();
        //如果沒有回傳，屍體會直接消失
        return 0;
    }
    if (Player === 0) {
        if (snake.body[0].x === apple.x &&
            snake.body[0].y === apple.y) {
            eatApple(0);
        }
    } else {
        if (snake.body[0].x === apple.x &&
            snake.body[0].y === apple.y) {
            eatApple(0);
        }

        if (snake2.body[0].x === apple.x &&
            snake2.body[0].y === apple.y) {
            eatApple(1);
        }
    }

    updateCanvas();
}

//挑戰模式
function challenge(x) {
    challMoulde = x;
    clearInterval(gameInterval);
    gameInterval = setInterval(gameRoutine, 1000 / (10 + challMoulde));
    setTimeout(() => {
        challMoulde += 1;
        return challenge(challMoulde);
    }, 10000);
}

//移動設定
function moveSnake() {
    if (Player === 0) {
        let newBlock = {
            //取的主體位置,根據鍵盤輸入方向移動
            x: snake.body[0].x + snake.direction.x,
            y: snake.body[0].y + snake.direction.y
        }
        //將newBlock放在最前方，
        snake.body.unshift(newBlock);
        while (snake.body.length > snake.size) {
            snake.body.pop();
        }

    } else {
        let newBlock = {
            x: snake.body[0].x + snake.direction.x,
            y: snake.body[0].y + snake.direction.y
        }
        snake.body.unshift(newBlock);

        while (snake.body.length > snake.size) {
            snake.body.pop();
        }

        let newBlock2 = {
            x: snake2.body[0].x + snake2.direction.x,
            y: snake2.body[0].y + snake2.direction.y
        }

        snake2.body.unshift(newBlock2);

        while (snake2.body.length > snake2.size) {
            snake2.body.pop();
        }
    }
}

//放置蘋果
function putApple() {

    apple = {
        x: Math.floor(Math.random() * blockCount),
        y: Math.floor(Math.random() * blockCount)
    }
    if (Player === 0) {
        for (let i = 0; i < snake.body.length; i++) {
            if (snake.body[i].x === apple.x &&
                snake.body[i].y === apple.y) {
                putApple();
                break;
            }
        }

    } else {
        //身體若與蘋果重生重疊就重新放蘋果
        for (let i = 0; i < snake.body.length; i++) {
            if (snake.body[i].x === apple.x &&
                snake.body[i].y === apple.y) {
                putApple();
                break;
            }
        }
        for (let i = 0; i < snake2.body.length; i++) {
            if (snake2.body[i].x === apple.x &&
                snake2.body[i].y === apple.y) {
                putApple();
                break;
            }
        }
    }
}

//吃蘋果
function eatApple(whoEat) {
    if (whoEat === 0) {
        snake.size += 1;
        putApple();
        score++;
        document.getElementById('score_id').innerHTML = `玩家1:${score}`;
    } else {
        snake2.size += 1;
        putApple();
        score2++;
        document.getElementById('score_id2').innerHTML = `玩家2:${score2}`;
    }
}

//檢查位置是否重疊
function snakeIsDead() {

    if (Player === 0) {
        // 撞牆
        if (snake.body[0].x < 0) {
            return true;
        } else if (snake.body[0].x >= blockCount) {
            return true;
        } else if (snake.body[0].y < 0) {
            return true;
        } else if (snake.body[0].y >= blockCount) {
            return true;
        }
        // 自撞
        for (let i = 1; i < snake.body.length; i++) {
            if (snake.body[0].x === snake.body[i].x &&
                snake.body[0].y === snake.body[i].y) {
                return true;
            }
        }

    } else {
        // 撞牆
        if (snake.body[0].x < 0) {
            return true;
        } else if (snake.body[0].x >= blockCount) {
            return true;
        } else if (snake.body[0].y < 0) {
            return true;
        } else if (snake.body[0].y >= blockCount) {
            return true;
        }

        if (snake2.body[0].x < 0) {
            return true;
        } else if (snake2.body[0].x >= blockCount) {
            return true;
        } else if (snake2.body[0].y < 0) {
            return true;
        } else if (snake2.body[0].y >= blockCount) {
            return true;
        }

        // 自撞
        for (let i = 1; i < snake.body.length; i++) {
            if (snake.body[0].x === snake.body[i].x &&
                snake.body[0].y === snake.body[i].y) {
                return true;
            }
        }

        for (let i = 1; i < snake2.body.length; i++) {
            if (snake2.body[0].x === snake2.body[i].x &&
                snake2.body[0].y === snake2.body[i].y) {
                return true;
            }
        }

        //互撞
        for (let i = 0; i < snake.body.length; i++) {
            for (let j = 0; j < snake2.body.length; j++) {
                if ((snake.body[i].x === snake2.body[j].x) && (snake.body[i].y === snake2.body[j].y)) {
                    return true;
                }
            }
        }
    }
    return false
}

//遊戲結束停止會面更新
function gameOver() {
    clearInterval(gameInterval);
    gameInterval = undefined;
    clearInterval(playTime);
    playTime = undefined;
}

//讀取背景
window.onload = onPageLoaded

//監聽事件
function onPageLoaded() {
    document.addEventListener('keydown', handleKeyDown)
}

//鍵盤設定
function handleKeyDown(e) {
    if (Player === 0) {
        if (e.keyCode === 37 && snake.direction.x === 0) { //左
            snake.direction.x = -1;
            snake.direction.y = 0;
        } else if (e.keyCode === 39 && snake.direction.x === 0) { //右
            snake.direction.x = 1;
            snake.direction.y = 0;
        } else if (e.keyCode === 38 && snake.direction.y === 0) { //下
            snake.direction.x = 0;
            snake.direction.y = -1;
        } else if (e.keyCode === 40 && snake.direction.y === 0) { //上
            snake.direction.x = 0;
            snake.direction.y = 1;
        }
    } else {
        switch (e.keyCode) {
            case 37: //左
                if (snake.direction.x !== 1) {
                    snake.direction.x = -1
                    snake.direction.y = 0
                }
                break;
            case 39: //右
                if (snake.direction.x !== -1) {
                    snake.direction.x = 1
                    snake.direction.y = 0
                }
                break;
            case 38: //上
                if (snake.direction.y !== 1) {
                    snake.direction.x = 0
                    snake.direction.y = -1
                }
                break;
            case 40: //下
                if (snake.direction.y !== -1) {
                    snake.direction.x = 0
                    snake.direction.y = 1
                }
                break;
        }

        switch (e.keyCode) {
            case 65: //左
                if (snake2.direction.x !== 1) {
                    snake2.direction.x = -1
                    snake2.direction.y = 0
                }
                break;
            case 68: //右
                if (snake2.direction.x !== -1) {
                    snake2.direction.x = 1
                    snake2.direction.y = 0
                }
                break;
            case 87: //上
                if (snake2.direction.y !== 1) {
                    snake2.direction.x = 0
                    snake2.direction.y = -1
                }
                break;
            case 83: //下
                if (snake2.direction.y !== -1) {
                    snake2.direction.x = 0
                    snake2.direction.y = 1
                }
                break;
        }
    }


}

//遊玩時間
function gameTime() {
    playTime = setInterval(() => {
        document.getElementById('time').innerHTML = `遊戲時間:${timeCount}`;
        timeCount += 1;
    }, 1000);
}