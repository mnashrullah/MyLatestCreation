import React, { Component } from 'react'
import { ScrollView, Text, Image, View, Button, FlatList } from 'react-native'
import { Images } from '../Themes'
import { connect } from 'react-redux'
import PokemonActions from '../Redux/PokemonRedux'

// Styles
import styles from './Styles/DetailScreenStyles'
import { withNavigation } from 'react-navigation'


class DetailScreen extends Component {
  
  constructor(props){
    super(props)
    this.state={
      name: this.props.navigation.getParam('name', ''),
      data:[],
      errorMessage: ''
    }
  }

  componentDidUpdate(prevProps){
    if(prevProps.pokemonResponse !== this.props.pokemonResponse){
      console.log('componentDidUpdate',this.props.pokemonResponse)
      this.setState({data: this.props.pokemonResponse})
    }
    if(prevProps.pokemonError !== this.props.pokemonError){
      this.setState({errorMessage: this.props.pokemonError})
    }
  }

  componentDidMount(){
    this.props.pokemonDetailRequest()
  }

  renderItem = ({item}) =>{
    return(
      <Text>{'item.name'}</Text>
    )
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <Text>{this.state.name}</Text>
        <Text>{this.state.errorMessage}</Text>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  pokemonResponse: state.pokemon.pokemonResponse,
  pokemonError: state.pokemon.pokemonError
})

const mapDispatchToProps = (dispatch) => ({
  pokemonDetailRequest: (params) => dispatch(PokemonActions.pokemonDetailRequest(params))
})

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(DetailScreen))
