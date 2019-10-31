(function () {
    /**
     * cache de elementos presetados do jogo
     */
    var cache = {
        gameBoard: document.querySelector('#game'),
        MSnake: document.querySelector('#MSnake')
    };

    /**
     * flags do jogo
     */
    var flags = {
        isPlaying: false,
        lag: (window.innerWidth - 50),
        alt: (window.innerHeight - 120),
        playerX: 0,
        playerY: 0,
        bitten: false,
        newEnemies: true
    };

    /**
     * Dados do jogo
     */
    var gameSaves = {
        vitality: 100,
        hits: 0,
        misses: 0,
        level: 1,
        enemies: 0
    };

    /**
     * Gerar um número inteiro aleatório basea do no mínimo e máximo
     * 
     * @param {Integer} min 
     * @param {Interger} max 
     */
    var getRandomInt = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    /**
     * Gerar inimigo
     */
    var generateEnemy = function () {
        var x,y, nenid;
        x = getRandomInt(1, flags.lag) + 25;
        y = getRandomInt(1, flags.alt) + 90;

        // Novo inimigo
        var newEnemy = document.createElement('div');
        nenid = 'eny' + new Date().getTime() + getRandomInt(0, 100);
        newEnemy.classList.add('enemy');
        newEnemy.id = nenid;
        newEnemy.style.marginLeft  = (x - 12)+'px';
        newEnemy.style.marginTop  = (y - 12)+'px';
        cache.gameBoard.insertAdjacentElement('beforeEnd', newEnemy);
        var watcherEnemy = setInterval(function () {
            if (flags.bitten) {
                console.log('BITTEN');
                if (flags.playerX >= (x-25) && 
                    flags.playerX <= (x+50) && 
                    flags.playerY >= (y-25) && 
                    flags.playerY <= (y+50)) {
                    clearInterval(watcherEnemy);
                    console.log('BITTENED');
                    var enemy = document.querySelector('#'+nenid);
                    enemy.parentElement.removeChild(enemy);
                }
            }
        }, 200);
    };

    /**
     * Gerar inimigos baseado no level do jogador
     */
    var generateEnemies = function () {
        var ne = (gameSaves.level*3);
        for (var i = 0; i <= ne; i++) {
            generateEnemy();
        }
    };
    
    window.addEventListener('mousemove', function (e) {
        flags.isPlaying = true;
        cache.MSnake.classList.remove('start');
        cache.MSnake.style.marginLeft  = (e.clientX - 12)+'px';
        cache.MSnake.style.marginTop  = (e.clientY - 12)+'px';
        flags.playerX = (e.clientX - 12);
        flags.playerY = (e.clientY - 12);
    });

    window.addEventListener('mousedown', function (e) {
        flags.bitten = true;
    });

    window.addEventListener('mouseup', function (e) {
        flags.bitten = false;
    });

    // Inicia inimigos
    generateEnemies();
})()