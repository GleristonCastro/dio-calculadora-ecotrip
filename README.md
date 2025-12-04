# 🌱 EcoTrip - Calculadora de Emissões de CO2

Uma aplicação web moderna para calcular as emissões de CO2 geradas por diferentes meios de transporte entre cidades brasileiras. Desenvolvida com **Next.js**, **React**, **TypeScript** e **Tailwind CSS**.

## 👤 Autor

**Gleriston Castro**  
🔗 [github.com/GleristonCastro](https://github.com/GleristonCastro)

## 🎯 Sobre o Projeto

A **EcoTrip** é uma calculadora que permite aos usuários:

- 🗺️ Selecionar rotas entre principais cidades brasileiras
- 🚗 Escolher diferentes meios de transporte (carro, ônibus, avião, trem)
- 📊 Visualizar as emissões de CO2 calculadas automaticamente
- 📈 Comparar o impacto ambiental entre diferentes opções de transporte
- 🎥 Interface moderna com vídeo de fundo e efeitos visuais

## 🛠️ Tecnologias Utilizadas

- **[Next.js 16](https://nextjs.org)** - Framework React com Turbopack
- **[React 19](https://react.dev)** - Biblioteca para interfaces de usuário
- **[TypeScript](https://www.typescriptlang.org)** - JavaScript com tipagem estática
- **[Tailwind CSS](https://tailwindcss.com)** - Framework CSS utilitário
- **[YouTube Embed API](https://developers.google.com/youtube/iframe_api_reference)** - Vídeo de fundo

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+ instalado
- npm, yarn, pnpm ou bun

### Instalação

1. **Clone o repositório**

```bash
git clone https://github.com/GleristonCastro/dio-calculadora-ecotrip.git
cd dio-calculadora-ecotrip
```

2. **Instale as dependências**

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. **Execute o servidor de desenvolvimento**

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

4. **Abra no navegador**

```
http://localhost:3000
```

## 🎮 Como Usar

1. **Selecione a Origem e Destino** no painel lateral esquerdo
2. **Escolha o Meio de Transporte** disponível para a rota
3. **Veja o Resultado** calculado automaticamente:
   - Emissões de CO2 em kg
   - Equivalência em árvores necessárias para compensar
   - Gráfico comparativo entre diferentes transportes

## 📁 Estrutura do Projeto

```
├── app/
│   ├── components/         # Componentes React
│   │   ├── RouteSelector.tsx
│   │   ├── TransportSelector.tsx
│   │   ├── Results.tsx
│   │   ├── ComparisonChart.tsx
│   │   ├── StatusIndicator.tsx
│   │   └── YouTubeBackground.tsx
│   ├── hooks/             # Custom Hooks
│   │   └── useCalculator.ts
│   ├── utils/             # Utilitários
│   │   └── calculator.ts
│   ├── data/              # Dados das rotas e configurações
│   │   ├── routes.ts
│   │   └── config.ts
│   ├── types/             # Definições TypeScript
│   │   └── index.ts
│   ├── globals.css        # Estilos globais
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página inicial
├── legacy/                # Versão original HTML/CSS/JS
└── public/                # Arquivos estáticos
```

## ✨ Funcionalidades

- **Cálculo Automático**: Emissões calculadas em tempo real
- **Interface Responsiva**: Funciona em desktop e mobile
- **Efeitos Visuais**: Glassmorphism e animações suaves
- **Vídeo Background**: Experiência visual imersiva
- **Comparação Visual**: Gráfico de barras interativo
- **Tipagem Forte**: TypeScript em todo o projeto

## 🌍 Dados Disponíveis

A aplicação inclui rotas entre as principais cidades brasileiras:

- São Paulo, Rio de Janeiro, Belo Horizonte
- Brasília, Salvador, Fortaleza, Recife
- Porto Alegre, Curitiba, Manaus
- E muitas outras...

## 📊 Fatores de Emissão (kg CO2/km por pessoa)

- **Carro**: 0.12 kg CO2/km
- **Ônibus**: 0.05 kg CO2/km
- **Avião**: 0.25 kg CO2/km
- **Trem**: 0.03 kg CO2/km

## 🚀 Deploy

### Vercel (Recomendado)

A forma mais fácil de fazer deploy é usar a [Vercel Platform](https://vercel.com/new):

1. Conecte seu repositório GitHub
2. A Vercel detectará automaticamente as configurações do Next.js
3. Seu app estará online em poucos minutos

### Outras Opções

- **Netlify**
- **Railway**
- **Heroku**
- **AWS Amplify**

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer um fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abrir um Pull Request

## 📧 Contato

**Gleriston Castro**

- GitHub: [@GleristonCastro](https://github.com/GleristonCastro)
- LinkedIn: [Gleriston Castro](https://linkedin.com/in/gleriston)

---

⭐ Se este projeto te ajudou, considere dar uma estrela no repositório!
