const nextButton = document.querySelector('.btn-next');
const prevButton = document.querySelector('.btn-prev');
const submitButton = document.querySelector('.btn-submit');
const printButton = document.querySelector('.btn-print');
const streamCount = document.getElementById('streamCount')
const steps = document.querySelectorAll('.step');
const form_steps = document.querySelectorAll('.form-step');
const forgot = document.getElementById('forgot');
const stepbtns = document.querySelectorAll('.btn-steps');
const logos = document.querySelectorAll('#formgraphics');
const progress = document.getElementsByClassName('progress');
const pdfTitle = document.getElementById('pdfTitle');
const company = document.getElementById('company')
const dividers = document.querySelectorAll('.solid')
const inputs = document.querySelectorAll('.save')
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1; // Months are zero-based
const day = currentDate.getDate();

function loadCookies(){
  for(let i = 0; i < inputs.length; i++){
    console.log(window.localStorage.getItem(i));
    inputs[i].value = window.localStorage.getItem(i)
  }

  //window.localStorage.clear();
}
loadCookies();
maxStreams = 0;
maxStreamsInt = 0;
let active = 1;
addEventListener("beforeprint", () => {
  printButton.style.display = "none";
  prevButton.style.display = "none";
  for(let i = 0; i < dividers.length; i++){
    dividers[i].style.display = "block";
  }
});
addEventListener("afterprint", () => {
  printButton.style.display = "inline-block";
  prevButton.style.display = "inline-block";
  for(let i = 0; i < dividers.length; i++){
    dividers[i].style.display = "none";
  }
});
printButton.addEventListener('click', () =>{
  pdfTitle.textContent = "Company-" + company.value + " Date-" + `${day}-${month}-${year}`; 
  print();
});

for(let i = 0; i < 7; i++){
 
  stepbtns[i].addEventListener('click', () => {
    updateProgress();
    if(i == 6 && noAccessToStream == true){
    }
    else{
      active = i+1;
      updateProgress();
    }
    
  })
}
//Check for whether the user has selected a number of streams or not, 
//if they have not then we do not let the user progress to the next step
nextButton.addEventListener('click', () => {
  active++;
  if (active > steps.length) {
    active = steps.length;
  }
  updateProgress();
});
prevButton.addEventListener('click', () => {
  active--;
  if (active < 1) {
    active = 1;
  }
  updateProgress();
});
//Setting up for nice print without clutter
submitButton.addEventListener('click', () => {
  submitButton.disabled = true;
  checkSubmit();
  nextButton.style.display = "none";
  progress[0].style.display = "none";
  forgot.style.display = "none";
  
  for(let i = 0; i < maxStreams; i++){
      logos[i].style.display = "none";
      steps[i].classList.add('active');
      form_steps[i].classList.add('active');
  }
  printButton.style.display = "inline-block";
});


function checkSubmit(){
  if(submitButton.disabled == true){
    nextButton.style.display = "inline-block";
    submitButton.style.display = "none";
  }
  else{
    nextButton.style.display = "none";
    submitButton.style.display = "inline-block";
  }
}
const updateProgress = () => {
  for(let i = 0; i < inputs.length; i++){
    console.log("Saving" + inputs[i].value);
    window.localStorage.setItem(i, inputs[i].value);
  }


  
  for(let i = 0; i < dividers.length; i++){
    dividers[i].style.display = "none";
  }
  printButton.style.display = "none";
  progress[0].style.display = "inline-block";
  for(let i = 0; i < maxStreams; i++){
    logos[i].style.display = "inline-block";
  }
  forgot.style.display = "none";
  maxStreamsInt = parseInt(streamCount.value)
  if(isNaN(maxStreamsInt) || maxStreamsInt == 0 || maxStreamsInt > 6 ){
    maxStreamsInt = 0;
    noAccessToStream = true;
  }

  else{
    noAccessToStream = false;
  }
  //On page 6 we check if they selected streams,
  //Max Stream pages shown calculated here
  if(active == 6){
      maxStreams = 6 + maxStreamsInt;
  }
  //Same thing, in case they skip straight to 7
  //so we know how many to display
  if(active == 7){
    maxStreams = 6 + maxStreamsInt;
  }
  //Color in circles behind current one to simulate progress
  for (let i = 0; i < active -1; i++){
    steps[i].classList.add('behindactive');
    form_steps[i].classList.add('behindactive')
  }
  for(let i = active; i < steps.length; i++){
    steps[i].classList.remove('behindactive');
    form_steps[i].classList.remove('behindactive')
  }
  //Handling active page, what step to show:
  steps.forEach((steps, i) => {
    if (i == (active - 1)) {
      steps.classList.add('active');
      form_steps[i].classList.add('active');
    } else {
      steps.classList.remove('active');
      form_steps[i].classList.remove('active');
    }
  });
  //enable or disable prev and next buttons
  // and forgot stream message
  if (active === 1) {
    prevButton.disabled = true;
    nextButton.disabled = false;
    submitButton.disabled = true;
    
  }
  if (active === maxStreams) {
    if(active == 6){
      forgot.style.display = "inline-block";
    }
    
    nextButton.disabled = true;
    prevButton.disabled = false;
    submitButton.disabled = false;
  }
  else {
    submitButton.disabled = true;
    prevButton.disabled = false;
    nextButton.disabled = false;
  }
  checkSubmit();
}
updateProgress();
