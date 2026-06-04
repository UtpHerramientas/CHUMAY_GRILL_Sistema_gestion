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
    
    // Cargar módulo por defecto basado en la URL actual
    const currentPath = window.location.pathname;
    let initialModule = '/admin/dashboard';
    
    // Buscar si la ruta coincide con alguna de las opciones del sidebar
    navItems.forEach(item => {
        const modulePath = item.getAttribute('data-module');
        if (modulePath === currentPath) {
            initialModule = modulePath;
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            moduleTitle.innerText = item.querySelector('span').innerText;
        }
    });
    
    loadModule(initialModule);
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
    } else if (module === '/admin/pedidos') {
        renderPedidosView(contentBody);
        fetchPedidosAdmin();
    } else if (module === '/admin/ventas') {
        renderVentasView(contentBody);
        fetchVentasAdmin();
    } else if (module === '/admin/usuarios') {
        renderUsuariosView(contentBody);
        fetchUsuariosAdmin();
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

// ====================
// MODULO PEDIDOS
// ====================

let pedidosData = [];

function renderPedidosView(container) {
    container.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h4 class="fw-bold text-dark m-0">Monitoreo de Pedidos</h4>
            <button class="btn btn-outline-primary" onclick="fetchPedidosAdmin()"><i class="fas fa-sync-alt"></i> Actualizar</button>
        </div>
        
        <div class="row g-4">
            <!-- PENDIENTE -->
            <div class="col-12 col-md-4">
                <div class="card border-0 shadow-sm bg-light rounded-4 h-100">
                    <div class="card-header bg-warning text-dark border-0 py-3 rounded-top-4 d-flex justify-content-between align-items-center">
                        <span class="fw-bold text-uppercase" style="letter-spacing: 0.5px;"><i class="fas fa-clock me-2"></i>Pendientes</span>
                        <span id="badge-pendiente" class="badge bg-dark rounded-pill">0</span>
                    </div>
                    <div class="card-body p-3" id="pedidos-pendiente" style="min-height: 400px; max-height: 600px; overflow-y: auto;">
                    </div>
                </div>
            </div>
            
            <!-- EN_PREPARACION -->
            <div class="col-12 col-md-4">
                <div class="card border-0 shadow-sm bg-light rounded-4 h-100">
                    <div class="card-header bg-primary text-white border-0 py-3 rounded-top-4 d-flex justify-content-between align-items-center">
                        <span class="fw-bold text-uppercase" style="letter-spacing: 0.5px;"><i class="fas fa-fire me-2"></i>En Cocina</span>
                        <span id="badge-preparando" class="badge bg-white text-primary rounded-pill">0</span>
                    </div>
                    <div class="card-body p-3" id="pedidos-preparando" style="min-height: 400px; max-height: 600px; overflow-y: auto;">
                    </div>
                </div>
            </div>
            
            <!-- LISTO / DESPACHADO -->
            <div class="col-12 col-md-4">
                <div class="card border-0 shadow-sm bg-light rounded-4 h-100">
                    <div class="card-header bg-success text-white border-0 py-3 rounded-top-4 d-flex justify-content-between align-items-center">
                        <span class="fw-bold text-uppercase" style="letter-spacing: 0.5px;"><i class="fas fa-check-circle me-2"></i>Listos para Entregar</span>
                        <span id="badge-listo" class="badge bg-white text-success rounded-pill">0</span>
                    </div>
                    <div class="card-body p-3" id="pedidos-listo" style="min-height: 400px; max-height: 600px; overflow-y: auto;">
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal Detalles Pedido -->
        <div class="modal fade" id="pedidoDetallesModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content border-0 rounded-4">
                    <div class="modal-header bg-dark text-white rounded-top-4 border-0">
                        <h5 class="modal-title fw-bold" id="pedidoDetallesTitle">Detalle de Pedido</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body p-4" id="pedidoDetallesBody">
                    </div>
                </div>
            </div>
        </div>
    `;
    modalInstance = new bootstrap.Modal(document.getElementById('pedidoDetallesModal'));
}

async function fetchPedidosAdmin() {
    try {
        const res = await fetch('/api/pedidos');
        pedidosData = await res.json();
        
        // Filtrar estados y renderizar tarjetas
        const pendientes = pedidosData.filter(p => p.estado === 'PENDIENTE');
        const preparando = pedidosData.filter(p => p.estado === 'EN_PREPARACION' || p.estado === 'PREPARANDO');
        const listos = pedidosData.filter(p => p.estado === 'LISTO');
        
        document.getElementById('badge-pendiente').innerText = pendientes.length;
        document.getElementById('badge-preparando').innerText = preparando.length;
        document.getElementById('badge-listo').innerText = listos.length;
        
        renderColumnaPedidos('pedidos-pendiente', pendientes, 'warning', 'Iniciar Cocina', 'EN_PREPARACION');
        renderColumnaPedidos('pedidos-preparando', preparando, 'primary', 'Marcar Listo', 'LISTO');
        renderColumnaPedidos('pedidos-listo', listos, 'success', 'Marcar Entregado (Caja)', 'ENTREGADO');
        
    } catch (e) {
        console.error("Error al cargar pedidos admin", e);
    }
}

function renderColumnaPedidos(containerId, lista, color, btnTexto, proximoEstado) {
    const col = document.getElementById(containerId);
    if (!col) return;
    
    if (lista.length === 0) {
        col.innerHTML = `<div class="text-center text-muted py-5"><i class="fas fa-box-open fa-2x mb-2 opacity-50"></i><p class="small">Sin pedidos</p></div>`;
        return;
    }
    
    col.innerHTML = lista.map(p => {
        const localInfo = p.mesa ? `Mesa: ${p.mesa.numero} (${p.mesa.ubicacion})` : `Cliente: ${p.nombreCliente || 'Para Llevar'}`;
        const itemsResumen = p.detalles ? p.detalles.map(d => `${d.cantidad}x ${d.producto ? d.producto.nombre : 'Producto'}`).join(', ') : 'Ver detalles...';
        
        return `
            <div class="card border-0 shadow-sm rounded-3 mb-3 hover-shadow transition">
                <div class="card-body p-3">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <h6 class="fw-bold text-dark mb-0">#${p.id}</h6>
                        <span class="badge bg-${color}-subtle text-${color} border border-${color} rounded-pill px-2 py-1 small">${p.estado}</span>
                    </div>
                    <p class="text-muted small mb-2"><i class="fas fa-utensils me-1"></i>${localInfo}</p>
                    <p class="text-dark small text-truncate mb-3" title="${itemsResumen}"><strong>Detalle:</strong> ${itemsResumen}</p>
                    
                    <div class="d-flex gap-2">
                        <button class="btn btn-sm btn-dark flex-fill" onclick="verDetallesPedido(${p.id})"><i class="fas fa-eye me-1"></i>Detalles</button>
                        ${proximoEstado !== 'ENTREGADO' ? `
                            <button class="btn btn-sm btn-${color} text-white flex-fill fw-bold" onclick="cambiarEstadoPedido(${p.id}, '${proximoEstado}')">${btnTexto}</button>
                        ` : `
                            <span class="text-muted small align-self-center text-center w-100"><i class="fas fa-cash-register me-1"></i>Cobrar en Ventas</span>
                        `}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

async function verDetallesPedido(id) {
    const p = pedidosData.find(x => x.id === id);
    if (!p) return;
    
    const body = document.getElementById('pedidoDetallesBody');
    const mesaInfo = p.mesa ? `<p class="mb-1"><strong>Mesa:</strong> ${p.mesa.numero} - ${p.mesa.ubicacion}</p>` : '';
    const clienteInfo = p.nombreCliente ? `<p class="mb-1"><strong>Cliente:</strong> ${p.nombreCliente} (Tel: ${p.telefonoCliente || '-'})</p>` : '';
    const obs = p.observaciones ? `<div class="bg-light p-2 rounded small border-start border-warning border-3 mt-2"><strong>Observaciones:</strong> ${p.observaciones}</div>` : '';
    
    let itemsHtml = p.detalles.map(d => `
        <div class="d-flex justify-content-between align-items-center py-2 border-bottom">
            <div>
                <p class="mb-0 fw-semibold text-dark">${d.producto ? d.producto.nombre : 'Producto'}</p>
                <small class="text-muted">Precio unitario: S/ ${parseFloat(d.precio || 0).toFixed(2)}</small>
            </div>
            <span class="badge bg-secondary rounded-pill px-3">${d.cantidad} und.</span>
        </div>
    `).join('');
    
    body.innerHTML = `
        <div class="mb-3">
            <h6 class="fw-bold mb-2">Información del Pedido</h6>
            ${mesaInfo}
            ${clienteInfo}
            <p class="mb-1"><strong>Total:</strong> <span class="text-success fw-bold">S/ ${parseFloat(p.total).toFixed(2)}</span></p>
            ${obs}
        </div>
        <hr>
        <h6 class="fw-bold mb-2">Platillos Ordenados</h6>
        ${itemsHtml}
    `;
    
    modalInstance.show();
}

async function cambiarEstadoPedido(id, nuevoEstado) {
    try {
        const res = await fetch(`/api/pedidos/${id}/estado?estado=${nuevoEstado}`, {
            method: 'PUT'
        });
        if (res.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Pedido Actualizado',
                timer: 1500,
                showConfirmButton: false
            });
            fetchPedidosAdmin();
        }
    } catch(e) {
        Swal.fire('Error', 'No se pudo actualizar el estado del pedido', 'error');
    }
}

