import db from '../db.json'
import {Box,TextField,Typography,Select,MenuItem,Checkbox,Button} from '@mui/material'
import { Formik } from 'formik';
import  {sendFormData}  from '../firebase';
import { useNavigate } from "react-router-dom";
import {useEffect, useState} from 'react'

export default function Survey() {
    const formFields=db

    const navigate=useNavigate()

    const initialValues: { [key: string]: any } = {};

    formFields.items.forEach((item)=>{
        if (item.type!=='submit'){
        switch(item.type){
            case 'checkbox':
                initialValues[item.name as string] = {value:false};
            break;
            case 'select':
                initialValues[item.name as string] = {value:'label'};
            break;
            default:
                initialValues[item.name as string] = {};
            }
        }
    })

    const initialErrors: { [key: string]: string } = {};

    formFields.items.forEach((item) => {
        initialErrors[item.name as string]='';
    })

    const [formData,setFormData]=useState(initialValues)

    const [errors , setErrors]=useState(initialErrors)

    const validate = (values: { [key: string]: any })=>{

        const errors: { [key: string]: string } = {};

        formFields.items.forEach(item=>{
            if (item.required && values[item.name].value===''){
                errors[item.name]='Este campo es obligatorio'
            };
            if (item.type==='email' &&  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values[item.name as string].value)){
                errors[item.name as string]='Email inválido'
            }
            if (item.type==='select' && item.name &&!item.options?.map(e=>{return e.value}).includes(values[item.name].value)){
                errors[item.name]='Opción no válida'
            }
            if (item.type==='checkbox' && item.required && values[item.name].value!==true){
                errors[item.name]='Aceptar para continuar'
            }
        })
        return errors;
    }

    const handleChange = (fieldName: string, field: any) => {
        const updatedFormData = {
          ...formData,
          [fieldName]: {
            ...formData[fieldName],
            value: field.value,
            index: field.index,
            label: field.label,
          },
        };
        setFormData(updatedFormData);
        setErrors(validate(updatedFormData));
        // console.log('formData:', formData);
        console.log(errors)
    };

    useEffect(()=>{
        setErrors(validate(formData));
    },[])

    const areThereErrors = (errors: { [key: string]: string }) => {
        let res=false;
        Object.keys(errors).forEach((name=>{
            if (errors[name]!==""){
                res=true
            }
        }))
        return res;
    }

    return (
    <Box>
        <Formik           
            initialValues={initialValues}

            onSubmit={ async ()=>{
                if (areThereErrors(errors)===false){
                    try {
                        const result = await sendFormData(formData);
                        console.log(result);
                        navigate('/answers')
                    } catch (error) {
                        console.log('Error:', error);
                    }
                } else {
                    alert('Hay errores en el formulario, revisar e intentar nuevamente')
                }
            }}
        >
        {({
        touched,
        handleBlur,
        handleSubmit,
        isSubmitting,      
        }) => (
        <form onSubmit={handleSubmit}>
        <Box sx={{
            display:'flex',
            flexDirection:'column',
            gap:'30px',
        }}>
        {
            formFields?.items.map((field,index)=>{
                switch(field.type){
                    case 'text':{
                        return(
                            <TextField
                                key={field.name}
                                name={field.name}
                                label={field.label}
                                variant="filled"
                                onBlur={handleBlur}
                                onChange={e=>handleChange(e.target.name,{
                                    index,
                                    label:field.label,
                                    value:e.target.value,
                                })}
                                helperText={touched[field.name as string] as boolean && errors[field.name as string] as string}
                                error={Boolean(field.name&&touched[field.name] && errors[field.name])}
                            />
                        )
                    }
                    case 'email':{
                        return(
                            <TextField
                                key={field.name}
                                name={field.name}
                                label={field.label}
                                variant="filled"
                                onBlur={handleBlur}
                                onChange={e=>handleChange(e.target.name,{
                                    index,
                                    label:field.label,
                                    value:e.target.value,
                                })}
                                helperText={touched[field.name as string] as boolean && errors[field.name as string] as string}
                                error={Boolean(field.name&&touched[field.name] && errors[field.name])}
                            />
                        )
                    }
                    case 'date':{
                        return(
                            <Box key={field.name}>
                                <Typography>{field.label}</Typography>
                                <TextField
                                    type='date'
                                    name={field.name}
                                    variant="filled"
                                    onBlur={handleBlur}
                                    onChange={e=>handleChange(e.target.name,{
                                        index,
                                        label:field.label,
                                        value:e.target.value,
                                    })}
                                    helperText={touched[field.name as string] as boolean && errors[field.name as string] as string}
                                    error={Boolean(field.name&&touched[field.name] && errors[field.name])}
                                />
                            </Box>
                        )
                    }
                    case 'select':{
                        return(
                            <Select
                            key={field.name}
                            name={field.name}
                            label={field.label}
                            variant="filled"
                            value={formData[field.name as string].value}
                            onChange={e=>handleChange(e.target.name,{
                                index,
                                label:field.label,
                                value:e.target.value,
                            })}
                            onBlur={handleBlur}
                            error={Boolean(field.name&&touched[field.name] && errors[field.name])}
                            >
                                <MenuItem value="label" disabled>
                                    {field.label}
                                </MenuItem>
                                {field.options?.map(option=>{
                                    return(
                                    <MenuItem value={option.value} key={option.value} id={option.value}>{option.label}</MenuItem>
                                    )
                                })}
                            </Select>
                        )
                    }
                    case 'checkbox': {
                        return (
                          <Box sx={{ display: 'flex', flexDirection: 'column' }} key={field.name}>
                            <Typography>{field.label}</Typography>
                            <Checkbox
                              name={field.name}
                              checked={formData[field.name as string].value}
                              onChange={(e) => handleChange(e.target.name, {
                                index,
                                label: field.label,
                                value: e.target.checked,
                              })}
                            />
                            {touched[field.name as string] && errors[field.name as string] ? (
                              <Typography sx={{ color: 'red' }}>{errors[field.name as string] as string}</Typography>
                            ) : (
                              <></>
                            )}
                          </Box>
                        );
                      }
                      
                    case 'submit':{
                        return (
                            <Button type="submit" disabled={isSubmitting} key={field.label} id={field.type}>
                                {field.label}
                            </Button>
                        )
                    }
                }
            })
        }
        </Box>
        </form>
       )}
        </Formik>
    </Box>
  )
}
