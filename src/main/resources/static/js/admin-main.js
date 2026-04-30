document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.sidebar-nav li');
    const moduleTitle = document.getElementById('module-title');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // 1. Cambiar clase activa
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            // 2. Actualizar Título
            const moduleName = item.querySelector('span').innerText;
            moduleTitle.innerText = moduleName;

            // 3. Cargar módulo
            loadModule(item.getAttribute('data-module'));
        });
    });
    
    // Cargar dashboard por defecto
    loadModule('/admin/dashboard');
});

let categoriasData = [];
let productosData = [];
let modalInstance = null;

async function loadModule(module) {
    const contentBody = document.getElementById('dynamic-content');
    contentBody.innerHTML = '<div class="text-center mt-5"><i class="fas fa-spinner fa-spin fa-3x text-primary"></i></div>';

    if (module === '/admin/productos') {
        try {
            const catRes = await fetch('/api/productos/categorias');
            categoriasData = await catRes.json();
        } catch(e) { console.error("Error al cargar categorías", e); }

        renderProductosView(contentBody);
        fetchProductos();
    } else if (module === '/admin/dashboard') {
        contentBody.innerHTML = `
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h4 class="m-0 text-dark fw-bold">Vista General</h4>
            </div>
            
            <div class="row g-4 mb-4">
                <!-- Tarjeta 1 -->
                <div class="col-12 col-sm-6 col-xl-3">
                    <div class="card border-0 shadow-sm rounded-4 h-100" style="background: linear-gradient(135deg, #4e73df 0%, #224abe 100%); color: white;">
                        <div class="card-body p-4 d-flex align-items-center justify-content-between">
                            <div>
                                <h6 class="text-uppercase fw-semibold mb-2" style="letter-spacing: 1px; opacity: 0.8;">Ingresos Hoy</h6>
                                <h2 class="mb-0 fw-bold">S/ 1,250.00</h2>
                            </div>
                            <div class="bg-white text-primary rounded-circle d-flex align-items-center justify-content-center shadow-sm" style="width: 60px; height: 60px;">
                                <i class="fas fa-wallet fa-2x"></i>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Tarjeta 2 -->
                <div class="col-12 col-sm-6 col-xl-3">
                    <div class="card border-0 shadow-sm rounded-4 h-100" style="background: linear-gradient(135deg, #1cc88a 0%, #13855c 100%); color: white;">
                        <div class="card-body p-4 d-flex align-items-center justify-content-between">
                            <div>
                                <h6 class="text-uppercase fw-semibold mb-2" style="letter-spacing: 1px; opacity: 0.8;">Pedidos Atendidos</h6>
                                <h2 class="mb-0 fw-bold">45</h2>
                            </div>
                            <div class="bg-white text-success rounded-circle d-flex align-items-center justify-content-center shadow-sm" style="width: 60px; height: 60px;">
                                <i class="fas fa-shopping-bag fa-2x"></i>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Tarjeta 3 -->
                <div class="col-12 col-sm-6 col-xl-3">
                    <div class="card border-0 shadow-sm rounded-4 h-100" style="background: linear-gradient(135deg, #f6c23e 0%, #dda20a 100%); color: white;">
                        <div class="card-body p-4 d-flex align-items-center justify-content-between">
                            <div>
                                <h6 class="text-uppercase fw-semibold mb-2" style="letter-spacing: 1px; opacity: 0.9;">Platillos Activos</h6>
                                <h2 class="mb-0 fw-bold" id="dash-platillos">--</h2>
                            </div>
                            <div class="bg-white text-warning rounded-circle d-flex align-items-center justify-content-center shadow-sm" style="width: 60px; height: 60px;">
                                <i class="fas fa-utensils fa-2x"></i>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Tarjeta 4 -->
                <div class="col-12 col-sm-6 col-xl-3">
                    <div class="card border-0 shadow-sm rounded-4 h-100" style="background: linear-gradient(135deg, #36b9cc 0%, #258391 100%); color: white;">
                        <div class="card-body p-4 d-flex align-items-center justify-content-between">
                            <div>
                                <h6 class="text-uppercase fw-semibold mb-2" style="letter-spacing: 1px; opacity: 0.8;">Clientes Nuevos</h6>
                                <h2 class="mb-0 fw-bold">12</h2>
                            </div>
                            <div class="bg-white text-info rounded-circle d-flex align-items-center justify-content-center shadow-sm" style="width: 60px; height: 60px;">
                                <i class="fas fa-users fa-2x"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="row g-4">
                <div class="col-lg-8">
                    <div class="card border-0 shadow-sm rounded-4 h-100">
                        <div class="card-header bg-white border-0 pt-4 pb-0">
                            <h5 class="fw-bold text-dark">Estadísticas Semanales (Próximamente)</h5>
                        </div>
                        <div class="card-body">
                            <div class="bg-light rounded-3 d-flex align-items-center justify-content-center w-100" style="min-height: 300px; border: 2px dashed #dee2e6;">
                                <div class="text-center">
                                    <i class="fas fa-chart-line fa-4x text-muted mb-3 opacity-50"></i>
                                    <p class="text-muted fw-semibold fs-5 mb-0">El módulo de gráficos está en desarrollo</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="card border-0 shadow-sm rounded-4 h-100">
                        <div class="card-header bg-white border-0 pt-4 pb-2">
                            <h5 class="fw-bold text-dark">Actividad Reciente</h5>
                        </div>
                        <div class="card-body">
                            <ul class="list-unstyled mb-0">
                                <li class="mb-4 d-flex">
                                    <div class="bg-success rounded-circle d-flex align-items-center justify-content-center text-white me-3" style="width: 40px; height: 40px; min-width: 40px;">
                                        <i class="fas fa-check"></i>
                                    </div>
                                    <div>
                                        <p class="mb-1 fw-bold text-dark">Pedido #1024 Entregado</p>
                                        <small class="text-muted d-block"><i class="far fa-clock me-1"></i> Hace 5 minutos</small>
                                    </div>
                                </li>
                                <li class="mb-4 d-flex">
                                    <div class="bg-primary rounded-circle d-flex align-items-center justify-content-center text-white me-3" style="width: 40px; height: 40px; min-width: 40px;">
                                        <i class="fas fa-plus"></i>
                                    </div>
                                    <div>
                                        <p class="mb-1 fw-bold text-dark">Nuevo producto agregado</p>
                                        <small class="text-muted d-block"><i class="far fa-clock me-1"></i> Hace 2 horas</small>
                                    </div>
                                </li>
                                <li class="mb-4 d-flex">
                                    <div class="bg-warning rounded-circle d-flex align-items-center justify-content-center text-white me-3" style="width: 40px; height: 40px; min-width: 40px;">
                                        <i class="fas fa-user-plus"></i>
                                    </div>
                                    <div>
                                        <p class="mb-1 fw-bold text-dark">Nuevo usuario registrado</p>
                                        <small class="text-muted d-block"><i class="far fa-clock me-1"></i> Hace 1 día</small>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Intentar obtener la cantidad real de platillos
        fetch('/api/productos').then(r => r.json()).then(data => {
            const count = data.filter(p => p.estado).length;
            document.getElementById('dash-platillos').innerText = count;
        }).catch(e => console.log('Error trayendo platillos para el dashboard'));
    } else if (module === '/admin/categorias') {
        renderCategoriasView(contentBody);
        fetchCategoriasAdmin();
    } else {
        contentBody.innerHTML = `<h3>Módulo: ${module}</h3><p>Contenido en desarrollo...</p>`;
    }
}

function renderProductosView(container) {
    let catOptions = categoriasData.map(c => `<option value="${c.id}">${c.nombre}</option>`).join('');

    container.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h4>Catálogo de Platillos</h4>
            <button class="btn btn-primary" onclick="openProductoModal()"><i class="fas fa-plus"></i> Nuevo Platillo</button>
        </div>
        <div class="table-responsive shadow-sm rounded">
            <table class="table table-hover table-bordered bg-white mb-0 align-middle">
                <thead class="table-dark">
                    <tr>
                        <th style="width: 80px;">Foto</th>
                        <th>Nombre</th>
                        <th>Categoría</th>
                        <th>Precio</th>
                        <th>Estado</th>
                        <th class="text-center" style="width: 120px;">Acciones</th>
                    </tr>
                </thead>
                <tbody id="productos-tbody">
                    <tr><td colspan="6" class="text-center">Cargando datos...</td></tr>
                </tbody>
            </table>
        </div>

        <!-- Modal Producto -->
        <div class="modal fade" id="productoModal" tabindex="-1" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header bg-primary text-white">
                <h5 class="modal-title" id="productoModalTitle">Nuevo Platillo</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form id="productoForm">
                    <input type="hidden" id="prod-id" name="id">
                    <div class="row">
                        <div class="col-md-8 mb-3">
                            <label class="form-label">Nombre del platillo</label>
                            <input type="text" class="form-control" id="prod-nombre" name="nombre" required>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label class="form-label">Precio</label>
                            <div class="input-group">
                                <span class="input-group-text">S/</span>
                                <input type="number" step="0.01" class="form-control" id="prod-precio" name="precio" required>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mb-3">
                        <label class="form-label">Descripción</label>
                        <textarea class="form-control" id="prod-desc" name="descripcion" rows="2"></textarea>
                    </div>
                    
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Categoría</label>
                            <select class="form-select" id="prod-categoria" name="categoria" required>
                                ${catOptions}
                            </select>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Tipo</label>
                            <select class="form-select" id="prod-tipo" name="tipo">
                                <option value="PLATO">Plato</option>
                                <option value="BEBIDA">Bebida</option>
                                <option value="POSTRE">Postre</option>
                                <option value="ENTRADA">Entrada</option>
                                <option value="OTRO">Otro</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="mb-3">
                        <label class="form-label">Foto (Dejar en blanco para mantener actual)</label>
                        <input type="file" class="form-control" id="prod-foto" name="fotoFile" accept="image/*">
                        <div id="foto-preview" class="mt-2 text-center" style="display:none;">
                            <img src="" id="img-preview" class="img-thumbnail" style="max-height: 150px;">
                        </div>
                    </div>
                    
                    <div class="d-flex gap-4">
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" id="prod-estado" name="estado" checked>
                            <label class="form-check-label" for="prod-estado">Activo / Visible</label>
                        </div>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" id="prod-destacado" name="destacado">
                            <label class="form-check-label" for="prod-destacado">Destacado (Top 3)</label>
                        </div>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" id="prod-disponible" name="disponible" checked>
                            <label class="form-check-label" for="prod-disponible">Disponible (Stock)</label>
                        </div>
                    </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-primary" onclick="saveProducto()">Guardar</button>
              </div>
            </div>
          </div>
        </div>
    `;
    
    // Inicializar modal
    modalInstance = new bootstrap.Modal(document.getElementById('productoModal'));
}

async function fetchProductos() {
    try {
        const response = await fetch('/api/productos');
        productosData = await response.json();
        
        const tbody = document.getElementById('productos-tbody');
        tbody.innerHTML = '';
        
        if (productosData.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" class="text-center">No hay productos registrados.</td></tr>';
            return;
        }

        productosData.forEach(p => {
            const fotoHtml = p.foto 
                ? `<img src="${p.foto}" class="img-thumbnail rounded" style="width:50px; height:50px; object-fit:cover;">` 
                : `<div class="bg-light rounded text-center text-muted border d-flex align-items-center justify-content-center" style="width:50px; height:50px;"><i class="fas fa-image"></i></div>`;
                
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td class="text-center">${fotoHtml}</td>
                <td>${p.nombre} ${p.destacado ? '<span class="badge bg-warning ms-1 text-dark"><i class="fas fa-star"></i> Top</span>' : ''}</td>
                <td>${p.categoria ? p.categoria.nombre : '-'}</td>
                <td class="fw-bold text-success">S/ ${parseFloat(p.precio).toFixed(2)}</td>
                <td>
                    ${p.estado ? '<span class="badge bg-success">Activo</span>' : '<span class="badge bg-danger">Inactivo</span>'}
                    ${!p.disponible ? '<span class="badge bg-secondary ms-1">Agotado</span>' : ''}
                </td>
                <td class="text-center">
                    <button class="btn btn-sm btn-outline-primary" onclick="openProductoModal(${p.id})"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-sm btn-outline-danger ms-1" onclick="deleteProducto(${p.id})"><i class="fas fa-trash"></i></button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (e) {
        console.error('Error fetching productos', e);
        document.getElementById('productos-tbody').innerHTML = '<tr><td colspan="6" class="text-center text-danger">Error al cargar datos.</td></tr>';
    }
}

function openProductoModal(id = null) {
    document.getElementById('productoForm').reset();
    document.getElementById('prod-id').value = '';
    document.getElementById('foto-preview').style.display = 'none';
    
    if (id) {
        document.getElementById('productoModalTitle').innerText = 'Editar Platillo';
        const p = productosData.find(x => x.id === id);
        if (p) {
            document.getElementById('prod-id').value = p.id;
            document.getElementById('prod-nombre').value = p.nombre || '';
            document.getElementById('prod-desc').value = p.descripcion || '';
            document.getElementById('prod-precio').value = p.precio || '';
            if (p.categoria) document.getElementById('prod-categoria').value = p.categoria.id;
            document.getElementById('prod-tipo').value = p.tipo || 'PLATO';
            
            document.getElementById('prod-estado').checked = p.estado;
            document.getElementById('prod-destacado').checked = p.destacado;
            document.getElementById('prod-disponible').checked = p.disponible;
            
            if (p.foto) {
                document.getElementById('foto-preview').style.display = 'block';
                document.getElementById('img-preview').src = p.foto;
            }
        }
    } else {
        document.getElementById('productoModalTitle').innerText = 'Nuevo Platillo';
    }
    
    modalInstance.show();
}

async function saveProducto() {
    const form = document.getElementById('productoForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    const formData = new FormData();
    const id = document.getElementById('prod-id').value;
    
    // Necesitamos que Spring Data Rest / MVC reciba el JSON del producto o sus propiedades
    // Para simplificar, mandaremos propiedades sueltas que Spring enlazará al objeto Producto.
    if (id) formData.append('id', id);
    formData.append('nombre', document.getElementById('prod-nombre').value);
    formData.append('descripcion', document.getElementById('prod-desc').value);
    formData.append('precio', document.getElementById('prod-precio').value);
    formData.append('categoria.id', document.getElementById('prod-categoria').value);
    formData.append('tipo', document.getElementById('prod-tipo').value);
    
    formData.append('estado', document.getElementById('prod-estado').checked);
    formData.append('destacado', document.getElementById('prod-destacado').checked);
    formData.append('disponible', document.getElementById('prod-disponible').checked);
    
    const fotoFile = document.getElementById('prod-foto').files[0];
    if (fotoFile) {
        formData.append('fotoFile', fotoFile);
    }
    
    try {
        const response = await fetch('/api/productos', {
            method: 'POST',
            body: formData // No enviar Content-Type, el navegador pone multipart/form-data automático
        });
        
        if (response.ok) {
            modalInstance.hide();
            Swal.fire({
                icon: 'success',
                title: id ? '¡Platillo Actualizado!' : '¡Platillo Agregado!',
                text: 'El catálogo se ha actualizado correctamente.',
                timer: 2000,
                showConfirmButton: false
            });
            fetchProductos();
        } else {
            throw new Error('Server error');
        }
    } catch(e) {
        Swal.fire('Error', 'Hubo un problema al guardar el platillo.', 'error');
        console.error(e);
    }
}

function deleteProducto(id) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "El platillo se ocultará del catálogo y no podrá ser pedido.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const response = await fetch(`/api/productos/${id}`, { method: 'DELETE' });
                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Eliminado',
                        text: 'El platillo fue retirado correctamente.',
                        timer: 2000,
                        showConfirmButton: false
                    });
                    fetchProductos();
                } else {
                    throw new Error('Failed to delete');
                }
            } catch (e) {
                Swal.fire('Error', 'Hubo un problema al eliminar.', 'error');
            }
        }
    });
}

