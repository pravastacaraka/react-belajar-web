import React from 'react';
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";

export default (props) => {
  let path;
  let loc = [];
  return (
    <Breadcrumb>
      <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
      {
        props.locationPage.map((value, index) => {
          loc.push(value)
          loc.length === 1 ? path = "/c/" + loc[0] : path =  path + "/" + loc[index]
          return (
            <BreadcrumbItem key={index}>
              <Link to={ path.toLowerCase() }>{ value }</Link>
            </BreadcrumbItem>
          )
        })
      }
      <BreadcrumbItem active>{ props.activePage }</BreadcrumbItem>
    </Breadcrumb>
  )
}
