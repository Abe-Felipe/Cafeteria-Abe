# language: pt

Funcionalidade: Montar um Café Personalizado
  Como um cliente da cafeteria
  Eu quero selecionar ingredientes para montar um café
  Para ter uma bebida de acordo com meu gosto

Contexto:
  Dado que o sistema possui os seguintes ingredientes base: "Espresso", "Leite", "Espuma", "Chocolate", "Sorvete"
  E o sistema possui os seguintes ingredientes extras: "Caramelo", "Chantilly"

Cenário: Montar um café clássico (Latte)
  Dado que estou na tela de seleção de ingredientes base
  Quando eu seleciono "Espresso"
  E eu seleciono "Leite"
  E eu confirmo a base
  Então o sistema deve identificar o café como "Latte" no resumo do pedido

Cenário: Montar um café personalizado com extras
  Dado que estou na tela de seleção de ingredientes base
  Quando eu seleciono "Espresso"
  E eu seleciono "Sorvete"
  E eu confirmo a base
  E eu seleciono o adicional "Caramelo"
  E eu confirmo os adicionais
  Então o sistema deve identificar o café como "Affogato"
  E o resumo do pedido deve incluir "Caramelo" como extra

Cenário: Tentar exceder o limite de ingredientes base
  Dado que estou na tela de seleção de ingredientes base
  Quando eu seleciono "Espresso"
  E eu seleciono "Leite"
  E eu seleciono "Chocolate"
  Então a opção de selecionar "Sorvete" deve estar desabilitada