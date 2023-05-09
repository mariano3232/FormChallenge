import db from '../db.json'
import {Box,TextField,Typography,Select,MenuItem,Checkbox,Button} from '@mui/material'
import { Formik } from 'formik';



export default function Survey() {
  const formFields=db

  const initialValues: { [key: string]: any } = {};

    formFields.items?.forEach((item) => {
    if (item.name) {
        if (item.type === "checkbox") {
        initialValues[item.name] = [];
        } else {
        initialValues[item.name] = "";
        }
    }
    });

    console.log('initialValues :',initialValues)

  const validate= (values:{[key: string]: any;})=>{
    const errors:{
        [key:string]:string;
    }={}
    formFields.items.forEach(item=>{
        if (item.required && values[item.name]===''){
            errors[item.name]='Este campo es obligatorio'
        };
        if (item.type==='email' && item.name && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values[item.name])){
            errors[item.name]='Email inválido'
        }
        if (item.type==='select' && item.name &&!item.options?.map(e=>{return e.value}).includes(values[item.name])){
            errors[item.name]='Opción no válida'
        }
        if (item.type==='checkbox' && item.required && values[item.name][0]!=='on'){
            errors[item.name]='Aceptar para continuar'
            console.log('aaa:',values[item.name][0])
        }
    })
    console.log(values)
    return errors;
  }


  return (
    <Box>
        <Formik
            validate={validate}
            initialValues={initialValues}
            onSubmit={(values,{setSubmitting})=>{
                console.log('values :',values)
                setSubmitting(false)
            }}
        >
        {({ errors,
        values,
        touched,
        handleBlur,
        handleChange,
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
            formFields?.items.map(field=>{
                switch(field.type){
                    case 'text':{
                        return(
                            <TextField
                                key={field.name}
                                name={field.name}
                                label={field.label}
                                variant="filled"
                                onBlur={handleBlur}
                                value={field.name?values[field.name]:''}
                                onChange={handleChange}
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
                                value={field.name?values[field.name]:''}
                                onChange={handleChange}
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
                                    value={field.name?values[field.name]:''}
                                    onChange={handleChange}
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
                            value={field.name && values[field.name] ? values[field.name] : "label"}
                            onChange={handleChange}
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
                    case 'checkbox':{
                        return(
                            <Box sx={{display:'flex'}} key={field.name}>
                                <Typography>
                                    {field.label}
                                </Typography>
                                <Checkbox
                                    id={field.name}
                                    onChange={handleChange}
                                />
                                {
                                    touched[field.name as string] && errors[field.name as string]?<Typography>{errors[field.name as string] as string}</Typography>:<></>
                                }
                            </Box>
                        )
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
