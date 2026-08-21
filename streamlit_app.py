"""
Imóveis JR — app Streamlit que exibe o site publicado no GitHub Pages.

O Streamlit não renderiza arquivos .html soltos: ele roda Python e desenha
widgets. Para reaproveitar o site pronto (index.html, sobre.html, imoveis/,
assets/), a solução é embutir o site inteiro dentro de um <iframe> apontando
para a versão já publicada no GitHub Pages.
"""

import streamlit as st
import streamlit.components.v1 as components

GITHUB_PAGES_URL = "https://rodrigoaiosa.github.io/imoveisjr/"
IFRAME_HEIGHT = 1000

st.set_page_config(page_title="Imóveis JR", layout="wide")

components.iframe(GITHUB_PAGES_URL, height=IFRAME_HEIGHT, scrolling=True)
