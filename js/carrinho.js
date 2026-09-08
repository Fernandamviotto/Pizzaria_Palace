// =============================================
// PIZZA PALACE — O PIOR CARRINHO DO MUNDO 🍕
// Trabalho UX — Forma Inusitada de Adicionar ao Carrinho
// =============================================

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

var totalAmount = "0,00"

// --- Estilos do modal de confirmação (injetados dinamicamente) ---
const modalStyles = `
  #ux-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.7);
    z-index: 99998; display: flex; align-items: center; justify-content: center;
  }
  #ux-modal {
    background: #1a1a1a; border: 2px solid #e84545;
    border-radius: 12px; padding: 36px 32px; max-width: 420px; width: 90%;
    text-align: center; color: #fff; font-family: sans-serif;
    box-shadow: 0 0 40px rgba(232,69,69,0.4);
    animation: popIn 0.2s ease;
  }
  @keyframes popIn {
    from { transform: scale(0.8); opacity: 0; }
    to   { transform: scale(1);   opacity: 1; }
  }
  #ux-modal .step-indicator {
    font-size: 11px; color: #888; margin-bottom: 12px; letter-spacing: 1px;
    text-transform: uppercase;
  }
  #ux-modal .modal-emoji { font-size: 48px; margin-bottom: 12px; display: block; }
  #ux-modal .modal-text  { font-size: 16px; margin-bottom: 28px; line-height: 1.5; }
  #ux-modal .modal-btns  { display: flex; gap: 12px; justify-content: center; }
  #ux-modal .btn-yes {
    padding: 10px 24px; background: #e84545; color: #fff;
    border: none; border-radius: 8px; font-size: 15px; cursor: pointer;
    font-weight: bold; transition: background 0.15s;
  }
  #ux-modal .btn-yes:hover { background: #c73535; }
  #ux-modal .btn-no {
    padding: 10px 24px; background: transparent; color: #aaa;
    border: 1px solid #555; border-radius: 8px; font-size: 15px; cursor: pointer;
    transition: all 0.15s;
  }
  #ux-modal .btn-no:hover { background: #333; color: #fff; }
  .flee-btn {
    transition: left 0.12s cubic-bezier(.17,.67,.83,.67),
                top  0.12s cubic-bezier(.17,.67,.83,.67) !important;
    cursor: crosshair !important;
  }
`
const styleTag = document.createElement('style')
styleTag.textContent = modalStyles
document.head.appendChild(styleTag)

// --- Cadeia de confirmações (cada passo mais absurdo) ---
const confirmationSteps = [
    {
        emoji: "🍕",
        text: "Tem certeza que quer adicionar essa pizza ao carrinho?",
        yes: "Sim, quero muito",
        no: "Não tenho certeza"
    },
    {
        emoji: "🤔",
        text: "Pensa bem... Você JÁ comeu hoje?",
        yes: "Já comi, quero mesmo assim",
        no: "Você tem razão, obrigado"
    },
    {
        emoji: "⚠️",
        text: "Esta ação é IRREVERSÍVEL. A pizza será adicionada ao seu carrinho para sempre (até você remover manualmente).",
        yes: "Aceito as consequências",
        no: "Preciso de mais tempo"
    },
    {
        emoji: "📋",
        text: "Ao continuar, você concorda com os Termos de Uso, a Política de Privacidade, o Código de Ética da Pizza Palace, e que a pizza estará quente na entrega.",
        yes: "Concordo com tudo",
        no: "Li os termos e recuso"
    },
    {
        emoji: "🎰",
        text: "ATENÇÃO: Os botões abaixo foram embaralhados aleatoriamente. Boa sorte!",
        yes: "SIM",
        no: "NÃO"
    }
]

