const result = document.getElementById('result');

let state = "start";
    // "start" : 初期状態または「AC」入力後
    // "calculation" : 0以外の数値入力後
    // "operater" : 演算子入力後
    // "finish" : 「＝」入力後
let mode = "integer";
    // "integer" : 整数入力中(初期状態または演算子入力後)
    // "demical" : 小数入力中(「.」入力後)
let formula;

// 「1」〜「9」ボタン
function getNumber(key) {
    if(state === "start") {
        formula = "" + key;
    } else if(state === "calculation") {
        formula += "" + key;
    } else if(state === "operator") {
        if(formula.slice(-1) === "0" && mode === "integer") {
            return;
        } else {
            formula += "" + key;
        }
    } else if(state === "finish") {
        allClear();
        formula = "" + key;
    }

    result.value = formula;
    state = "calculation";
}

// 「0」「00」ボタン
function getZero(key) {
    if(state === "start") {
        formula = "0";
    } else if(state === "calculation") {
        formula += "" + key;
    } else if(state === "operator") {
        if(formula.slice(-1) === "0") {
            return;
        } else {
            formula += "0";
        }
    }
     else if(state === "finish") {
        allClear();
        formula = "0";
    }

    result.value = formula;
    
}

// 「.」ボタン
function getPeriod(key) {
    if(state === "start") {
        formula = "0."
    } else if (state === "calculation") {
        if(mode === "integer") {
            formula += "" + key;
        } else { 
           return;
        }
    } else if (state === "operator") {
        if(formula.slice(-1) === "0") {
            formula += "" + key;
        } else {
            return;
        }
    } else if(state === "finish") {
        formula = result.value;
        formula += "" + key;
    }

    result.value = formula; 
    state = "calculation";
    mode = "demilcal";
}

// 「＋」「-」「*」「/」ボタン
function getOperator(key) {
    if(state === "start") {
        return;
    } else if(state === "calculation") {
        formula += "" + key;
    } else if(state === "operator") {
        formula = formula.slice(0, -1);
        formula += "" + key;
    } else if(state === "finish") {
        formula = result.value;
        formula += "" + key;
    }

    result.value = formula;
    state = "operator";
    mode = "integer";
}

// 「＝」ボタン
function calculate() {
    result.value = eval(formula);
    state = "finish";
    mode = "integer";
}

// 「AC」ボタン
function allClear() {
    formula = ""
    result.value = "";
    state = "start";
    mode = "integer"
}