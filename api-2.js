// Adiciona um evento ao formulário de cadastro
document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Coleta os dados dos campos
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Verifica se as senhas coincidem
    if (password !== confirmPassword) {
        alert("As senhas não coincidem. Tente novamente.");
        return;
    }

    // Cria um objeto com os dados para enviar à API
    const userData = {
        name: name,     // Nome do usuário
        job: "Desenvolvedor"  // Campo adicional que você pode definir, como a profissão
    };

    // Chama a função para registrar o usuário
    registerUser(userData);
});

// Função para enviar os dados para a API ReqRes
function registerUser(userData) {
    const apiUrl = 'https://reqres.in/api/users'; // Endpoint de criação de usuário da ReqRes

    // Fazendo a requisição para a API usando Fetch
    fetch(apiUrl, {
        method: "POST", // Tipo de requisição
        headers: {
            "Content-Type": "application/json" // Indicando que os dados são em JSON
        },
        body: JSON.stringify(userData) // Converte o objeto JavaScript para JSON
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro na requisição: " + response.status);
        }
        return response.json();
    })
    .then(data => {
        // Sucesso ao cadastrar o usuário
        alert("Cadastro realizado com sucesso! Nome: " + data.name);
        // Redireciona para a página de login
        window.location.href = "login.html";
    })
    .catch(error => {
        // Exibe erro em caso de falha
        console.error("Erro ao registrar:", error);
        alert("Ocorreu um erro. Tente novamente mais tarde.");
    });
}
