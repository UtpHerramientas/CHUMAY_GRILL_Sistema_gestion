document.addEventListener('DOMContentLoaded', () => {
    console.log("LK's Gourmet System Initialized");

    // Smooth scroll para los enlaces con ancla (como #catalogo)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                // Compensar la altura del navbar sticky (aprox 80px)
                const yOffset = -80; 
                const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({top: y, behavior: 'smooth'});
                
                // Actualizar la URL sin recargar
                history.pushState(null, null, targetId);
            }
        });
    });

    cargarTopPlatos();
    cargarCatalogo();
});

async function cargarTopPlatos() {
    try {
        const response = await fetch('/api/productos/top');
        if (!response.ok) return;
        const platosTop = await response.json();
        
        if (platosTop.length > 0) {
            renderTopPlatos(platosTop);
        } else {
            // Placeholder si no hay top
            document.getElementById('top-platos-container').innerHTML = '<p class="text-center text-muted">Aún no hay platos destacados.</p>';
        }
    } catch (e) {
        console.error("Error cargando top platos", e);
    }
}

function renderTopPlatos(platos) {
    const container = document.getElementById('top-platos-container');
    if (!container) return;

    container.innerHTML = platos.map((plato, index) => `
        <div class="col-md-4">
            <div class="card top-plate-card shadow-sm h-100 border-0 rounded-4 overflow-hidden" style="transition: transform 0.3s;">
                <div class="badge bg-warning text-dark position-absolute top-0 end-0 m-3 p-2 rounded-circle fw-bold shadow">
                    #${index + 1}
                </div>
                <img src="${plato.foto || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80'}" class="card-img-top" alt="${plato.nombre}" style="height: 250px; object-fit: cover;">
                <div class="card-body text-center p-4">
                    <h4 class="card-title fw-bold">${plato.nombre}</h4>
                    <p class="text-muted small italic">${plato.descripcion || 'Sabor auténtico de la región.'}</p>
                    <p class="h5 text-primary fw-bold text-gold mt-3">S/ ${parseFloat(plato.precio).toFixed(2)}</p>
                    <button class="btn btn-outline-warning btn-sm mt-3 rounded-pill px-4 fw-bold">Agregar al Carrito</button>
                </div>
            </div>
        </div>
    `).join('');
}

async function cargarCatalogo() {
    try {
        const [catRes, prodRes] = await Promise.all([
            fetch('/api/categorias/activas'),
            fetch('/api/productos/catalogo')
        ]);
        
        const categorias = await catRes.json();
        const productos = await prodRes.json();
        
        renderNavegacionCategorias(categorias);
        renderCatalogoCompleto(categorias, productos);
        
    } catch (e) {
        console.error("Error cargando el catálogo completo", e);
        document.getElementById('catalogo-container').innerHTML = '<p class="text-center text-danger">Ocurrió un error al cargar el menú. Por favor, recarga la página.</p>';
    }
}

function renderNavegacionCategorias(categorias) {
    const nav = document.getElementById('categorias-nav');
    if (!nav) return;
    
    if (categorias.length === 0) {
        nav.innerHTML = '';
        return;
    }
    
    // El primer botón "Todos" y luego los demás
    nav.innerHTML = `
        <a href="#catalogo" class="btn btn-warning rounded-pill px-4 fw-bold mb-2 shadow-sm">Todo</a>
        ${categorias.map(c => `
            <a href="#cat-${c.id}" class="btn btn-outline-dark rounded-pill px-4 mb-2 bg-white"><i class="${c.icono || 'fas fa-utensils'} text-warning"></i> ${c.nombre}</a>
        `).join('')}
    `;
}

function renderCatalogoCompleto(categorias, productos) {
    const container = document.getElementById('catalogo-container');
    if (!container) return;
    
    if (productos.length === 0) {
        container.innerHTML = '<p class="text-center text-muted fs-5">Aún no hay platillos en el catálogo.</p>';
        return;
    }
    
    let html = '';
    
    // Agrupar productos por categoría
    categorias.forEach(cat => {
        const prodsCat = productos.filter(p => p.categoria && p.categoria.id === cat.id);
        
        if (prodsCat.length > 0) {
            html += `
                <div class="categoria-section mb-5" id="cat-${cat.id}">
                    <div class="d-flex align-items-center mb-4">
                        <div class="bg-warning text-dark rounded-circle d-flex justify-content-center align-items-center me-3 shadow-sm" style="width: 50px; height: 50px; font-size: 1.2rem;">
                            <i class="${cat.icono || 'fas fa-utensils'}"></i>
                        </div>
                        <div>
                            <h3 class="fw-bold mb-0 text-dark">${cat.nombre}</h3>
                            <p class="text-muted mb-0 small">${cat.descripcion || ''}</p>
                        </div>
                    </div>
                    
                    <div class="row g-4">
                        ${prodsCat.map(p => `
                            <div class="col-md-6 col-lg-4">
                                <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden" style="transition: transform 0.2s;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
                                    <div class="row g-0 h-100">
                                        <div class="col-5">
                                            <img src="${p.foto || 'https://via.placeholder.com/150?text=Sin+Foto'}" class="img-fluid h-100 w-100" alt="${p.nombre}" style="object-fit: cover; min-height: 140px;">
                                        </div>
                                        <div class="col-7 bg-white">
                                            <div class="card-body p-3 d-flex flex-column h-100">
                                                <h6 class="card-title fw-bold mb-1 text-dark">${p.nombre}</h6>
                                                <p class="card-text small text-muted mb-2 lh-sm" style="display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; font-size: 0.8rem;">
                                                    ${p.descripcion || ''}
                                                </p>
                                                <div class="d-flex justify-content-between align-items-center mt-auto pt-2">
                                                    <span class="fs-6 fw-bold text-success">S/ ${parseFloat(p.precio).toFixed(2)}</span>
                                                    <button class="btn btn-sm btn-warning rounded-circle text-white shadow-sm d-flex justify-content-center align-items-center" style="width: 32px; height: 32px;" title="Agregar">
                                                        <i class="fas fa-plus"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
    });
    
    // Si hay productos sin categoría, o con categoría inactiva, se podrían mostrar al final, 
    // pero por ahora solo mostraremos los que coinciden con categorías activas.
    
    container.innerHTML = html;
}