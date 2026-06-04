/**
 * Carrito de Compras - Chumay Chifa Parrillas
 * Maneja el estado del carrito usando localStorage
 */

const CARRITO_KEY = 'chumay_carrito';

// ─── Operaciones sobre el carrito ───────────────────────────────────────────

function obtenerCarrito() {
    const data = localStorage.getItem(CARRITO_KEY);
    return data ? JSON.parse(data) : [];
}

function guardarCarrito(carrito) {
    localStorage.setItem(CARRITO_KEY, JSON.stringify(carrito));
    actualizarContadorNav();
    renderizarCarritoSidebar();
}

function agregarAlCarrito(producto) {
    const carrito = obtenerCarrito();
    const idx = carrito.findIndex(i => i.id === producto.id);
    if (idx >= 0) {
        carrito[idx].cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    guardarCarrito(carrito);
    mostrarToast(`✅ ${producto.nombre} agregado al carrito`);
    abrirSidebarCarrito();
}

function cambiarCantidad(id, delta) {
    const carrito = obtenerCarrito();
    const idx = carrito.findIndex(i => i.id === id);
    if (idx < 0) return;
    carrito[idx].cantidad += delta;
    if (carrito[idx].cantidad <= 0) {
        carrito.splice(idx, 1);
    }
    guardarCarrito(carrito);
}

function eliminarDelCarrito(id) {
    let carrito = obtenerCarrito();
    carrito = carrito.filter(i => i.id !== id);
    guardarCarrito(carrito);
}

function vaciarCarrito() {
    localStorage.removeItem(CARRITO_KEY);
    actualizarContadorNav();
    renderizarCarritoSidebar();
}

function calcularTotal() {
    return obtenerCarrito().reduce((sum, i) => sum + (i.precio * i.cantidad), 0);
}

function contarItems() {
    return obtenerCarrito().reduce((sum, i) => sum + i.cantidad, 0);
}

// ─── UI: Contador en navbar ──────────────────────────────────────────────────

function actualizarContadorNav() {
    const total = contarItems();
    document.querySelectorAll('#cart-count').forEach(el => {
        el.textContent = total;
        el.style.display = total > 0 ? 'inline-block' : 'none';
    });
}

// ─── UI: Sidebar del carrito ─────────────────────────────────────────────────

function abrirSidebarCarrito() {
    const sidebar = document.getElementById('carrito-sidebar');
    const overlay = document.getElementById('carrito-overlay');
    if (sidebar) {
        sidebar.classList.add('abierto');
        overlay && overlay.classList.add('activo');
        document.body.style.overflow = 'hidden';
    }
}

function cerrarSidebarCarrito() {
    const sidebar = document.getElementById('carrito-sidebar');
    const overlay = document.getElementById('carrito-overlay');
    if (sidebar) {
        sidebar.classList.remove('abierto');
        overlay && overlay.classList.remove('activo');
        document.body.style.overflow = '';
    }
}

function renderizarCarritoSidebar() {
    const lista = document.getElementById('carrito-items');
    const totalEl = document.getElementById('carrito-total');
    const btnPedir = document.getElementById('btn-confirmar-pedido');
    if (!lista) return;

    const carrito = obtenerCarrito();

    if (carrito.length === 0) {
        lista.innerHTML = `
            <div class="carrito-vacio">
                <i class="fas fa-shopping-basket fa-3x text-muted mb-3"></i>
                <p class="text-muted">Tu carrito está vacío</p>
            </div>`;
        if (totalEl) totalEl.textContent = 'S/ 0.00';
        if (btnPedir) btnPedir.disabled = true;
        return;
    }

    lista.innerHTML = carrito.map(item => `
        <div class="carrito-item" id="cart-item-${item.id}">
            <img src="${item.foto || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=80&q=60'}"
                 alt="${item.nombre}" class="carrito-item-img">
            <div class="carrito-item-info">
                <p class="carrito-item-nombre">${item.nombre}</p>
                <p class="carrito-item-precio">S/ ${parseFloat(item.precio).toFixed(2)}</p>
                <div class="carrito-item-controles">
                    <button class="btn-qty" onclick="cambiarCantidad(${item.id}, -1)">−</button>
                    <span class="qty-num">${item.cantidad}</span>
                    <button class="btn-qty" onclick="cambiarCantidad(${item.id}, 1)">+</button>
                </div>
            </div>
            <button class="btn-eliminar-item" onclick="eliminarDelCarrito(${item.id})" title="Quitar">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `).join('');

    if (totalEl) totalEl.textContent = `S/ ${calcularTotal().toFixed(2)}`;
    if (btnPedir) btnPedir.disabled = false;
}

// ─── UI: Toast de notificación ───────────────────────────────────────────────

function mostrarToast(mensaje) {
    let toast = document.getElementById('chumay-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'chumay-toast';
        document.body.appendChild(toast);
    }
    toast.textContent = mensaje;
    toast.classList.add('visible');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => toast.classList.remove('visible'), 3000);
}

// ─── Inyección del sidebar en el DOM ─────────────────────────────────────────

function inyectarSidebarCarrito() {
    if (document.getElementById('carrito-sidebar')) return;

    const overlay = document.createElement('div');
    overlay.id = 'carrito-overlay';
    overlay.onclick = cerrarSidebarCarrito;

    const sidebar = document.createElement('div');
    sidebar.id = 'carrito-sidebar';
    sidebar.innerHTML = `
        <div class="carrito-header">
            <h5><i class="fas fa-shopping-cart me-2"></i>Mi Pedido</h5>
            <button class="btn-cerrar-carrito" onclick="cerrarSidebarCarrito()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div id="carrito-items" class="carrito-items-lista"></div>
        <div class="carrito-footer">
            <div class="carrito-total-row">
                <span class="fw-bold">Total:</span>
                <span id="carrito-total" class="carrito-total-monto">S/ 0.00</span>
            </div>
            <button id="btn-confirmar-pedido" class="btn-confirmar" onclick="irAlCarrito()" disabled>
                <i class="fas fa-whatsapp me-2"></i>Confirmar Pedido
            </button>
            <button class="btn-vaciar" onclick="vaciarCarrito()">
                <i class="fas fa-trash me-1"></i>Vaciar carrito
            </button>
        </div>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(sidebar);
}

function irAlCarrito() {
    window.location.href = '/carrito';
}

// ─── Init ─────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
    inyectarSidebarCarrito();
    actualizarContadorNav();
    renderizarCarritoSidebar();

    // Hacer que el botón del carrito en el navbar abra el sidebar
    document.querySelectorAll('a[href="/carrito"]').forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            abrirSidebarCarrito();
        });
    });
});
