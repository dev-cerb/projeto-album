# Projeto Web Álbum

Aplicação web fullstack para gerenciamento de álbuns de fotos, permitindo cadastro de usuários, criação de álbuns, upload e gerenciamento de fotos com paginação e autenticação JWT.

---

## Funcionalidades

### Autenticação

- Cadastro de usuário
- Login com JWT
- Proteção de rotas no backend e frontend

### Álbuns

- Criar, listar, editar e excluir álbuns
- Paginação de álbuns
- Cada álbum pertence a um único usuário
- Um álbum **só pode ser excluído se não possuir fotos**

### Fotos

- Upload de até **10 fotos por vez**
- Upload de imagens apenas (`image/*`)
- Visualização em grid (miniaturas)
- Modal para visualizar foto em tamanho grande
- Edição de metadados da foto:
  - Título
  - Descrição
  - Data de aquisição
  - Cor predominante
- Exclusão de fotos
- Paginação de fotos por álbum

---

## Tecnologias Utilizadas

### Backend

- **Node.js**
- **Express**
- **Prisma ORM**
- **PostgreSQL**
- **JWT (jsonwebtoken)**
- **Bcrypt**
- **Multer** (upload de arquivos)
- **Docker & Docker Compose**

### Frontend

- **React**
- **Vite**
- **React Router DOM**
- **Tailwind CSS**

---

## Rodando em Ambiente Local

### Pré-requisitos

- Docker
- Docker Compose

### Variáveis de Ambiente

#### Backend (`backend/.env`)

Crie um arquivo .env dentro da pasta backend e insira no mesmo modelo:

DATABASE_URL=postgresql://postgres:postgres@db:5432/db
JWT_SECRET=sua_chave_secreta_aqui

#### Frontend (`frontend/.env`)

Crie um arquivo .env dentro da pasta frontend e insira no mesmo modelo:

VITE_API_URL=http://localhost:8080/api/v1
VITE_UPLOADS_URL=http://localhost:8080/uploads

### Executando com Docker

docker compose up --build

## Principais rotas da API

### Autenticação

POST /api/v1/auth/register
POST /api/v1/auth/login

### Álbuns

GET /api/v1/albuns?page=1&limit=12
GET /api/v1/albuns/:id
POST /api/v1/albuns
PUT /api/v1/albuns/:id
DELETE /api/v1/albuns/:id

### Fotos

GET /api/v1/albuns/:albumId/fotos?page=1&limit=12
POST /api/v1/albuns/:albumId/fotos
PUT /api/v1/albuns/:albumId/fotos/:fotoId
DELETE /api/v1/albuns/:albumId/fotos/:fotoId

---

## Autor

Projeto desenvolvido por Carlos Barreto
Desenvolvedor Fullstack.
