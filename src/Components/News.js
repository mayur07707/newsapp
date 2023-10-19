import React, { useEffect,useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) =>  {

  const [articles,setarticles] = useState([])
  const [loading,setloading] = useState(true)
  const [page,setpage] = useState(1)
  const [totalResults,settotalResults] = useState(0)
  
  

  const updateNews = async()=> {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=5b5dada58e4f4bc7bd20b7a9bddc396d&page=${page}&pagesize=${props.pageSize}`;
    setloading(true);
    props.setProgress(10);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(50);
    // console.log(parsedData);
    setarticles(parsedData.articles)
    settotalResults(parsedData.totalResults)
    setloading(false)
    props.setProgress(100);
  }

  
  useEffect(() => {
    updateNews();
  }, [updateNews])
  
  //eslint-disable-next-line
  const handlePreviousClick = async() =>{
    console.log("previous click")

    //let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=5b5dada58e4f4bc7bd20b7a9bddc396d&page=${this.state.page - 1}&pagesize=${props.pageSize}`
    //this.setState({loading : true})
    //let data =  await fetch(url);
    //let parsedData = await data.json();
    //// console.log(parsedData);
    //this.setState({
    //  page : this.state.page-1,
    //  articles : parsedData.articles,
    //  loading : false
    //})
    setpage(page-1)
    updateNews();
  }

  //eslint-disable-next-line
  const handleNextClick = async () =>{
      console.log("Next click")
      // we can calculate the no of pages by : totalArticles / pagesize; totalaricles are no of totalresults and pagesize is no of results on one page
      //below logic is if(page is greater than 35/20 then there's no next page don't do anything i.e. don't go on next page else go)
       //(this.state.page + 1 > Math.ceil(this.state.totalArticles/props.pageSize))
        // pagesize=20 means only 20 articles in one page ; 
        //let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=5b5dada58e4f4bc7bd20b7a9bddc396d&page=${this.state.page + 1}&pagesize=${props.pageSize}`
        //this.setState({loading : true})
        //let data = await fetch(url);
        //let parsedData = await data.json();
        //// console.log(parsedData);
        //this.setState({
        //  page: this.state.page + 1,
        //  articles : parsedData.articles,
        //  loading : false
        //})
        setpage(page+1)
        updateNews();
  }

  const fetchMoreData = async() => {

    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=5b5dada58e4f4bc7bd20b7a9bddc396d&page=${page+1}&pagesize=${props.pageSize}`;
    setpage(page+1);
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    setarticles(articles.concat(parsedData.articles))
    settotalResults(parsedData.totalResults)

  }

  
    return (
      <>
        <h2 className='text-center ' style={{ margin: '35px 0px' , marginTop: '90px'}}>NewsMonkey - Top {props.category} Headlines</h2>
          {loading && <Spinner/>}
          <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length !== totalResults}
            loader={<Spinner/>}
          >
            <div className="container">

            
            <div className="row">
                {/* if loading=false then show the data */}
              {articles.map((element) => {
                   //below we have to give a unique key -> here url for every element is unique
                 return <div className="col-md-4" key={element.url}> 
                <NewsItem title={element.title? element.title.slice(0,45): ""} description={element.description? element.description.slice(0,88): ""} 
                  imgurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                </div>
              })} 

            </div>
            </div>
            </InfiniteScroll>
            {/* <div className="container d-flex justify-content-between"> */}
              {/* <button  disabled={ this.state.page<=1 } className="btn btn-dark" onClick={this.handlePreviousClick}> &larr; Previous </button> */}
              {/* <button  disabled={ this.state.page + 1 > Math.ceil(this.state.totalArticles/props.pageSize) } className="btn btn-dark" onClick={this.handleNextClick}> Next &rarr; </button> */}
            {/* </div> */}
      </>
    )
  }


News.defaultProps = {
  conutry : 'in',
  pageSize : 5,
  category : 'general'
}

News.propTypes = {
  conutry : PropTypes.string.isRequired,
  pageSize : PropTypes.number.isRequired,
  category : PropTypes.string.isRequired
}

export default News