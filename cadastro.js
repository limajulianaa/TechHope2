const form = document.getElementById("form");
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const erro = document.getElementById("cadastroErrorMessage");

form.addEventListener("submit", (event) => {
    event.preventDefault(); // impede o envio automático

    // limpa mensagem anterior

    erro.textContent = "";
    erro.classList.add("hidden");

    // validação do nome 

    if (nome.value.trim().length < 3) {
        mostrarErro("O nome deve ter pelo menos 3 caracteres.");
        return;
    }

    // validação do email

    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regexEmail.test(email.value)) {
        mostrarErro("Digite um e-mail válido.");
        return;
    }

    // validação da senha

    if (senha.value.length < 6) {
        mostrarErro("A senha deve ter pelo menos 6 caracteres.");
        return;
    }

    // Se passou em todas validações:

    alert("Cadastro enviado com sucesso!");
    form.submit(); 
});

function mostrarErro(msg) {
    erro.textContent = msg;
    erro.classList.remove("hidden"); 
}
