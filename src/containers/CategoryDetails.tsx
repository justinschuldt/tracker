import React from 'react'
import { RouteComponentProps } from "react-router-dom"


const CategoryDetails = (props: RouteComponentProps<{id:string}>) => {
    console.log(props.match.params.id)
    return (
        <h1>Category details container</h1>
    )
}
export default CategoryDetails
