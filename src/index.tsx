import jm from "json-msg";
import { useState, useCallback } from "react";

interface Config {
  message: object
  allow?: any[]
  isJsonMsg: true
  config: object
}
export interface Schema {
	[key: string]: Config
}
interface Data {
	[key: string]: any
	
}
function useForm<TData extends Data>(initialData: TData ,schema?: Schema) {
	const [data, setData] = useState<TData>(initialData);
	const [errors,setErrors] = useState<Schema | null | {}>({});
	const handleChange = useCallback((e)=>{
		const name = e.target.name;
		const value = e.target.value;
		
		
		if (schema && name in schema){
			const errorMsg = jm.validate(value,schema[name]);
			
			setErrors((error)=>{
				if (errorMsg){
					return {...error,[name]:errorMsg}
				};
				error && delete error[name]
				return error;
			});
			
		}
		setData(prevData =>({...prevData, [name]: value	}));
	},[])

	const handleSubmit = useCallback((callback: Function)=>{
		return (e: React.FormEvent<HTMLFormElement>)=>{
			e.preventDefault();
			
			// Access data from setData since this function is wrap on useCallback
			// This is better than recomputing Everytime the data changes
			setData((prevData: TData): TData=>{
				
				if (schema){
					const errorMsg = jm.validate(prevData,schema,{abortEarly: false, showAllErrors: true});
					if (errorMsg){
						setErrors(errorMsg);
						return prevData;
					}
				}
				
				callback && callback(prevData)
				
				return prevData;
			});
			
		}
	},[])
	return { data, handleChange,handleSubmit,errors };
}
export {useForm};
export default jm;