let msg = document.getElementById("talk");
let mic = document.getElementById("mic");

const input = document.getElementById("input");
let chatareamain = document.querySelector('.chatarea-main');
let chatareaouter = document.querySelector('.chatarea-outer');
let voices = [];
    window.speechSynthesis.onvoiceschanged = function() {
      voices = window.speechSynthesis.getVoices();
      console.log(voices);
    };

let intro = ["Hello, I am Sage. Who are you ?"];
let help = ["How may i assist you?","How can i help you?","What i can do for you?"];
let greetings = ["I am good you little piece of love", "I am fine, what about you", "Don't want to talk", "I am good"];
let hobbies = ["I love to talk with humans", "i like to make friends like you", "i like cooking"];
let pizzas = ["which type of pizza do you like?", "i can make a pizza for you", "i would love to make a pizza for you", "would you like cheese pizza?"];
let thank = ["Most welcome","Not an issue","Its my pleasure","Mention not"];
let closing = ['Ok bye-bye','As you wish, bye take-care','Bye-bye, see you soon..'];
let last;

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

function showusermsg(usermsg){
    let output = '';
    output += `<div class="chatarea-inner user">${usermsg}</div>`;
    chatareaouter.innerHTML += output;
    return chatareaouter;
}

function showchatbotmsg(chatbotmsg){
    let output = '';
    output += `<div class="chatarea-inner chatbot">${chatbotmsg}</div>`;
    chatareaouter.innerHTML += output;
    return chatareaouter;
}
function chatbotvoice(message){
    const speech = new SpeechSynthesisUtterance();
    if(voices.length < 50 ){
        speech.voice = voices[2];

    }
    else{
        speech.voice = voices[29];

    }
    
    
    
    
    last = ["Sorry, Can you say that again?"];
    if(message.includes('sage') || message.includes('hi')){
        last = intro;
        
    }
    if(message.includes('fine')){
        last = help;
    }
    if(message.includes('how are you' || 'how are you doing today')){
        last = greetings;
    }
    if(message.includes('tell me something about you' || 'tell me something about your hobbies')){
        last = hobbies;
    }
    if(message.includes('pizza')){
        last = pizzas;
    }
    if(message.includes('thank you' || 'thank you so much')){
        last = thank;
    }
    if(message.includes('talk to you' || 'talk')){
        last = closing;
    }
    let finalresult = last[Math.floor(Math.random() * last.length)];
        speech.text = finalresult;
    
    if(voices.length == 0){
        var text = speech.text;
        responsiveVoice.speak(text, "US English Female");
    }else{
        window.speechSynthesis.speak(speech);

    }
    chatareamain.appendChild(showchatbotmsg(speech.text));
}

msg.addEventListener("submit", function(e){
    e.preventDefault();
    const input2 = input.value;
    showusermsg(input2);
    chatbotvoice(input2.toLowerCase());
    const chat = document.getElementById("chat");
    chat.scrollTo(0, chat.scrollHeight);
    input.value = "";
    
})

recognition.onresult=function(e){
    let resultIndex = e.resultIndex;
    let transcript = e.results[resultIndex][0].transcript;
    chatareamain.appendChild(showusermsg(transcript));
    chatbotvoice(transcript.toLowerCase());
    console.log(transcript);
}
recognition.onend=function(){
    mic.style.color="#ff3b3b";
}
mic.addEventListener("click", function(){
    mic.style.color='#39c81f';
    recognition.start();
    console.log("Activated");
})
