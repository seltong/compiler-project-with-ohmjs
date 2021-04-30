# TEMA: Criação de elementos HTML a partir de uma linguagem de domínio específico

### 1. Equipe do projeto

  - Diego Mendes
  - João Paulo
  - Rafael Goés
  - Selton Guedes

### 2. Motivação

  Para simplificar a construção de componentes/elementos html, criaremos uma linguagem que facilitará a construção destes elementos e um compilador capaz de converter o código gerado a partir desta linguagem em um código HTML com os componentes semi-prontos e com eventos, se solicitados, já definidos (exemplo: criação de um botão com o evento onClick. O resultado seria um elemento button do HTML com sua função onClick já criada como solicitado através da linguagem).

  >**Bônus (possibilidade de expansão não implementada devido ao curto prazo da entrega)**: Simplificar a construção de componentes que possam ser utilizados em Vue ou React.

### 3. Exemplos da Linguagem e do Resultado Esperado

  #### **A linguagem foi definida através da estrutura abaixo, onde:**

  - **Atributos:** nomeAtributo = valor
  - **Eventos:** @nomeEvento = valor
  - **Filhos:** #nome(propriedades)


  #### **Construção de uma entrada:**

  ```
    tag(at1=a1, at2 = a2, ..., atN = aN, @ev1 = e1, @ev2 = e2, ..., @evN = eN, #(tag(...)), #(tag(...)))
  ```

  #### **Para facilitar a visualização do código, é possível utilizar quebras de linha:**

  ```
    tag(
      at1=a1,
      at2 = a2,
      ..., 
      atN = aN,
      @ev1 = e1,
      @ev2 = e2,
      ...,
      @evN = eN,
      #(tag(...)),
      #(tag(...))
    )
  ```

  #### **Exemplo 1:**

  - ##### **Entrada:**

  ```js
    /* Input */
    div(id=teste,class=newClass,@onClick = handleClick)
  ```

  - ##### **Saída:**

  ```html
    <!-- Output - HTML: -->
    <div id="teste", class="newClass"></div>
  ```

  ```js
    /* Output - Functions: */
    function handleClick(){}
  ```

  #### **Exemplo 2:**

  - ##### **Entrada:**

  ```js
    /* Input */
    div(
      id=newBtn,
      class=newClass,
      #span(
        id = newBtn1, 
        class = newClass1
      ),
      #button(
        id = newBtn2, 
        class = newClass2,
        @onClick = handleClickBtn
      )
    )
  ```

  - ##### **Saída:**

  ```html
    <!-- Output - HTML: -->
    <div id="newBtn" class="newClass">
    <span id="newBtn1" class="newClass1"></span>
    <button id="newBtn2" class="newClass2" onClick="handleClickBtn()"></button>
    </div>
  ```

  ```js
    /* Output - Functions: */
    function handleClickBtn(){}
  ```

### 4. Gramática da Linguagem

  ```
    Exp = Tag ("\\n"? Tag)*
    Tag = name "(" Prop ("," Prop)* ")"
    Prop = PropTag                              --tag
        |  restriction                          --restrict
        |  Event                                --event
        |  Children                             --children
        |  ""                                   --empty
    Event = "@" eventType "=" eventName
    Children = "#" Tag
    PropTag = propName "=" propValue
    propName = letter*
    propValue = alnum*
    name = letter*
    restriction = "nocontent"
    eventType = alnum*
    eventName = alnum*
  ```

### 5. Descrição do Processo de Geração de Código ou execução

  #### Descrição:
  Nós decidimos gerar o código a partir de um objeto gerado através de uma árvore semântica. De início, nós criamos a semântica e adicionamos uma "operação" na mesma para criar um objeto em um formato adequado através da árvore. 
  Com o objeto criado, nós extraímos suas propriedades e construímos as tags e as funções utlizadas através de eventos pelas tags.
  Portanto, a saída do nosso programa foi um objeto contendo as tags gerado e as funções utilizadas nelas.

  #### Passo a passo:

  1. Criação da gramática;
  2. Criação da semântica;
  3. Chamada da função de validação e geração de código a partir das entradas;
  4. Se a entrada for inválida, a execução é interrompida e uma mensagem de erro é mostrada no terminal. Se a entrada for válida, a execução continua;
  5. Adiciona a operação de criação da árvore semântica na semântica. A árvore será gerada e convertida em um objeto.
  6. Chamada da função que converte o objeto gerado através da árvore no resultado esperado.
  7. Ao entrar na chamada do método de conversão, será extraído do objetos o array de expressões que armazena todas as tags.
  8. Após isso são extraídas, de cada tag, suas propriedades, exentos, filhos e restrições.
  9. Sabendo as informações da tag, ela será criada.
  10. Todos os dados extraídos serão formatados e convertidos em string.
  11. Todos as strings geradas no passo anterior serão adicionadas na string result que armazenará as tags prontas.
  12. Antes de fechar a tag, será avaliado a forma que deverá ser fechada e se ela tem filhos.
  13. Os filhos serão adicionados dentro da tag atual de forma recursiva.
  14. Será retornado um objeto com o html e as funções geradas.
  15. Por último, os dados serão salvos nos arquivos que estão na pasta generated.

### 6. Manual de uso do software.

  1. Abrir a aba do Terminal(Shell);
    *- Obs:  Se você tiver executando no replit, não irá funcionar na aba do Terminal Node.*
  2. Digitar ```yarn executar``` e teclar *Enter*;
  3. Ao concluir a execução, as mensagens abaixo serão exibidas:
    ```
      ~/ProjetoCompiladoresComOhm$
      Arquivo html criado com sucesso!
      Diretório: "src/generated/html.txt"

      Arquivo functions criado com sucesso!
      Diretório: "src/generated/functions.txt"
    ```
  4. Todo o código gerado estará na pasta *generated*. No arquivo html.txt estará todo o HTML e no arquivo functions estarão todas as funções geradas.

### 7. Referências

- https://nextjournal.com/dubroy/ohm-parsing-made-easy
- https://github.com/harc/ohm/blob/master/doc/README.md
- https://cs.lmu.edu/~ray/notes/ohmexamples/
- https://github.com/harc/ohm
- https://jsfiddle.net/pdubroy/p3b1v2xb/
- https://jsfiddle.net/pdubroy/15k63qae/
- https://github.com/harc/ohm/tree/master/examples