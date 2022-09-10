import React, { Component } from 'react'
import { ScrollView, Text, Image, View, Button, FlatList, TouchableOpacity } from 'react-native'
import { Images } from '../Themes'
import { connect } from 'react-redux'
import PokemonActions from '../Redux/PokemonRedux'

// Styles
import styles from './Styles/HomeScrenStyles'
import { withNavigation } from 'react-navigation'


class HomeScreen extends Component {
  
  constructor(){
    super()
    this.state={
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
    this.props.pokemonRequest()
  }

  renderItem = ({item}) =>{
    const {navigation} = this.props
    return(
      <TouchableOpacity onPress={()=>navigation.navigate('DetailScreen', {name: item.name})}>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    )
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <Text>{this.state.errorMessage}</Text>
        <FlatList
          data={this.state.data}
          numColumns={1}
          scrollEnabled={false}
          renderItem={this.renderItem}
          keyExtractor={item => item.name} 
        />   
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  pokemonResponse: state.pokemon.pokemonResponse,
  pokemonError: state.pokemon.pokemonError
})

const mapDispatchToProps = (dispatch) => ({
  pokemonRequest: () => dispatch(PokemonActions.pokemonRequest())
})

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(HomeScreen))
