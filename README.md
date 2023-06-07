# Controle de Receitas!

Olá, bem vindo ao meu trabalho de faculdade (ADS)!
Apenas a parte **backend** de um simples **controle para receitas** onde é possível **cadastrar**, **entrar**, **editar,** **deletar** e até **visualizar o seu perfil** e/ou ver suas próprias receitas (não é possível ver as demais pois assim foi declarada a documentação)

# Iniciando

Para iniciar o projeto é simples, basta dar o seguinte comando:

> npm start

# Utilização

Como é apenas a parte back-end do projeto, utilizaremos o [Insomnia](https://insomnia.rest/download)

Abra um request HTTP e insira as informações (sempre em **JSON**), caso tenha dúvidas, dê uma olhadinha na pasta **Schema** do **projeto**.

**Exemplo de registro:**
**POST** http://localhost:8080/register
{
	"name": "Pedro Priori",
	"email": "priori@email.com",
	"password": "senhamuitoforte"
}

**Exemplo de login:** 
**POST** http://localhost:8080/login
{
	"email": "priori@email.com",
	"password": "senhamuitoforte"
}

**Cadastrando uma receita:**
*O tempo de preparo (preparationTime) em minutos!*

**POST** http://localhost:8080/recipes
{
	"name": "Cheesecake",
	"description": "torta doce de queijo cremoso e calda de frutas vermelhas",
	"preparationTime": 290
}

**Deletando usuário:**
*Ao deletar um usuários, todas as suas receitas publicadas também serão deletadas!*

*id = id do usuário no banco, também é informado ao se registrar*
**DELETE** http://localhost:8080/user/id

**Deletando receita:**
*id = id da receita no banco, também é informado ao publicar uma receita*
**DELETE** http://localhost:8080/recipes/id