// ====================
// MODULO VENTAS
// ====================

let ventasData = [];

function renderVentasView(container) {
    container.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h4 class="fw-bold text-dark m-0">Ventas y Facturación</h4>
            <div class="d-flex gap-2">
                <button class="btn btn-outline-primary" onclick="fetchVentasAdmin()"><i class="fas fa-sync-alt"></i> Actualizar</button>
            </div>
        </div>

        <div class="row g-4">
            <!-- Pedidos listos para cobrar -->
            <div class="col-lg-7">
                <div class="card border-0 shadow-sm rounded-4">
                    <div class="card-header bg-dark text-white border-0 py-3 rounded-top-4">
                        <h6 class="fw-bold mb-0 text-uppercase" style="letter-spacing: 0.5px;"><i class="fas fa-clock me-2 text-warning"></i>Pendientes de Cobro</h6>
                    </div>
                    <div class="card-body p-0">
                        <div class="table-responsive">
                            <table class="table table-hover align-middle mb-0">
                                <thead class="table-light">
                                    <tr>
                                        <th class="ps-4">Pedido</th>
                                        <th>Mesa/Cliente</th>
                                        <th>Total</th>
                                        <th class="text-center" style="width: 120px;">Acción</th>
                                    </tr>
                                </thead>
                                <tbody id="pedidos-por-cobrar-tbody">
                                    <tr><td colspan="4" class="text-center py-4">Cargando...</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Historial de ventas de hoy -->
            <div class="col-lg-5">
                <div class="card border-0 shadow-sm rounded-4">
                    <div class="card-header bg-success text-white border-0 py-3 rounded-top-4">
                        <h6 class="fw-bold mb-0 text-uppercase" style="letter-spacing: 0.5px;"><i class="fas fa-file-invoice-dollar me-2"></i>Ventas Registradas</h6>
                    </div>
                    <div class="card-body p-0" style="max-height: 500px; overflow-y: auto;">
                        <div class="table-responsive">
                            <table class="table table-hover align-middle mb-0">
                                <thead class="table-light">
                                    <tr>
                                        <th class="ps-4">Venta</th>
                                        <th>Método</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody id="ventas-tbody">
                                    <tr><td colspan="3" class="text-center py-4">Cargando...</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal Cobro -->
        <div class="modal fade" id="cobrarModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content border-0 rounded-4">
                    <div class="modal-header bg-success text-white border-0 rounded-top-4">
                        <h5 class="modal-title fw-bold"><i class="fas fa-cash-register me-2"></i>Registrar Pago</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body p-4">
                        <form id="cobroForm">
                            <input type="hidden" id="cobro-pedido-id">
                            <div class="text-center mb-4">
                                <span class="text-muted small d-block">TOTAL A COBRAR</span>
                                <h1 class="fw-bold text-success display-5 mb-0" id="cobro-total-texto">S/ 0.00</h1>
                            </div>
                            
                            <div class="mb-3">
                                <label class="form-label fw-bold">Método de Pago</label>
                                <select class="form-select form-select-lg" id="cobro-metodo" onchange="actualizarVueltoCalculo()" required>
                                    <option value="EFECTIVO">Efectivo</option>
                                    <option value="YAPE">Yape</option>
                                    <option value="PLIN">Plin</option>
                                    <option value="TARJETA">Tarjeta de Crédito/Débito</option>
                                    <option value="TRANSFERENCIA">Transferencia bancaria</option>
                                </select>
                            </div>
                            
                            <div class="mb-3" id="wrapper-monto-recibido">
                                <label class="form-label fw-bold">Monto Recibido</label>
                                <div class="input-group input-group-lg">
                                    <span class="input-group-text">S/</span>
                                    <input type="number" step="0.01" class="form-control" id="cobro-recibido" oninput="actualizarVueltoCalculo()">
                                </div>
                            </div>
                            
                            <div class="mb-3" id="wrapper-vuelto" style="display:none;">
                                <label class="form-label fw-bold text-muted">Vuelto</label>
                                <h3 class="fw-bold text-dark" id="cobro-vuelto-texto">S/ 0.00</h3>
                            </div>
                            
                            <div class="row">
                                <div class="col-6 mb-3">
                                    <label class="form-label fw-bold">Comprobante</label>
                                    <select class="form-select" id="cobro-comprobante" required>
                                        <option value="NINGUNO">Ninguno (Ticket)</option>
                                        <option value="BOLETA">Boleta de Venta</option>
                                        <option value="FACTURA">Factura</option>
                                    </select>
                                </div>
                                <div class="col-6 mb-3">
                                    <label class="form-label fw-bold">Serie/Correlativo</label>
                                    <input type="text" class="form-control" id="cobro-correlativo" placeholder="Ej: B001-0024">
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer border-0">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-success fw-bold px-4" onclick="confirmarCobro()"><i class="fas fa-check me-2"></i>Registrar Venta</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    modalInstance = new bootstrap.Modal(document.getElementById('cobrarModal'));
}

