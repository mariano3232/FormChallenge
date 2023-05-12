import { useEffect, useState } from 'react'
import { Box,Typography } from '@mui/material'
import { getFormData } from '../firebase'


export default function Answers() {

    const [allAnswers,setAllAnswers]=useState([{}])

    const getData=async ()=>{
        const data = await getFormData()
        setAllAnswers(data)
    }

    useEffect(()=>{
        getData()
        // console.log('allAnswers :',allAnswers)
    },[])

    return (
    <Box>
        <Typography variant='h1'>Respuestas</Typography>
        {
            allAnswers.map((answer: { [key: string]: any })=>{
                console.log(answer)
                return <h1>{answer.full_name?.value}</h1>
            })
        }
    </Box>
    )
}
