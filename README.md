# js-gemini-chat
Simples js que integra o Gemini para usar dentro de uma aplicação web

[Click aqui para testar](https://phillrog.github.io/js-gemini-chat/)

# Objetivo
Criar um exemplo simples chat box, nesse caso utilizando Gemini AI, para integrar à uma aplicação web. Considerando que muito se vê em gradio, flask, etc... nenhum me foi visto com JS. E de fato integrar um JS é mais fácil do que qualquer outra forma.

# Detalhes
No gemini.js, foi implementdo as funcionalidades para importar e executar o client Gemini AI. Neste exemplo basta ter uma chave e coloca-la no prompt do bowser para o client utilizar nas chamadas a API.

<img width="955" alt="image" src="https://github.com/user-attachments/assets/5f1b6473-cec4-4ea9-b43f-8ed2dea2859a" />

Após informar a chave, é gravado o valor no localStorage dentro do item GEMINI_API_KEY.

Obs: Quando fechar a página o item com a chave é removido.

# Gemini AI
Os modelos utilizados são gratuitos. Para utilizá-los é preciso criar uma conta GMAIL, acessar [AI Studio Google](https://aistudio.google.com/app/apikey), selecionar um projeto e criar as chaves e utilizar em suas aplicações.

<img width="993" alt="image" src="https://github.com/user-attachments/assets/a3941b0d-7886-4e88-a93f-9076b1736bdc" />


# Configurações

Para o gemini vá no arquivo arquivo gemini.js 

- "systemInstruction" : contexto para o modelo para definir o comportamento dele
- "currentModel" : o modelo LLM

Para tamanho do botão flutuante vá no arquivo gemini.css

* Classe .XyWBof, procure "--gm3-icon-button-filled-icon-size: var(--ae-sidekick-entry-point-icon-size,60px);" troque o 60px por outro valor

<img width="953" alt="image" src="https://github.com/user-attachments/assets/6c97267b-3eda-43ef-88ca-e43614a57970" />

É preciso aterar a proporsão da transição (efeito) va no ":is(.e5IPTd:hover,.UwbdAe) .lWI5Pb { webkit-transform: scale(calc(var(--ae-sidekick-entry-point-shimmer-scale, 1)* 2)) !important; ... " e mude o valor de 2

<img width="950" alt="image" src="https://github.com/user-attachments/assets/3a8f11af-ea63-495c-8aae-1e7b7f5f6e44" />

# Considerações
Com este exemplo será possível criar componentes para utilizar em aplicações Angular/React/ Flask e ASP .NET.

# Resultado

![chatgemini](https://github.com/user-attachments/assets/7e2ce209-5996-44b1-b16e-f8f07c5bdd7c)

# Referências

* https://github.com/google-gemini/generative-ai-js
