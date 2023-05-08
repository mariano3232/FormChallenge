import db from '../db.json'
import {useState} from 'react'
import {Box,TextField,Typography,Select,MenuItem,Checkbox} from '@mui/material'


export default function Form() {
  const [formFields, setFormFields] = useState(db)
  const [currentSelect, setCurrentSelect]= useState("label")

  const handleSelect = (e:any)=>{
    setCurrentSelect(e.target.value)
  }

  return (
    <Box>
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
                                required={field.required?true:false}
                                variant="filled"
                            />
                        )
                    }
                    case 'email':{
                        return(
                            <TextField
                                key={field.name}
                                name={field.name}
                                label={field.label}
                                required={field.required?true:false}
                                variant="filled"
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
                                    required={field.required?true:false}
                                    variant="filled"
                                />
                            </Box>
                        )
                    }
                    case 'select':{
                        return(
                            <Select
                                key={field.name}
                                label={field.label}
                                value={currentSelect}
                                onChange={handleSelect}
                                required={field.required ? true : false}
                                variant="filled"
                            >
                                <MenuItem value="label" disabled>
                                    {field.label}
                                </MenuItem>
                                {
                                    field.options?.map(option=>{
                                        return(
                                            <MenuItem value={option.value} key={option.value}>{option.label}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        )
                    }
                    case 'checkbox':{
                        return(
                            <Box sx={{display:'flex'}} key={field.name}>
                                <Typography>{field.label}</Typography>
                                <Checkbox/>
                            </Box>
                        )
                    }
                }
            })
        }
        </Box>
    </Box>
  )
}
