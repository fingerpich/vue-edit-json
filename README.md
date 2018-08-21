# Vue-edit-json

> View and edit JSON as an vue component

## **[DEMO](http://fingerpich.github.io/vue-edit-json)**

</br>


## Getting Started
```
npm install Vue-edit-json --save
```

</br>


## Usage

``` javascript
//import it in your project At your entry point

import vue from 'vue'
import JsonEditor from 'Vue-edit-json'
  
Vue.use(JsonEditor)
  
```
</br>

Pass json data using `v-model` or `:value` and make it editable using `is-edit` attribute as the following code
``` html
<JsonEditor is-edit="true" v-model="jsonData" ></JsonEditor>
```
