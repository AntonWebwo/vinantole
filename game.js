var pjs = new PointJS('2D', 1280 / 2, 720 / 2, { // 16:9
	backgroundColor : '#59AAC8' // if need
});
pjs.system.initFullPage(); // for Full Page mode
// pjs.system.initFullScreen(); // for Full Screen mode (only Desctop)

pjs.system.initFPSCheck();

var platformer = new PlatformerJS(pjs);
platformer.optMode = true;
platformer.useDeltaTime = true;

var joystick = new JoyStick(pjs, '', 160, 160, 0, 0, 0, 50);

var log    = pjs.system.log;     // log = console.log;
var game   = pjs.game;           // Game Manager
var point  = pjs.vector.point;   // Constructor for Point
var camera = pjs.camera;         // Camera Manager
var brush  = pjs.brush;          // Brush, used for simple drawing
var OOP    = pjs.OOP;            // Object's manager
var math   = pjs.math;           // More Math-methods
var levels = pjs.levels;         // Levels manager

var key   = pjs.keyControl.initKeyControl();
// var mouse = pjs.mouseControl.initMouseControl();
// var touch = pjs.touchControl.initTouchControl();
// var act   = pjs.actionControl.initActionControl();

var width  = game.getWH().w; // width of scene viewport
var height = game.getWH().h; // height of scene viewport

