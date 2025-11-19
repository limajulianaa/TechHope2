/*const  = document.getElementById("form");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    if (email === "" || senha === "") {
        alert("Por favor, preencha os campos");
    } else {
        alert("Campos preenchidos com sucesso");
    }

    form.reset();
});*/

const form = document.getElementById("form");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    // Campos
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();

    // Campos de erros
    const erroEmail = document.getElementById("erroEmail");
    const erroSenha = document.getElementById("erroSenha");
    const mensagemSucesso = document.getElementById("mensagemSucesso");

    erroEmail.textContent = "";
    erroSenha.textContent = "";
    mensagemSucesso.textContent = "";

    let formularioValido = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        erroEmail.textContent = "O e-mail é obrigatório.";
        formularioValido = false;
    } else if (!emailRegex.test(email)) {
        erroEmail.textContent = "Digite um e-mail válido.";
        formularioValido = false;
    }

    const senhaRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (senha === "") {
        erroSenha.textContent = "A senha é obrigatória.";
        formularioValido = false;
    } else if (!senhaRegex.test(senha)) {
        erroSenha.textContent =
            "A senha deve ter no mínimo 6 caracteres e incluir letras e números.";
        formularioValido = false;
    }

    if (formularioValido) {
        mensagemSucesso.textContent = "Formulário enviado com sucesso!";
        form.reset();
    }
});