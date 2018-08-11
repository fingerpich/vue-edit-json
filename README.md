# Vue-edit-json

> View and edit JSON as an vue component

## **[DEMO](http://fingerpich.github.io/Vue-edit-json)**

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

## Example
Single file component
``` html

<template>
    <JsonEditor :objData="jsonData" v-model="jsonData" ></JsonEditor>
</template>
<script>
export default {
    ...
    data: function() {
        return {
            jsonData: {
                name: 'mike',
                age: 22,
                phone: '18552129932',
                address: ['AAA C1', 'BBB C2']
            }
        }
    }
}
</script> 

```
