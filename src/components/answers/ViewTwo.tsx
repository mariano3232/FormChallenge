import { Box } from "@mui/material"

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
            if (answer.key===uniqueAnswer.key){
                answer.label=null;
            }
        })
        if (isUnique){
            uniqueAnswers.push(answer)
        }
    })
    console.log('uniqueAnswers :',uniqueAnswers)


    return (
    <Box>
        {
            uniqueAnswers.map(answer=>{
                return(
                    <Box>
                        <h4>{answer.label}</h4>
                        <span>{answer.value.toString()}</span>
                        {
                            answer.amount?<span>(X{answer.amount})</span>:null
                        }
                    </Box>
                )
            })
        }
    </Box>
    )
}
