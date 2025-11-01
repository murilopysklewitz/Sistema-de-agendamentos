# 📅 Sistema de Gerenciamento de Agendamentos

API REST completa para gerenciamento de agendamentos desenvolvida com **TypeScript**, **Node.js** e **PostgreSQL**, aplicando princípios de **Clean Architecture** e **Domain-Driven Design (DDD)**.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

---

## 🚀 Funcionalidades

- ✅ **CRUD completo** de agendamentos, serviços e clientes
- ✅ **Validação de conflitos** de horários (regras de negócio)
- ✅ **Autenticação e autorização** com JWT
- ✅ **Arquitetura limpa** (Clean Architecture + DDD)
- ✅ **Documentação automática** com Swagger
- ✅ **Testes automatizados** com cobertura de código
- ✅ **Containerização** com Docker

---

## 🛠️ Stack Tecnológica

| Categoria | Tecnologia |
|-----------|-----------|
| **Linguagem** | TypeScript |
| **Runtime** | Node.js |
| **Framework** | Express.js |
| **ORM** | Prisma |
| **Banco de Dados** | PostgreSQL |
| **Autenticação** | JWT |
| **Validação** | Zod |
| **Testes** | Jest |
| **Documentação** | Swagger/OpenAPI |
| **Containerização** | Docker |

---

## 🏗️ Arquitetura

O projeto segue os princípios de **Clean Architecture** e **DDD**, com separação clara de responsabilidades:
```
src/
├── domain/          # Camada de Domínio (regras de negócio puras)
│   ├── entity/      # Entidades (Agendamento, Servico, Cliente)
│   ├── gateway/     # Interfaces (contratos de comunicação)
│   └── service/     # Serviços de domínio (AgendamentoValidator)
│
├── usecases/        # Camada de Aplicação (casos de uso)
│   ├── CreateAgendamento
│   ├── ListAgendamento
│   ├── UpdateAgendamento
│   └── DeleteAgendamento
│
├── infra/           # Camada de Infraestrutura
│   ├── database/    # Implementações de Gateway (Prisma)
│   ├── http/        # Controllers e rotas Express
│   └── config/      # Configurações (JWT, DB, etc)
│
└── docs/            # Documentação e diagramas
    └── classes.plantuml  # Diagrama de classes UML
```

### 📊 Diagrama de Classes

Para visualizar o diagrama de classes completo:

1. Instale a extensão **PlantUML** no VS Code
2. Abra o arquivo `src/docs/classes.plantuml`
3. Pressione **Alt + D** para renderizar

### 🔄 Fluxo de Dados
```
HTTP Request → Controller → UseCase → Domain Service → Gateway → Database
                    ↓
            Domain Entities (regras de negócio)
                    ↓
HTTP Response ← Controller ← UseCase ← Gateway ← Database
```

**Princípio:** As dependências sempre apontam para o centro (Domínio), garantindo desacoplamento.

---

## 📋 Pré-requisitos

- **Node.js** v18+ 
- **PostgreSQL** v14+
- **Docker** (opcional, mas recomendado)
- **npm** ou **yarn**

---

## ⚙️ Instalação e Configuração

### 1️⃣ Clone o repositório
```bash
git clone https://github.com/murilopysklewitz/Sistema-de-agendamentos.git
cd Sistema-de-agendamentos
```

### 2️⃣ Instale as dependências
```bash
npm install
```

### 3️⃣ Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/agendamentos"

# JWT
JWT_SECRET="seu_secret_super_seguro_aqui"
JWT_EXPIRES_IN="7d"

# Server
PORT=3000
NODE_ENV=development
```

### 4️⃣ Execute as migrations do banco
```bash
npx prisma migrate dev
```

### 5️⃣ (Opcional) Seed inicial
```bash
npx prisma db seed
```

---

## 🐳 Execução com Docker

### Build da imagem
```bash
docker build -t sistema-agendamentos .
```

### Rodar o container
```bash
docker run -p 3000:3000 --env-file .env sistema-agendamentos
```

### Ou use Docker Compose (recomendado)
```bash
docker-compose up -d
```

---

## 🚀 Executando a Aplicação

### Modo desenvolvimento
```bash
npm run dev
```

### Modo produção
```bash
npm run build
npm start
```

A API estará disponível em: **http://localhost:3000**

📚 **Documentação Swagger: **http://localhost:3000/api-docs**

---

## 🧪 Testes

### Rodar todos os testes
```bash
npm test
```

### Testes com cobertura
```bash
npm run test:coverage
```

### Testes em modo watch
```bash
npm run test:watch
```

**Cobertura atual:** ~40% (em desenvolvimento)

---

## 🎯 Regras de Negócio Implementadas

- ✅ **Validação de conflito de horários**: Não permite agendamentos simultâneos para o mesmo serviço/profissional
- ✅ **Validação de horário comercial**: Apenas horários dentro do expediente
- ✅ **Janela mínima de antecedência**: Agendamentos devem ser feitos com X horas de antecedência
- ✅ **Cancelamento com política**: Regras para cancelamento conforme antecedência
- ✅ **Status do agendamento**: Controle de estados (pendente, confirmado, cancelado, concluído)

---

## 🚧 Roadmap / Melhorias Futuras

- [ ] Sistema de notificações (email/SMS) para confirmação e lembretes
- [ ] Agendamentos recorrentes (semanal, mensal)
- [ ] Dashboard administrativo
- [ ] Integração com calendários (Google Calendar, Outlook)
- [ ] Pagamento online integrado
- [ ] Sistema de avaliação/feedback pós-serviço
- [ ] Aumentar cobertura de testes para 80%+
- [ ] Implementar cache (Redis) para melhor performance

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

---

## 👨‍💻 Autor

**Murilo Pysklewitz**

- GitHub: [@murilopysklewitz](https://github.com/murilopysklewitz)
- LinkedIn: [@murilopysklewitz](https://www.linkedin.com/in/murilo-pysklewitz)
- Email:[@murilopysklewitz](murilopyskfuzikawa@gmail.com)

---


## 🙏 Agradecimentos

Projeto desenvolvido como demonstração de conhecimento em arquitetura de software, boas práticas e princípios SOLID.

---

⭐ **Se este projeto foi útil para você, considere dar uma estrela no repositório!**