// ====================
// MODULO CATEGORIAS
// ====================

function renderCategoriasView(container) {
    container.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h4>Gestión de Categorías</h4>
            <button class="btn btn-primary" onclick="openCategoriaModal()"><i class="fas fa-plus"></i> Nueva Categoría</button>
        </div>
        <div class="table-responsive shadow-sm rounded">
            <table class="table table-hover table-bordered bg-white mb-0 align-middle">
                <thead class="table-dark">
                    <tr>
                        <th style="width: 60px;">Ícono</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th class="text-center" style="width: 80px;">Orden</th>
                        <th class="text-center" style="width: 100px;">Estado</th>
                        <th class="text-center" style="width: 120px;">Acciones</th>
                    </tr>
                </thead>
                <tbody id="categorias-tbody">
                    <tr><td colspan="6" class="text-center">Cargando datos...</td></tr>
                </tbody>
            </table>
        </div>

        <!-- Modal Categoría -->
        <div class="modal fade" id="categoriaModal" tabindex="-1" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header bg-primary text-white">
                <h5 class="modal-title" id="categoriaModalTitle">Nueva Categoría</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form id="categoriaForm">
                    <input type="hidden" id="cat-id" name="id">
                    <div class="mb-3">
                        <label class="form-label">Nombre</label>
                        <input type="text" class="form-control" id="cat-nombre" name="nombre" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Descripción</label>
                        <textarea class="form-control" id="cat-desc" name="descripcion" rows="2"></textarea>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Ícono (FontAwesome)</label>
                            <input type="text" class="form-control" id="cat-icono" name="icono" placeholder="Ej: fas fa-soup">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Orden de aparición</label>
                            <input type="number" class="form-control" id="cat-orden" name="orden" value="1" required>
                        </div>
                    </div>
                    <div class="form-check form-switch mb-3">
                        <input class="form-check-input" type="checkbox" id="cat-estado" name="estado" checked>
                        <label class="form-check-label" for="cat-estado">Activo / Visible</label>
                    </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-primary" onclick="saveCategoria()">Guardar</button>
              </div>
            </div>
          </div>
        </div>
    `;
    modalInstance = new bootstrap.Modal(document.getElementById('categoriaModal'));
}

async function fetchCategoriasAdmin() {
    try {
        const response = await fetch('/api/categorias');
        categoriasData = await response.json();
        
        const tbody = document.getElementById('categorias-tbody');
        tbody.innerHTML = '';
        
        if (categoriasData.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" class="text-center">No hay categorías registradas.</td></tr>';
            return;
        }

        categoriasData.forEach(c => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td class="text-center fs-4 text-secondary"><i class="${c.icono}"></i></td>
                <td class="fw-bold">${c.nombre}</td>
                <td>${c.descripcion || '-'}</td>
                <td class="text-center">${c.orden}</td>
                <td class="text-center">
                    ${c.estado ? '<span class="badge bg-success">Activo</span>' : '<span class="badge bg-danger">Inactivo</span>'}
                </td>
                <td class="text-center">
                    <button class="btn btn-sm btn-outline-primary" onclick="openCategoriaModal(${c.id})"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-sm btn-outline-danger ms-1" onclick="deleteCategoria(${c.id})"><i class="fas fa-trash"></i></button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (e) {
        console.error('Error fetching categorias', e);
        document.getElementById('categorias-tbody').innerHTML = '<tr><td colspan="6" class="text-center text-danger">Error al cargar datos.</td></tr>';
    }
}

function openCategoriaModal(id = null) {
    document.getElementById('categoriaForm').reset();
    document.getElementById('cat-id').value = '';
    
    if (id) {
        document.getElementById('categoriaModalTitle').innerText = 'Editar Categoría';
        const c = categoriasData.find(x => x.id === id);
        if (c) {
            document.getElementById('cat-id').value = c.id;
            document.getElementById('cat-nombre').value = c.nombre || '';
            document.getElementById('cat-desc').value = c.descripcion || '';
            document.getElementById('cat-icono').value = c.icono || '';
            document.getElementById('cat-orden').value = c.orden || 1;
            document.getElementById('cat-estado').checked = c.estado;
        }
    } else {
        document.getElementById('categoriaModalTitle').innerText = 'Nueva Categoría';
        document.getElementById('cat-orden').value = categoriasData.length + 1;
    }
    
    modalInstance.show();
}

async function saveCategoria() {
    const form = document.getElementById('categoriaForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    const catId = document.getElementById('cat-id').value;
    const categoria = {
        nombre: document.getElementById('cat-nombre').value,
        descripcion: document.getElementById('cat-desc').value,
        icono: document.getElementById('cat-icono').value,
        orden: parseInt(document.getElementById('cat-orden').value),
        estado: document.getElementById('cat-estado').checked
    };
    if (catId) categoria.id = parseInt(catId);
    
    try {
        const response = await fetch('/api/categorias', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(categoria)
        });
        
        if (response.ok) {
            modalInstance.hide();
            Swal.fire({
                icon: 'success',
                title: catId ? '¡Categoría Actualizada!' : '¡Categoría Agregada!',
                timer: 2000,
                showConfirmButton: false
            });
            fetchCategoriasAdmin();
        } else {
            throw new Error('Server error');
        }
    } catch(e) {
        Swal.fire('Error', 'Hubo un problema al guardar la categoría.', 'error');
        console.error(e);
    }
}

function deleteCategoria(id) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "La categoría ya no aparecerá en el menú principal.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const response = await fetch(`/api/categorias/${id}`, { method: 'DELETE' });
                if (response.ok) {
                    Swal.fire({ icon: 'success', title: 'Eliminada', timer: 2000, showConfirmButton: false });
                    fetchCategoriasAdmin();
                } else {
                    throw new Error('Failed to delete');
                }
            } catch (e) {
                Swal.fire('Error', 'No se pudo eliminar.', 'error');
            }
        }
    });
}