import { useEffect, useState } from 'react'
import { Box,Typography,Button } from '@mui/material'
import { getFormData } from '../../firebase'
import ViewOne from './ViewOne';
import ViewTwo from './ViewTwo';

export default function Answers() {

    const [allAnswers,setAllAnswers]= useState<{[key: string]: any}[]>(
        [],
    );

    const [keys,setKeys] = useState<string[]>([])

    const [view,setView]=useState(1)

    const getData=async ()=>{
        const data = await getFormData()
        let sortedData:object[]=[]
        data.forEach((answer : { [key:string] : any }) => {
            let answerKeys=Object.keys(answer);
            let Q:object[]=[]
            answerKeys.map(key=>{
                Q.push({...answer[key],name:key})
            })
            Q.sort((a:any,b:any)=>{
                if (a.index>b.index){return 1}
                if (a.index<b.index){return -1}
                else return 0;
            })

            let sortedObject:{ [key:string]:any }={};

            Q.forEach((e:any)=>{
                sortedObject[e.name]=e;
            })
            sortedData.push(sortedObject)
        })
        setAllAnswers(sortedData)
        setKeys(Object.keys(sortedData[0]))
    }

    useEffect(()=>{
        getData()
    },[])

    return (
    <Box>
        <Typography variant='h1'>Respuestas</Typography>
        <Button onClick={()=>{setView(1)}}>Vista 1</Button>
        <Button onClick={()=>{setView(2)}}>Vista 2</Button>
        {
            view===1?<ViewOne allAnswers={allAnswers} keys={keys}/>:<ViewTwo allAnswers={allAnswers} keys={keys}/>
        }
    </Box>
    )
}