function showConfirmationChain(productTitle, productPrice, stepIndex = 0) {
    if (stepIndex >= confirmationSteps.length) {
        // Chegou ao fim — adiciona ao carrinho de verdade
        doAddToCart(productTitle, productPrice)
        return
    }

    const step = confirmationSteps[stepIndex]
    const swapButtons = Math.random() > 0.5  // 50% de chance de embaralhar

    // Sempre embaralha no último passo (passo 4)
    const forceSwap = stepIndex === 4

    const overlay = document.createElement('div')
    overlay.id = 'ux-overlay'

    const swapped = forceSwap || swapButtons

    overlay.innerHTML = `
      <div id="ux-modal">
        <div class="step-indicator">Confirmação ${stepIndex + 1} de ${confirmationSteps.length}</div>
        <span class="modal-emoji">${step.emoji}</span>
        <div class="modal-text">${step.text}</div>
        <div class="modal-btns" id="modal-btns-container"></div>
      </div>
    `
    document.body.appendChild(overlay)

    const container = overlay.querySelector('#modal-btns-container')

    const btnYes = document.createElement('button')
    btnYes.className = 'btn-yes'
    btnYes.textContent = step.yes
    btnYes.onclick = () => {
        // Se embaralhado, "yes" é na verdade "no"
        if (swapped) {
            overlay.remove()
            // Clicou em "sim" mas era "não" — recomeça do zero com mensagem
            showRejection()
        } else {
            overlay.remove()
            showConfirmationChain(productTitle, productPrice, stepIndex + 1)
        }
    }

    const btnNo = document.createElement('button')
    btnNo.className = 'btn-no'
    btnNo.textContent = step.no
    btnNo.onclick = () => {
        // Se embaralhado, "no" é na verdade "yes"
        if (swapped) {
            overlay.remove()
            showConfirmationChain(productTitle, productPrice, stepIndex + 1)
        } else {
            overlay.remove()
            showRejection()
        }
    }

    if (swapped) {
        container.appendChild(btnYes)  // aparece primeiro mas funciona como "não"
        container.appendChild(btnNo)
    } else {
        container.appendChild(btnYes)
        container.appendChild(btnNo)
    }
}

function showRejection() {
    const overlay = document.createElement('div')
    overlay.id = 'ux-overlay'
    overlay.innerHTML = `
      <div id="ux-modal">
        <span class="modal-emoji">😢</span>
        <div class="modal-text">
          Ok, pizza cancelada.<br><br>
          <small style="color:#888">Dica: tente clicar no botão de adicionar ao carrinho novamente. Se conseguir.<br><br>
          <em>(Obrigado por participar do pior UX do mundo)</em></small>
        </div>
        <div class="modal-btns">
          <button class="btn-yes" id="rejection-ok">Tudo bem 😭</button>
        </div>
      </div>
    `
    document.body.appendChild(overlay)
    overlay.querySelector('#rejection-ok').onclick = () => overlay.remove()
}

// --- Lógica de fuga do botão ---
function makeButtonFlee(button) {
    let hasEscaped = false
    let originalRect = null

    button.addEventListener('mouseenter', function () {
        if (!hasEscaped) {
            // Primeira vez: captura posição real e solta o botão no mundo
            originalRect = button.getBoundingClientRect()
            button.style.position = 'fixed'
            button.style.left = originalRect.left + 'px'
            button.style.top = originalRect.top + 'px'
            button.style.zIndex = '9999'
            button.style.margin = '0'
            button.classList.add('flee-btn')
            hasEscaped = true
            document.body.appendChild(button)
        }

        // Foge para posição aleatória na tela
        const padding = 60
        const maxX = window.innerWidth  - button.offsetWidth  - padding
        const maxY = window.innerHeight - button.offsetHeight - padding
        const newX = Math.floor(Math.random() * maxX) + padding / 2
        const newY = Math.floor(Math.random() * maxY) + padding / 2

        button.style.left = newX + 'px'
        button.style.top  = newY + 'px'
    })
}

// --- Adicionar ao carrinho (função real, chamada só após todas confirmações) ---
function doAddToCart(productTitle, productPrice) {
    const productsCartName = document.getElementsByClassName("cart-product-title")
    for (var i = 0; i < productsCartName.length; i++) {
        if (productsCartName[i].innerText == productTitle) {
            productsCartName[i].parentElement.parentElement
                .getElementsByClassName("product-qtd-input")[0].value++
            uptadeTotal()
            showSuccessToast()
            return
        }
    }

    let newCartProduct = document.createElement("tr")
    newCartProduct.classList.add("cart-product")
    newCartProduct.innerHTML = `
        <td class="product-identification">
          <strong class="cart-product-title text-white">${productTitle}</strong>
        </td>
        <td>
          <span class="cart-product-price">${productPrice}</span>
        </td>
        <td>
          <input type="number" value="1" min="0" class="product-qtd-input">
          <button type="button" class="remove-product-button">Remover</button>
        </td>
    `

    const tableBody = document.querySelector(".cart-table tbody")
    tableBody.append(newCartProduct)
    uptadeTotal()
    showSuccessToast()
    newCartProduct.getElementsByClassName("product-qtd-input")[0]
        .addEventListener("change", ckeckIfInputIsNull)
    newCartProduct.getElementsByClassName("remove-product-button")[0]
        .addEventListener("click", removeProduct)
}

