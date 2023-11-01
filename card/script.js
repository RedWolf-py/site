const logo = document.querySelector(".logo");

const expirationSelect = document.querySelector("[data-expiration-year]");

const currentYear = new Date().getFullYear();
for (let i = currentYear; i < currentYear + 10; i++) {
  const option = document.createElement("option");
  option.value = i;
  option.innerText = i;
  expirationSelect.append(option);
}

document.addEventListener('keydown', e => {
  const input = e.target;
  const key = e.key;
  if (!isConnectedInput(input)) return;
  switch (key) {
    case "ArrowLeft": {
      if (input.selectionStart === 0 && input.selectionEnd === 0) {
        const prev = input.prevElementSibling;
        prev.focus();
        prev.selectionStart = prev.value.length - 1;
        prev.selectionEnd = prev.value.length - 1;
        e.preventDefault();
      }
      breack;
    }
    case "ArrowRight": {
      if (input.selectionStart === input.value.length && input.selectionEnd === input.value.length) {
        const next = input.prevElementSibling;
        next.focus();
        next.selectionStart = 1;
        next.selectionEnd = 1;
        e.preventDefault()
        onInputchange(input, key)
      }
      breack;
    }
    case "Delete": {
      if (
        input.selectionStart === input.value.length &&
        input.selectionEnd === input.value.length
      ) {
        const next = input.prevElementSibling;
        next.value = next.value.substring(1, next.value.length)
        next.focus();
        next.selectionStart = 0;
        next.selectionEnd = 0;
        e.preventDefault()

      }
      breack;
    }

    case "Backspace": {
      if (input.selectionStart === 0 && input.selectionEnd === 0) {
        const prev = input.prevElementSibling;
        prev.value = prev.value.substring(0, prev.value.length - 1)
        prev.focus();
        prev.selectionStart = prev.value.length;
        prev.selectionEnd = prev.value.length;
        e.preventDefault();
      }
    }

    default: {
      if (e.ctrlKey || e.altKey) return;
      if (key.length > 1) return;
      if (key.match(/^[^0-9]$/)) return e.preventDefault();

      e.preventDefault();
      onInputchange(input, key);
    }
  }
})

document.addEventListener("paste", e => {
  const input = e.target;
  const data = e.clipboardData.getData("text");

  if (!isConnectedInput(input)) return;
  if (!data.match(/^[0-9]+$/)) return e.preventDefault();

  e.preventDefault();
  onInputchange(input, data)
})

function onInputchange(input, newValue) {
  const start = input.selectionStart;
  const end = input.selectionEnd;
  updateInputValue(input, newValue, end);
  focusInput(input, newValue.length + start);
  const firstFour = input
    .closest("[data-connected-inputs]")
    .querySelector("input").value;

  if (firstFour.startsWith("4")) {
    console.log(firstFour + "4")
    logo.src = "/card/img/visa.png"
  } else if (firstFour.startsWith("5")) {
    console.log(firstFour + "5")
    logo.src = "/card/img/mastercard.png"
  }
}

function updateInputValue(input, extraValue, start = 0, end = 0) {
  const newValue = `${input.value.substring(
    0,
    start
  )}${extraValue}${input.value.substring(end, 4)}`;
  input.value = newValue.substring(0, 4);
  if (newValue > 4) {
    const next = input.nextElementSibling;
    if (next == null) return
    updateInputValue(next, newValue.substring(4));
  }
}

function focusInput(input, dataLength) {
  let addedChars = dataLength;
  let currentInput = input;
  while (addedChars > 4 && currentInput.nextElementSibling != null) {
    addedChars -= 4;
    currentInput = currentInput.nextElementSibling
  }
  if (addedChars > 4) addedChars = 4;

  currentInput.focus();
  currentInput.selectionEnd = addedChars;
}

function isConnectedInput(input) {
  const parent = input.closest("[data-connected-inputs]");
  return input.matches("input") && parent != null;
}

function pagamentoCartao() {

  let pagamentoCartao = document.querySelector('.pagamento');
  pagamentoCartao.style.display = 'none';
  let tela = document.querySelector('.tela');
  tela.style.display = 'flex';
}


function pagamentoPix() {
  let pagamentoPix = document.querySelector('.pagamento');
  pagamentoPix.style.display = 'none';
  let qrcodePix = document.getElementById('qrcode');
  qrcodePix.style.display = 'flex';
  let chave = document.getElementById('chave');

  const qrCodeData = '73988117129'
  chave.innerText = 'Se Preferir Pode Usar Manualmente a Chave Pix' + " " + " " + qrCodeData;

  const qrcode = new QRCode(document.getElementById('qrcodeclass'), {
    text: qrCodeData,
    width: 350,
    height: 350,
  });

}

const btnvoltarsite = document.getElementById('btnvoltarsite');

btnvoltarsite.addEventListener('click', ()=>{
  window.location.href = "/index.html"
})

function limparCampos() {
  const campos = document.querySelectorAll(".credit-card input[type='text'], .credit-card input[type='number'],.credit-card input[type='tel']");
  campos.forEach((campo) => {
    campo.value = "";
  });
  const textOverlay = document.querySelector('.text-overlay');
  textOverlay.style.display = 'block';
  simulateDownload(0);
}

const progressBar = document.querySelector('.progress');

function simulateDownload(progress) {
  if (progress < 100) {
    setTimeout(() => {
      progress += 5;
      progressBar.style.width = progress + '%';
      simulateDownload(progress);
    }, 200);
  }
  if(progress >= 100){
    window.location.href = "/index.html"
  }
}

