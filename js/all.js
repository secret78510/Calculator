const store = document.querySelector('.calculator-store');
const show = document.querySelector('.calculator-show');
const keyboard = document.querySelector('.calculator-keyboard');
let arr = [];//儲存數字運算符
let number = '';//紀錄數字
keyboard.addEventListener('click', enterKeyboard);

init()//初始化
//根據對應的案件觸發function
function enterKeyboard(e) {
    let str = e.target.textContent;
    if (str.length <= 2) {//因為ac長度
        switch (str) {
            case '+':
            case '-':
            case 'x':
            case '÷':
                storeNumber(str)
                updateOperation(str)
                break;
            case '.':
                addPoint()
                break;
            case 'AC':
                init()
                break
            case '⌫':
                del()
                break;
            case '=':
                evalNumber()
                break;
            default:
                showNumber(str)
                break
        }
    }
}
//顯示
function showNumber(str){
    if(number == '0'){
        number = '';
        number +=str
    }else{
        number +=str
    }
    show.textContent = addComma(number);
}

//刪除
function del(){
    if(number.length<=1){
        number = '0'
    }else{
        number = number.slice(0 ,number.length -1);
    }
    if(arr.length <= 1){
        arr=['0']
    }else{
        arr =arr.splice(-1, 1);
    }
    show.textContent = number;
    store.textContent =arr.join('');
}
//AC 歸零
function init(){
    number = '0';
    arr =[];
    show.textContent = '0';
    store.textContent ='0';
}
//運算
function evalNumber(){
    storeNumber(); //將show送入陣列
    let calc= evalFn(arr.join(''));//避免浮數點
    let str= parseFloat(calc.toPrecision(12));
    let answer= parseFloat(str);
    show.textContent = addComma(answer);//改用別的參數 避免按下=又將參數推數
}
//替代eval
function evalFn(obj){
    // return Function('return (' + obj + ')')();
    return Function(`return (${obj})`)()
}
//儲存store 
function storeNumber(){
    if(number !=''){
        arr.push(number);
        number = '';
    }
    show.textContent =addComma(number);
}
//增加小數點
function addPoint(){
    if(number ==''){//避免.0
        number ='0.'
    }else if(!number.includes('.')){//避免0.....重複
        number+='.'
    }
    show.textContent =addComma(number);
}
//運算符號更新
function updateOperation(str){
    let arrlast = arr[arr.length-1];
    if(isNaN(arrlast)){
        arr.pop()   //運算符號互相碰撞就移除 避免重複顯示
    }
    if(str =='x'){ //將運算符號替換eval()才能運算
        arr.push('*')
    }else if(str == '÷'){
        arr.push('/')
    }else{
        arr.push(str)
    }
    store.textContent = addComma(arr.join(''));
}
//更新畫面
function updateView(){
    store.textContent = addComma(arr.join(''));
    
}
function addComma(num) {
    var parts = num.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
}