async function fetchVentasAdmin() {
    try {
        // Traer pedidos listos para cobrar
        const resPed = await fetch('/api/pedidos');
        const pedidos = await resPed.json();
        const pendientesCobro = pedidos.filter(p => p.estado === 'LISTO' || p.estado === 'PENDIENTE' || p.estado === 'EN_PREPARACION' || p.estado === 'PREPARANDO');
        
        const tbodyPed = document.getElementById('pedidos-por-cobrar-tbody');
        if (pendientesCobro.length === 0) {
            tbodyPed.innerHTML = `<tr><td colspan="4" class="text-center text-muted py-4"><i class="fas fa-check-double text-success me-2"></i>Todos los pedidos están cobrados</td></tr>`;
        } else {
            tbodyPed.innerHTML = pendientesCobro.map(p => {
                const info = p.mesa ? `Mesa ${p.mesa.numero}` : (p.nombreCliente || 'Para Llevar');
                return `
                    <tr>
                        <td class="ps-4 fw-bold text-dark">#${p.id} <span class="badge bg-secondary-subtle text-secondary small">${p.estado}</span></td>
                        <td class="text-muted small">${info}</td>
                        <td class="fw-bold text-success">S/ ${parseFloat(p.total).toFixed(2)}</td>
                        <td class="text-center">
                            <button class="btn btn-sm btn-success fw-bold" onclick="abrirModalCobro(${p.id}, ${p.total})">
                                <i class="fas fa-hand-holding-usd me-1"></i> Cobrar
                            </button>
                        </td>
                    </tr>
                `;
            }).join('');
        }
        
        // Traer historial de ventas realizadas
        const resVent = await fetch('/api/ventas');
        ventasData = await resVent.json();
        
        const tbodyVent = document.getElementById('ventas-tbody');
        if (ventasData.length === 0) {
            tbodyVent.innerHTML = `<tr><td colspan="3" class="text-center text-muted py-4">No se han registrado ventas hoy.</td></tr>`;
        } else {
            tbodyVent.innerHTML = ventasData.map(v => {
                return `
                    <tr>
                        <td class="ps-4">
                            <span class="fw-bold text-dark">#${v.id}</span>
                            <small class="text-muted d-block" style="font-size:0.75rem;">Ped. #${v.pedido.id}</small>
                        </td>
                        <td><span class="badge bg-light text-dark border">${v.metodoPago}</span></td>
                        <td class="fw-bold text-success">S/ ${parseFloat(v.total).toFixed(2)}</td>
                    </tr>
                `;
            }).join('');
        }
        
    } catch (e) {
        console.error("Error al traer datos de Ventas/Caja", e);
    }
}

