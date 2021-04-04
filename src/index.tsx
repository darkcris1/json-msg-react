import jm from 'json-msg'
import React, { useEffect, useCallback, useState } from 'react'

interface Config {
  message: object
  allow?: any[]
  isJsonMsg: true
  label?: string
  config: {
    [key: string]: string
  }
}
export interface Schema {
  [key: string]: Config
}
export interface Option {
  /**
   * Trim all the string in data
   * @default
   * false
   */
  trim?: boolean
  validateOnChange?: boolean,
  validateOnMount?: boolean,
  showAllErrors?: boolean
}

interface Data {
  [key: string]: any
}

function getSelectedValues(options: any[]) {
  return Array.from(options)
    .filter(el => el.selected)
    .map(el => el.value);
};

function useForm(initialData: Data = {},schema?: Schema,options: Option = {},) {

  const { trim = false , validateOnChange = true , showAllErrors , validateOnMount} = options;

  const [data, setData] = useState<Data>(initialData)
  const [errors, setErrors] = useState<Schema | null | {}>({});

  function validateData(data: Data){
    if (!schema)return null;
    const errorMsg = jm.validate(data, schema, {
      abortEarly: false,
      showAllErrors
    })
    if (errorMsg) setErrors(errorMsg);
    else setErrors({});
    return errorMsg
  };

  useEffect(()=>{
    validateOnMount && validateData(data);
  },[]);
 
  const handleChange = useCallback((e: React.ChangeEvent<any>) => {
    const {
      type,
      name,
      value: val,
      checked,
      options,
      multiple,
    } = e.target;
    let parseNum;
    let value = /number|range/.test(type)
    ? (parseNum = parseFloat(val), isNaN(parseNum) ? '' : parseNum)
    : /checkbox/.test(type) // checkbox
    ? checked
    : options && multiple // <select multiple>
    ? getSelectedValues(options)
    : val;

    const schemaName = schema && schema[name];

    if (trim && typeof value === 'string') value = value.trim()
    
    if (validateOnChange && schemaName && !schemaName.config.sameAs) {
      schemaName.label = schemaName.label || name;

      const errorMsg = jm.validate(value, schemaName,{showAllErrors})


      setErrors((error) => {
        if (errorMsg) return { ...error, [name]: errorMsg };

        error && delete error[name];

        return error
      })
    }

    setData((prevData) => ({ ...prevData, [name]: value }))
  }, [])
  
  type func = (data: Data)=> any;

  const handleSubmit = useCallback((callback: func) => {
    return (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      // Access data from setData since this function is wrap on useCallback
      // This is better than recomputing Everytime the data changes
      setData((prevData: Data) => {
        const errorMsg = validateData(prevData);
        if (errorMsg) return prevData;

        callback && callback(prevData)
        return prevData
      })
    }
  }, [])
  return { data, handleChange, handleSubmit, errors }
}

export { useForm }
export default jm
