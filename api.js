const users = JSON.parse(localStorage.getItem('users')) || [
    { id: 1, nome: "Leanne Graham", cidade: "Belo Horizonte", categoria: "amigos", email: "Sincere@april.biz", senha: "senha123" },
    { id: 2, nome: "Ervin Howell", cidade: "Betim", categoria: "familia", email: "Shanna@melissa.tv", senha: "senha456" },
    { id: 3, nome: "Clementine Bauch", cidade: "Rio de Janeiro", categoria: "trabalho", email: "Nathan@yesenia.net", senha: "senha789" },
    { id: 4, nome: "Patricia Lebsack", cidade: "Betim", categoria: "trabalho", email: "Julianne.OConner@kory.org", senha: "senha101" },
    { id: 5, nome: "Chelsey Dietrich", cidade: "São Paulo", categoria: "familia", email: "Lucio_Hettinger@annie.ca", senha: "senha202" },
    { id: 6, nome: "Mrs. Dennis Schulist", cidade: "Rio de Janeiro", categoria: "trabalho", email: "Karley_Dach@jasper.info", senha: "senha303" },
    { id: 7, nome: "Kurtis Weissnat", cidade: "Belo Horizonte", categoria: "amigos", email: "Telly.Hoeger@billy.biz", senha: "senha404" },
    { id: 8, nome: "Nicholas Runolfsdottir V", cidade: "Belo Horizonte", categoria: "familia", email: "Sherwood@rosamond.me", senha: "senha505" },
    { id: 9, nome: "Glenna Reichert", cidade: "Betim", categoria: "amigos", email: "Chaim_McDermott@dana.io", senha: "senha606" },
    { id: 10, nome: "Clementina DuBuque", cidade: "São Paulo", categoria: "amigos", email: "Rey.Padberg@karina.biz", senha: "senha707" }
];

// Função para buscar informações de um domínio usando a API
async function getDomainInfo(domain) {
    try {
        const response = await fetch(`https://brasilapi.com.br/api/registrobr/v1/${domain}`);
        if (!response.ok) throw new Error('Domínio não encontrado');
        
        const data = await response.json();
        console.log(data); // Exibe os dados no console para conferência
        alert(`Informações do domínio: 
              Nome: ${data.titular}
              Data de criação: ${data.data_criacao}
              Status: ${data.status}`);
    } catch (error) {
        console.error('Erro ao buscar informações do domínio:', error);
        alert('Erro ao buscar informações do domínio.');
    }
}

// Read
function displayUsers() {
    const userList = document.getElementById('userList');
    userList.innerHTML = 'cadastro.html'; // Limpa a lista atual
    users.forEach(user => {
        const userItem = document.createElement('li');
        userItem.innerHTML = `
            ${user.nome} - ${user.email}
            <button onclick="editUser(${user.id})">Editar</button>
            <button onclick="deleteUser(${user.id})">Excluir</button>
            <button onclick="getDomainInfo('${user.email.split('@')[1]}')">Ver Domínio</button>
        `;
        userList.appendChild(userItem);
    });
}

// Create
document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('As senhas não coincidem!');
        return;
    }

    const userExists = users.some(user => user.email === email);
    if (userExists) {
        alert('E-mail já cadastrado!');
        return;
    }

    const newUser = {
        id: users.length ? users[users.length - 1].id + 1 : 1,
        nome: name,
        cidade: "",  
        categoria: "",
        email: email,
        senha: password
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    displayUsers();

    // Exibe a mensagem de sucesso após o cadastro
    alert('Usuário cadastrado com sucesso!');
});

// Update
function editUser(id) {
    const user = users.find(user => user.id === id);
    if (user) {
        const newName = prompt('Digite o novo nome:', user.nome);
        const newCity = prompt('Digite a nova cidade:', user.cidade);
        const newCategory = prompt('Digite a nova categoria:', user.categoria);
        
        if (newName && newCity && newCategory) {
            user.nome = newName;
            user.cidade = newCity;
            user.categoria = newCategory;
            
            localStorage.setItem('users', JSON.stringify(users));
            displayUsers();
            alert('Usuário atualizado com sucesso!');
        }
    }
}

// Delete
function deleteUser(id) {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex !== -1) {
        if (confirm('Tem certeza que deseja excluir este usuário?')) {
            users.splice(userIndex, 1);
            localStorage.setItem('users', JSON.stringify(users));
            displayUsers();
            alert('Usuário excluído com sucesso!');
        }
    }
}

// Exibir usuários ao carregar a página
document.addEventListener('DOMContentLoaded', displayUsers);
