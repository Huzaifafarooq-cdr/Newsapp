import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'





export class News extends Component {

    capitalized = (string) => {

        return string.charAt(0).toUpperCase() + string.slice(1);

    }

    static defaultProps = {
        country: 'in',
        pageSize: 5,
        category: 'Science'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    constructor(props) { 
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            
        }
        document.title = `${this.capitalized(this.props.category)} - NewsWala`;
    }




    async updateNews() {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ec4c5b13377c4ecdb179a5ea66319359&pageSize= ${this.props.pageSize}`;
        this.setState({ page: this.state.page + 1 });
        this.setState({ loading: true });
        let data = await fetch(url);
        let parseData = await data.json()
        this.setState({
            articles: parseData.articles,
            totalResults: parseData.totalResults,
            loading: false,

        })

    }


    async componentDidMount() {
        
        this.updateNews();
    }

    handlePrevClick=async()=>{
        this.setState({ page: this.state.page - 1 });
      this.updateNews();
     
    }

     handleNextClick=async()=>{
        this.setState({ page: this.state.page + 1 });
      this.updateNews();
      
     
    }



 


render() {
    return (
        <div className="container my-3">

            <h2 className="text-center" style={{ margin: '35px 0px', marginTop:'90px' }}>NewsWala-Top {this.capitalized(this.props.category)} Headlines</h2>
            {this.state.loading && <Spinner />} 

            
                

                    <div className="row">
                        {!this.state.loading &&this.state.articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>

                        })}


                    </div>
                
            

             <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next&rarr;</button>

                </div> 
        </div>
    )
}
}

export default News
