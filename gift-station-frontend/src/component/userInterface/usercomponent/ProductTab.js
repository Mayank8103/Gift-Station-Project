import {Box, Divider, Tab, Tabs, Typography } from "@mui/material"
import useMediaQuery from '@mui/material/useMediaQuery';
import React, { useState } from "react"
import { useTheme } from '@mui/material/styles';
import { useStyles } from "./InfoCSS";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export default function ProductTab(props) {

    var data= props.data
    // console.log("DIS:",data)
    var classes = useStyles
    const theme = useTheme();
    const [value, setValue] = useState(0);
    
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const sm = useMediaQuery(theme.breakpoints.down('sm'));

    function AccordionTab(){


        return(
            <>
             <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Description</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
           {data.discription}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>SHIPPING AND RETURN</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          For Cakes & Flowers , we stand behind our guarantee for delivery on the day you want. For all other gifts, accurate delivery time will be calculated at checkout.
          Delivery is Free for Order value of $250+, For orders less than that , accurate delivery charges will be calculated at checkout depending on location & product you are purchasing.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>REVIEW</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
         No reviews Yet
          </Typography>
        </AccordionDetails>
      </Accordion>

            </>
        )
    }

    const handleTabs = (event, newValue) => {
        setValue(newValue);
    };

    function TabPanel(props) {
        const { children, value, index } = props;
        return (
            <div>
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        )
    }
    return (
        <div>
           {!md?<>
            <Tabs value={value} onChange={handleTabs}
                sx={{ marginLeft: 10, }}
            >
                <Tab label='DISCRIPTION'
                 sx={{
                    // background: '#dfe6e9',
                    border:'1px solid #dfe6e9',
                    borderBottom: 'none',
                    marginLeft: 2,
                    fontFamily: 'Poppins',
                    fontWeight: 600,
                    fontSize: 18,
                    "&:hover": {
                        background: '#fff'
                    }
                }} />
                <Tab label='SHIPPING AND RETURN'
                    sx={{
                        // background: '#dfe6e9',
                        border:'1px solid #dfe6e9',
                        borderBottom: 'none',
                        marginLeft: 2,
                        fontFamily: 'Poppins',
                        fontWeight: 600,
                        fontSize: 18,
                        "&:hover": {
                            background: '#fff'
                        }
                    }} />
                <Tab label='REVIEW'
                    sx={{
                        // background: '#dfe6e9',
                        border:'1px solid #dfe6e9',
                        borderBottom: 'none',
                        marginLeft: 2,
                        fontFamily: 'Poppins',
                        fontWeight: 600,
                        fontSize: 18,
                        "&:hover": {
                            background: '#fff',
                            borderBottom: 'none'
                        }
                    }}
                />
            </Tabs>
            <Divider/>
            {/* </AppBar> */}
            <TabPanel value={value} index={0}>
                <div className={classes.tab} >
                   {data.discription}
                </div>
            </TabPanel>
            <TabPanel value={value} index={1} >
                <div className={classes.tab}>
                    For Cakes & Flowers , we stand behind our guarantee for delivery on the day you want. For all other gifts, accurate delivery time will be calculated at checkout.
                    Delivery is Free for Order value of $250+, For orders less than that , accurate delivery charges will be calculated at checkout depending on location & product you are purchasing.
                </div>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <div className={classes.tab}>
                No reviews Yet
                </div>
            </TabPanel>
            </>:<>
               {AccordionTab ()}
              
            </>}
        </div>
    )
}