let cobroTotalGlobal = 0;

function abrirModalCobro(pedidoId, total) {
    document.getElementById('cobroForm').reset();
    document.getElementById('cobro-pedido-id').value = pedidoId;
    cobroTotalGlobal = parseFloat(total);
    document.getElementById('cobro-total-texto').innerText = `S/ ${cobroTotalGlobal.toFixed(2)}`;
    
    actualizarVueltoCalculo();
    modalInstance.show();
}

function actualizarVueltoCalculo() {
    const metodo = document.getElementById('cobro-metodo').value;
    const divRecibido = document.getElementById('wrapper-monto-recibido');
    const divVuelto = document.getElementById('wrapper-vuelto');
    
    if (metodo === 'EFECTIVO') {
        divRecibido.style.display = 'block';
        divVuelto.style.display = 'block';
        
        const recibido = parseFloat(document.getElementById('cobro-recibido').value) || 0;
        const vuelto = recibido - cobroTotalGlobal;
        
        if (vuelto >= 0) {
            document.getElementById('cobro-vuelto-texto').innerText = `S/ ${vuelto.toFixed(2)}`;
            document.getElementById('cobro-vuelto-texto').className = "fw-bold text-success";
        } else {
            document.getElementById('cobro-vuelto-texto').innerText = `Falta S/ ${Math.abs(vuelto).toFixed(2)}`;
            document.getElementById('cobro-vuelto-texto').className = "fw-bold text-danger";
        }
    } else {
        divRecibido.style.display = 'none';
        divVuelto.style.display = 'none';
    }
}

