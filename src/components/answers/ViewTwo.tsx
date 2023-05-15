import { Box, Typography } from "@mui/material"

interface props {
    allAnswers:{[key:string]:any}[],
    keys:string[],
}

export default function ViewTwo({allAnswers,keys}:props) {

    const AnswersWithKeys:{[key:string]:any}[]=[]

    keys.forEach((key:string)=>{
        allAnswers.forEach((answer:{[key:string]:any})=>{
            AnswersWithKeys.push({
                ...answer[key],
                key,
            })
        })
    })

    const uniqueAnswers:{[key:string]:any}[]=[]

    AnswersWithKeys.forEach((answer)=>{
        //misma key y mismo value: no pushear
        let isUnique=true
        uniqueAnswers.forEach((uniqueAnswer)=>{
            if (answer.key===uniqueAnswer.key && answer.value===uniqueAnswer.value){
                uniqueAnswer['amount']= (uniqueAnswer['amount'] || 1) + 1
                isUnique=false
            }
            // if (answer.key===uniqueAnswer.key){
            //     answer.label=null;
            // }
        })
        if (isUnique){
            uniqueAnswers.push(answer)
        }
    })

    const labels=uniqueAnswers.map((e)=>{
        return e.label;
    })

    const uniqueLabels = labels.filter((item,index)=>{
        return labels.indexOf(item) === index;
    })

    console.log('uniqueAnswers :',uniqueAnswers)
    console.log(uniqueLabels)

    return (
    <Box>
        {
            uniqueLabels.map(label=>{
                return(
                    <Box sx={{
                        bgcolor:'#FFFFF0',
                        borderRadius:'8px',
                        margin:'10px',
                        padding:'30px'
                    }}>
                        <h3>{label}</h3>
                        {
                            uniqueAnswers.map(answer=>{
                                return (
                                    <Box sx={{
                                        position:'relative'
                                    }}>
                                        {
                                            answer.label===label?
                                            <Box sx={{
                                                display:'flex',
                                                padding:'5px',
                                                margin:'10px',
                                                borderRadius:'3px',
                                                bgcolor:'#a7acd9',
                                            }}>
                                                <Typography>{answer.value.toString()}</Typography>
                                                <Typography fontWeight={'bold'} sx={{
                                                    position:'absolute',
                                                    right:'30px'
                                                }}>
                                                   x{answer.amount?answer.amount:1}
                                                </Typography>
                                            </Box>:null
                                        }
                                    </Box>
                                )
                            })
                        }
                    </Box>
                )
            })
        }
    </Box>
    )
}
