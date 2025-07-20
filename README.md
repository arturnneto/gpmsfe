# GPMS - Frontend
Este projeto em React e TypeScript serve como frontend para utilizar o aplicativo feito com Java 17 e Spring localizado no seguinte repositório: https://github.com/arturnneto/gpms. 

Este projeto roda por padrão na porta 3000 do seu computador, porém esta porta pode mudar dependendo dos serviços que estiverem rodando no momento. 

Ao rodar os dois projetos em conjunto, é necessário atualizar as portas de requisição da API para a porta em que o servidor backend estiver rodando. Por padrão o projeto usa a porta 8080. 

É necessário também atualizar a anotação @CrossOrigin na classe SaleOrderController para aceitar requisições CORS do servidor do frontend. 


### Tecnologias utilizadas:
- Node.JS
- TypeScript
- React.TS
- TailwindCSS
- PostCSS
- Axios

## Como rodar o projeto:

No diretório do projeto, rode os seguintes comandos:

### `npm install`
Este comando instalará as dependências necessárias do projeto.

### `npm start`
Após as dependências instaladas, este comando vai startar o programa no seu computador.
