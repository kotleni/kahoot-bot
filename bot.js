const args = process.argv; // аргументы коммандной строки

const Kahoot = require("kahoot.js-updated");

// добавляем пользователей
for(var i = 0; i < args[3]; i++){
    addPlayer();
}

function addPlayer() {
    var randName = randomName(); // генерируем ник
    var client = new Kahoot(); // создаем новый клиент

    console.log("(" + randName + ") " + "Подключение к игре... ");
    client.join(args[2], randName); // отправить запрос на подключение

    client.on("Joined", () => { // если удачно подключился
      console.log("(" + randName + ") " + "Удачное подключение!");
    });

    client.on("QuizStart", () => { // игра началась
      console.log("(" + randName + ") " + "Игра началась!");
    });

    client.on("QuestionStart", question => { // когда начался новый вопрос
        var rand = random(0, 3);

        question.answer(rand); // отвечаем
        console.log("(" + randName + ") "+ "Выбран вариант: " + rand);
    });

    client.on("QuizEnd", () => { // когда игра закончилась
        console.log("(" + randName + ") " + "Игра закончилась.");
        process.exit();
    });
}

/* генерация рандомного числа в диапазоне */
function random(minimum, maximum) {
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}

/* генерация случайного ника */
function randomName() {
    var length = 8,
        charset = "_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", // словарь
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}
