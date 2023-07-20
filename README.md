# TrybeTunes - Site de Músicas

## Descrição

O TrybeTunes é um projeto de um site de músicas desenvolvido com HTML, CSS, JavaScript, React e React Router. Neste site, os usuários podem fazer login com o seu nome, que será usado para criar um perfil personalizado. Através do perfil, eles terão acesso a funcionalidades como buscar álbuns de músicas pelo nome do artista, favoritar músicas e editar informações do perfil.

## Funcionalidades

1. **Login**: Os usuários podem fazer login com o seu nome.

2. **Perfil do Usuário**: O nome do usuário será utilizado para criar um perfil personalizado. Na página do perfil, é possível alterar a imagem do usuário, email, nome e descrição.

3. **Busca de Álbuns**: Na rota `/search`, é possível buscar álbuns de música pelo nome do artista. Todos os álbuns encontrados serão exibidos em formato de cards.

4. **Visualização de Músicas**: Ao clicar no card de um álbum, é possível visualizar as músicas presentes nesse álbum, também exibidas em formato de cards.

5. **Favoritar Músicas**: Nos cards de música, os usuários podem favoritar as músicas que mais gostarem.

6. **Página de Favoritos**: Na rota `/favorites`, os usuários terão acesso a uma página com todas as músicas que foram favoritadas. Nessa página, é possível desfavoritar as músicas.

## Rotas

- `/login`: Rota de login onde os usuários podem fazer login com o seu nome.

- `/search`: Rota de busca de álbuns, onde os usuários podem pesquisar por álbuns de música pelo nome do artista.

- `/album/:albumId`: Rota para visualização das músicas de um álbum específico.

- `/favorites`: Rota para visualização das músicas favoritadas pelo usuário.

- `/profile`: Rota para edição do perfil do usuário.

## Como Executar o Projeto

1. Clone o repositório do projeto para o seu ambiente local:
   `https://github.com/odouglasoliveira/trybetunes.git`
2. Acesse a pasta do projeto:
3. Instale as dependências:
   `npm install`
4. Inicie o servidor de desenvolvimento:
   `npm start`
5. O site estará disponível no endereço `http://localhost:3000`.

## Contribuições

Contribuições são bem-vindas! Se você encontrar algum bug, tiver sugestões de melhorias ou quiser adicionar novas funcionalidades, sinta-se à vontade para criar uma "issue" ou enviar um "pull request".


