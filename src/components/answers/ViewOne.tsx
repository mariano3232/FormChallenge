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
                        bgcolor:'grey',
                        margin:'10px',
                        padding:'10px',
                    }}
                    >
                    {
                        keys.map((key,i)=>{
                            return(
                                <Box key={i} sx={{
                                    display:'flex',
                                }}>
                                    <Typography>{answer[key].label}:</Typography>
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
