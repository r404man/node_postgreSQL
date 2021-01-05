// Date format client side vision 
let clientDate = document.querySelectorAll('.date');
clientDate.forEach(elDate => {
    showDate = elDate.innerText;
    dateElements = new Date(showDate);

    year = dateElements.getFullYear();
    month = dateElements.getMonth();
    day = dateElements.getDate();
    x = day / 10;
    y = month / 10;
    if (x < 1 && y < 10) {
        elDate.innerText = `${year}.0${month + 1}.0${day}`;
    } else {
        elDate.innerText = `${year}.${month + 1}.${day}`;
    }
});

// Price format client side vision
let clientPrice = document.querySelectorAll('.price');
clientPrice.forEach(elPrice => {
    priceValue = elPrice.innerText;
    elPrice.innerText = triplets(priceValue);
});

// price formatter
function triplets(str) {
    return str.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1.');
}