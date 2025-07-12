# Guia de Instalação e Personalização

## 🚀 Como Usar Este Portfólio

### 1. Download/Clone do Projeto

```bash
# Clone o repositório
git clone https://github.com/ShiroiCrypto/shiroi-portfolio.git

# Ou baixe o ZIP e extraia
```

### 2. Estrutura do Projeto

```
shiroi-portfolio/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # Funcionalidades JavaScript
├── README.md           # Documentação do projeto
├── LICENSE.md          # Explicação da licença
├── INSTALACAO.md       # Este arquivo
└── LICENSE             # Licença MIT
```

### 3. Personalização

#### 📝 Editar Informações Pessoais

Abra o arquivo `index.html` e edite as seguintes seções:

**Seção Home (linhas 35-50):**
```html
<h1 class="hero-title">Seu Nome Completo</h1>
<h2 class="hero-subtitle">Seu Apelido</h2>
<p class="hero-description">
    Sua descrição pessoal aqui...
</p>
```

**Seção Sobre (linhas 65-85):**
```html
<div class="about-text">
    <p>Sua história e experiência...</p>
    <p>Seus interesses e projetos...</p>
</div>
```

**Seção Tecnologias (linhas 95-140):**
```html
<div class="tech-card">
    <i class="fab fa-js-square"></i>
    <h3>Sua Tecnologia</h3>
    <p>Descrição da tecnologia</p>
</div>
```

**Seção Projetos (linhas 150-200):**
```html
<div class="project-card">
    <div class="project-image">
        <i class="fas fa-code"></i>
    </div>
    <div class="project-content">
        <h3>Nome do Projeto</h3>
        <p>Descrição do projeto...</p>
        <div class="project-tech">
            <span class="tech-tag">Tecnologia</span>
        </div>
        <div class="project-links">
            <a href="link-do-repositorio" class="btn btn-small">
                <i class="fab fa-github"></i> Repositório
            </a>
            <a href="link-do-demo" class="btn btn-small btn-secondary">
                <i class="fas fa-external-link-alt"></i> Demo
            </a>
        </div>
    </div>
</div>
```

**Seção Contato (linhas 210-240):**
```html
<div class="social-links">
    <a href="seu-github" class="social-link" title="GitHub">
        <i class="fab fa-github"></i>
        <span>GitHub</span>
    </a>
    <a href="seu-linkedin" class="social-link" title="LinkedIn">
        <i class="fab fa-linkedin"></i>
        <span>LinkedIn</span>
    </a>
    <!-- Adicione mais redes sociais conforme necessário -->
</div>
```

#### 🎨 Personalizar Cores

Edite o arquivo `styles.css` na seção de variáveis CSS (linhas 15-25):

```css
:root {
    --bg-dark: #1E1B2E;        /* Fundo escuro */
    --bg-light: #F5F3FF;       /* Fundo claro */
    --primary: #8A2BE2;        /* Cor primária */
    --text-primary: #E0DFF5;   /* Texto principal */
    --text-secondary: #A9A3C1; /* Texto secundário */
}
```

#### 📱 Adicionar Foto/Avatar

1. **Substitua o placeholder por uma imagem:**
```html
<div class="hero-avatar">
    <img src="sua-foto.jpg" alt="Sua Foto" class="avatar-image">
</div>
```

2. **Adicione o CSS para a imagem:**
```css
.avatar-image {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid var(--primary);
}
```

### 4. Deploy

#### 🌐 GitHub Pages

1. **Crie um repositório no GitHub**
2. **Faça upload dos arquivos**
3. **Vá em Settings > Pages**
4. **Selecione a branch main**
5. **Seu site estará disponível em: `https://seu-usuario.github.io/seu-repositorio`**

#### 🌐 Netlify

1. **Acesse [netlify.com](https://netlify.com)**
2. **Arraste a pasta do projeto para o site**
3. **Seu site será publicado automaticamente**

#### 🌐 Vercel

1. **Acesse [vercel.com](https://vercel.com)**
2. **Conecte seu repositório GitHub**
3. **Deploy automático a cada push**

### 5. Funcionalidades Incluídas

✅ **Menu responsivo** com hambúrguer para mobile
✅ **Scroll suave** entre seções
✅ **Animações** em cards e elementos
✅ **Citações aleatórias** no footer
✅ **Botão "Voltar ao topo"**
✅ **Copiar email** com notificação
✅ **Detecção de conexão lenta**
✅ **Suporte a preferências de movimento reduzido**
✅ **Lazy loading** para imagens
✅ **Navegação por teclado** (ESC para fechar menu)

### 6. Dicas de Personalização

#### 🎯 Adicionar Novas Seções

1. **Crie a seção no HTML:**
```html
<section id="nova-secao" class="nova-secao">
    <div class="container">
        <h2 class="section-title">Nova Seção</h2>
        <!-- Conteúdo da seção -->
    </div>
</section>
```

2. **Adicione o link no menu:**
```html
<a href="#nova-secao" class="nav-link">Nova Seção</a>
```

3. **Estilize no CSS:**
```css
.nova-secao {
    padding: 100px 0;
    background: var(--bg-dark);
}
```

#### 🎨 Adicionar Novas Tecnologias

```html
<div class="tech-card">
    <i class="fab fa-react"></i> <!-- Ícone do Font Awesome -->
    <h3>React</h3>
    <p>Descrição da tecnologia</p>
</div>
```

#### 📊 Adicionar Novos Projetos

```html
<div class="project-card">
    <div class="project-image">
        <i class="fas fa-mobile-alt"></i> <!-- Ícone do projeto -->
    </div>
    <div class="project-content">
        <h3>Nome do Projeto</h3>
        <p>Descrição detalhada do projeto...</p>
        <div class="project-tech">
            <span class="tech-tag">React</span>
            <span class="tech-tag">Node.js</span>
        </div>
        <div class="project-links">
            <a href="link-github" class="btn btn-small">
                <i class="fab fa-github"></i> Repositório
            </a>
            <a href="link-demo" class="btn btn-small btn-secondary">
                <i class="fas fa-external-link-alt"></i> Demo
            </a>
        </div>
    </div>
</div>
```

### 7. Troubleshooting

#### ❓ Problemas Comuns

**Menu mobile não funciona:**
- Verifique se o arquivo `script.js` está sendo carregado
- Confirme se os IDs estão corretos no HTML

**Cores não aparecem:**
- Verifique se as variáveis CSS estão definidas corretamente
- Confirme se o navegador suporta CSS custom properties

**Animações não funcionam:**
- Verifique se o JavaScript está sendo carregado
- Confirme se não há erros no console do navegador

**Site não é responsivo:**
- Verifique se a meta tag viewport está presente
- Confirme se os media queries estão corretos

### 8. Suporte

Se você encontrar problemas ou tiver dúvidas:

1. **Verifique o console do navegador** para erros
2. **Teste em diferentes navegadores**
3. **Verifique a responsividade** em diferentes dispositivos
4. **Consulte a documentação** do README.md

---

**Boa sorte com seu portfólio! 🚀** 