async function confirmarCobro() {
    const form = document.getElementById('cobroForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    const pedidoId = document.getElementById('cobro-pedido-id').value;
    const metodo = document.getElementById('cobro-metodo').value;
    const recibido = parseFloat(document.getElementById('cobro-recibido').value) || cobroTotalGlobal;
    const vuelto = recibido - cobroTotalGlobal;
    
    if (metodo === 'EFECTIVO' && recibido < cobroTotalGlobal) {
        Swal.fire('Monto Insuficiente', 'El monto recibido es menor al total del pedido.', 'warning');
        return;
    }
    
    const ventaData = {
        metodoPago: metodo,
        montoRecibido: recibido,
        vuelto: vuelto > 0 ? vuelto : 0,
        comprobante: document.getElementById('cobro-comprobante').value,
        serie: document.getElementById('cobro-correlativo').value ? document.getElementById('cobro-correlativo').value.split('-')[0] : '',
        correlativo: document.getElementById('cobro-correlativo').value ? document.getElementById('cobro-correlativo').value.split('-')[1] : ''
    };
    
    try {
        const res = await fetch(`/api/ventas/cobrar/${pedidoId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ventaData)
        });
        
        if (res.ok) {
            modalInstance.hide();
            Swal.fire({
                icon: 'success',
                title: 'Venta Registrada',
                text: 'El pago ha sido registrado correctamente y la mesa liberada.',
                timer: 2000,
                showConfirmButton: false
            });
            fetchVentasAdmin();
        } else {
            throw new Error('Server error');
        }
    } catch (e) {
        Swal.fire('Error', 'Hubo un problema al registrar el cobro.', 'error');
    }
}

// ====================
// MODULO USUARIOS
// ====================

let usuariosData = [];
let perfilesData = [];

function renderUsuariosView(container) {
    container.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h4 class="fw-bold text-dark m-0">Usuarios y Perfiles del Sistema</h4>
            <button class="btn btn-primary" onclick="openUsuarioModal()">
                <i class="fas fa-user-plus me-2"></i>Nuevo Usuario
            </button>
        </div>

        <div class="card border-0 shadow-sm rounded-4">
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover align-middle mb-0">
                        <thead class="table-dark">
                            <tr>
                                <th class="ps-4" style="width:50px;">Avatar</th>
                                <th>Nombre</th>
                                <th>Usuario</th>
                                <th>Correo</th>
                                <th>Perfil / Rol</th>
                                <th>Estado</th>
                                <th class="text-center" style="width:130px;">Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="usuarios-tbody">
                            <tr><td colspan="7" class="text-center py-4">Cargando...</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Modal Usuario -->
        <div class="modal fade" id="usuarioModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content border-0 rounded-4">
                    <div class="modal-header bg-dark text-white border-0 rounded-top-4">
                        <h5 class="modal-title fw-bold" id="usuarioModalTitle">Nuevo Usuario</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body p-4">
                        <form id="usuarioForm">
                            <input type="hidden" id="usr-id">
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <label class="form-label fw-semibold">Nombre Completo</label>
                                    <input type="text" class="form-control" id="usr-nombre" required>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label fw-semibold">Nombre de Usuario</label>
                                    <input type="text" class="form-control" id="usr-username" required>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label fw-semibold">Correo Electrónico</label>
                                    <input type="email" class="form-control" id="usr-correo">
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label fw-semibold">Teléfono</label>
                                    <input type="tel" class="form-control" id="usr-telefono">
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label fw-semibold">Perfil / Rol</label>
                                    <select class="form-select" id="usr-perfil" required>
                                        <option value="">Seleccionar...</option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label fw-semibold">Contraseña <small class="text-muted">(dejar vacío para no cambiar)</small></label>
                                    <input type="password" class="form-control" id="usr-password" placeholder="Nueva contraseña...">
                                </div>
                                <div class="col-12">
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" id="usr-estado" checked>
                                        <label class="form-check-label fw-semibold" for="usr-estado">Usuario Activo</label>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer border-0">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-primary fw-bold px-4" onclick="saveUsuario()">
                            <i class="fas fa-save me-2"></i>Guardar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    modalInstance = new bootstrap.Modal(document.getElementById('usuarioModal'));
}

async function fetchUsuariosAdmin() {
    try {
        // Cargar perfiles primero
        const resPer = await fetch('/api/usuarios/perfiles');
        perfilesData = await resPer.json();

        const res = await fetch('/api/usuarios');
        usuariosData = await res.json();

        const tbody = document.getElementById('usuarios-tbody');
        if (!tbody) return;

        if (usuariosData.length === 0) {
            tbody.innerHTML = `<tr><td colspan="7" class="text-center text-muted py-4">No hay usuarios registrados.</td></tr>`;
            return;
        }

        tbody.innerHTML = usuariosData.map(u => {
            const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(u.nombre)}&background=002344&color=d4af37&size=40&bold=true`;
            const rolNombre = u.perfil ? u.perfil.nombre : '-';
            const rolBadgeColor = rolNombre === 'ADMINISTRADOR' ? 'danger' : 'primary';
            return `
                <tr>
                    <td class="ps-4">
                        <img src="${avatar}" alt="${u.nombre}" class="rounded-circle" width="38" height="38">
                    </td>
                    <td class="fw-semibold text-dark">${u.nombre}</td>
                    <td class="text-muted"><code>${u.username}</code></td>
                    <td class="text-muted small">${u.correo || '-'}</td>
                    <td><span class="badge bg-${rolBadgeColor} rounded-pill">${rolNombre}</span></td>
                    <td>
                        ${u.estado
                            ? '<span class="badge bg-success">Activo</span>'
                            : '<span class="badge bg-secondary">Inactivo</span>'}
                    </td>
                    <td class="text-center">
                        <button class="btn btn-sm btn-outline-primary me-1" onclick="openUsuarioModal(${u.id})" title="Editar">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm ${u.estado ? 'btn-outline-danger' : 'btn-outline-success'}" 
                                onclick="toggleUsuarioEstado(${u.id}, ${u.estado})" 
                                title="${u.estado ? 'Deshabilitar' : 'Habilitar'}">
                            <i class="fas fa-${u.estado ? 'user-slash' : 'user-check'}"></i>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');

    } catch (e) {
        console.error('Error cargando usuarios', e);
        const tbody = document.getElementById('usuarios-tbody');
        if (tbody) tbody.innerHTML = `<tr><td colspan="7" class="text-center text-danger py-4">Error al cargar usuarios.</td></tr>`;
    }
}

function openUsuarioModal(id = null) {
    document.getElementById('usuarioForm').reset();
    document.getElementById('usr-id').value = '';
    document.getElementById('usr-estado').checked = true;

    // Cargar opciones de perfiles en el select
    const selectPerfil = document.getElementById('usr-perfil');
    selectPerfil.innerHTML = '<option value="">Seleccionar...</option>' +
        perfilesData.map(p => `<option value="${p.id}">${p.nombre}</option>`).join('');

    if (id) {
        document.getElementById('usuarioModalTitle').innerText = 'Editar Usuario';
        const u = usuariosData.find(x => x.id === id);
        if (u) {
            document.getElementById('usr-id').value = u.id;
            document.getElementById('usr-nombre').value = u.nombre || '';
            document.getElementById('usr-username').value = u.username || '';
            document.getElementById('usr-correo').value = u.correo || '';
            document.getElementById('usr-telefono').value = u.telefono || '';
            document.getElementById('usr-estado').checked = u.estado;
            if (u.perfil) document.getElementById('usr-perfil').value = u.perfil.id;
        }
    } else {
        document.getElementById('usuarioModalTitle').innerText = 'Nuevo Usuario';
    }

    modalInstance.show();
}

async function saveUsuario() {
    const form = document.getElementById('usuarioForm');
    if (!form.checkValidity()) { form.reportValidity(); return; }

    const datos = {
        id: document.getElementById('usr-id').value || null,
        nombre: document.getElementById('usr-nombre').value,
        username: document.getElementById('usr-username').value,
        correo: document.getElementById('usr-correo').value,
        telefono: document.getElementById('usr-telefono').value,
        password: document.getElementById('usr-password').value,
        estado: document.getElementById('usr-estado').checked,
        perfilId: document.getElementById('usr-perfil').value || null
    };

    try {
        const res = await fetch('/api/usuarios', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        });

        if (res.ok) {
            modalInstance.hide();
            Swal.fire({
                icon: 'success',
                title: datos.id ? '¡Usuario Actualizado!' : '¡Usuario Creado!',
                timer: 2000,
                showConfirmButton: false
            });
            fetchUsuariosAdmin();
        } else {
            throw new Error('Server error');
        }
    } catch(e) {
        Swal.fire('Error', 'Hubo un problema al guardar el usuario.', 'error');
    }
}

async function toggleUsuarioEstado(id, estadoActual) {
    const accion = estadoActual ? 'deshabilitar' : 'habilitar';
    const result = await Swal.fire({
        title: `¿${accion.charAt(0).toUpperCase() + accion.slice(1)} usuario?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: `Sí, ${accion}`,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: estadoActual ? '#d33' : '#198754'
    });

    if (result.isConfirmed) {
        // Enviamos la actualización de estado
        const u = usuariosData.find(x => x.id === id);
        if (!u) return;

        const datos = {
            id: u.id,
            nombre: u.nombre,
            username: u.username,
            correo: u.correo || '',
            telefono: u.telefono || '',
            estado: !estadoActual,
            perfilId: u.perfil ? u.perfil.id : null
        };

        try {
            const res = await fetch('/api/usuarios', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datos)
            });
            if (res.ok) {
                Swal.fire({ icon: 'success', title: 'Estado actualizado', timer: 1500, showConfirmButton: false });
                fetchUsuariosAdmin();
            }
        } catch(e) {
            Swal.fire('Error', 'No se pudo cambiar el estado.', 'error');
        }
    }
}