import "../views/resultView"
import "../../css/style.css"
import * as utils from '../utils'
import {historyRouterPush} from '../../router';
const mainAppDiv = document.querySelector('#main-app');

//재시작 버튼
const restart = document.querySelector('.restart');
const buttonEvent = ()=>{
    console.log("button RESULT");
    historyRouterPush('/',mainAppDiv,'restart');
}

//점수 및 평균 시간 출력
const score = document.querySelector('.score-result')
utils.renderElement(score,history.state != null ? history.state.data.score : 0)

const timeAvg = document.querySelector('.timeAvg');
utils.renderElement(timeAvg,history.state != null? history.state.data.timeAvg.toFixed(2) : 0)

restart.addEventListener('click',buttonEvent);