function showSuccessToast() {
    const toast = document.createElement('div')
    toast.style.cssText = `
        position:fixed; bottom:32px; left:50%; transform:translateX(-50%);
        background:#27ae60; color:#fff; padding:14px 28px; border-radius:8px;
        font-size:15px; z-index:99999; font-family:sans-serif;
        box-shadow: 0 4px 20px rgba(0,0,0,0.4);
        animation: popIn 0.2s ease;
    `
    toast.textContent = '🍕 Pizza adicionada! Só demorou 5 confirmações...'
    document.body.appendChild(toast)
    setTimeout(() => toast.remove(), 3000)
}

// --- Inicialização ---
function ready() {
    const removeProductButtons = document.getElementsByClassName("remove-product-button")
    for (var i = 0; i < removeProductButtons.length; i++) {
        removeProductButtons[i].addEventListener("click", removeProduct)
    }

    const quantityInputs = document.getElementsByClassName("product-qtd-input")
    for (var i = 0; i < quantityInputs.length; i++) {
        quantityInputs[i].addEventListener("change", ckeckIfInputIsNull)
    }

    const addToCartButtons = document.getElementsByClassName("button-hover-background")
    for (var i = 0; i < addToCartButtons.length; i++) {
        const button = addToCartButtons[i]

        // Captura dados do produto antes de soltar o botão no mundo
        const productInfos = button.parentElement.parentElement.parentElement
        const productTitle = productInfos.getElementsByClassName("product-title")[0].innerText
        const productPrice = productInfos.getElementsByClassName("product-price")[0].innerText

        button.dataset.title = productTitle
        button.dataset.price = productPrice

        // Faz o botão fugir
        makeButtonFlee(button)

        // Ao clicar (se conseguir): inicia cadeia de confirmações
        button.addEventListener("click", function () {
            showConfirmationChain(
                this.dataset.title,
                this.dataset.price,
                0
            )
        })
    }

    const purchaseButton = document.getElementsByClassName("purchase-button")[0]
    purchaseButton.addEventListener("click", makePurchase)
}

function removeProduct(event) {
    event.target.parentElement.parentElement.remove()
    uptadeTotal()
}

function ckeckIfInputIsNull(event) {
    if (event.target.value === "0") {
        event.target.parentElement.parentElement.remove()
    }
    uptadeTotal()
}

function uptadeTotal() {
    totalAmount = 0
    const cartProducts = document.getElementsByClassName("cart-product")
    for (var i = 0; i < cartProducts.length; i++) {
        const productPrice = cartProducts[i]
            .getElementsByClassName("cart-product-price")[0].innerText
            .replace("R$", "").replace(",", ".")
        const productQuantity = cartProducts[i]
            .getElementsByClassName("product-qtd-input")[0].value
        totalAmount += productPrice * productQuantity
    }
    totalAmount = totalAmount.toFixed(2).replace(".", ",")
    document.querySelector(".cart-total-container span").innerText = "R$" + totalAmount
}

function makePurchase() {
    if (totalAmount == "0,00") {
        alert("Seu carrinho está vazio!")
    } else {
        alert(
            `Obrigado pela sua compra!\nValor do pedido: R$${totalAmount}\n\nVolte sempre :)`
        )
        var paymentUrl = "https://nubank.com.br/cobrar/12qkmg/6564cfc8-ef06-4d60-85f8-ade75c711cc6"
        window.open(paymentUrl, '_blank')
        document.querySelector(".cart-table tbody").innerHTML = ""
        uptadeTotal()
    }
}
