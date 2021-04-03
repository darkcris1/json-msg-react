<p align="center">
    <a href="https://darkcris1.github.io/json-msg-react">
        <img width="140" src="https://json-msg.vercel.app/logo.svg" alt="React json-msg logo" />
  </a>

<h1 align="center">json-msg-react</h1>
<div align="center">

[![NPM](https://img.shields.io/npm/v/json-msg-react.svg)](https://www.npmjs.com/package/json-msg-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

</div>

This might be similar to [Formik](https://formik.org/) but in a hook form , and this is also use json-msg as a validator. [Json-msg](json-msg.vercel.app) is a lightweight alternative for yup and joi or any other schema validator.

## Prerequisite

- Basic knowledge of [json-msg](json-msg.vercel.app) for building schema

> Check json-msg [documentation](json-msg.vercel.app) here

## Install

```bash
npm install json-msg-react
```

or

```bash
yarn add json-msg-react
```

## Usage

```tsx
import React from "react";
import jm, { useForm } from "json-msg-react";

const schema = {
  username: jm.str({ min: 5 }),
  password: jm.str({ min: 8, max: 40 }),
  pin: jm.num({ digit: 4 }),
};
const initialData = {
  username: "",
  password: "",
  pin: 0,
};
const Example = () => {
  const { handleChange, handleSubmit, errors } = useForm(initialData, schema);

  function submit(data) {
    console.log(data);
  }
  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        <input name="username" onChange={handleChange} />
        {errors.username && <p> {errors.username} </p>}
        <input name="password" type="password" onChange={handleChange} />
        {errors.username && <p> {errors.username} </p>}
        <input name="pin" type="number" onChange={handleChange} />
        {errors.password && <p> {errors.password} </p>}
      </form>
    </>
  );
};
```

## API

### useForm(**initialData**,**schema**, **option**)

---

- **initialData**:? Object
- **schema**:? Object

| option           | type    | default | description                       |
| ---------------- | ------- | ------- | --------------------------------- |
| showAllErrors    | boolean | false   | Show all the errors in array form |
| trim             | boolean | false   | Trim all the string in the data   |
| validateOnChange | boolean | true    | Validate on change the data       |
| validateOnMount  | boolean | false   | Validate the data on mount        |
