import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {

    let { title, description , imageUrl , newsUrl , mode , date , source } = this.props;

    return (

      <div>
      
        <div className={`card my-3 bg-${mode} text-${mode==='dark'?'light' : 'dark'} `} >
        <span className={`position-absolute top-0 translate-middle badge rounded-pill bg-${mode==='light'?'dark' : 'light'} text-${mode}`} style={{
          left:'50%',
zIndex : 1,
        }}>
    
          {source}
   
  </span>
          <img src={imageUrl?imageUrl : "https://shmector.com/_ph/18/412122157.png" } className="card-img-top" alt="..." />

          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{new Date(date).toGMTString()}</p>
            <p className="card-text">{description}</p>
            <a href={newsUrl} target='blank' className={`btn btn-sm btn-${mode==='dark'?'light':'dark'}`}>Read More</a>
          </div>
        </div>

      </div>

    )
  }
}

export default NewsItem