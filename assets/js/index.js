const screen = document.getElementById("display");
const nums = document.querySelectorAll(".num");
const ops = document.querySelectorAll(".operator");
const clear = document.querySelector(".clear");
const equals = document.querySelector(".equals");
const dot = document.querySelector(".decimal");

let text = "";
let saved = null;
let action = "";
let isNew = false;

nums.forEach(btn => {
    btn.addEventListener("click", () => {
        if (isNew) {
            text = btn.textContent;
            isNew = false;
        } else {
            text += btn.textContent;
        }
        screen.value = text;
    });
});

ops.forEach(btn => {
    btn.addEventListener("click", () => {
        if (text !== "") {
            if (saved !== null) {
                const answer = solve();
                saved = answer;
                screen.value = answer;
            } else {
                saved = parseFloat(text);
            }
            action = btn.textContent;
            isNew = true;
        }
    });
});

dot.addEventListener("click", () => {
    if (!text.includes(".")) {
        if (text === "" || isNew) {
            text = "0";
            isNew = false;
        }
        text += ".";
        screen.value = text;
    }
});

equals.addEventListener("click", () => {
    if (saved !== null && text !== "" && action) {
        const answer = solve();
        screen.value = answer;
        text = answer.toString();
        saved = null;
        action = "";
    }
});

clear.addEventListener("click", () => {
    reset();
});

function solve() {
    const x = saved;
    const y = parseFloat(text);
    let answer;

    switch (action) {
        case "+":
            answer = x + y;
            break;
        case "-":
            answer = x - y;
            break;
        case "*":
            answer = x * y;
            break;
        case "/":
            answer = y !== 0 ? x / y : "Error";
            break;
        default:
            return y;
    }

    return typeof answer === "number" ? Number(answer.toFixed(8)) : answer;
}

function reset() {
    text = "";
    saved = null;
    action = "";
    isNew = false;
    screen.value = "";
}