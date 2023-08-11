import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalReslts : 0,
    };
    document.title = `${this.upperCase(this.props.goNews)} - GoNews`;
  }

  async componentDidMount() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=77e8d7e099c1470cbd084478b2520a69&page=1&pagesize=12`;
    // this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    // this.props.setProgress(80);
    this.setState({
      articles: parsedData.articles,
      totalReslts: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

   fetchData = async() => {
    this.setState({page: this.state.page + 1,});
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=77e8d7e099c1470cbd084478b2520a69&page=${this.state.page+1}&pagesize=12`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalReslts: parsedData.totalResults,
      loading: false,
     
    })
    
  }

  // pagePlus = async () => {
  //   let url = `https://newsapi.org/v2/top-headlines?country=${
  //     this.props.country
  //   }&category=${
  //     this.props.category
  //   }&apiKey=77e8d7e099c1470cbd084478b2520a69&page=${
  //     this.state.page + 1
  //   }&pagesize=12`;

  //   this.setState({ loading: true });
  //   let data = await fetch(url);
  //   let parsedData = await data.json();

  //   this.setState({
  //     articles: parsedData.articles,
  //     page: this.state.page + 1,
  //     loading: false,
  //   });
  // };

  // pageMinus = async () => {
  //   let url = `https://newsapi.org/v2/top-headlines?country=${
  //     this.props.country
  //   }&category=${
  //     this.props.category
  //   }&apiKey=77e8d7e099c1470cbd084478b2520a69&page=${
  //     this.state.page - 1
  //   }&pagesize=12`;
  //   this.setState({ loading: true });
  //   let data = await fetch(url);
  //   let parsedData = await data.json();

  //   this.setState({
  //     articles: parsedData.articles,
  //     page: this.state.page - 1,
  //     loading: false,
  //   });
  // };

  upperCase = (text) => {
    if (typeof text === "string") {
      let lower = text.toLowerCase();
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return "";
  };

  render() {
    let { mode } = this.props;
    return (
      <>

        <h1 className="text-center"  style={{marginTop : '90px',}}>
          GoNews - {this.upperCase(this.props.goNews)} News
        </h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
        style={{overflow : 'hidden'}}
          dataLength={this.state.articles.length} //This is important field to render the next data
          next={this.fetchData}
          hasMore={this.state.articles.length !== this.state.totalReslts}
          loader={
            <h3>
              <Spinner />
            </h3>
          }
        >
          <div className="container">
          <div className="row">
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-3 my-3 " key={element.url}>
                  <NewsItem
                    title={element.title}
                    date={element.publishedAt}
                    description={
                      element.description
                        ? element.description
                        : "Sorry! Unable to find any description for this news."
                    }
                    source={element.source.name}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    mode={mode}
                  />
                </div>
              );
            })}
          </div>
          </div>
        </InfiniteScroll>
      

      </>
    );
  }
}

export default News;


  // {/* <div
  //         className={`d-flex justify-content-between  btn-${
  //           mode === "dark" ? "light" : "dark"
  //         }`}
  //       >
  //         <button
  //           disabled={this.state.page <= 1}
  //           type="button"
  //           onClick={this.pageMinus}
  //           className={`btn btn-primary btn-${
  //             mode === "dark" ? "light" : "dark"
  //           }`}
  //         >
  //           &laquo; Previous
  //         </button>
  //         <button
  //           disabled={
  //             this.state.page + 1 > Math.ceil(this.state.totalReslts / 12)
  //           }
  //           type="button"
  //           onClick={this.pagePlus}
  //           className={`btn btn-primary btn-${
  //             mode === "dark" ? "light" : "dark"
  //           }`}
  //         >
  //           Next &raquo;
  //         </button>
  //       </div> */}

  // {/* {this.state.loading && <Spinner />} */}  
      // {/* <div className="container my-5"> */}      {/* </div> */}