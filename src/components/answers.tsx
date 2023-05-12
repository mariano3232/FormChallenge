import { useEffect, useState } from 'react'
import { Box,Typography } from '@mui/material'
import { getFormData } from '../firebase'


export default function Answers() {

    const [data,setData]=useState()

    const getData=async ()=>{
        const data = await getFormData()
        console.log('DAAATAAA :',data)
    }

    useEffect(()=>{
        getData()
        // console.log('aaaaaaaaaaaaaa')
        // getFormData().then((res)=>{
        //     console.log(res)
        // },
        // (err)=>{
        //     console.log('err :',err)
        // }
        // )
    },[])

    return (
    <Box>
        <Typography variant='h1'>Respuestas</Typography>
    </Box>
    )
}
