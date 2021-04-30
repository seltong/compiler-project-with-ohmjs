Título: ??

Alunos: 
- Diego Mendes da Silva
- João Paulo
- Rafael
- Selton

*O compilador vai gerar componentes html com seus atributos e eventos, e também pode gerar componentes dentro de componentes*

Entrada: Arquivo src/inputs/inputs.js

Saída: Arquivo em src/generated/output.txt

Sintaxe:

Sempre existe uma tag html, e entre parênteses seus atributos, eventos, e outras tags dentro, separando por vírgula: 

- Atributos: nomeAtributo = valor
- Eventos: @nomeEvento = valor
- Tags: #(tag())

As tags dentro de tags podem possuir outros atributos, eventos e tags.

Exemplo da construção de uma entrada:

tag(at1=a1, at2 = a2, ..., atN = aN, @ev1 = e1, @ev2 = e2, ..., @evN = eN, #(tag(...)), #(tag(...)))

Para facilitar a visualização do código, é possível utilizar quebras de linha:

'tag(
  at1=a1,
  at2 = a2,
  ..., 
  atN = aN,
  @ev1 = e1,
  @ev2 = e2,
  ...,
  @evN = eN,
  #(tag(...)),
  #(tag(...)))'