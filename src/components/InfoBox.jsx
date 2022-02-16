import React from 'react'
import './infoBox.css'

import { Card, CardContent, Typography } from '@material-ui/core'

const InfoBox = ({ title, total, active, isRed, cases, ...props }) => {
    if (active) {
        console.log("haaaa");
    }
    return (
        <div className="infobox">
            <Card onClick={props.onClick} className={`${active && "infobox--select"} `}>
                <CardContent>
                    <Typography className='infobox_title' color='textSecondary'>
                        {title}
                    </Typography>
                    <h2 className='infobox_cases'>{cases}</h2>
                    <Typography className='infobox_total' color='textSecondary'>
                        {total} - Total
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default InfoBox