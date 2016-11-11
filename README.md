# Ubersick

Widgets on your desktop, with electron and react. Work in progress.

![](http://i.imgur.com/Did6lLe.png)

```
$ git clone git@github.com:brumm/ubersick.git
$ cd ubersick
$ npm install
$ ./node_modules/.bin/electron-rebuild
$ npm start
```

## Sample widget

`./plugins/local-ip.ubersick-plugin`
```jsx
import React from 'react'
import css from './style.scss'
import ip from 'ip'

export default class Bar extends React.Component {
  render() {
    return (
      <div className={css.container}>
        <h2>{ip.address()}</h2>
      </div>
    )
  }
}
```
