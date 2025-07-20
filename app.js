const BASE_URL = "https://raw.githubusercontent.com/WoXy-Sensei/currency-api/main/api";

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const from_curr = document.querySelector(".From select");
const to_curr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for (let select of dropdown) {
    for (let code in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = code;
        newOption.value = code;

        if (
            (select.name.toLowerCase() === 'from' && code === "USD") ||
            (select.name.toLowerCase() === 'to' && code === "INR")
        ) {
            newOption.selected = true;
        }

        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let code = element.value;
    let countrycode = countryList[code];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
};


dropdown.forEach(select => updateFlag(select));

btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if(amtval==="" || amtval<=-1){
        amtval=1;
        amount.value="1";
    }
    const fromCurr_toCurr = from_curr.value +'_'+ to_curr.value;

    const URL = `${BASE_URL}/${fromCurr_toCurr}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data['rate'];
    let final_amount = amtval*rate;
    msg.innerText = `${amtval} ${from_curr.value} = ${final_amount} ${to_curr.value}`;
});
