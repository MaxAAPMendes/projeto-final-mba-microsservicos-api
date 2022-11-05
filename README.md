# Descrição básica
- São dois serviços independentes;
- Rode os dois servers
### Serviço usuários
- faça o cadastramento de um usuário no endpoint localhost:3000/usuarios passando os dados:
{
		"nomeUsuario": ,
		"email": ,
		"senha": ,
		"nomeCompleto": ,
		"telefone": 
}
### Serviço Finanças
- Para acessar os endpoints desse serviço é necessário login com um usuário válido/cadastrado no serviço usuarios;
- Use o endpoint https://localhost:4020/login para efetuar o login
- Nos endpoints de finanças o token deve ser informado no cabecalho, em bearer token
