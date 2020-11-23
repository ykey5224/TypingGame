import * as utils from '../utils';
import {historyRouterPush} from '../../router';
const root = document.documentElement;
const wordInput = document.querySelector('.word-input');
const apiPATH = 'https://my-json-server.typicode.com/kakaopay-fe/resources/words';
const startButton = document.querySelector('.start-button');
const wordQuiz = document.querySelector('.word-quiz');
const timeElement = document.querySelector('.time');
const scoreElement = document.querySelector('.score');
let wordList = [];
let wordIdx = 0;
let score = 0;
let time = 0;
let timeInterval = null;
let isPlaying = false;
let wordListLength = 0;
let startTime =0;
let endTime = 0;
let passCount = 0;
let passTimeSum = 0;

//초기화 및 다시시작 활성
window.onload = () =>{
   if( history.state != null &&  history.state.data == 'restart'){
        buttonEvent();
    }   
    init();
}

//초기화
const init = () =>
{
    wordList = [];
    wordIdx = 0;
    score = 0;
    time = 0;
    timeInterval = null;
    isPlaying = false;
    wordListLength = 0;
    startTime =0;
    endTime = 0;
    passCount = 0;
    passTimeSum = 0;
}

//api 호출 및 game 진행
const getWord = async()=>{
    await fetch(apiPATH)
    .then(res => res.json())
    .then(res => wordList = res);
    playGame();
}

//game은 wordListLength개의 stage로 구성, stage 시작
const playGame = ()=>{
    console.log(`playgame`);
    isPlaying = true;
    wordListLength = wordList.length;
    score = wordListLength;
    utils.renderElement(scoreElement,score);
    playStage();
}

//wordListLength만큼 stage 진행
const playStage = () =>{
    if(wordIdx <wordListLength){
        const {text,second} = wordList[wordIdx++];
        utils.renderElement(wordQuiz,text);
        utils.renderElement(timeElement,second);
        time = second;
        timeInterval = setInterval(calcTime,1000);
    }
    else{
        clearInterval(timeInterval);
        const timeAvg = passCount > 0 ? passTimeSum/passCount/1000 : 0;
        const result = {score,timeAvg }
        historyRouterPush('/result',root,result,)
    }
}

//버튼 이벤트  시작/초기화
const buttonEvent = () =>{
    wordInput.disabled = false;
    wordInput.value = "";
    wordInput.focus();
    utils.renderElement(startButton,"초기화");
    if(!isPlaying){
        getWord();
        startTime = new Date().getTime();
    }else{
        historyRouterPush('/',root,'',)
    }
}

//잔여 시간 계산
const calcTime = () =>{
    time >1 ?  time-- : isPlaying = false;
    if(!isPlaying){
        isPlaying= true;
        startTime = new Date().getTime();
        utils.renderElement(scoreElement,--score);
        wordInput.value = "";
        wordInput.focus();
        clearInterval(timeInterval);
        playStage();
    }
    utils.renderElement(timeElement,time);
}

//input 엔터 입력 이벤트
const keypressEvent = (e)=>{
    if(e.key ==='Enter'){
        endTime = new Date().getTime();        
        if(wordInput.value === wordQuiz.innerHTML ){
            passCount++;
            passTimeSum += (endTime-startTime);
            clearInterval(timeInterval);
            playStage();
        }
        startTime = new Date().getTime();
        utils.renderElement(wordInput,"");
        wordInput.focus();
    }
}

startButton.addEventListener('click',buttonEvent);
wordInput.addEventListener('keypress',keypressEvent);

