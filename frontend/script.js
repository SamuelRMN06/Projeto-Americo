const produtoApi = 'http://localhost:8080/produtos';
const categoriaApi = 'http://localhost:8080/categorias';

// ---------- Produto ----------
const produtoTableBody = document.querySelector('#produtosTable tbody');
const produtoForm = document.getElementById('produtoForm');
const produtoFormTitle = document.getElementById('produtoFormTitle');
const produtoId = document.getElementById('produtoId');
const produtoNome = document.getElementById('produtoNome');
const produtoDescricao = document.getElementById('produtoDescricao');
const produtoPreco = document.getElementById('produtoPreco');

async function listarProdutos() {
  const res = await fetch(produtoApi);
  const produtos = await res.json();
  produtoTableBody.innerHTML = '';
  produtos.forEach(p => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${p.id}</td>
      <td>${p.nome}</td>
      <td>${p.descricao}</td>
      <td>${p.preco.toFixed(2)}</td>
      <td>
        <button onclick="editarProduto(${p.id})">Editar</button>
        <button class="delete" onclick="excluirProduto(${p.id})">Excluir</button>
      </td>
    `;
    produtoTableBody.appendChild(tr);
  });
}

async function criarProduto(produto) {
  await fetch(produtoApi, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(produto)
  });
}

async function atualizarProduto(id, produto) {
  await fetch(`${produtoApi}/${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(produto)
  });
}

async function excluirProduto(id) {
  if (confirm('Excluir este produto?')) {
    await fetch(`${produtoApi}/${id}`, { method: 'DELETE' });
    listarProdutos();
  }
}

async function editarProduto(id) {
  const res = await fetch(`${produtoApi}/${id}`);
  const p = await res.json();
  produtoId.value = p.id;
  produtoNome.value = p.nome;
  produtoDescricao.value = p.descricao;
  produtoPreco.value = p.preco;
  produtoFormTitle.textContent = 'Editar Produto';
}

produtoForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const produto = {
    nome: produtoNome.value,
    descricao: produtoDescricao.value,
    preco: parseFloat(produtoPreco.value)
  };
  if (produtoId.value) {
    await atualizarProduto(produtoId.value, produto);
  } else {
    await criarProduto(produto);
  }
  produtoForm.reset();
  produtoId.value = '';
  produtoFormTitle.textContent = 'Criar Produto';
  listarProdutos();
});

listarProdutos();

// ---------- Categoria ----------
const categoriaTableBody = document.querySelector('#categoriasTable tbody');
const categoriaForm = document.getElementById('categoriaForm');
const categoriaFormTitle = document.getElementById('categoriaFormTitle');
const categoriaId = document.getElementById('categoriaId');
const categoriaNome = document.getElementById('categoriaNome');
const categoriaDescricao = document.getElementById('categoriaDescricao');

async function listarCategorias() {
  const res = await fetch(categoriaApi);
  const categorias = await res.json();
  categoriaTableBody.innerHTML = '';
  categorias.forEach(c => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${c.id}</td>
      <td>${c.nome}</td>
      <td>${c.descricao}</td>
      <td>
        <button onclick="editarCategoria(${c.id})">Editar</button>
        <button class="delete" onclick="excluirCategoria(${c.id})">Excluir</button>
      </td>
    `;
    categoriaTableBody.appendChild(tr);
  });
}

async function criarCategoria(categoria) {
  await fetch(categoriaApi, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(categoria)
  });
}

async function atualizarCategoria(id, categoria) {
  await fetch(`${categoriaApi}/${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(categoria)
  });
}

async function excluirCategoria(id) {
  if (confirm('Excluir esta categoria?')) {
    await fetch(`${categoriaApi}/${id}`, { method: 'DELETE' });
    listarCategorias();
  }
}

async function editarCategoria(id) {
  const res = await fetch(`${categoriaApi}/${id}`);
  const c = await res.json();
  categoriaId.value = c.id;
  categoriaNome.value = c.nome;
  categoriaDescricao.value = c.descricao;
  categoriaFormTitle.textContent = 'Editar Categoria';
}

categoriaForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const categoria = {
    nome: categoriaNome.value,
    descricao: categoriaDescricao.value
  };
  if (categoriaId.value) {
    await atualizarCategoria(categoriaId.value, categoria);
  } else {
    await criarCategoria(categoria);
  }
  categoriaForm.reset();
  categoriaId.value = '';
  categoriaFormTitle.textContent = 'Criar Categoria';
  listarCategorias();
});

listarCategorias();
