# Sistema de Gerenciamento de Agendamentos  

Este projeto é uma demonstração de uma API para gerenciamento de agendamentos, utilizando princípios de arquitetura de software como a **Arquitetura Limpa (Clean Architecture)** e **Domain-Driven Design (DDD)**.  
O foco está na **separação de responsabilidades**, **testabilidade** e na manutenção de um **domínio de negócio puro e agnóstico a tecnologias**.  

---

## Visão Geral da Arquitetura  

A aplicação é dividida em camadas lógicas para garantir um alto nível de desacoplamento.  
A dependência flui sempre para dentro, o que significa que as camadas internas (como o **Domínio**) não têm conhecimento das camadas externas (como a **Infraestrutura**).  

---

## Estrutura de Camadas  

### `src/domain`  
O núcleo da aplicação. Contém as regras de negócio mais importantes.  

- **entity**: Classes de entidade (como `Agendamento`, `Servico` e `cliente`) que encapsulam dados e regras de negócio essenciais.  
- **gateway**: Interfaces que definem os "contratos" para comunicação com recursos externos, como bancos de dados.  
  - A camada de domínio só se comunica através dessas interfaces.  
- **service**: Serviços de domínio que contêm lógicas de negócio complexas que envolvem mais de uma entidade (como o `AgendamentoValidatorService`).  

### `src/usecases`  
A camada de **aplicação**. Contém os casos de uso que orquestram o fluxo de negócio.  

- Cada caso de uso (ex: `CreateAgendamentoUsecase`, `ListAgendamentoUsecase`) é uma classe que implementa uma operação específica.  
- Eles dependem das interfaces de **gateway** e dos **serviços de domínio**.  

### `src/infra`  
A camada de **infraestrutura**. Contém as implementações concretas dos gateways.  

- **database**: Onde reside a lógica para se conectar e interagir com o banco de dados.  
  - O `PrismaAgendamentoRepository` é um **adaptador** que implementa o `AgendamentoGateway` usando o ORM Prisma.   

---

## Fluxo de Comunicação  

A comunicação segue um fluxo de **dentro para fora**, mas com as dependências apontando para o **centro**.  

1. **Requisição (API/Controller):**  
   - Uma requisição HTTP chega na camada mais externa.  
   - O **Controller** recebe os dados e os formata em um DTO de entrada.  

2. **Execução do Caso de Uso:**  
   - O **Controller** chama o método `execute` do **Usecase** correspondente, passando o DTO.  

3. **Lógica do Caso de Uso:**  
   - O **Usecase** usa a entidade para criar um novo `Agendamento`.  
   - Em seguida, chama o `AgendamentoValidator` (interface).  

4. **Validação de Domínio:**  
   - A implementação concreta do validador (`AgendamentoValidatorService`) é injetada.  
   - O validador usa o `AgendamentoGateway` para buscar agendamentos conflitantes no banco de dados.  

5. **Persistência (Gateway):**  
   - O **Usecase** chama o método `save` do `AgendamentoGateway`.  
   - A implementação (`PrismaAgendamentoRepository`) traduz essa chamada em uma operação do ORM Prisma.  

6. **Resposta:**  
   - O **Usecase** formata a entidade salva em um DTO de saída.  
   - O Controller envia uma resposta HTTP de sucesso.  


---

## Configuração e Execução  

Para rodar este projeto, siga os passos abaixo:  

### 1. Clone o repositório:  
```bash
git clone [URL_DO_REPOSITORIO]
cd [pasta_do_projeto]
```

### 2. Instale as dependencias:
```bash
npm install
```

### 3. Configure o banco de dados
```env
# Exemplo para Postgresql
DATABASE_URL="postgresql://user:password@localhost:5432/mydatabase"
```

### 4. Execute as migrações do Prisma
```bash
npx prisma migrate dev
```

### 5. Inicie a aplicação
```bash
npm start
```

A aplicação estará disponível em:
👉 http://localhost:8080