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

// --- Estilos globais ---
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

  /* ---- T9 Name Modal ---- */
  #t9-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.85);
    z-index: 99999; display: flex; align-items: center; justify-content: center;
  }
  #t9-modal {
    background: #1c1c1e;
    border: 2px solid #e8a445;
    border-radius: 20px;
    padding: 24px 20px 20px;
    width: 320px;
    max-width: 95vw;
    text-align: center;
    color: #fff;
    font-family: sans-serif;
    box-shadow: 0 0 50px rgba(232,164,69,0.45);
    animation: popIn 0.25s ease;
  }
  #t9-modal h3 { color: #e8a445; margin: 0 0 4px 0; font-size: 18px; }
  #t9-modal .t9-subtitle { color: #888; font-size: 12px; margin-bottom: 14px; }
  #t9-screen {
    background: #0f1f0f;
    border: 2px solid #3a5a3a;
    border-radius: 8px;
    padding: 10px 14px;
    min-height: 52px;
    display: flex; align-items: center;
    margin-bottom: 14px;
    position: relative;
  }
  #t9-screen-text {
    font-family: 'Courier New', monospace;
    font-size: 20px;
    color: #7cfc00;
    letter-spacing: 2px;
    word-break: break-all;
    text-align: left;
    flex: 1;
    min-height: 28px;
  }
  #t9-cursor {
    display: inline-block; width: 2px; height: 22px;
    background: #7cfc00; margin-left: 2px; vertical-align: middle;
    animation: blink 0.8s step-end infinite;
  }
  @keyframes blink { 50% { opacity: 0; } }
  #t9-pending-hint {
    position: absolute; top: 4px; right: 8px;
    font-size: 10px; color: #4aaa4a; font-family: monospace;
  }
  #t9-keypad {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;
  }
  .t9-key {
    background: #2c2c2e;
    border: 1px solid #3a3a3c;
    border-radius: 10px;
    padding: 10px 6px 8px;
    cursor: pointer;
    transition: background 0.1s, transform 0.08s;
    user-select: none;
    -webkit-user-select: none;
  }
  .t9-key:active, .t9-key.pressed { background: #4a4a4c; transform: scale(0.93); }
  .t9-key .t9-num {
    display: block; font-size: 20px; font-weight: bold; color: #fff; line-height: 1;
  }
  .t9-key .t9-letters {
    display: block; font-size: 9px; color: #888; letter-spacing: 1px; margin-top: 2px;
  }
  .t9-key.t9-special { background: #2a2a1a; border-color: #5a5a2a; }
  .t9-key.t9-special .t9-num { color: #e8a445; }
  .t9-key.t9-confirm { background: #1a3a1a; border-color: #3a7a3a; }
  .t9-key.t9-confirm .t9-num { color: #7cfc00; font-size: 16px; }
  .t9-key.t9-backspace { background: #3a1a1a; border-color: #7a2a2a; }
  .t9-key.t9-backspace .t9-num { color: #e84545; }

  /* ---- Pizza Quantity Modal ---- */
  #pizza-qty-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.8);
    z-index: 99997; display: flex; align-items: center; justify-content: center;
  }
  #pizza-qty-modal {
    background: #1a1a1a; border: 2px solid #e8a445;
    border-radius: 16px; padding: 32px 28px; max-width: 460px; width: 92%;
    text-align: center; color: #fff; font-family: sans-serif;
    box-shadow: 0 0 50px rgba(232,164,69,0.5);
    animation: popIn 0.25s ease;
  }
  #pizza-qty-modal h3 {
    color: #e8a445; margin: 0 0 6px 0; font-size: 22px;
  }
  #pizza-qty-modal .pizza-subtitle {
    color: #aaa; font-size: 13px; margin-bottom: 20px;
  }
  #pizza-qty-text {
    font-size: 17px; font-weight: bold; min-height: 26px;
    color: #f5d060; margin: 14px 0 0 0;
  }
  .pizza-slice-group {
    cursor: pointer;
    transition: transform 0.25s cubic-bezier(.34,1.56,.64,1);
  }
  .pizza-slice-group:hover .slice-cheese { opacity: 0.9; }
  .pizza-modal-btns {
    display: flex; gap: 12px; justify-content: center; margin-top: 22px;
  }
  .pizza-btn-confirm {
    padding: 10px 28px; background: #e8a445; color: #1a1a1a;
    border: none; border-radius: 8px; font-size: 15px; cursor: pointer;
    font-weight: bold; transition: background 0.15s, opacity 0.15s;
  }
  .pizza-btn-confirm:hover:not(:disabled) { background: #d4922e; }
  .pizza-btn-confirm:disabled { opacity: 0.35; cursor: not-allowed; }
  .pizza-btn-cancel {
    padding: 10px 24px; background: transparent; color: #aaa;
    border: 1px solid #555; border-radius: 8px; font-size: 15px; cursor: pointer;
    transition: all 0.15s;
  }
  .pizza-btn-cancel:hover { background: #333; color: #fff; }
`
const styleTag = document.createElement('style')
styleTag.textContent = modalStyles
document.head.appendChild(styleTag)

// =============================================
// MODAL DE PIZZA — SELEÇÃO DE QUANTIDADE
// =============================================

function showPizzaQuantityModal(productTitle, productPrice, resetFn) {
    const overlay = document.createElement('div')
    overlay.id = 'pizza-qty-overlay'
    overlay.innerHTML = `
        <div id="pizza-qty-modal">
            <h3>🍕 Quantas pizzas você quer?</h3>
            <p class="pizza-subtitle">Clique nas fatias para "cortar" a quantidade desejada</p>
            <svg id="pizza-svg" viewBox="-130 -130 260 260" width="270" height="270"
                 style="display:block;margin:0 auto;overflow:visible"></svg>
            <div id="pizza-qty-text"></div>
            <div class="pizza-modal-btns">
                <button class="pizza-btn-confirm" id="pizza-qty-confirm" disabled>Confirmar</button>
                <button class="pizza-btn-cancel" id="pizza-qty-cancel">Cancelar</button>
            </div>
        </div>
    `
    document.body.appendChild(overlay)

    const svg       = overlay.querySelector('#pizza-svg')
    const qtyText   = overlay.querySelector('#pizza-qty-text')
    const confirmBtn = overlay.querySelector('#pizza-qty-confirm')
    const cancelBtn  = overlay.querySelector('#pizza-qty-cancel')

    const NUM_SLICES = 8
    const R_CHEESE   = 78   // inner cheese radius
    const R_SAUCE    = 90   // sauce/inner ring radius
    const R_CRUST    = 108  // outer crust radius
    const FLEE_DIST  = 14   // how far a slice pops out

    let selectedCount = 0
    const sliceStates = new Array(NUM_SLICES).fill(false)

    // Helper: polar to cartesian
    function pt(r, angleDeg) {
        const a = (angleDeg - 90) * Math.PI / 180
        return [r * Math.cos(a), r * Math.sin(a)]
    }

    // Helper: SVG element
    function el(tag, attrs) {
        const e = document.createElementNS('http://www.w3.org/2000/svg', tag)
        for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v)
        return e
    }

    // Helper: wedge path
    function wedgePath(r1, r2, startDeg, endDeg) {
        const [x1a, y1a] = pt(r1, startDeg)
        const [x2a, y2a] = pt(r1, endDeg)
        const [x1b, y1b] = pt(r2, startDeg)
        const [x2b, y2b] = pt(r2, endDeg)
        const large = (endDeg - startDeg) > 180 ? 1 : 0
        if (r1 === 0) {
            return `M 0 0 L ${x2a} ${y2a} A ${r2} ${r2} 0 ${large} 0 ${x1a} ${y1a} Z`
        }
        return `M ${x1a} ${y1a} A ${r1} ${r1} 0 ${large} 1 ${x2a} ${y2a}
                L ${x2b} ${y2b} A ${r2} ${r2} 0 ${large} 0 ${x1b} ${y1b} Z`
    }

    // Crust ring (full circle, drawn first, behind everything)
    svg.appendChild(el('circle', { cx: 0, cy: 0, r: R_CRUST, fill: '#b5612a', stroke: '#7a3a10', 'stroke-width': 1.5 }))

    // Pepperoni spots scattered across the base (decorative)
    const pepperoniPositions = [
        [40,  20], [-35, 15], [10, -50], [-20, 55], [55, -30],
        [-55, -25], [25, 65], [-60, 40], [60, 50], [0, 30]
    ]

    // --- Draw each slice ---
    const sliceGroups = []

    for (let i = 0; i < NUM_SLICES; i++) {
        const startDeg = i * (360 / NUM_SLICES)
        const endDeg   = (i + 1) * (360 / NUM_SLICES)
        const midDeg   = (startDeg + endDeg) / 2
        const midRad   = (midDeg - 90) * Math.PI / 180

        const g = el('g', { class: 'pizza-slice-group' })
        g.style.transformOrigin = '0 0'
        g.style.transformBox = 'fill-box'

        // Sauce layer (outermost colored ring of this slice)
        const sauce = el('path', {
            d: wedgePath(0, R_SAUCE, startDeg, endDeg),
            fill: '#c0392b',
            stroke: '#7a3a10', 'stroke-width': 1.5
        })

        // Cheese layer
        const cheese = el('path', {
            d: wedgePath(0, R_CHEESE, startDeg, endDeg),
            fill: '#e8c040',
            stroke: '#7a3a10', 'stroke-width': 1,
            class: 'slice-cheese'
        })

        // Pepperoni on this slice
        const pepR = 8
        const pepDist = 48
        const pepAngle = midRad
        const px = pepDist * Math.cos(pepAngle)
        const py = pepDist * Math.sin(pepAngle)
        const pepperoni = el('circle', {
            cx: px, cy: py, r: pepR,
            fill: '#9b2020', stroke: '#7a1515', 'stroke-width': 0.8
        })
        // Pepperoni highlight
        const pepHighlight = el('circle', {
            cx: px - 2, cy: py - 2, r: 2.5,
            fill: '#bf3535', opacity: 0.7
        })

        // Oregano dots
        const oDist = 30, oAngle = midRad
        const ox = oDist * Math.cos(oAngle + 0.3)
        const oy = oDist * Math.sin(oAngle + 0.3)
        const oregano = el('circle', { cx: ox, cy: oy, r: 2.5, fill: '#4a7c3f', opacity: 0.85 })

        // Second pepperoni (smaller, closer to crust)
        const pep2Dist = 66
        const p2x = pep2Dist * Math.cos(midRad + 0.18)
        const p2y = pep2Dist * Math.sin(midRad + 0.18)
        const pep2 = el('circle', { cx: p2x, cy: p2y, r: 6.5, fill: '#9b2020', stroke: '#7a1515', 'stroke-width': 0.8 })

        g.appendChild(sauce)
        g.appendChild(cheese)
        g.appendChild(pepperoni)
        g.appendChild(pepHighlight)
        g.appendChild(pep2)
        g.appendChild(oregano)

        // --- Hover highlight overlay ---
        const hoverPath = el('path', {
            d: wedgePath(0, R_CRUST, startDeg, endDeg),
            fill: 'rgba(255,255,255,0)',
            stroke: 'none',
            style: 'transition: fill 0.15s'
        })
        g.appendChild(hoverPath)

        g.addEventListener('mouseenter', () => {
            if (!sliceStates[i]) hoverPath.setAttribute('fill', 'rgba(255,255,200,0.1)')
        })
        g.addEventListener('mouseleave', () => {
            if (!sliceStates[i]) hoverPath.setAttribute('fill', 'rgba(255,255,255,0)')
        })

        // --- Click: toggle slice ---
        g.addEventListener('click', () => {
            sliceStates[i] = !sliceStates[i]

            if (sliceStates[i]) {
                selectedCount++
                // Pop the slice outward
                const dx = FLEE_DIST * Math.cos(midRad)
                const dy = FLEE_DIST * Math.sin(midRad)
                g.style.transform = `translate(${dx}px, ${dy}px)`
                cheese.setAttribute('fill', '#f5e070')
                hoverPath.setAttribute('fill', 'rgba(255,220,0,0.08)')
            } else {
                selectedCount--
                g.style.transform = 'translate(0, 0)'
                cheese.setAttribute('fill', '#e8c040')
                hoverPath.setAttribute('fill', 'rgba(255,255,255,0)')
            }

            // Update UI
            if (selectedCount > 0) {
                const plural = selectedCount === 1 ? 'pedaço' : 'pedaços'
                qtyText.textContent = `Sua pizza terá ${selectedCount} ${plural}! 🔪`
                confirmBtn.disabled = false
            } else {
                qtyText.textContent = ''
                confirmBtn.disabled = true
            }
        })

        svg.appendChild(g)
        sliceGroups.push(g)
    }

    // Cut lines on top (decorative, non-interactive)
    for (let i = 0; i < NUM_SLICES; i++) {
        const [lx, ly] = pt(R_CRUST, i * (360 / NUM_SLICES))
        svg.appendChild(el('line', {
            x1: 0, y1: 0, x2: lx, y2: ly,
            stroke: '#7a3a10', 'stroke-width': 1.8,
            'pointer-events': 'none', opacity: 0.7
        }))
    }

    // Center dot
    svg.appendChild(el('circle', { cx: 0, cy: 0, r: 4, fill: '#7a3a10' }))

    // Confirm
    confirmBtn.addEventListener('click', () => {
        if (selectedCount === 0) return
        overlay.remove()
        showConfirmationChain(productTitle, productPrice, 0, resetFn, selectedCount)
    })

    cancelBtn.addEventListener('click', () => overlay.remove())

    // Close on backdrop click
    overlay.addEventListener('click', e => {
        if (e.target === overlay) overlay.remove()
    })
}

// =============================================
// CADEIA DE CONFIRMAÇÕES
// =============================================

const confirmationSteps = [
    {
        emoji: "🍕",
        text: "Tem certeza que quer adicionar essa pizza ao carrinho?",
        yes: "Sim, quero muito",
        no: "Não tenho certeza"
    },
    {
        emoji: "🤔",
        text: "Pensa bem... Você Já comeu hoje?",
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

function showConfirmationChain(productTitle, productPrice, stepIndex = 0, resetFn = null, quantity = 1) {
    if (stepIndex >= confirmationSteps.length) {
        doAddToCart(productTitle, productPrice, resetFn, quantity)
        return
    }

    const step = confirmationSteps[stepIndex]
    const overlay = document.createElement('div')
    overlay.id = 'ux-overlay'

    const swapped = stepIndex === confirmationSteps.length - 1

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
        if (swapped) {
            overlay.remove()
            showRejection()
        } else {
            overlay.remove()
            showConfirmationChain(productTitle, productPrice, stepIndex + 1, resetFn, quantity)
        }
    }

    const btnNo = document.createElement('button')
    btnNo.className = 'btn-no'
    btnNo.textContent = step.no
    btnNo.onclick = () => {
        if (swapped) {
            overlay.remove()
            showConfirmationChain(productTitle, productPrice, stepIndex + 1, resetFn, quantity)
        } else {
            overlay.remove()
            showRejection()
        }
    }

    container.appendChild(btnYes)
    container.appendChild(btnNo)
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
          <em>(Obrigado por comprar conosco!)</em></small>
        </div>
        <div class="modal-btns">
          <button class="btn-yes" id="rejection-ok">Tudo bem 😭</button>
        </div>
      </div>
    `
    document.body.appendChild(overlay)
    overlay.querySelector('#rejection-ok').onclick = () => overlay.remove()
}

// =============================================
// BOTÃO QUE FOGE
// =============================================

function makeButtonFlee(button) {
    let hasEscaped = false
    let originalParent = null
    let originalNextSibling = null
    let fleeCount = 0
    const MAX_FLEES = 5

    button._resetFlee = function () {
        fleeCount = 0
        button.style.position = ''
        button.style.left     = ''
        button.style.top      = ''
        button.style.zIndex   = ''
        button.style.margin   = ''
        button.style.cursor   = ''
        button.classList.remove('flee-btn')
        hasEscaped = false
        if (originalParent) {
            originalParent.insertBefore(button, originalNextSibling)
        }
    }

    button.addEventListener('mouseenter', function () {
        if (fleeCount >= MAX_FLEES) return

        if (!hasEscaped) {
            originalParent      = button.parentElement
            originalNextSibling = button.nextSibling

            const rect = button.getBoundingClientRect()
            button.style.position = 'fixed'
            button.style.left = rect.left + 'px'
            button.style.top  = rect.top  + 'px'
            button.style.zIndex = '9999'
            button.style.margin = '0'
            button.classList.add('flee-btn')
            hasEscaped = true
            document.body.appendChild(button)
        }

        fleeCount++

        const padX   = 60
        const padTop = 100
        const padBot = 60
        const maxX = window.innerWidth  - button.offsetWidth  - padX
        const maxY = window.innerHeight - button.offsetHeight - padBot
        const newX = Math.floor(Math.random() * (maxX - padX))    + padX
        const newY = Math.floor(Math.random() * (maxY - padTop))  + padTop

        button.style.left   = newX + 'px'
        button.style.top    = newY + 'px'
        button.style.zIndex = '99997'

        if (fleeCount >= MAX_FLEES) {
            button.classList.remove('flee-btn')
            button.style.cursor = 'pointer'
            const hint = document.createElement('div')
            hint.textContent = 'Ok, ok... pode clicar 😮‍💨'
            hint.style.cssText = `
                position: fixed;
                left: ${button.getBoundingClientRect().left}px;
                top: ${button.getBoundingClientRect().top - 40}px;
                background: #333; color: #fff;
                padding: 6px 12px; border-radius: 6px;
                font-size: 13px; font-family: sans-serif;
                z-index: 99999; pointer-events: none;
                animation: popIn 0.2s ease;
            `
            document.body.appendChild(hint)
            setTimeout(() => hint.remove(), 2500)
        }
    })
}

// =============================================
// ADICIONAR AO CARRINHO
// =============================================

function doAddToCart(productTitle, productPrice, resetFn = null, quantity = 1) {
    const productsCartName = document.getElementsByClassName("cart-product-title")
    for (var i = 0; i < productsCartName.length; i++) {
        if (productsCartName[i].innerText == productTitle) {
            const input = productsCartName[i].parentElement.parentElement
                .getElementsByClassName("product-qtd-input")[0]
            input.value = parseInt(input.value) + quantity
            uptadeTotal()
            showSuccessToast(quantity)
            if (resetFn) resetFn()
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
          <input type="number" value="${quantity}" min="0" class="product-qtd-input">
          <button type="button" class="remove-product-button">Remover</button>
        </td>
    `

    const tableBody = document.querySelector(".cart-table tbody")
    tableBody.append(newCartProduct)
    uptadeTotal()
    showSuccessToast(quantity)
    if (resetFn) resetFn()
    newCartProduct.getElementsByClassName("product-qtd-input")[0]
        .addEventListener("change", ckeckIfInputIsNull)
    newCartProduct.getElementsByClassName("remove-product-button")[0]
        .addEventListener("click", removeProduct)
}

function showSuccessToast(quantity = 1) {
    const toast = document.createElement('div')
    toast.style.cssText = `
        position:fixed; bottom:32px; left:50%; transform:translateX(-50%);
        background:#27ae60; color:#fff; padding:14px 28px; border-radius:8px;
        font-size:15px; z-index:99999; font-family:sans-serif;
        box-shadow: 0 4px 20px rgba(0,0,0,0.4);
        animation: popIn 0.3s ease;
    `
    const sliceWord = quantity === 1 ? '1 pedaço' : `${quantity} pedaços`
    toast.textContent = `🍕 Pizza adicionada (${sliceWord})! Realize o pagamento e nos deixe uma avaliação.`
    document.body.appendChild(toast)
    setTimeout(() => toast.remove(), 3500)
}

// =============================================
// INICIALIZAÇÃO
// =============================================

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

        const productInfos = button.parentElement.parentElement.parentElement
        const productTitle = productInfos.getElementsByClassName("product-title")[0].innerText
        const productPrice = productInfos.getElementsByClassName("product-price")[0].innerText

        button.dataset.title = productTitle
        button.dataset.price = productPrice

        makeButtonFlee(button)

        button.addEventListener("click", function () {
            showPizzaQuantityModal(
                this.dataset.title,
                this.dataset.price,
                this._resetFlee
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

// =============================================
// TECLADO T9 — MODAL DE NOME
// =============================================

const T9_MAP = {
    '1': ['.', ',', '!', '?'],
    '2': ['A', 'B', 'C'],
    '3': ['D', 'E', 'F'],
    '4': ['G', 'H', 'I'],
    '5': ['J', 'K', 'L'],
    '6': ['M', 'N', 'O'],
    '7': ['P', 'Q', 'R', 'S'],
    '8': ['T', 'U', 'V'],
    '9': ['W', 'X', 'Y', 'Z'],
    '0': [' '],
}

function showNameModal(onConfirm) {
    const overlay = document.createElement('div')
    overlay.id = 't9-overlay'
    overlay.innerHTML = `
        <div id="t9-modal">
            <h3>📱 Qual é o seu nome?</h3>
            <p class="t9-subtitle">Use o teclado abaixo — pressione várias vezes para trocar a letra</p>
            <div id="t9-screen">
                <div id="t9-screen-text"></div>
                <span id="t9-cursor"></span>
                <span id="t9-pending-hint"></span>
            </div>
            <div id="t9-keypad">
                <button class="t9-key t9-special" data-key="1"><span class="t9-num">1</span><span class="t9-letters">. , ! ?</span></button>
                <button class="t9-key" data-key="2"><span class="t9-num">2</span><span class="t9-letters">A B C</span></button>
                <button class="t9-key" data-key="3"><span class="t9-num">3</span><span class="t9-letters">D E F</span></button>
                <button class="t9-key" data-key="4"><span class="t9-num">4</span><span class="t9-letters">G H I</span></button>
                <button class="t9-key" data-key="5"><span class="t9-num">5</span><span class="t9-letters">J K L</span></button>
                <button class="t9-key" data-key="6"><span class="t9-num">6</span><span class="t9-letters">M N O</span></button>
                <button class="t9-key" data-key="7"><span class="t9-num">7</span><span class="t9-letters">P Q R S</span></button>
                <button class="t9-key" data-key="8"><span class="t9-num">8</span><span class="t9-letters">T U V</span></button>
                <button class="t9-key" data-key="9"><span class="t9-num">9</span><span class="t9-letters">W X Y Z</span></button>
                <button class="t9-key t9-backspace" data-key="*"><span class="t9-num">⌫</span><span class="t9-letters">apagar</span></button>
                <button class="t9-key" data-key="0"><span class="t9-num">0</span><span class="t9-letters">espaço</span></button>
                <button class="t9-key t9-confirm" data-key="#"><span class="t9-num">OK ✓</span><span class="t9-letters">confirmar</span></button>
            </div>
        </div>
    `
    document.body.appendChild(overlay)

    const screenText  = overlay.querySelector('#t9-screen-text')
    const pendingHint = overlay.querySelector('#t9-pending-hint')

    let confirmed  = ''       // letras já confirmadas
    let pendingKey = null     // última tecla pressionada
    let pendingIdx = 0        // índice atual dentro das letras dessa tecla
    let timer      = null     // timeout para confirmar letra pendente

    const COMMIT_DELAY = 900  // ms sem nova pressão para confirmar a letra

    function render() {
        const pendingChar = pendingKey ? T9_MAP[pendingKey][pendingIdx] : ''
        screenText.textContent = confirmed + pendingChar
        pendingHint.textContent = pendingChar ? `[${T9_MAP[pendingKey].join(' ')}]` : ''
    }

    function commitPending() {
        if (pendingKey !== null) {
            confirmed += T9_MAP[pendingKey][pendingIdx]
            pendingKey = null
            pendingIdx = 0
            pendingHint.textContent = ''
            clearTimeout(timer)
        }
    }

    function handleKey(key) {
        if (key === '*') {
            // Backspace
            clearTimeout(timer)
            if (pendingKey !== null) {
                pendingKey = null
                pendingIdx = 0
            } else if (confirmed.length > 0) {
                confirmed = confirmed.slice(0, -1)
            }
            render()
            return
        }

        if (key === '#') {
            // Confirmar
            commitPending()
            const name = confirmed.trim()
            if (!name) {
                // shake the screen
                const screen = overlay.querySelector('#t9-screen')
                screen.style.animation = 'none'
                screen.style.border = '2px solid #e84545'
                setTimeout(() => { screen.style.border = '2px solid #3a5a3a' }, 600)
                return
            }
            overlay.remove()
            onConfirm(name)
            return
        }

        if (!(key in T9_MAP)) return

        if (pendingKey === key) {
            // Mesmo botão: avança para a próxima letra
            clearTimeout(timer)
            pendingIdx = (pendingIdx + 1) % T9_MAP[key].length
        } else {
            // Botão diferente: confirma o pendente e começa novo
            commitPending()
            pendingKey = key
            pendingIdx = 0
        }

        // Timer para confirmar automaticamente após pausa
        clearTimeout(timer)
        timer = setTimeout(() => {
            commitPending()
            render()
        }, COMMIT_DELAY)

        render()
    }

    // Bind dos botões
    overlay.querySelectorAll('.t9-key').forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.dataset.key
            // Efeito visual de pressão
            btn.classList.add('pressed')
            setTimeout(() => btn.classList.remove('pressed'), 120)
            handleKey(key)
        })
    })

    // Bloquear teclado físico no overlay
    overlay.addEventListener('keydown', e => e.preventDefault())
    // Forçar foco no overlay para capturar keydown
    overlay.setAttribute('tabindex', '0')
    overlay.focus()

    render()
}

function makePurchase() {
    if (totalAmount == "0,00") {
        alert("Seu carrinho está vazio!")
        return
    }

    showNameModal(function(customerName) {
        alert(
            `Obrigado pela sua compra, ${customerName}!\nValor do pedido: R$${totalAmount}\n\nVolte sempre :)`
        )
        var paymentUrl = "https://nubank.com.br/cobrar/12qkmg/6564cfc8-ef06-4d60-85f8-ade75c711cc6"
        window.open(paymentUrl, '_blank')
        document.querySelector(".cart-table tbody").innerHTML = ""
        uptadeTotal()
    })
}
