function ji_suan() {
    let jia_qian = document.getElementById("價錢");
    let shu_liang = document.getElementById("數量");
    let jie_guo = document.getElementById("結果");
    let t_c = /^[1-9][0-9]*(.[0-9]+)?$/;
    let t_c_e = /^[1-9][0-9]*,[0-9]+$/;
    let hui_da;
    let flag = false;
    if (jia_qian.value === "" || shu_liang.value === "") {
        hui_da = "請輸入數據！";
    } else {
        let f_1 = (jia_qian.value.match(t_c) === null);
        let f_2 = (jia_qian.value.match(t_c_e) === null);
        if ((f_1 && f_2) || shu_liang.value.match(natural()) === null) {
            hui_da = "數字寫錯了！";
        } else if (jia_qian.value.match(t_c_e) === null) {
            flag = true;
            f_1 = parseFloat(jia_qian.value);
            f_2 = parseInt(shu_liang.value);
            hui_da = ("總費用" + f_1 * f_2 + "元！");
        } else {
            hui_da = "請通過點號輸入價錢！";
        }
    }
    jie_guo.classList.add("text-" + (
        (flag)
            ? ("success")
            : ("danger")
    ));
    jie_guo.classList.remove("text-" + (
        (!flag)
            ? ("success")
            : ("danger")
    ));
    jie_guo.innerHTML = hui_da;
    return false;
}

function natural() {
    return /^[1-9][0-9]*$/;
}

function updatePrice() {
    let s = document.getElementsByName("貨物類別");
    let select = s[0];
    let price = 0;
    let prices = getPrices();
    let priceIndex = parseInt(select.value) - 1;
    if (priceIndex >= 0) {
        price = prices.prodTypes[priceIndex];
    }

    let radioDiv = document.getElementById("單選框按鈕");
    radioDiv.style.display = (select.value == "2" ? "block" : "none");
    let checkDiv = document.getElementById("複選框");
    checkDiv.style.display = (select.value == "3" ? "block" : "none");

    if (select.value == "2") {
        let radios = document.getElementsByName("服裝類別");
        radios.forEach(function (radio) {
            if (radio.checked) {
                let optionPrice = prices.prodOptions[radio.value];
                if (optionPrice !== undefined) {
                    price += optionPrice;
                }
            }
        });
    } else if (select.value == "3") {
        let checkboxes = document.querySelectorAll("#複選框 input");
        checkboxes.forEach(function (checkbox) {
            if (checkbox.checked) {
                let propPrice = prices.prodProperty[checkbox.name];
                if (propPrice !== undefined) {
                    price += propPrice;
                }
            }
        });
    }

    let shu_liang = document.getElementById("兩個數量");
    let ans;
    let flag = false;
    if (shu_liang.value === "") {
        ans = "請輸入數據！";
    } else if (shu_liang.value.match(natural ()) === null) {
        ans = "數字寫錯了！";
    } else {
        flag = true;
        let f = parseInt(shu_liang.value);
        ans = ("總費用" + f * price + "元！");
    }

    let cheng_ben = document.getElementById("貨物成本");
    cheng_ben.classList.add("text-" + (
        (flag)
            ? ("success")
            : ("danger")
    ));
    cheng_ben.classList.remove("text-" + (
        (!flag)
            ? ("success")
            : ("danger")
    ));
    cheng_ben.innerHTML = ans;
}

function getPrices() {
    return {
        prodTypes: [200, 400, 1000],
        prodOptions: {
            cheng_ren: 300,
        },
        prodProperty: {
            xin: 500,
        }
    };
}

window.addEventListener('DOMContentLoaded', function (event) {
    let b = document.getElementById("按鈕");
    b.addEventListener("click", ji_suan);

    let inp = document.getElementById("兩個數量");
    inp.addEventListener("input", updatePrice);

    let s = document.getElementsByName("貨物類別");
    s[0].addEventListener("change", updatePrice);

    let radios = document.getElementsByName("服裝類別");
    radios.forEach(function (radio) {
        radio.addEventListener("change", updatePrice);
    });

    let checkboxes = document.querySelectorAll("#複選框 input");
    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener("change", updatePrice);
    });

    updatePrice();
});