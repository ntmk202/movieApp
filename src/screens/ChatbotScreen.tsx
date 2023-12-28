import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { Component, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, FONTSIZE } from '../theme/theme'
import { LinearGradient } from 'expo-linear-gradient'
import { Bubble, Day, GiftedChat, MessageText, Time } from 'react-native-gifted-chat';
import { Dialogflow_V2 } from 'react-native-dialogflow'
import { dialogflowConfig } from '../../env'
import SubMovieCard from '../components/SubMovieCard'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'


interface ChatbotScreenState {
  messages: {
    _id: number;
    text: string;
    createdAt: Date;
    user: {
      _id: number;
      name: string;
      avatar: string; // Change the type based on your avatar data type
    };
  }[];
  id: number;
  name: string;
}   

interface DialogflowResult {
  queryResult: {
    fulfillmentMessages: {
      text: {
        text: string[];
      };
    }[];
  };
}

const BOT = {
  _id: 2,
  name: 'Mr.Bot',
  avatar: require('~/assets/icons/bot.png')
}

class ChatbotScreen extends Component<{}, ChatbotScreenState> {

  state = {
    messages: [
      {
        _id: 2,
        text: `How may I help you with today?`,
        createdAt: new Date(),
        user: BOT
      },
      {
        _id: 1,
        text: `Hi! I am the Mr.Bot.`,
        createdAt: new Date(),
        user: BOT
      }
    ],
    id: 1,
    name: '',
  };

  componentDidMount() {
    Dialogflow_V2.setConfiguration(
      dialogflowConfig.client_email,
      dialogflowConfig.private_key,
      Dialogflow_V2.LANG_ENGLISH_US,
      dialogflowConfig.project_id
    )
  }

  handleGoogleResponse(result) {
    // let typedResult = result as DialogflowResult;
    let text = result.queryResult.fulfillmentMessages[0].text.text[0];

    this.sendBotResponse(text)

  }

  sendBotResponse(text: string) {
    let msg: any;

    if (text == 'Here is some recommend') {
      msg = {
        _id: this.state.messages.length + 1,
        text: 'Here is some recommend',
        createdAt: new Date(),
        user: BOT,
        isOptions: true,
        data: [
          {
            title: 'Animal',
            image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQil3G4kH_ojUDuK4_W0RaqhpA_cAYLTO4Axj7za5HiR24vQstd',
          },
          {
            title: 'Wonka',
            image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSBDy4zhPNl66RocI1nkuUBh_Wxu3aJxcK0xy82NYOlMsNeVvo1',
          },
          {
            title: 'Trolls Band Together (2023)',
            image: 'https://movies.universalpictures.com/media/tbt-vivapoppy-poster-650284cab59a5-1.jpg',
          },
        ]
      };
    } else {
      msg = {
        _id: this.state.messages.length + 1,
        text,
        createdAt: new Date(),
        user: BOT,
      };
    }

    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, [msg]),
    }));
  }

  onSend(messages: any[] = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));

    let message = messages[0].text;

    Dialogflow_V2.requestQuery(
      message,
      (result) => this.handleGoogleResponse(result),
      (error) => console.log(error)
    )
  }

  onQuickReply(quickReply: any[]) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, quickReply)
    }));

    let message = quickReply[0].value;

    Dialogflow_V2.requestQuery(
      message,
      (result) => this.handleGoogleResponse(result),
      (error) => console.log(error)
    )
  }

  renderCustomBubble(props: any) {
    const { currentMessage } = props;

    if (props.currentMessage.isOptions){
      return (
        <ScrollView horizontal={true}>
          {props.currentMessage.data.map((item) => (
            <View key={item.title} style={{width: 150, height: 200, backgroundColor:COLORS.BlackRGB10, margin: 10, padding:5}}>
              <Image source={{uri: item.image}} style={{width: 140, height: 150}} resizeMode='cover' />
              <TouchableOpacity onPress={() => this.sendBotResponse(item.title)}>
                <Text style={{color: 'white', textAlign:'center', marginTop: 14}}>{item.title}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )
    }
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: COLORS.BlackRGB10,
            padding: 5
          },
          right: {
            backgroundColor: COLORS.BlackRGB10,
            padding: 5
          },
        }}
      >
        <Text style={{ color: 'white' }}>{currentMessage.text}</Text>
      </Bubble>
    );
  }

  renderDay(props: any) {
    const { currentMessage } = props;
    return (
      <Day
        {...props}
        textStyle={{
          color: 'white', // Set the desired text color for the day separator
        }}
      />
    );
  }

  renderMessageText(props: any) {
    const { currentMessage } = props;
    return (
      <MessageText
        {...props}
        textStyle={{
          right: {
            color: 'white',
          },
          left: {
            color: 'white',
          },
        }}
      />
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient style={{ flex: 1 }} colors={[COLORS.DarkGrey, COLORS.Orange, COLORS.DarkGrey]}>
          <GiftedChat
            messages={this.state.messages}
            messagesContainerStyle={{
              paddingTop: 10,
              paddingLeft: 5,
              paddingRight: 5,
              paddingBottom: 20
            }}
            renderBubble={(props) => this.renderCustomBubble(props)}
            renderDay={(props) => this.renderDay(props)}
            renderMessageText={(props) => this.renderMessageText(props)}
            onSend={message => this.onSend(message)}
            onQuickReply={quickReply => this.onQuickReply(quickReply)}
            user={{ _id: 1 }}
          />
        </LinearGradient>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.DarkGrey,
    paddingBottom: 20
  }
})

export default ChatbotScreen