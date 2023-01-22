import { dreamImgsData } from "@/data";
import { sendForm } from "@/api";
import "@css/index";
import "@css/font";
import IMask from 'imask';

const body = document.querySelector("body");





document.addEventListener("DOMContentLoaded", () => {
    createSwiper(dreamImgsData);
    burgerMenu();
    tourRequest();
    createDescriptionForDreamTour();


    //временное решение, понять почему не подгружаются картинки, которые заданы в css файле , backgound-ом у блоков ы
    const previous = document.querySelector(".previous");
    const next = document.querySelector(".next");
    const imgBg = document.querySelector(".img_bg");
    const montainBg = document.querySelector(".description-travel__block");



    previous.style.backgroundImage = `url("./image/right-arrow.svg")`;
    next.style.backgroundImage = `url("./image/left-arrow.svg")`;
    montainBg.style.backgroundImage = `url("./image/mountain_bg.jpg")`;
    imgBg.style.backgroundImage = `url(./image/dagestanskii-kanon-sulakskii.jpg)`;

});


const displayImg = (data) => {
    const isDreamList = document.querySelector(".dream__list");
    isDreamList && isDreamList.remove()

    const dreamListWrapper = document.querySelector(".dream__list-wrapper");
    const dreamList = document.createElement("ul");
    dreamList.classList.add("dream__list");


    data.forEach(card => {
        const dreamCard = document.createElement("li");
        dreamCard.style.backgroundImage = `url(${card.img})`;
        dreamCard.style.backgroundRepeat = "no-repeat";
        dreamCard.style.backgroundSize = "cover";
        dreamCard.style.marginRight = "8px";

        if (card.active) {
            dreamCard.classList.add("dream__card");
            setTimeout(() => dreamCard.classList.add("dream__card-active")
            )
            dreamList.prepend(dreamCard);
        } else {
            dreamCard.classList.add("dream__card");
            dreamList.append(dreamCard);
        }
    })
    dreamListWrapper.append(dreamList);

}



const createSwiper = (data) => {
    let swiperImgs = data;
    const btnWrapper = document.querySelector(".dream__buttons-next-previous");
    btnWrapper.addEventListener("click", (e) => changeCard(e.target.name));

    displayImg(swiperImgs);

    const changeCard = (typeAction) => {
        let prependAarr;
        const prevActive = swiperImgs[0]

        if (typeAction === "next") {
            prependAarr = swiperImgs.filter((card) => !card.active)
            prependAarr.push({ ...prevActive, active: false })
            swiperImgs = prependAarr.map((card, i) => i === 0 ? { ...card, active: true } : card)
        }

        if (typeAction === "previous") {
            const lastCard = swiperImgs[swiperImgs.length - 1];
            prependAarr = swiperImgs.filter((card) => !card.active && card !== lastCard);
            prependAarr.unshift({ ...prevActive, active: false });
            prependAarr.unshift({ ...lastCard, active: true });
            swiperImgs = prependAarr
        }
        displayImg(swiperImgs);
    }
}

const burgerMenu = () => {
    const burgerMenuBtnOpen = document.querySelector(".head__burger");
    const burgerMenuBtnClose = document.querySelector(".burger-menu__close");
    const reservButton = document.querySelector(".head__reserve");
    const burgerPaper = document.querySelector(".burger-menu");
    const burgerLink = document.querySelectorAll(".burger__item")


    burgerMenuBtnOpen.addEventListener("click", openPaper)

    burgerMenuBtnClose.addEventListener("click", closePaper)

    function openPaper() {
        const reservBtnColor = "#212121"

        burgerPaper.style.transform = "translateX(0)";

        if (window.innerWidth <= 590) {
            reservButton.style.display = "block";
            reservButton.style.color = reservBtnColor;
            reservButton.style.borderColor = reservBtnColor;
            reservButton.style.margin = "0 auto"
            burgerPaper.append(reservButton)
        }

    }

    burgerLink.forEach(link => link.addEventListener("click", closePaper))

    function closePaper() {
        burgerPaper.style.transform = "translateX(1200px)";
    }
}

const tourRequest = () => {
    const reservButton = document.querySelector(".head__reserve");

    reservButton.addEventListener("click", createForm)
}


const createDarkBackground = () => {
    const paper = document.createElement("div");
    body.style.overflow = "hidden";
    paper.classList.add("modal-sheet");

    return paper;
}


const createSwitch = function (id, name) {
    if (!id) {
        return;
    }


    const label = document.createElement("label");
    const input = document.createElement("input");
    const round = document.createElement("div");
    label.classList.add("switch");
    round.classList.add("slider");
    round.classList.add("round");

    input.type = "checkbox";
    input.id = id;
    input.name = name;
    label.htmlFor = id;

    label.append(input);
    label.append(round);

    return label
}

const createDescriptionForDreamTour = () => {
    const closeBtn = createCloseBtn();
    const dreamBtn = document.querySelector(".dream__btn");
    const modal = document.createElement("div");
    const description = document.createElement("p");
    description.style.padding = "24px";
    description.innerHTML = "<span style='font-weight: 800;'>Dream tour 63  </span> - это Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum sitculpa facere nostrum earum? Nostrum, iure! Ab sapiente eius consectetur odio neque, facilis velrepellendus soluta officiis, vitae rerum iste?"
    modal.classList.add("modal");
    modal.style.width = "80%";


    dreamBtn.addEventListener("click", () => {
        const formWrapper = createDarkBackground();
        body.append(formWrapper);
        modal.append(closeBtn);
        modal.append(description);
        body.append(modal);
        body.append(formWrapper);

        closeBtn.addEventListener("click", function () {
            closeForm(modal, formWrapper);
        })

        formWrapper.addEventListener("click", function () {
            closeForm(modal, formWrapper);
        })
    })


}

