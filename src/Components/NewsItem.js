//eslint-disable-next-line
import { getByTitle } from "@testing-library/react";
import React from "react";

const NewsItem = (props) => {
  let { title, description,imgurl,newsurl,author,date,source } = props;

    return (
      <div className="my-3">
        <div className="card">
          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left : '90%', zIndex : '1'}}>{source}</span>
          {/* we've used ternary below coz if imgurl=true then show the img otherwise if img=null/something show the img in the given url */}
          <img src= { imgurl ? imgurl  : "https://c.ndtvimg.com/2023-03/sgm9d7mo_ms-dhoni_650x300_28_March_23.jpg" } className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title"> {title}... </h5>
            <p className="card-text"> {description}... </p>
            <p className="card-text"><small className="text-muted">By {author ? author : "Unknown"} on {new Date(date).toGMTString()}</small></p>
            <a href={newsurl} target="_blank" rel='noreferrer' className="btn btn-sm btn-dark"> Read More </a>
          </div>
        </div>
      </div>
    );
}

export default NewsItem;
