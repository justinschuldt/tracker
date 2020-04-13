import React from 'react'
import { Typography } from 'antd'
import { Link } from 'react-router-dom'
const { Title } = Typography

export const About = () => {
    const larger = {
        style:{
            fontSize: '1.2rem'
        }
    }
    return (
        <div style={{marginTop: '8px'}}>
            <div className="indent" >
                <Typography>
                    <Title level={2}>simple habit tracking</Title>
                        <ul style={{listStyle: 'none'}}>
                            <li><span {...larger}>🔒</span> your data never leaves this device</li>
                            <li>
                                <span {...larger}>⚙</span>
                                    codebase is open source (
                                        <a href="https://github.com/justinschuldt/tracker/" target="_blank">
                                            github
                                    </a>)
                            </li>
                            <li><span {...larger}>🕊</span> export your data as spreadsheet or json</li>
                        </ul>
                </Typography>
            </div>
            <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center' }}>
                {/* show a link to series-details, incase an existing user ends up here */}
                <Link to={`/series-details/`} >Go to data</Link>
            </div>

    </div>
    )
}