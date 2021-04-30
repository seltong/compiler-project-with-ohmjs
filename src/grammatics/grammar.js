'use strinct'

const grammar = `Grammar {
  Exp = Tag ("\\n"? Tag)*
  Tag = name "(" Prop ("," Prop)* ")"
  Prop = PropTag                               --tag
      |  restriction                           --restrict
      |  Event                                 --event
      |  Children                              --children
      |  ""                                    --empty
  Event = "@" eventType "=" eventName
  Children = "#" Tag
  PropTag = propName "=" propValue
  propName = letter*
  propValue = alnum*
  name = letter*
  restriction = "nocontent"
  eventType = alnum*
  eventName = alnum*
}`;

export default grammar;