'use strinct'

// Verifica qual operação deve ser utilizada através do values passado como parâmetro 
function validationAndReduce(values, oneResult, reduce) {
  if(values.length == 0) {
    return "";
  } else if (values.length == 1) {
    return oneResult(values);
  } else {
    return reduce(values);
  }
}

// Cria o código da tag HTML e suas funções
function createTag(tagName, propsTag, restrictions, events, children) {
  var html = "<" + tagName + " "; //  Open tag
  var props = "";
  var actions = {events: "", funcs: ""};

  // Gerando os atributos/ propriedades da tag
  props = validationAndReduce (
    propsTag,
    (values) => values[0].propName + "=\"" + values[0].propValue + "\"",
    (values) => values.reduce((acc, curr) => {
      return acc.propName + "=\"" + acc.propValue + "\" " + curr.propName + "=\"" + curr.propValue + "\"";
    })
  );

  props = events.length > 0 ? props + " " : props;

  // Gerando os eventos da tag
  actions.events = validationAndReduce(
    events,
    (values) => values[0].eventType + "=\"" + values[0].eventName + "()\"",
    (values) => values.reduce((acc, curr) => {
        return acc.eventType + "=\"" + acc.eventName + "()\" " + curr.eventType + "=\"" + curr.eventName + "()\"";
    })
  );

  // Gerando as funções para os eventos solicitados
  actions.functions = validationAndReduce(
    events,
    (values) => "function " + values[0].eventName + "(){}\n",
    (values) => values.reduce((acc, curr) => {
        return "function " + acc.eventName + "(){}\n" + "function " + curr.eventName + "(){}\n";
    })
  );
  
  
  events.map(event => {
    return "function " + event.eventName + "(){}";
  });
  
  // Adicionando as propriedades e eventos ao resultado final
  html += props + actions.events;
  
  if (restrictions.includes("nocontent")) {
    html += " />\n";
  } else if(children.length > 0) {
    const r = converteTreeToCode({exp: children});
    actions.functions += r.functions;

    html += ">\n";
    html += r.html;
    html += "</" + tagName + ">\n"; // Close tag
  } else {
    html += "></" + tagName + ">\n"; // Close tag
  }
  
  return { html, functions: actions.functions };
}

// Converte a Árvore em código
export function converteTreeToCode(tree) {
  const expressions = tree.exp; // Array de Expressões
  var html = "";
  var functions = "";
  
  expressions.map(exp => {
    const tagName = exp.tag.name;
    var propsTag = [], 
        restrictions = [], 
        events = [], 
        children = [];

    exp.props.map(prop => {
      if (prop.propTag) propsTag.push(prop.propTag)
      if (prop.restriction) restrictions.push(prop.restriction)
      if (prop.event) events.push(prop.event)
      if (prop.child) children.push(prop.child)
    });

    const r = createTag(tagName, propsTag, restrictions, events, children);

    html += r.html;
    functions += r.functions;
  });

  return { html, functions };
}