const createCloseBtn = () => {
    const closeBtn = document.createElement("div");
    closeBtn.classList.add("modal-close");

    return closeBtn;
}

const createForm = function () {
    const modal = document.createElement("div");
    const form = document.createElement("form");
    modal.classList.add("modal");
    const inputText = document.createElement("input");
    inputText.classList.add("input");
    inputText.name = "name";
    inputText.placeholder = "Имя";
    inputText.id = "name";
    const inputNumber = document.createElement("input");
    inputNumber.name = "phone";
    inputNumber.classList.add("input");
    inputNumber.required = true;
    const formWrapper = createDarkBackground();
    const labelName = document.createElement("label")
    labelName.htmlFor = "name";
    labelName.innerText = "Введите имя *";
    labelName.classList.add("input-label")
    const labelPhone = document.createElement("label");
    labelPhone.classList.add("input-label")
    labelPhone.htmlFor = "phone";
    labelPhone.innerText = "Введите номер *";

    const inputSubmit = document.createElement("button");
    inputSubmit.type = "submit";
    inputSubmit.innerHTML = "Отправить";
    inputSubmit.disabled = true;
    inputSubmit.classList.add("input-submit");

    const examplePhone = document.createElement("small");
    examplePhone.classList.add("input-example")
    examplePhone.innerHTML = "Пример +7 (928) 123-45-67"

    inputText.type = "text";
    inputNumber.type = "text";
    inputNumber.placeholder = "+7 (***) ***-**-** "

    const inputChekBoxCar = document.createElement("input");
    inputChekBoxCar.type = "checkbox";
    inputChekBoxCar.name = "checkboxCar"

    const switchAvtoBlock = document.createElement("div");
    const switchPhotoBlock = document.createElement("div");

    const serviceTitle = document.createElement("h3");
    serviceTitle.innerHTML = "Дополнительные услуги";
    serviceTitle.style.color = "#275553";
    serviceTitle.style.fontWeight = "600";
    serviceTitle.style.marginBottom = "16px";

    switchAvtoBlock.classList.add("switch-block");
    switchPhotoBlock.classList.add("switch-block");

    const labelCar = document.createElement("label")
    labelCar.htmlFor = "switchCar";
    labelCar.innerText = "Забронировать авто - ";
    labelCar.classList.add("input-label");

    const switchCar = createSwitch("switchAvto", "avto");
    switchCar.id = "switchCar";

    switchAvtoBlock.append(labelCar);
    switchAvtoBlock.append(switchCar);


    const labelPhoto = document.createElement("label")
    labelPhoto.htmlFor = "switchPhotographer";
    labelPhoto.innerText = "Забронировать фотосъемку - ";
    labelPhoto.classList.add("input-label")


    const switchPhoto = createSwitch("switchPhotographer", "photo");
    switchCar.id = "switchPhoto";

    switchPhotoBlock.append(labelPhoto);
    switchPhotoBlock.append(switchPhoto);

    const closeBtn = createCloseBtn();


    form.append(labelName);
    form.append(inputText);
    form.append(labelPhone);
    form.append(inputNumber);
    form.append(examplePhone);
    form.append(serviceTitle);
    form.append(switchAvtoBlock);
    form.append(switchPhotoBlock);
    form.append(inputSubmit);



    modal.append(closeBtn);
    modal.append(form);


    body.prepend(modal);
    body.prepend(formWrapper);



    inputText.addEventListener("input", function (e) {
        if (!!inputNumber.value && !!e.target.value) {
            inputSubmit.disabled = false;
        }
    })




    inputNumber.addEventListener("input", function (e) {
        const value = e.target.value;
        const maskOptions = {
            mask: '+{7}(000)000-00-00'
        };
        const mask = IMask(inputNumber, maskOptions);

        if (!!inputText.value && !!value) {
            inputSubmit.disabled = false;
        }

        mask.value = value;

    })


    form.addEventListener("submit", function (e) {
        e.preventDefault();
        let message = `<b>Заявка с сайта Имя: ${this.name.value} Номер: ${this.phone.value} Авто: ${this.avto.checked ? "Забронировать" : "Без брони"} Фото услуги: ${this.photo.checked ? "Заброинровать" : "Без брони"}</b>`;

        const actionAfterSendMsgSuccess = () => {
            this.name.value = "";
            this.phone.value = "";

            form.remove();

            modal.innerHTML = `<h3 style="text-align: center; margin: auto 0; font-weight: 600;">Отправленно...</h3>`

            setTimeout(() => closeForm(modal, formWrapper), 1000)
        }

        const actionAfterSendMsgError = () => {
            const errorMsg = document.createElement("div");
            errorMsg.style.color = "red";
            errorMsg.innerHTML = "Отправка не удалась...";
            inputSubmit.innerHTML = "Отправить"
            inputSubmit.disabled = false;
            form.append(errorMsg)
            setTimeout(() => errorMsg.remove(), 2000)
        }

        inputSubmit.disabled = true;
        inputSubmit.innerHTML = "Отправка..."

        sendForm(message, actionAfterSendMsgSuccess, actionAfterSendMsgError);


    })

    closeBtn.addEventListener("click", function () {
        closeForm(modal, formWrapper);
    })

    formWrapper.addEventListener("click", function () {
        closeForm(modal, formWrapper);
    })
}


const closeForm = (form, background) => {
    body.style.overflow = "auto";
    if (form && background) {
        form.remove();
        background.remove();
        return;
    }
    console.log("not found form");

}



