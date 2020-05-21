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
    if(number == '0'){//避免出現012
        number = ''; //如果是0 就清空再重新加入
        number +=str
    }else{
        number +=str
    }
    updateShow(number);
}

//刪除
function del(){
    if(number.length<=1){ //避免開頭0被消除 變成空白
        number = '0'
    }else{//刪除最後一個數字
        number = number.slice(0,number.length -1);
    }
    if(arr.length <= 1){ //避免store開頭的0被刪除
        arr=['0']
    }else{
        arr =arr.splice(0,arr.length -1);//刪除陣列最後一個字
    }
    updateShow(number);
    updateStore(arr);
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
    updateShow(answer)//改用別的參數 避免按下=又將參數推數
}
//替代eval
function evalFn(obj){
    // return Function('return (' + obj + ')')();
    return Function(`return (${obj})`)()
}
//儲存store 
function storeNumber(){
    if(number !=''){ //避免空值加入陣列
        arr.push(number);
        number = '';
    }
    updateShow(number)
}
//增加小數點
function addPoint(){
    if(number ==''){//避免.0
        number ='0.'
    }else if(!number.includes('.')){//沒有.就加入 有.就不加入 避免0...
        number+='.'
    }
    updateShow(number)
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
    updateStore(arr)
}
//更新畫面 store
function updateStore(){
    store.textContent = addComma(arr.join(''));
}
//更新畫面 show
function updateShow(number){
    show.textContent =addComma(number)
}
function addComma(num) {
    var parts = num.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
}
