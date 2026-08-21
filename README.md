# Imóveis JR

Repositório único com o site estático e o app Streamlit que o exibe.

## Estrutura

```
index.html                              → Home do site
sobre.html                              → "Sobre MiM" (em branco, por enquanto)
imoveis/
  casa.html                             → Lista de casas (vazia por enquanto)
  apartamento.html                      → Lista de apartamentos (1º imóvel cadastrado)
  apartamento-601241033-125.html        → Ficha do 1º imóvel (vídeo + fotos)
601241033-125/
  fotos/                                → Vídeo e fotos do imóvel 601241033-125
assets/
  css/style.css                         → Estilos do site
  js/main.js                            → Menu dropdown, menu mobile, galeria/lightbox
streamlit_app.py                        → App Streamlit que embute o site publicado
requirements.txt                        → Dependência do app Streamlit (streamlit)
```

## O site estático (GitHub Pages)

O site (`index.html` e o restante) é publicado direto pelo **GitHub Pages**:

- Settings → Pages → Source: "Deploy from a branch" → branch `main`, pasta `/ (root)`.
- URL publicada: `https://rodrigoaiosa.github.io/imoveisjr/`

Para adicionar um novo imóvel:

1. Crie a pasta `<codigo>/fotos/` na raiz com as fotos e o vídeo do imóvel.
2. Copie `imoveis/apartamento-601241033-125.html` (ou crie um equivalente
   para casa) e ajuste título, ficha técnica (preço, m², quartos etc.) e os
   caminhos das fotos/vídeo.
3. Adicione um card em `imoveis/apartamento.html` (ou `casa.html`) apontando
   para a nova ficha.

## O app Streamlit (streamlit.io)

`streamlit_app.py` não recria o site em Python — ele embute a versão já
publicada no GitHub Pages dentro de um `<iframe>`, já que o Streamlit não
renderiza arquivos `.html` soltos (apenas roda Python e desenha widgets).

### Rodando localmente

```bash
pip install -r requirements.txt
streamlit run streamlit_app.py
```

### Publicando no Streamlit Community Cloud

1. Suba este repositório para o GitHub (já inclui `streamlit_app.py` e
   `requirements.txt` na raiz).
2. Acesse [share.streamlit.io](https://share.streamlit.io) → **New app** →
   escolha o repositório, a branch `main` e o arquivo `streamlit_app.py`.
3. Deploy.

Se o link do GitHub Pages mudar, ajuste a constante `GITHUB_PAGES_URL` no
topo de `streamlit_app.py`.

## Dados do 1º imóvel

Os únicos dados confirmados vieram do título do anúncio (a página da RE/MAX
carrega os detalhes via JavaScript, então preço, metragem e quartos não
puderam ser extraídos automaticamente):

- Tipo: Apartamento · Venda
- Localização: São Paulo, São Paulo
- Referência: 601241033-125

Esses campos estão marcados como "sob consulta" / "ainda não cadastrados"
na ficha (`imoveis/apartamento-601241033-125.html`) — vale preencher com os
dados reais quando disponíveis.
