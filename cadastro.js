document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("form");
    const nomeInput = document.getElementById("nome");
    const emailInput = document.getElementById("email");
    const senhaInput = document.getElementById("senha");
    const msgErro = document.getElementById("cadastroErrorMessage");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let erros = [];

        if (nomeInput.value.trim().length < 3) {
            erros.push("O nome deve ter pelo menos 3 caracteres.");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            erros.push("Digite um e-mail válido.");
        }

        if (senhaInput.value.length < 6) {
            erros.push("A senha deve ter pelo menos 6 caracteres.");
        }

        if (erros.length > 0) {
            msgErro.textContent = erros.join(" ");
            msgErro.classList.remove("hidden");

            console.log("Erros exibidos:", erros);
            return;
        }

        msgErro.classList.add("hidden");
        alert("Cadastro concluído!");
    });

});
