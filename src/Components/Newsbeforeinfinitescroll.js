import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
  
  static defaultProps = {
    conutry : 'in',
    pageSize : 5,
    category : 'general'
  }

  static propTypes = {
    conutry : PropTypes.string.isRequired,
    pageSize : PropTypes.number.isRequired,
    category : PropTypes.string.isRequired
  }

  constructor(){
    super();
    console.log("Hello I am a constructor from News Component")
    this.state = {
       articles : [],
       loading : false,
       page : 1
    }
  }

  async updateNews(){
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5b5dada58e4f4bc7bd20b7a9bddc396d&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    this.setState({loading : true})
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    this.setState({articles : parsedData.articles, 
      totalArticles : parsedData.totalResults ,
      loading:false})

  }

  async componentDidMount(){
   //console.log("cdm");
   //let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5b5dada58e4f4bc7bd20b7a9bddc396d&page=1&pagesize=${this.props.pageSize}`;
   //this.setState({loading : true})
   //let data = await fetch(url);
   //let parsedData = await data.json();
   //// console.log(parsedData);
   //this.setState({articles : parsedData.articles, 
   //  totalArticles : parsedData.totalResults ,
   //  loading:false})
   this.updateNews();
  }

  handlePreviousClick = async() =>{
    console.log("previous click")

    //let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5b5dada58e4f4bc7bd20b7a9bddc396d&page=${this.state.page - 1}&pagesize=${this.props.pageSize}`
    //this.setState({loading : true})
    //let data =  await fetch(url);
    //let parsedData = await data.json();
    //// console.log(parsedData);
    //this.setState({
    //  page : this.state.page-1,
    //  articles : parsedData.articles,
    //  loading : false
    //})
    this.setState({page : this.state.page-1})
    this.updateNews();
  }

  handleNextClick = async () =>{
      console.log("Next click")
      // we can calculate the no of pages by : totalArticles / pagesize; totalaricles are no of totalresults and pagesize is no of results on one page
      //below logic is if(page is greater than 35/20 then there's no next page don't do anything i.e. don't go on next page else go)
       //(this.state.page + 1 > Math.ceil(this.state.totalArticles/this.props.pageSize))
        // pagesize=20 means only 20 articles in one page ; 
        //let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5b5dada58e4f4bc7bd20b7a9bddc396d&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`
        //this.setState({loading : true})
        //let data = await fetch(url);
        //let parsedData = await data.json();
        //// console.log(parsedData);
        //this.setState({
        //  page: this.state.page + 1,
        //  articles : parsedData.articles,
        //  loading : false
        //})
        this.setState({page : this.state.page+1})
        this.updateNews();
  }

  render() {
    return (
      <div className='container my-3'>
        <h2 className='text-center my-4 '>NewsMonkey - Top {this.props.category} Headlines</h2>
            {/* if loading=true then show spinner */}
            {this.state.loading && <Spinner/>}  
            <div className="row">
                {/* if loading=false then show the data */}
              {!this.state.loading && this.state.articles.map((element) => {
                   //below we have to give a unique key -> here url for every element is unique
                 return <div className="col-md-4" key={element.url}> 
                <NewsItem title={element.title? element.title.slice(0,45): ""} description={element.description? element.description.slice(0,88): ""} 
                  imgurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                </div>
              })} 

            </div>
            <div className="container d-flex justify-content-between">
              <button  disabled={ this.state.page<=1 } className="btn btn-dark" onClick={this.handlePreviousClick}> &larr; Previous </button>
              <button  disabled={ this.state.page + 1 > Math.ceil(this.state.totalArticles/this.props.pageSize) } className="btn btn-dark" onClick={this.handleNextClick}> Next &rarr; </button>
          </div>
      </div>
    )
  }
}

export default News