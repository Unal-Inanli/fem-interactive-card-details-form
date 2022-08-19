class Input {

    constructor(inputId, errorId = null) {
        
        /**
         * @type {HTMLInputElement} errorElement
         */
        this.element = document.querySelector("#" + inputId);

        /**
         * @type {HTMLParagraphElement} errorElement
         */
        this.errorElement = document.querySelector("#" + inputId + errorId);
        
        if (errorId) {
            this.errorElement = document.querySelector("#" + errorId);
        } else {
            this.errorElement = document.querySelector("#" + inputId + "_error");
        }
    }

    showError(message) {
        this.errorElement.innerText = message;
        this.errorElement.style.visibility = "visible";
    }

    hideError() {
        this.errorElement.style.visibility = "hidden";
    }


}

/**
 * @type {HTMLFormElement}
 */
const cardForm = document.querySelector("#card_form");

const formContinueButton = document.querySelector("#form_continue_button");
const formSuccess = document.querySelector("#form_success");

const cardNumberSlot = document.querySelector("#card_number_slot");
const cardHolderSlot = document.querySelector("#card_holder_slot");
const expireDateSlot = document.querySelector("#expire_date_slot");
const monthSlot = document.querySelector("#expire_month_slot");
const yearSlot = document.querySelector("#expire_year_slot");

const cvcSlot = document.querySelector("#cvc_slot");

const nameInput = new Input("holder_name");
const cardInputMask = new Input("card_number_mask");
const cardInputReal = new Input("card_number_real", "card_number_error");
const securityInput = new Input("security_number");
const monthInput = new Input("expire_month", "exp_date_error");
const yearInput = new Input("expire_year", "exp_date_error");

init();

nameInput.element.addEventListener('input', () => {
    cardHolderSlot.innerText = nameInput.element.value;
    nameInput.hideError();
    nameInput.element.setCustomValidity('');
    nameInput.element.checkValidity();
});

nameInput.element.addEventListener("invalid", () => {

    const regex = /[0-9]/;

    if (nameInput.element.value == "") {
        nameInput.showError("This field is required");
    }  else if (nameInput.element.value.match(regex).length > 0) {
        nameInput.showError("Your name must not contain any numbers.");
    }
})


cardInputMask.element.addEventListener('input', () => {
    cardInputMask.element.value = cardInputMask.element.value.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/,"$1 $2 $3 $4");
    cardInputReal.element.value = cardInputMask.element.value.replaceAll(" ", "");
    cardInputReal.element.dispatchEvent(new Event('input', { 'bubbles': true }));

});

cardInputReal.element.addEventListener('input', () => {
    cardNumberSlot.innerText = cardInputMask.element.value;
    cardInputReal.hideError();
    cardInputReal.element.setCustomValidity('');
    cardInputReal.element.checkValidity();
});

cardInputReal.element.addEventListener("invalid", () => {

    const regex = /([A-Za-z])/g;
    if (cardInputReal.element.value == "") {
        cardInputReal.showError("This field is required");
    }
    else if (cardInputReal.element.value.match(regex) && cardInputReal.element.value.match(regex).length > 0) {
        cardInputReal.showError("Please enter numbers only");
    }
    else if (cardInputReal.element.value.match('/([0-9]{16}/g)') === null) {
        cardInputReal.showError("Please enter your 16 digit card number");
    }
})


securityInput.element.addEventListener('input', () => {
    cvcSlot.innerText = securityInput.element.value;
    securityInput.hideError();
    securityInput.element.setCustomValidity('');
    securityInput.element.checkValidity();
});

securityInput.element.addEventListener("invalid", () => {
    const regex = /([0-9])/g;

    if (securityInput.element.value == "") {
        securityInput.showError("This field is required");
    }
    else if (securityInput.element.value.match(regex) === null) {
        securityInput.showError("Please enter numbers only");
    }
    else if (securityInput.element.value.match('/([0-9]{3}/g)') === null) {
        securityInput.showError("Please enter 3 digits");
    }
})


monthInput.element.addEventListener('input', () => {
    monthSlot.innerText = monthInput.element.value;
    monthInput.hideError();
    monthInput.element.setCustomValidity('');
    monthInput.element.checkValidity();
});

monthInput.element.addEventListener("invalid", () => {
    const regex = /([0-9])/g;

    if (monthInput.element.value == "") {
        monthInput.showError("This field is required");
    }
    else if (monthInput.element.value.match(regex) === null) {
        monthInput.showError("Please enter numbers only");
    }
    else if (monthInput.element.value.match('/([0-9]{2}/g)') === null) {
        monthInput.showError("Month must be 2 digits");
    }
})


yearInput.element.addEventListener('input', () => {
    yearSlot.innerText = yearInput.element.value;
    yearInput.hideError();
    yearInput.element.setCustomValidity('');
    yearInput.element.checkValidity();
});

yearInput.element.addEventListener("invalid", () => {
    const regex = /([0-9])/g;

    if (yearInput.element.value == "") {
        yearInput.showError("This field is required");
    }
    else if (yearInput.element.value.match(regex) === null) {
        yearInput.showError("Please enter numbers only");
    }
    else if (yearInput.element.value.match('/([0-9]{2}/g)') === null) {
        yearInput.showError("Year must be 2 digits");
    }
})





function init() {
    cardNumberSlot.innerText = "0000 0000 0000 0000";
    cardHolderSlot.innerText = "Jane Appleseed";
    monthSlot.innerText = "00";
    yearSlot.innerText = "00";
    cvcSlot.innerText = "000";
}

cardForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const isValid = cardForm.reportValidity();

    if (isValid) {
        cardForm.style.display = "none";
        formSuccess.style.display = "flex";
    } 
});


formContinueButton.addEventListener("click", () => {
    nameInput.element.value = "";
    cardInputMask.element.value = "";
    cardInputReal.element.value = "";
    monthInput.element.value = "";
    yearInput.element.value = "";
    securityInput.element.value = "";

    formSuccess.style.display = "none";
    cardForm.style.display = "flex";
});