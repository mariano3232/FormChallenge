import { Box,Typography } from '@mui/material'

interface props{
    allAnswers:{[key: string]: any}[],
    keys:string[],
}

export default function ViewOne({allAnswers,keys}:props) {

    return (
        <Box sx={{
            display:'flex',
            flexDirection:'column',      
        }}>
            {
                allAnswers.map((answer,i)=>{
                    return (
                    <Box
                    key={i}
                    sx={{
                        bgcolor:'#FFFFF0',
                        borderRadius:'8px',
                        margin:'10px',
                        padding:'30px',
                    }}
                    >
                    {
                        keys.map((key,i)=>{
                            return(
                                <Box key={i} sx={{
                                    display:'flex',
                                    padding:'5px',
                                    margin:'10px',
                                    borderRadius:'3px',
                                    bgcolor:'#a7acd9',
                                }}>
                                    <Typography>{answer[key].label} : </Typography>
                                    <Typography>{answer[key].value.toString()}</Typography>
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
