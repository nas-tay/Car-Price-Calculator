//Стилизация селектов и частичная валидация
document.querySelector("#brand").selectedIndex = -1;
document.querySelector("#color").selectedIndex = -1;
document.querySelector("#year").selectedIndex = -1;

let arr = [],
    sum = 0,
    brand = document.querySelector("#brand"),
    year = document.querySelector("#year"),
    model = document.querySelector("#model"),
    color = document.querySelector("#color"),
    mileage = document.querySelectorAll('[name="mileage"]'),
    options = document.querySelectorAll(".option"),
    result = document.querySelector(".result"),
    resultText = document.querySelector(".resultText");

//Создаем списки моделей автомобилей
let audiModels = ["Audi 5", "Audi 4", "Audi 3", "Audi 2", "Audi 1"];
let bmwModels = ["BMW 5", "BMW 4", "BMW 3", "BMW 2", "BMW 1"];
let mercedesModels = [
    "Mercedes 5",
    "Mercedes 4",
    "Mercedes 3",
    "Mercedes 2",
    "Mercedes 1",
];
let fordModels = ["Ford 5", "Ford 4", "Ford 3", "Ford 2", "Ford 1"];

//Выводим списки моделей авто в соответствии с выбранной маркой
function selectBrand(sender) {
    if (sender.options[sender.selectedIndex].value == "none") {
        document.querySelector("#model").style.display = "none";
    } else {
        document.querySelector("#modelsDiv").style.display = "block";
    }

    let optionsString = "";
    if (sender.options[sender.selectedIndex].value == "Audi") {
        for (let model of audiModels) {
            optionsString += `<option value="${model}">${model}</option>`;
        }
    }

    if (sender.options[sender.selectedIndex].value == "BMW") {
        for (let model of bmwModels) {
            optionsString += `<option value="${model}">${model}</option>`;
        }
    }

    if (sender.options[sender.selectedIndex].value == "Mercedes") {
        for (let model of mercedesModels) {
            optionsString += `<option value="${model}">${model}</option>`;
        }
    }

    if (sender.options[sender.selectedIndex].value == "Ford") {
        for (let model of fordModels) {
            optionsString += `<option value="${model}">${model}</option>`;
        }
    }
    document.querySelector("#model").innerHTML = optionsString;
    document.querySelector("#model").selectedIndex = -1;

    //Валидация
    result.disabled = false;
    if (!year.value || !model.value || !color.value) {
        result.disabled = true;
    }
}

//Задаем значения(стоимость) моделей и присваиваем их первому элементу главного массива
model.addEventListener("change", () => {
    switch (model.value) {
        case "Audi 1":
            arr[0] = 1000000;
            break;
        case "Audi 2":
            arr[0] = 1500000;
            break;
        case "Audi 3":
            arr[0] = 1800000;
            break;
        case "Audi 4":
            arr[0] = 2200000;
            break;
        case "Audi 5":
            arr[0] = 2500000;
            break;

        case "BMW 1":
            arr[0] = 1200000;
            break;
        case "BMW 2":
            arr[0] = 1600000;
            break;
        case "BMW 3":
            arr[0] = 2000000;
            break;
        case "BMW 4":
            arr[0] = 2300000;
            break;
        case "BMW 5":
            arr[0] = 2700000;
            break;

        case "Ford 1":
            arr[0] = 2300000;
            break;
        case "Ford 2":
            arr[0] = 2500000;
            break;
        case "Ford 3":
            arr[0] = 2800000;
            break;
        case "Ford 4":
            arr[0] = 3000000;
            break;
        case "Ford 5":
            arr[0] = 3200000;
            break;

        case "Mercedes 1":
            arr[0] = 2500000;
            break;
        case "Mercedes 2":
            arr[0] = 2800000;
            break;
        case "Mercedes 3":
            arr[0] = 3000000;
            break;
        case "Mercedes 4":
            arr[0] = 3200000;
            break;
        case "Mercedes 5":
            arr[0] = 3500000;
            break;
    }

    //Валидация
    result.disabled = false;
    if (!brand.value || !color.value || !year.value) {
        result.disabled = true;
    }
});

//Валидация
color.addEventListener("change", () => {
    result.disabled = false;
    if (!brand.value || !model.value || !year.value) {
        result.disabled = true;
    }
});

//Валидация
year.addEventListener("change", () => {
    result.disabled = false;
    if (!brand.value || !model.value || !color.value) {
        result.disabled = true;
    }
});

// функция для добавления пробелов между разрядами в числе (для читабельного вывода результата)
function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

//Главная функция. Собираем массив, считаем сумму его элементов, выводим результат на странице
result.addEventListener("click", (e) => {
    e.preventDefault();
    sum = 0;

    //Надбавка за цвет кузова, присваиваем второму элементу массива
    arr[1] = +color.value;

    //Надбавка за год выпуска, присваиваем третьему элементу массива
    arr[2] = +year.value;

    //Надбавка за пробег, присваиваем четвертому элементу массива
    mileage.forEach((item, index) => {
        if (item.checked) {
            arr[3] = +item.value;
        }
    });

    //Надбавки за доп.опции, добавляем в конец массива
    options.forEach((item, index) => {
        if (item.checked) {
            arr.push(+item.value);
        }
    });

    //Считаем сумму массива, находим конечную стоимость авто
    for (let index = 0; index < arr.length; index++) {
        sum += Number(arr[index]);
    }

    //Выводим результат
    resultText.innerHTML = `Стоимость автомобиля составит ${numberWithSpaces(
        sum
    )} руб.`;

    //Очищаем массив с доп.опциями чтобы не удваиваеились при повторном нажатии на кнопку "Рассчитать"
    options.forEach((item, index) => {
        if (item.checked) {
            arr.pop(+item.value);
        }
    });
});
