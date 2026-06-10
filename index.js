const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]") ;

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const dataMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#Symbols");
const extrapart = document.querySelector(".extrapart");
const  circle = document.querySelector(".circle");
const generateBtn = document.querySelector(".generate button");
const allCheckBox = document.querySelectorAll("input[type='checkbox']");
const symbols = '! @ # $ % ^ & * ( ) - _ = + [ ], { }  , . < > / ? \ | ` ~ ! @ # $ % ^ & * ( ) ';

let password = " ";
let passwordLength = 10;
let checkCount = 0;
handleSlider();
// set password length
function handleSlider(){
   inputSlider.value = passwordLength;
   lengthDisplay.innerText = passwordLength;
   const min = Number(inputSlider.min);
   const max = Number(inputSlider.max);
   inputSlider.style.backgroundSize = ((passwordLength-min)*100/(max-min)) + "% 100%";

}

function setPart(color){
   console.log(circle);
   circle.style.backgroundColor = color;
   parent.style.boxShadow = `0px 0px 12px 1px ${color}`;
  
}


function getRandamInteger(min,max)
{
return  Math.floor(Math.random()*(max-min)) +min;
}

function generateRandamNumbers(){
   return getRandamInteger(0,9);
}

function generateRandamUpperCase(){
   return String.fromCharCode(getRandamInteger(65,90));

}

function generateRandamLowerCase(){
   return String.fromCharCode (getRandamInteger(97,123));
}

function generateRandamSymbols(){
   const randNum = getRandamInteger (0,symbols.length);
   return symbols.charAt(randNum);
}

function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSymbols = false;
    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) hasLower = true;
    if(numbersCheck.checked) hasNumber = true;
    if(symbolsCheck.checked) hasSymbols = true;
    
    if(hasUpper && hasLower && (hasNumber && hasSymbols) && passwordLength>=8){
      setPart("#0f0");
    }
    else if(hasLower && hasUpper && (hasNumber|| hasSymbols) && passwordLength>=6){
      setPart("#ff0")
    }
    else{
      setPart("#f00");
    }
}

 async function copyContent(){ 
   try{
         await navigator.clipboard.writeText(passwordDisplay.value);
         dataMsg.innerText = "copied";
      } 

      catch{
         dataMsg.innerText = "failed";
      }

      dataMsg.classList.add("active");

      setTimeout(() => {
         dataMsg.classList.remove("active");
      }, 2000);
}

function shufflepassword(Array){
          for(let i = Array.length - 1; i>0; i--){
            const j = Math.floor(Math.random()*(i+1));
            const temp = Array[i];
            Array[i] = Array[j];
            Array[j] = temp;
          }
          let str = "";
          Array.forEach((e) => (str += e));
          return str;
}

inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target .value;
    handleSlider();
})

copyBtn.addEventListener('click',function(){
   if(passwordDisplay.value)
      copyContent();
})

function handleCheckBoxChange(){
   checkCount = 0;
   allCheckBox.forEach((checkbox)=>{
      if(checkbox.checked)
         checkCount++;
   })
}
// special function
if(passwordLength<checkCount){
    passwordLength=checkCount;
    handleSlider();
}


allCheckBox.forEach((checkbox) =>{
    checkbox.addEventListener('change',handleCheckBoxChange);
 }) 


 generateBtn.addEventListener('click',()=>{
    // none of the checkbox are selected
    if(checkCount <= 0) 
      return;

    if(passwordLength<checkCount){
      passwordLength = checkCount;
      handleSlider();
    }
    // let s start the journey to find new password
 console.log("Starting the Journey");
    // remove old password
   password = " ";
   // lets put the stuff mentioned by checkbox

   let funcArr = [];
    if(uppercaseCheck.checked)
      funcArr.push(generateRandamUpperCase);
    
     if(lowercaseCheck.checked){
      funcArr.push(generateRandamLowerCase);
    }
     if(numbersCheck.checked){
      funcArr.push(generateRandamNumbers);
    }
     if(symbolsCheck.checked){
   funcArr.push(generateRandamSymbols);
    }

    // compulsory addition
    for(let i = 0; i<funcArr.length; i++) {
      password += funcArr[i]();
    }

    console.log("Compulsory addition done");
    

    // remaining addition

    for(let i=0; i<passwordLength-funcArr.length; i++){
      let randIndex = getRandamInteger(0,funcArr.length);
      password += funcArr[randIndex]();
    } 

     console.log("remaining addition done");

    // shuffle the password
    password = shufflepassword(Array.from(password));
     console.log("shuffling done");
    // show in UI
    passwordDisplay.value = password;
     console.log("UI addition done");
   // calculate strength
   calcStrength();

 });




 












