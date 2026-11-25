# XL Launcher para Windows

Launcher visual em Electron que inicia uma instância existente do Prism Launcher.

## Importante
Este launcher **não implementa login Microsoft nem baixa Minecraft**. Ele usa o Prism Launcher para autenticação e execução segura da instância. Instale o Prism, entre com sua conta Microsoft e crie uma instância chamada `XL Client` com Minecraft 1.21.11 + Fabric. Instale o JAR do XL Client e dependências nela.

## Gerar o EXE no Windows
1. Instale Node.js LTS: https://nodejs.org/
2. Extraia esta pasta.
3. Abra PowerShell dentro dela.
4. Execute `npm install`
5. Execute `npm run build:win`
6. O instalador aparecerá em `dist/XL-Launcher-Setup-1.0.0.exe`.

## Usar
1. Abra XL Launcher.
2. Vá a Configurações.
3. Selecione `prismlauncher.exe`.
4. Digite o nome exato da instância no Prism (padrão: `XL Client`).
5. Salve e clique em JOGAR.

A opção RAM é apenas uma referência visual; ajuste a memória nas configurações da instância Prism.

## Personalização visual
A imagem enviada foi adicionada como wallpaper em `assets/ns-background.png`, esticada para cobrir o fundo da janela. A camada escura e em escala de cinza reduz a saturação para manter os textos e botões legíveis.

## Mods de desempenho
Consulte `mods-performance/README-MODS.md`. Os mods de otimização são instalados separadamente na pasta mods da instância Prism e não aparecem na HUD.

## Conta offline
Na tela Configurações, escolha `Conta offline (apelido)` e informe um nome de 3 a 16 caracteres (A-Z, a-z, 0-9 e `_`). Ao clicar em JOGAR, o XL Launcher chama o Prism com `--launch <instância> --offline <apelido>`. A opção `--offline` é suportada pelo CLI atual do Prism Launcher. A conta offline não autentica a propriedade do jogo e só entra em servidores que aceitam modo offline; servidores premium com autenticação online exigem uma conta Microsoft válida.

## Compilar pelo celular usando GitHub Actions
O projeto inclui `.github/workflows/build-windows.yml`. Envie o conteúdo da pasta para um repositório GitHub com o nome `main`. Abra a aba Actions, escolha `Build XL Launcher for Windows` e toque em `Run workflow`. Quando concluir, abra a execução e baixe o artefato `XL-Launcher-Windows-EXE`. Dentro dele estará o instalador `.exe`.
