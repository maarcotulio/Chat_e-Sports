
# Chat e-Sports
O Chat tem como intuito melhorar a experiência do usuário para saber quando será uma partida e também poder conversar com os amigos a respeito.




## Rodando o Projeto
Esse projeto utiliza o banco de dados Supabase e a API pandaScore. Ambos são gratuitos para começo, e não precisam pagar para começar a usar, apenas é necessário criar uma conta.

Primeiro clone o projeto

```bash
  git clone https://github.com/maarcotulio/Chat_e-Sports
```

Vá para o diretório do projeto

```bash
  cd Chat_e-Sports
```

Instale as dependencias

```bash
  pnpm install
```

### Preenchendo .env
Crie um arquivo .env e utilize o .example.env de modelo. 

#### Supabase

Crie sua conta na plataforma, após isso crie sua organização, não é necessário mudar nenhuma configuração nesse momento. Vá em configurações do projeto e em Data API. Preencha a URL do projeto e a anon key em seu .env.

```env
    NEXT_PUBLIC_SUPABASE_URL=URL_DO_PROJETO
    NEXT_PUBLIC_SUPABASE_ANON_KEY=SUA_ANON_KEY
```

Clique em "Connect" na parte superior da página copie sua Direct connection. Vá em ORMs utilize as informações para preencher o .env. Lembre de substituir o [YOUR_PASSWORD] pela senha do DB que você colocou ao criar sua organização.

```env
    DATABASE_URL=""
    DIRECT_URL=""
```

#### PandaScore

Crie uma conta no site. E copie seu Acess Token e preencha no .env.

```env
    PANDASCORE_TOKEN=SEU_ACESS_TOKEN
```

### Configurando o DB
Dentro da pasta do projeto execute os seguintes comandos.

```bash
    pnpm prisma db push
```

Vá no Supabase em Table Editor. Ative RLS para quase todas as tables exceto messages. E em messages ative o realtime. Vá em Storage, New Bucket, coloque o nome de avatar e coloque como **público**. 

Vá em SQL editor e no mais crie snippets para cada um desses código SQL abaixo e rode cada um deles.

```sql
    -- Permite ver as messagens por usuarios
    grant select on messages to anon, 
authenticated;
```

```sql
    -- Permite que usuários autenticados façam INSERT (upload) no bucket 'avatar'
CREATE POLICY "Allow authenticated insert on avatar"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'avatar'
  );

```

```sql
    -- Permite que usuários autenticados façam SELECT (download/listagem) no bucket 'avatar'
CREATE POLICY "Allow authenticated select on avatar"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'avatar'
  );

```

```sql
    -- Permite que usuários autenticados façam UPDATE (para upsert) no bucket 'avatar'
CREATE POLICY "Allow authenticated update on avatar"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'avatar'
  );

```

Finalmente agora podemos rodar o nosso projeto utilize o comando

```bash
    pnpm dev
```

