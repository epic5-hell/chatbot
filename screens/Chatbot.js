import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { Dialogflow_V2 } from 'react-native-dialogflow';
import { dialogflowConfig } from '../env'

const botAvatar = require('../assets/images/chatbot-data.png')

const BOT = {
    _id: 2,
    name: 'Mr.Bot',
    avatar: botAvatar
}
class Chatbot extends Component {

    state = {
        messages: [
        {_id: 2, text: 'My name is Mr.Bot', createdAt: new Date().getTime(), user: BOT},
        {_id: 1, text: 'Hi', createdAt: new Date().getTime(), user: BOT}
        ],
        id: 1,
        name: ''
    };

    componentDidMount(){
        Dialogflow_V2.setConfiguration(
        dialogflowConfig.client_email,
        dialogflowConfig.private_key,
        Dialogflow_V2.LANG_ENGLISH_US,
        dialogflowConfig.project_id,
        );
    }

    handleGoogleResponse(result){
        let text = result.queryResult.fulfillmentMessages[0].text.text[0];

        this.sendBotResponse(text);
    }

    async sendBotResponse(text){

    let msg;

    if(text == 'travel'){
        msg = {
            _id: this.state.messages.length + 1,
            text: 'Would you like to buy a plane ticket?', 
            createdAt: new Date().getTime(),
            user: BOT
        };
    } else if(text == 'show options') {
        msg = {
            _id: this.state.messages.length + 1,
            text: 'Please choose your destination', 
            createdAt: new Date().getTime(),
            user: BOT,
            quickReplies: {
            type: 'radio',
            keepIt: true,
            values: [
                {title: 'Thailand', value: 'Thailand'},
                {title: 'USA', value: 'USA'},
                {title: 'Japan', value: 'Japan'},
            ]}
        };
    } else if(text == 'bot') {
        msg = {
            _id: this.state.messages.length + 1,
            text: 'I am Bot. Call me Mr. Bot', 
            createdAt: new Date().getTime(),
            user: BOT
        };
    } else if(text == 'really bot') {
        msg = {
            _id: this.state.messages.length + 1,
            text: 'Yes, I am a really bot', 
            createdAt: new Date().getTime(),
            user: BOT
        };
    } else {
        msg = {
            _id: this.state.messages.length + 1,
            text,
            createdAt: new Date().getTime(),
            user: BOT
        };
        }

        this.setState((previousState) => ({
        messages: GiftedChat.append(previousState.messages, [msg])
        }));
    }

    onSend(messages = []){
        this.setState((previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages)
        }))

        let message = messages[0].text;

        Dialogflow_V2.requestQuery(
        message,
        (result) => this.handleGoogleResponse(result),
        (error) => console.log(error)
        )
    }

    onQuickReply(quickReply){
        this.setState((previousState) => ({
        messages: GiftedChat.append(previousState.messages, quickReply)
        }))

        let message = quickReply[0].value;

        Dialogflow_V2.requestQuery(
        message,
        (result) => this.handleGoogleResponse(result),
        (error) => console.log(error)
        )
    }

    renderBubble = (props) => {
        return (<Bubble {...props}/>)
    }

    render(){
        return (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
            <GiftedChat
            messages={this.state.messages} 
            onSend={(message) => this.onSend(message)} 
            onQuickReply={(quickReply) => this.onQuickReply(quickReply)}
            renderBubble={this.renderBubble}
            user={{_id: 1}} />
        </View>
        );
    }
}

export default Chatbot;