// Game Loop
game.newLoopFromConstructor('myGame', function () {
	// Constructor Game Loop
var gameMap = pjs.tiles.newImage('https://4.downloader.disk.yandex.ru/preview/6459242e0ccd18360c11535ae4a1d5f20da508672f27b031a811f6e177d0af57/inf/twTlaMJpVjWyBuvdKsF9o-s2dpg-vXgTMX25GOhYHu6s90blimiwVsOyu-wSNgrHzpXIxYXFySFxcgSN9rAUOg%3D%3D?uid=416646447&filename=map.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&tknv=v2&size=1123x786');
var block0 = gameMap.getAnimation(0, 0, 0, 0, 1);
var block1 = gameMap.getAnimation(32, 0, 32, 32, 1);
var block2 = gameMap.getAnimation(96, 0, 32, 32, 1);
var block3 = gameMap.getAnimation(64, 0, 32, 32, 1);
var block4 = gameMap.getAnimation(0, 32, 32, 32, 1);
var block5 = gameMap.getAnimation(128, 0, 32, 32, 1);
var block6 = gameMap.getAnimation(64, 64, 32, 32, 1);
var block7 = gameMap.getAnimation(64, 95, 32, 32, 1);
var block8 = gameMap.getAnimation(481, 0, 32, 32, 1);
var block9 = gameMap.getAnimation(481, 0, 32, 32, 1);
	// Настройки джойстика
	joystick.show();
	// Игровой счет
	var score = 0;

	// Для этого игрового цикла установим фон
	platformer.setBackImage('https://3.downloader.disk.yandex.ru/preview/f23eec45258695adb1e61978342a10376468637ddfc6199e88b7b097e915a36e/inf/twTlaMJpVjWyBuvdKsF9owM6BAm0n-UboaPCvc0mna6GVR-J_8UD9WFEEv2oe2kgn83YgVPp6JSAkOGqurkEZw%3D%3D?uid=416646447&filename=back.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&tknv=v2&size=1123x786');

	// переменная с размером ячейки (квадратные будут)
	var tileSize = 35;

	//события addOption блоков
	platformer.onOptionCollision = function (player, option) {
		if (option.desc == 'level ok') {
			document.location.reload();
		}
	};
	//события addCell блоков
	platformer.onCellCollision = function (player, cell) {
		score += 10;
		platformer.del(cell);
	};
	////события addEnemy мобов
	platformer.onEnemyCollision = function (player, enemy) {
		if (player.y+player.h < enemy.y+enemy.h/2 && player.speed.y > 0) {
			platformer.del(enemy);
			player.jumped = false;
			player.jump(5);
			score += 1000;
		} else {
			score = -1000;
			document.location.reload();
		}
	};
//Карта уровня
	var map = [
'11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
'11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
'11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
'11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
'11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
'11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
'11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
'11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
'11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
'11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
'11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
'11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
'11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
'11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
'11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
'11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
'11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
'11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
'11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
'11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
'11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
'11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
'11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
'11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
'11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
'11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
'11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
'11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
'11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
'11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111'
	];
	// Создание персонажа
	var rect = game.newAnimationObject({
		animation : pjs.tiles.newAnimation('https://3.downloader.disk.yandex.ru/preview/47b5a114f2e91c2bb1f75d58827d5db76505c5b92892a1f76878152a5f42930e/inf/twTlaMJpVjWyBuvdKsF9ow_lpxA9vE11hJ6vnVD50ruGezQ3GVqxXBj1X8VRu9j6318XapPFXRppW8qnyZXqtw%3D%3D?uid=416646447&filename=steve.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&tknv=v2&size=1123x786', 35, 64, 4),
		delay : 9999,
		positionC : point(810, -64), // central position of text
		w : 35, h : 64
	});
	rect.friction = 0.1;
	rect.gravity = 0.9;
	rect.maxSpeed = point(5, 10);
	platformer.setPlayer(rect);
	
	OOP.forArr(map, function (string, y) {
		OOP.forArr(string, function (cell, x) {
						 
			if (cell == '0')//Блок null
				platformer.addWall(game.newAnimationObject({
					animation : block0,
					positionC : point(tileSize * x, tileSize * y),
					w : tileSize, h : tileSize,
				}));
			else if (cell == '1')//Блок камень
				platformer.addWall(game.newAnimationObject({
					animation : block1,
					positionC : point(tileSize * x, tileSize * y),
					w : tileSize, h : tileSize,
				}));
			else if (cell == '2')//Блок трава
				platformer.addWall(game.newAnimationObject({
					animation : block2,
					positionC : point(tileSize * x, tileSize * y),
					w : tileSize, h : tileSize,
				}));
			else if (cell == '3')//Блок земля
				platformer.addWall(game.newAnimationObject({
					animation : block3,
					positionC : point(tileSize * x, tileSize * y),
					w : tileSize, h : tileSize,
				}));
			else if (cell == '4')//Блок булыга
				platformer.addWall(game.newAnimationObject({
					animation : block4,
					positionC : point(tileSize * x, tileSize * y),
					w : tileSize, h : tileSize,
				}));
			else if (cell == '5')//Блок доски
				platformer.addWall(game.newAnimationObject({
					animation : block5,
					positionC : point(tileSize * x, tileSize * y),
					w : tileSize, h : tileSize,
				}));
			else if (cell == '6')//Блок дерево
				platformer.addWall(game.newAnimationObject({
					animation : block6,
					positionC : point(tileSize * x, tileSize * y),
					w : tileSize, h : tileSize,
					z : 0
				}));
			else if (cell == '7')//Блок дерево
				platformer.addWall(game.newAnimationObject({
					animation : block7,
					positionC : point(tileSize * x, tileSize * y),
					w : tileSize, h : tileSize,
					z : 0
				}));
			else if (cell == '8')//Блок дерево
				platformer.addWall(game.newAnimationObject({
					animation : block8,
					positionC : point(tileSize * x, tileSize * y),
					w : tileSize, h : tileSize,
					z : 0
				}));
			else if (cell == '9')//Блок дерево
				platformer.addWall(game.newAnimationObject({
					animation : block9,
					positionC : point(tileSize * x, tileSize * y),
					w : tileSize, h : tileSize,
					z : 0
				}));
				
				
				
				
			else if (cell == '*')//predmets
				platformer.addCell(game.newAnimationObject({
					positionC : point(tileSize * x, tileSize * y),
					animation : pjs.tiles.newAnimation('https://4.downloader.disk.yandex.ru/preview/daece06183338034baacf8f8345c590c75bdef884e4d4adbfa2293458421cda1/inf/twTlaMJpVjWyBuvdKsF9o3_OJD2kgTRK2qcmwNmnITDP4QX1SKICphXaUPJzLuCA4rqUqKhgw6SB3jTaXL54UA%3D%3D?uid=416646447&filename=almazik.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&tknv=v2&size=1123x786', 32, 32, 1),
					w : tileSize / 2, h : tileSize / 2,
					delay : math.random(50, 200) / 10,
					userData : {
						jumpSpeed : math.random(2, 10)
					}
				}));
			else if (cell == 'm')//mobs
				platformer.addEnemy(game.newAnimationObject({
					positionC : point(tileSize * x, tileSize * y),
					animation : pjs.tiles.newAnimation('https://1.downloader.disk.yandex.ru/preview/b2f2fadf94975b0eaf31db87fe972d780d7d5ad67b6851f571b4b70f8db0ac91/inf/twTlaMJpVjWyBuvdKsF9o0BLtuSqAstLL6XQeNmaPOoHwWa9-uxC-REk4jI5IRXEybo8JGExewoE4v79HZccTg%3D%3D?uid=416646447&filename=zombie.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&tknv=v2&size=1123x786', 43, 64, 24),
					w : 43, h : 64,
					delay : 1,
					userData : {
						jumpSpeed : math.random(2, 10),
						gravity : 0.5,
						speed : point(-1, 0),
						maxSpeed : point(5, 5)
					}
				}));
			else if (cell == '!')//событие
				platformer.addOption(game.newImageObject({
					positionC : point(tileSize * x, tileSize * y),
					file : pjs._logo,
					w : tileSize, h : tileSize,
					userData : {
						desc : 'level ok'
					}
				}));

		});
	});

	joystick.hideBtn('btnUp, btnDown');

	joystick.on('btnLeft:down', function () {
		rect.speed.x -= 0.6;
	});

	joystick.on('btnRight:down', function () {
		rect.speed.x += 0.6;
	});

	joystick.on('btnFire:press', function () {
		rect.jump(10);
	});


	// Основной цикл
	this.update = function () {
		// Update function
		game.clear(); // clear screen
	if(rect.speed.x == 0){
		rect.setDelay(9999);;
		}
		if (key.isDown('LEFT')){
			rect.setDelay(15);
			rect.setFlip(true);
			rect.speed.x -= 0.6;
			}
		else if (key.isDown('RIGHT')){
			rect.setDelay(15);
			rect.setFlip(false);
			rect.speed.x += 0.6;

		}
		// Прыгаем
		if (key.isPress('UP')){
			rect.setDelay(9999);
			rect.jump(10);}
		else if (key.isDown('DOWN')){
			rect.speed.y += 2;}

		// обновление и отрисовка платформера
		platformer.update();

		// следим за нашим объектом
		camera.follow(rect);
		
		brush.drawTextS({
			text : 'FPS: ' + pjs.system.getFPS(),
			size : 30,
			color : 'white'
		});

		brush.drawTextS({
			y : 35,
			text : 'Очки: ' + score,
			size : 30,
			color : 'white'
		});

	};

});

game.startLoop('myGame');