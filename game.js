(function () {
    /**
     * cache de elementos presetados do jogo
     */
    var cache = {
        gameBoard: document.querySelector('#game'),
        MSnake: document.querySelector('#MSnake'),
        life: document.querySelector('#life'),
        hits: document.querySelector('#hits'),
        misses: document.querySelector('#misses'),
        level: document.querySelector('#level'),
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
        life: 100,
        hits: 0,
        misses: 0,
        level: 0,
        enemies: 0
    };

    /** */
    setInterval(function () {
        console.log(gameSaves, cache);
        cache.life.textContent = gameSaves.life;
        cache.hits.textContent = gameSaves.hits;
        cache.misses.textContent = gameSaves.misses;
        cache.level.textContent = gameSaves.level;
    }, 1000);

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
        y = getRandomInt(1, flags.alt) + 110;

        // Novo inimigo
        var newEnemy = document.createElement('div');
        nenid = 'eny' + new Date().getTime() + getRandomInt(0, 100) + 'i' + getRandomInt(0, 100);
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
                    gameSaves.hits++;
                    var enemy = document.querySelector('#'+nenid);
                    enemy.parentElement.removeChild(enemy);
                }
            }
        }, 200);
        
        var missTime = (1000 * document.querySelectorAll('.enemy').length)
        var missedEnemy = setTimeout(function () {
            if (document.querySelector('#'+nenid)) {
                gameSaves.hits--;
                gameSaves.misses++;
                console.log('MISSED');
                var enemy = document.querySelector('#'+nenid);
                enemy.parentElement.removeChild(enemy);
            }
            clearTimeout(missedEnemy);
        }, missTime);
    };

    /**
     * Gerar inimigos baseado no level do jogador
     */
    var generateEnemies = function () {
        var ne = (gameSaves.level*2) + 2;
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

        var necl;
        if (document.querySelectorAll('.clue').length < gameSaves.hits) {
            var newClue = document.createElement('div');
            necl = 'cl' + new Date().getTime() + getRandomInt(0, 100) + 'i' + getRandomInt(0, 100);
            newClue.classList.add('clue');
            newClue.id = necl;
            newClue.style.marginLeft  = (e.clientX - 12)+'px';
            newClue.style.marginTop  = (e.clientY - 12)+'px';
            cache.gameBoard.insertAdjacentElement('beforeEnd', newClue);
        }
        this.setTimeout(function () {
            var clue = document.querySelector('#'+necl);
            clue.parentElement.removeChild(clue);
        }, 200);
    });

    window.addEventListener('mousedown', function (e) {
        flags.bitten = true;
    });

    window.addEventListener('mouseup', function (e) {
        flags.bitten = false;
    });

    // Inicia inimigos watcher de inimidos
    setInterval(function () {
        if (document.querySelectorAll('.enemy').length == 0) {
            gameSaves.level++;
            generateEnemies();
        }
    }, 1000);
})()