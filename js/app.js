const templates = {
  inicio: `
    <section>
      <h2>Bem-vindo à Esperancify 💚</h2>
      <p>Uma rede de solidariedade que transforma vidas através da educação, alimentação e cuidado com os animais.</p>
      <img src="imagens/Voluntarios.jpeg" alt="Voluntários Esperancify">
    </section>
    <section class="alert sucesso">✨ Junte-se a nós e faça parte dessa transformação!</section>
  `,

  projetos: `
    <section>
      <h2>Projetos Esperancify</h2>
      <article>
        <h3>Alimenta Esperança</h3>
        <img src="imagens/Alimentando.jpg" alt="Projeto Alimenta Esperança">
        <p>Distribuímos alimentos e apoio a famílias em vulnerabilidade.</p>
        <span class="badge">Alimentação</span>
      </article>

      <article>
        <h3>Educa+ Futuro</h3>
        <img src="imagens/Estudantes.png" alt="Projeto Educa+ Futuro">
        <p>Reforço escolar e capacitação digital para jovens.</p>
        <span class="badge">Educação</span>
      </article>

      <article>
        <h3>Amigos dos Animais</h3>
        <img src="imagens/Animais.jpeg" alt="Projeto Amigos dos Animais">
        <p>Resgate e adoção responsável de animais abandonados.</p>
        <span class="badge">Proteção Animal</span>
      </article>
    </section>
  `,

  cadastro: `
    <section>
      <h2>Cadastro de Voluntário</h2>
      <form id="formCadastro">
        <fieldset>
          <legend>Informações Pessoais</legend>
          <label>Nome Completo:</label>
          <input type="text" id="nome" required>

          <label>E-mail:</label>
          <input type="email" id="email" required>

          <label>CPF:</label>
          <input type="text" id="cpf" placeholder="000.000.000-00" required>

          <label>Telefone:</label>
          <input type="tel" id="telefone" placeholder="(00) 00000-0000" required>

          <label>Data de Nascimento:</label>
          <input type="date" id="dataNascimento" required>
        </fieldset>

        <fieldset>
          <legend>Endereço</legend>
          <label>Endereço:</label>
          <input type="text" id="endereco" required>

          <label>CEP:</label>
          <input type="text" id="cep" placeholder="00000-000" required>

          <label>Cidade:</label>
          <input type="text" id="cidade" required>

          <label>Estado:</label>
          <select id="estado" required>
            <option value="">Selecione...</option>
            <option>SP</option>
            <option>RJ</option>
            <option>MG</option>
            <option>BA</option>
          </select>
        </fieldset>

        <button type="submit">Enviar Cadastro</button>
      </form>
      <div id="mensagemRetorno"></div>
    </section>
  `
};

// ======== Função para carregar o conteúdo ========
function carregarConteudo(hash) {
  const main = document.getElementById("conteudo");
  const pagina = hash.replace("#", "") || "inicio";
  main.innerHTML = templates[pagina] || templates.inicio;

  if (pagina === "cadastro") {
    configurarFormulario();
  }
}

// ======== Evento de navegação ========
document.querySelectorAll(".link-spa").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const destino = e.target.getAttribute("href");
    carregarConteudo(destino);
    window.location.hash = destino;
  });
});

// ======== Carregar conteúdo inicial ========
window.addEventListener("load", () => {
  carregarConteudo(window.location.hash);
});

// ======== Validação do Formulário ========
function configurarFormulario() {
  const form = document.getElementById("formCadastro");
  const msg = document.getElementById("mensagemRetorno");

  form.addEventListener("submit", e => {
    e.preventDefault();

    const campos = form.querySelectorAll("input, select");
    let valido = true;

    campos.forEach(campo => {
      if (!campo.value.trim()) {
        campo.style.borderColor = "red";
        valido = false;
      } else {
        campo.style.borderColor = "#ccc";
      }
    });

    // CPF simples (11 dígitos)
    const cpf = document.getElementById("cpf").value.replace(/\D/g, "");
    if (cpf.length !== 11) {
      valido = false;
      document.getElementById("cpf").style.borderColor = "red";
    }

    if (!valido) {
      msg.innerHTML = `<div class="alert erro">⚠️ Corrija os campos destacados antes de enviar.</div>`;
      return;
    }

    // Simula salvamento no localStorage
    const dados = {};
    campos.forEach(campo => (dados[campo.id] = campo.value));
    localStorage.setItem("cadastroEsperancify", JSON.stringify(dados));

    msg.innerHTML = `<div class="alert sucesso">✅ Cadastro realizado com sucesso! Obrigado por se juntar à Esperancify.</div>`;
    form.reset();
  });
}

// ======== Menu responsivo ========
function toggleMenu() {
  document.querySelector("nav ul").classList.toggle("active");
}
