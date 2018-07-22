import React from 'react'

import Wrap from '../../hoc/Wrap'
import classes from './Layout.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'

const layout = ( props ) => (
    <Wrap>
        <Toolbar />
        <main className={classes.content}>
            {props.children}
        </main>
    </Wrap>
)

export default layout; 