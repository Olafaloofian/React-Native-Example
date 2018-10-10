import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

export default class App extends React.Component {
  state = {
    showImg: false,
    randomPic: '',
    randomFact: ''
  }

  handlePLay1 = async () => {

    const soundObject = new Expo.Audio.Sound();
      try {
        await soundObject.loadAsync(require('./assets/angrycat.wav'));
      { shouldPlay: true }
        this.audioPlayer1  = soundObject;
          this.audioPlayer1.playAsync();
          this.audioPlayer1.setPositionAsync(0);
          this.audioPlayer1.setRateAsync(3, false);
      // Your sound is playing!
      } catch (error) {
      // An error occurred!
      
      } 
  }

  getCatFact = () => {
    fetch('http://thecatapi.com/api/images/get?format=src&results_per_page=1') 
    .then(res => {
      this.setState({
        randomPic: {
          uri: `${res.url}`
        }
      })
      fetch('https://catfact.ninja/fact?limit=1')
        .then(res => res.json())
        .then(parsedRes => this.setState({ randomFact: parsedRes.fact }))
    })
    .catch(error => console.log('------------ error', error))
  }

  render() {
    let catPic = {
      uri: 'https://www.thesprucepets.com/thmb/7kVrWdBf13osb9nYJ-4D2yPAwfQ=/425x326/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-466792657-59cef0d6c412440010be728c.jpg'
    }
    let randomCat = !!this.state.randomPic && <Image source={this.state.randomPic} style={{width: 300, height: 200}} />
    let randomFact = !!this.state.randomFact && <Text style={styles.fact}>{this.state.randomFact}</Text>
    return (
      <View style={styles.container}>
        <Text style={styles.maintext}>Your one-stop app for everything cats!</Text>
        <Button style={styles.button} title='Meow!' onPress={() => this.handlePLay1()} />
        <Button style={styles.button} title={!this.state.showImg ? 'Show Cat Picture' : 'Hide Cat Picture'} onPress={() => this.setState({showImg: !this.state.showImg})} />
        {this.state.showImg && <Image source={catPic} style={{width: 300, height: 200}} />}
        <Button style={styles.button} title='Get Random Cat Picture' onPress={() => this.getCatFact()} />
        <View>{randomCat}</View>
        <View>{randomFact}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    marginBottom: 15,
    backgroundColor: 'red',
  }, 
  container: {
    flex: 1,
    backgroundColor: '#41f4a6',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  fact: {
    color: 'darkblue',
    fontSize: 21,
    textAlign: 'center',
  },
  maintext: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center'
  }
});