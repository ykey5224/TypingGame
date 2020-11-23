//import * as utils from '../utils'
const wordInput = document.querySelector('.word-input');
const apiPATH = 'https://my-json-server.typicode.com/kakaopay-fe/resources/words'
const startButton = document.querySelector('.start-button');
const wordQuiz = document.querySelector('.word-quiz');
const timeElement = document.querySelector('.time');
const scoreElement = document.querySelector('.score');
const result = document.querySelector('.test-result');
let wordList = [{second: 3, text: "test01"}, {second: 3, text: "test02"},{second: 5, text: "test03"}];
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
let expect = "";

//초기화 및 다시시작 활성
window.onload = () =>{
    if( history.state != null &&  history.state.data == 'restart'){
         buttonEvent();
     }   
     init();
 }
//score 계산 및 평균 시간 계산 테스트
const doTest = async () =>{
    expect = "예상 점수 2점 , 예상 평균점수 2.5초 (2+3)/2"
    //1번 3번 문항 정답처리 (2초, 3초로 예상 평균시간 2.5초)
    //예상 점수 2점 , 예상 평균점수 2.5초

    //첫번째 stage 
    //정답 입력 및 소요시간 2초
    setTimeout(function(){
        wordInput.value="test01";
        const e = {key:"Enter"};
        keypressEvent(e);
        result.innerHTML = `점수 : ${score} / 평균시간 : ${passCount > 0 ? passTimeSum/passCount/1000 : 0}`
    },2000)

    //두번째 stage 
    //정답 입력하지않음
    // setTimeout(function(){
    //     wordInput.value="test01";
    //     const e = {key:"Enter"};
    //     keypressEvent(e);
    //     result.innerHTML = `점수 : ${score} / 평균시간 : ${passCount > 0 ? passTimeSum/passCount/1000 : 0}`
    // },2000)

    //세번째 stage 
    //정답 입력 및 소요시간 3초
    setTimeout(function(){
        wordInput.value="test03";
        const e = {key:"Enter"};
        keypressEvent(e);
        result.innerHTML = `점수 : ${score} / 평균시간 : ${passCount > 0 ? passTimeSum/passCount/1000 : 0}`
    },8000)
}

//초기화
const init = () =>
{
    //wordList = [];
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
    /*
    await fetch(apiPATH)
    .then(res => res.json())
    .then(res => wordList = res);
    */
    playGame();
    doTest();
}

//game은 wordListLength개의 stage로 구성, stage 시작
const playGame = ()=>{
    console.log(`playgame`);
    isPlaying = true;
    wordListLength = wordList.length;
    score = wordListLength;
    scoreElement.innerHTML = score;
    playStage();
}

//wordListLength만큼 stage 진행
const playStage =()=>{
    if(wordIdx <wordListLength){
        const {text,second} = wordList[wordIdx++];
        wordQuiz.innerHTML = text;
        timeElement.innerHTML = second;
        time = second;
        timeInterval = setInterval(calcTime,1000);
    }
    else{
        clearInterval(timeInterval);
        setCookie('score', score);
        const timeAvg = passCount > 0 ? passTimeSum/passCount/1000 : 0;
        setCookie('timeAvg',timeAvg.toFixed(2));
        const timeinfo = document.querySelector('.time-info');
        timeinfo.innerHTML = expect;
        //location.href="/result";
    }
}

//버튼 이벤트  시작/초기화
const buttonEvent = ()=>{
    wordInput.disabled = false;
    wordInput.value = "";
    wordInput.focus();
    startButton.innerHTML = "초기화"
    if(!isPlaying){
        getWord();
        startTime = new Date().getTime();
    }else{
       // location.href = "/"
       location.reload()
    }
}

//잔여 시간 계산
const calcTime = () =>{
    time >1 ?  time-- : isPlaying = false;
    if(!isPlaying){
        isPlaying= true;
        startTime = new Date().getTime();
        scoreElement.innerHTML = --score;
        clearInterval(timeInterval);
        playStage();
    }
    timeElement.innerHTML = time;
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
        wordInput.value = "";
        wordInput.focus();
    }
}

startButton.addEventListener('click',buttonEvent);
wordInput.addEventListener('keypress',keypressEvent);



const setCookie = (name, value, exp) => {
    var date = new Date();
    date.setTime(date.getTime() + exp*24*60*60*1000);
    document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
}

const getCookie = (name) => {
    var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value? value[2] : null;
  }

const deleteCookie = (name) =>{
      document.cookie = 'name =;expires=Thu, 01 Jan 1999 00:00:10 GMT;'; 
  }
