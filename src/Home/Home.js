import React, { Component } from 'react'
import Logo from './../assets/search.png'
import WorldLogo from './../assets/earth.png'
import './Home.scss'

export default class Home extends Component {
    state = {
        data: [],
        countryName: '',
        selectedCountry: [],
        checkValue: true
    }
        
    fetchPeople = () => {
        fetch("https://restcountries.eu/rest/v2/all")
        .then((response) => response.json())
        .then((data) => this.setState({data: data}));
    }

    onFocus = () => {
        this.fetchPeople();
        this.setState({checkValue: true})
    }

    onChangeHandler = (event) => {
        this.setState ({ countryName: event.target.value})
    }

    onClickHandler = (item) => {
        this.setState({
            selectedCountry: [item],
            checkValue: false
        })     
    }
    
    render() {
        return (
            <div className ="home">
                <div className="logo-and-title" >
                    <img src={WorldLogo} alt="logo" />
                    <h1 className="title">FIND<br/> COUNTRY</h1>
                </div>
                <input 
                    onFocus={this.onFocus} 
                    onChange={this.onChangeHandler} 
                    className="search-content" placeholder="search..." />

                {this.state.data.map(item =>
                    (item.name.includes(this.state.countryName) || 
                    (item.name.toLowerCase()).includes(this.state.countryName)) &&
                    this.state.countryName.length > 0 &&
                    this.state.checkValue === true ?
                        <div className="search-results">
                            <img className="search-logo" src={Logo} alt="logo"/>
                            <div className="one-country"
                                onClick={()=>this.onClickHandler(item)}>
                                {item.name}    
                            </div>
                        </div> : []
                )}  

                <div className="target-country">
                    {this.state.selectedCountry.map (item =>
                        <> 
                            <img src={item.flag} alt="flag" />
                            <div className="country-info" >
                                <b>COUNTRY NAME:</b> &nbsp; <i>{item.name} ({item.alpha2Code})</i><br/>
                                <b>CAPITAL:</b> &nbsp; <i>{item.capital}</i><br/>
                                <b>REGION:</b> &nbsp;  <i>{item.region}</i>
                            </div>
                        </>
                    )}
                </div>      
            </div>
        )
    }
}
