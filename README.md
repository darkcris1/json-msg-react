<p align="center">
    <a href="https://darkcris1.github.io/json-msg-react">
        <img width="140" src="https://json-msg.vercel.app/logo.svg" alt="React json-msg logo" />
  </a>

<h1 align="center">json-msg-react</h1>
<div align="center">

[![NPM](https://img.shields.io/npm/v/json-msg-react.svg)](https://www.npmjs.com/package/json-msg-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

</div>

## Install

```bash
npm install --save json-msg-react
```
or
```bash
yarn add -D json-msg-react
```

## Usage

```tsx
import React from 'react'
import jm , {useForm} from 'json-msg-react';

const schema= {
  username: jm.str({ min: 5 }),
  password: jm.str({ min: 8 , max: 40}),
  pin: jm.num({digit: 4})
}
const initialData = {
  username: ""
}
const Example = () => {
  const {handleChange, handleSubmit, errors} = useForm(initialData, schema)
  
  function submit(data){
    console.log(data)
  }
  return (
    <>
    <form onSubmit={}>
       <input name="username" onChange={handleChange}  />
       {errors.username && <p> {errors.username} </p>}
       <input name="password" type="password" onChange={handleChange}   />
       {errors.username && <p> {errors.username} </p>}
       <input name="pin" type="number" onChange={handleChange}  />
       {errors.password && <p> {errors.password} </p>
    </form>
    </>
  )
}
```
