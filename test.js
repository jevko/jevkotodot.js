import {parseJevko} from "https://cdn.jsdelivr.net/gh/jevko/parsejevko.js@v0.1.6/mod.js"
import {jevkoToDot} from './mod.js'

console.log(jevkoToDot(parseJevko(`[simple?]
yes [to string]
no [
  [suffix blank?]
  no [error 1]
  yes [
    [trim prefixes]
    [
      [first prefix empty?]
      yes [
        [rest empty?]
        yes [to array]
        no [error 2]
      ]
      no [
        [rest nonempty?]
        no [error 3]
        yes [
          [rest unique?]
          no [error 4]
          yes [to object]
        ]
      ]
    ]
  ]
]`)))