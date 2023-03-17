import React ,{useState, useRef} from 'react'
import { Formik, Field, Form, ErrorMessage } from "formik";
import {Box, Input, Checkbox, Divider, Button} from "@chakra-ui/react"
// import { Button } from '../stories/Button';
// import { Colors } from '../theme/colors';
// import "../theme/styles.css"


function Calculator() {

    const [rows,setRows] = useState([])

    // const StyledTableCell = styled(TableCell)(({ theme }) => ({
    //     [`&.${tableCellClasses.head}`]: {
    //       backgroundColor: theme.palette.common.black,
    //       color: theme.palette.common.white,
    //     },
    //     [`&.${tableCellClasses.body}`]: {
    //       fontSize: 14,
    //     },
    //   }));
      
    //   const StyledTableRow = styled(TableRow)(({ theme }) => ({
    //     '&:nth-of-type(odd)': {
    //       backgroundColor: theme.palette.action.hover,
    //     },
    //     // hide last border
    //     '&:last-child td, &:last-child th': {
    //       border: 0,
    //     },
    //   }));
      

    const getNumOfPits = (max,num) => {
        if((num/max)%1 == 0){
            return (num/max) - 1
        } else return Math.floor(num/max)
    }

    const sortData = (data, key,limit) => {
        let sortedData = data.sort(function(a,b){
            return a[key] - b[key];
          })
          return sortedData.slice(0,limit)
    }

    const calculatePitStrategy = (avgSoftTime,avgMedTime,avgHardTime,sMax,mMax,hMax,sRequired,mRequired,hRequired,pitTime, totalLaps) => {
      let numOfSoftLaps = 0
        let numOfMedLaps = 0
        let numOfHardLaps = 0
        let possibleStrats = []
        for(let i = sRequired?1:0; i<=totalLaps;i++){
            numOfSoftLaps = i
            for(let j = mRequired?1:0;j<=totalLaps;j++){
                numOfMedLaps=j
                for(let k = hRequired?1:0;k<=totalLaps;k++){
                    numOfHardLaps = k
                    if(numOfSoftLaps+numOfMedLaps+numOfHardLaps === parseInt(totalLaps)){
                        let numOfSPits = getNumOfPits(sMax, numOfSoftLaps)
                        let numOfMPits = getNumOfPits(mMax, numOfMedLaps)
                        let numOfHPits = getNumOfPits(hMax, numOfHardLaps)
                        let numOfPits = 2+numOfSPits+numOfMPits+numOfHPits
                        let totalTime = numOfSoftLaps*avgSoftTime+numOfMedLaps*avgMedTime+numOfHardLaps*avgHardTime+numOfPits*pitTime
                        possibleStrats.push({
                            soft: numOfSoftLaps,
                            medium: numOfMedLaps,
                            hard: numOfHardLaps,
                            pits: numOfPits,
                            total:totalTime
                        })
                    }
                }
            }
        }
        possibleStrats = sortData(possibleStrats,"total",30)        
        return possibleStrats
    }

    // const rows = calculatePitStrategy(avgSoftTime,avgMedTime,avgHardTime,sMax,mMax,hMax,pitTime,totalLaps)

    const handleSubmit = (values, props) => {
        setRows(calculatePitStrategy(values.softTime/60,values.medTime/60,values.hardTime/60,values.sMax,values.mMax,values.hMax,values.sRequired,values.mRequired,values.hRequired,values.pitTime/60,values.totalLaps))
        // props.resetForm();
      };

    const initialValues = {
        softTime:"",
        medTime:"",
        hardTime:"",
        sRequired:false,
        mRequired:true,
        hRequired:true,
        sMax:"",
        mMax:"",
        hMax:"",
        pitTime:"",
        totalLaps:""
    }



  return (
    // <Grid container spacing={2} backgroundColor={Colors.light} height="100vh">
    //     <Grid item xs={12} md={4} backgroundColor={Colors.light}>
    <>
        <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {(props) => {
        const {
          values,
          handleSubmit,
          handleBlur,
          setFieldValue,
          handleChange,
          validateOnBlur,
          resetForm,
          errors,
          touched,
          isValidating,
        } = props;

        return (
          <Form onSubmit={(e) => {
            e.preventDefault()
            handleSubmit(e)
            }} >
            <Box padding="30px" display="flex" flexDirection={"column"} height="100%">
                <Box display="flex" justifyContent={"space-between"}>
                <Field
                      as={Input}
                      color="secondary"
                      label="Average lap time soft (sec)"
                      type="number"
                      name="softTime"
                      width="30%"
                      variant="outlined"
                      margin="dense"
                      autoComplete="off"
                      helperText={<ErrorMessage name="email" />}
                      error={props.errors.email && props.touched.email}
                    />
                    <Field
                      as={Input}
                      color="secondary"
                      label="Longest stint (laps)"
                      type="number"
                      name="sMax"
                      width="10%"
                      variant="outlined"
                      margin="dense"
                      autoComplete="off"
                      helperText={<ErrorMessage name="email" />}
                      error={props.errors.email && props.touched.email}
                    />
<Checkbox name="sRequired" onChange={(e)=>props.setFieldValue("sRequired",e.target.checked)} checked={props.values.sRequired} sx={{
    color: "#393e46",
    '&.Mui-checked': {
      color: "#66D893",
    },
  }}>Required</Checkbox>
                </Box>
                    
                <Box display="flex" justifyContent={"space-between"} >
<Field
                      as={Input}
                      color="secondary"
                      label="Average lap time medium (sec)"
                      type="number"
                      name="medTime"
                      width="80%"
                      variant="outlined"
                      margin="dense"
                      autoComplete="off"
                      helperText={<ErrorMessage name="email" />}
                      error={props.errors.email && props.touched.email}
                    />
                    <Field
                      as={Input}
                      color="secondary"
                      label="Longest stint (laps)"
                      type="number"
                      name="mMax"
                      width="20%"
                      variant="outlined"
                      margin="dense"
                      autoComplete="off"
                      helperText={<ErrorMessage name="email" />}
                      error={props.errors.email && props.touched.email}
                    />
                    <Checkbox name="mRequired" onChange={(e)=>props.setFieldValue("mRequired",e.target.checked)} checked={props.values.mRequired} sx={{
    color: "#393e46",
    '&.Mui-checked': {
      color: "#66D893",
    },
  }}>Required</Checkbox>
                </Box>
                <Box display="flex" justifyContent={"space-between"} >
<Field
                      as={Input}
                      color="secondary"
                      label="Average lap time hard (sec)"
                      type="number"
                      name="hardTime"
                      width="80%"
                      variant="outlined"
                      margin="dense"
                      autoComplete="off"
                      helperText={<ErrorMessage name="email" />}
                      error={props.errors.email && props.touched.email}
                    />
                    <Field
                      as={Input}
                      color="secondary"
                      label="Longest stint (laps)"
                      type="number"
                      name="hMax"
                      width="20%"
                      variant="outlined"
                      margin="dense"
                      autoComplete="off"
                      helperText={<ErrorMessage name="email" />}
                      error={props.errors.email && props.touched.email}
                    />
                    <Checkbox name="hRequired" onChange={(e)=>props.setFieldValue("hRequired",e.target.checked)} checked={props.values.hRequired} sx={{
    color: "#393e46",
    '&.Mui-checked': {
      color: "#66D893",
    },
  }}>Required</Checkbox>
                </Box>
                <Divider />
                <Field
                      as={Input}
                      value={props.values.pitTime}
                      color="secondary"
                      label="Average pit delay (sec)"
                      type="number"
                      name="pitTime"
                      width="90%"
                      variant="outlined"
                      margin="dense"
                      autoComplete="off"
                      helperText={<ErrorMessage name="email" />}
                      error={props.errors.email && props.touched.email}
                    />
                    <Field
                      as={Input}
                      value={props.values.totalLaps}
                      color="secondary"
                      label="Total number of race laps"
                      type="number"
                      name="totalLaps"
                      width="90%"
                      variant="outlined"
                      margin="dense"
                      autoComplete="off"
                      helperText={<ErrorMessage name="email" />}
                      error={props.errors.email && props.touched.email}
                    />

                    <Box display="flex" justifyContent={"space-between"}>
                    <Button
                      primary={false}
                      label="Reset"
                      onClick={() => {
                        resetForm()
                        setRows([])
                    }}
                    >
                      Reset
                    </Button>
                    <Button
                      primary={true}
                      type="submit"
                      label="Calculate"
                    //   onClick={()=>handleSubmit(values)}
                    />
                    </Box>

                    

            </Box>
          </Form>
        );
      }}
    </Formik>
        {/* </Grid>
        <Grid item xs={12} md={8} backgroundColor={Colors.darkGrey} display="flex" flexDirection={"column"} justifyContent={"center"} > */}
        
       {/* {rows.length>0 ?
       <TableContainer component={Paper}>
       <Table sx={{ minWidth: 650 }} aria-label="customized table">
         <TableHead >
           <StyledTableRow >
             <StyledTableCell><Typography variant="subtitle2" className='font-link'> RS laps </Typography></StyledTableCell>
             <StyledTableCell ><Typography variant="subtitle2" className='font-link'> RM laps </Typography></StyledTableCell>
             <StyledTableCell ><Typography variant="subtitle2" className='font-link'> RH laps </Typography></StyledTableCell>
             <StyledTableCell align="right"><Typography variant="subtitle2" className='font-link'> Pits </Typography></StyledTableCell>
             <StyledTableCell align="right"><Typography variant="subtitle2" className='font-link'> Total time </Typography></StyledTableCell>
            <StyledTableCell align="right"><Typography variant="subtitle2" className='font-link'> Difference (sec)</Typography></StyledTableCell>
          </StyledTableRow >
         </TableHead>
        <TableBody>
           {rows.map((row,i) => (
            <StyledTableRow 
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row" className='font-link'>
                {row.soft}
              </StyledTableCell >
              <StyledTableCell className='font-link'>{row.medium}</StyledTableCell>
              <StyledTableCell className='font-link'>{row.hard}</StyledTableCell>
              <StyledTableCell align="right" className='font-link'>{row.pits}</StyledTableCell>
              <StyledTableCell align="right" className='font-link'>{parseFloat(row.total.toPrecision(4))}</StyledTableCell>
              <StyledTableCell align="right" color="red">
              <Typography variant="body2" color="red" className='font-link'>
              {i ===0 ? "" : "+" + parseFloat(((row.total-rows[0].total)*60).toPrecision(4))}
            </Typography>
              </StyledTableCell>
            </StyledTableRow >
          ))}
        </TableBody>
      </Table>
      </TableContainer>
      :
      <Typography variant="h6" color={Colors.light} className='font-link' > Fill in the form and click Calculate</Typography>
      } */}
   
        </>
    // </Grid>
    

    )
}

export default Calculator