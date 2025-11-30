# Guia de Teste - Sistema de Autenticação Firebase

## ✅ Configuração Concluída

O Firebase foi configurado com sucesso! As credenciais foram adicionadas ao arquivo `.env.local` e o servidor de desenvolvimento foi reiniciado.

## 🔐 Como Testar o Sistema de Login/Cadastro

### 1. Acessar a Página de Login

1. Abra seu navegador e acesse: **http://localhost:3000**
2. Clique no botão **"Login"** no canto superior direito do header
3. Você verá a página de login com duas abas: **Login** e **Cadastro**

### 2. Criar uma Nova Conta (Cadastro)

1. Clique na aba **"Cadastro"**
2. Preencha os campos:
   - **Nome Completo**: Seu nome
   - **Email**: Um email válido (ex: `teste@ieam.com.br`)
   - **Senha**: Uma senha (mínimo 6 caracteres)
   - **Confirmar Senha**: A mesma senha
3. Clique em **"Cadastrar"**
4. Se tudo estiver correto, você verá uma mensagem de sucesso
5. A tela voltará automaticamente para a aba de Login

### 3. Fazer Login

1. Na aba **"Login"**, preencha:
   - **Email**: O email que você cadastrou
   - **Senha**: A senha que você cadastrou
2. Clique em **"Entrar"**
3. Se as credenciais estiverem corretas, você será redirecionado para a página inicial

### 4. Testar Login de Administrador

Para acessar o painel administrativo, você precisa criar um usuário admin:

#### Opção A: Criar Admin no Firebase Console
1. Acesse o [Firebase Console](https://console.firebase.google.com/)
2. Selecione seu projeto **ieam-9f907**
3. No menu lateral, clique em **"Authentication"**
4. Clique em **"Add user"**
5. Preencha:
   - **Email**: `admin@ieam.com.br`
   - **Password**: `admin123` (ou outra senha de sua preferência)
6. Clique em **"Add user"**

#### Opção B: Cadastrar pelo Site
1. Cadastre-se normalmente pelo site com o email `admin@ieam.com.br`
2. O sistema automaticamente reconhecerá como admin

#### Fazer Login como Admin
1. Acesse a página de login
2. Use as credenciais:
   - **Email**: `admin@ieam.com.br`
   - **Senha**: A senha que você definiu
3. Você será redirecionado para o **Dashboard Administrativo**

## 🎯 Funcionalidades Disponíveis

### Para Usuários Comuns
- ✅ Cadastro de nova conta
- ✅ Login com email/senha
- ✅ Acesso ao site público

### Para Administradores
- ✅ Acesso ao Dashboard
- ✅ Gerenciar Eventos (criar, editar, deletar)
- ✅ Gerenciar Membros (criar, editar, deletar)
- ✅ Gerenciar Congregações (criar, editar, deletar)
- ✅ Visualizar estatísticas

## 🔍 Verificar no Firebase Console

Para confirmar que tudo está funcionando:

1. Acesse: https://console.firebase.google.com/
2. Selecione o projeto **ieam-9f907**
3. Vá em **Authentication** → Você verá os usuários cadastrados
4. Vá em **Firestore Database** → Você verá as coleções `events`, `members`, `congregations` quando criar dados

## ⚠️ Observações Importantes

1. **Senha Mínima**: O Firebase exige senhas com pelo menos 6 caracteres
2. **Email Único**: Cada email só pode ser cadastrado uma vez
3. **Dados Persistentes**: Todos os dados são salvos no Firestore e persistem entre sessões
4. **Admin Automático**: Qualquer usuário com email `admin@ieam.com.br` é automaticamente reconhecido como administrador

## 🐛 Solução de Problemas

### Erro: "Email já cadastrado"
- Este email já existe no sistema. Use outro email ou faça login.

### Erro: "Senha muito curta"
- Use uma senha com pelo menos 6 caracteres.

### Erro: "As senhas não coincidem"
- Certifique-se de que a senha e a confirmação são idênticas.

### Não consigo acessar o Dashboard
- Verifique se você está logado com o email `admin@ieam.com.br`
- Apenas este email tem acesso ao painel administrativo

## 📊 Próximos Passos

Agora que o Firebase está configurado, você pode:

1. ✅ Cadastrar usuários
2. ✅ Fazer login/logout
3. ✅ Acessar o painel admin
4. ✅ Criar eventos, membros e congregações
5. ✅ Todos os dados serão salvos no Firestore automaticamente

**Tudo está pronto para uso!** 🎉
