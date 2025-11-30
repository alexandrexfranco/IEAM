# Site da Igreja Evangélica Apostólica Missionária (IEAM)

Site institucional da IEAM desenvolvido com React, TypeScript, Vite e Firebase.

## 🚀 Tecnologias

- **React 19** - Biblioteca para interfaces de usuário
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Firebase** - Backend as a Service (Authentication, Firestore, Storage)
- **Framer Motion** - Animações
- **Tailwind CSS** - Estilização

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- Conta no [Firebase](https://console.firebase.google.com/)

## 🔧 Configuração do Firebase

### 1. Criar Projeto no Firebase

1. Acesse o [Console do Firebase](https://console.firebase.google.com/)
2. Clique em "Adicionar projeto"
3. Siga os passos para criar seu projeto

### 2. Habilitar Serviços

#### Authentication (Autenticação)
1. No menu lateral, clique em "Authentication"
2. Clique em "Começar"
3. Na aba "Sign-in method", habilite "E-mail/senha"

#### Firestore Database
1. No menu lateral, clique em "Firestore Database"
2. Clique em "Criar banco de dados"
3. Escolha o modo de produção ou teste
4. Selecione a localização (recomendado: `southamerica-east1` para Brasil)

#### Storage
1. No menu lateral, clique em "Storage"
2. Clique em "Começar"
3. Aceite as regras padrão

### 3. Obter Credenciais

1. No Console do Firebase, clique no ícone de engrenagem ⚙️ ao lado de "Visão geral do projeto"
2. Clique em "Configurações do projeto"
3. Role até "Seus aplicativos" e clique no ícone da Web `</>`
4. Registre seu app (pode dar qualquer nome)
5. Copie as credenciais que aparecem

### 4. Configurar Variáveis de Ambiente

1. Copie o arquivo `.env.example` para `.env.local`:
   ```bash
   copy .env.example .env.local
   ```

2. Abra o arquivo `.env.local` e preencha com suas credenciais do Firebase:
   ```env
   VITE_FIREBASE_API_KEY=sua_api_key_aqui
   VITE_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=seu_projeto_id
   VITE_FIREBASE_STORAGE_BUCKET=seu_projeto.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
   VITE_FIREBASE_APP_ID=seu_app_id
   ```

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Rodar em modo de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build de produção
npm run preview
```

## 🔐 Login Administrativo

Para acessar o painel administrativo:

- **Email:** `admin@ieam.com.br`
- **Senha:** `admin123`

> **Nota:** Você precisará criar este usuário manualmente no Firebase Authentication ou modificar a lógica de autenticação em `firebaseService.ts`.

## 📁 Estrutura do Projeto

```
Site Igreja/
├── components/          # Componentes reutilizáveis
│   ├── Button.tsx
│   ├── EventsSection.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   └── Logo.tsx
├── pages/              # Páginas da aplicação
│   ├── AboutPage.tsx
│   ├── AdminDashboardPage.tsx
│   ├── ChurchInfoPage.tsx
│   ├── CongregationsPage.tsx
│   ├── DonationPage.tsx
│   ├── HomePage.tsx
│   ├── LoginPage.tsx
│   ├── MinistryPage.tsx
│   └── SchedulePage.tsx
├── services/           # Serviços e configurações
│   ├── firebaseConfig.ts    # Configuração do Firebase
│   └── firebaseService.ts   # Funções do Firebase
├── App.tsx            # Componente principal
├── index.tsx          # Ponto de entrada
└── types.ts           # Definições de tipos TypeScript
```

## 🗄️ Estrutura do Firestore

O Firestore utiliza as seguintes coleções:

### `events` (Eventos)
```typescript
{
  id: number,
  title: string,
  date: string,
  time: string,
  description: string,
  image: string
}
```

### `members` (Membros)
```typescript
{
  id: number,
  name: string,
  role: 'Pastor' | 'Presbítero' | 'Evangelista' | 'Diácono' | 'Obreiro' | 'Membro' | 'Músico',
  email?: string,
  phone?: string,
  photo?: string
}
```

### `congregations` (Congregações)
```typescript
{
  id: number,
  name: string,
  address: string,
  pastor: string,
  schedule: string,
  mapUrl: string
}
```

## 🎨 Personalização

### Cores
As cores da marca estão definidas no Tailwind CSS em `index.html`:
- `brand-dark`: #232323
- `brand-gold`: #D4AF74
- `brand-light`: #F5F5F5

### Dados Estáticos
Ministérios, informações da igreja e programação são dados estáticos definidos em `firebaseService.ts`. Para torná-los dinâmicos, você pode movê-los para o Firestore.

## 🚀 Deploy

### Vercel (Recomendado)
1. Conecte seu repositório GitHub à Vercel
2. Configure as variáveis de ambiente no painel da Vercel
3. Deploy automático a cada push

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

## 📝 Licença

Este projeto foi desenvolvido para a Igreja Evangélica Apostólica Missionária.

## 🤝 Contribuindo

Para contribuir com o projeto:
1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📞 Suporte

Para dúvidas ou suporte, entre em contato através do email da igreja.
