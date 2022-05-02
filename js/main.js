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
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

let last;

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
    for(var x = 0; x < Question.length; x++){
        var Ques = new Array;
        Ques = Question[x];
        var Ans = new Array;
        Ans = Answer[x];
    
        for(var i = 0 ; i< Ques.length; i++){
            var Ask = Ques[i];
            if (message.includes(Ask)){
                last = Ans;
                console.log(Ans);
            }
        }
        
    }

    let finalresult = last[Math.floor(Math.random() * last.length)];
        speech.text = finalresult;
    
    if(voices.length == 0){
        var text = speech.text;
        //responsiveVoice.speak(text, "US English Female");
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
