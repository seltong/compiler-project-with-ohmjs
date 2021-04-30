'use strict'

const inputs = `
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
input(
  id = newBtn,
  nocontent,
  class = newClass,
  @onChange = handleSetValue,
  @onClick = handleClick
)
`;

const input2 = `div(id=teste,class=newClass)`;

export default inputs;