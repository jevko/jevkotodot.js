import {parseJevko} from "https://cdn.jsdelivr.net/gh/jevko/parsejevko.js@v0.1.6/mod.js"
import {jevkoToDot} from './mod.js'

console.log(jevkoToDot(parseJevko(`[simple?]
fillcolor=[#ffffcc]
style=[filled]
yes [
  [to string]
  fillcolor=[#ccffcc]
]
no [
  [suffix blank?]
  fillcolor=[#ffffcc]
  no [
    [error 1]
    fillcolor=[#ffcccc]
  ]
  yes [
    [trim prefixes]
    fillcolor=[#ffffff]
    [
      [first prefix empty?]
      fillcolor=[#ffffcc]
      yes [
        [rest empty?]
        yes [
          [to array]
          fillcolor=[#ccffcc]
          style=[filled]
        ]
        no [
          [error 2]
          fillcolor=[#ffcccc]
        ]
      ]
      no [
        [rest nonempty?]
        fillcolor=[#ffffcc]
        no [
          [error 3]
          fillcolor=[#ffcccc]
        ]
        yes [
          [prefixes unique?]
          fillcolor=[#ffffcc]
          no [
            [error 4]
            fillcolor=[#ffcccc]
          ]
          yes [
            [to object]
            fillcolor=[#ccffcc]
            style=[filled]
          ]
        ]
      ]
    ]
  ]
]`)))