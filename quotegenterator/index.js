// Get Quote from api
const quoteContainer = document.getElementById('quote-container');
const quote = document.getElementById('quote');
const author = document.getElementById('author');
const btnTwitter = document.getElementById('twitter');
const btnNewQuote = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function loading(){
  loader.hidden = false;
  quoteContainer.hidden = true;

}

function complete(){
  if(!loader.hidden){
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

async function getQuote(){
  loading();
  // const proxyUrl ='https://cors-anywhere.herokuapp.com/corsdemo';
  const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  try{
    const response = await fetch(apiUrl);
    const data = await response.json();

    if(data.quoteText === " "){
      quote.innerText = "We are trying to find new quotes for you";
    }else{
      quote.innerText = data.quoteText;
    }
    if(data.quoteAuthor === ""){
      author.innerText= "UnKnown Author";
    }else{
        author.innerText = data.quoteAuthor;
    }

    if(data.quoteText.length > 50){
      quote.classList.add('.long-quote');
    }else{
      quote.classList.remove('.long-quote');
    }
    complete();
  }catch(err){
    getQuote();
    console.log("Sorry no quote",err);
  }

   // fetch(proxyUrl + apiUrl)
   //              .then(response => response.json())
   //              .then(data => console.log(data))
   //              .catch(err=>console.log("woops not working", err));
}

const tweetQuote=()=>{
  const twittQuote = quote.innerText;
  const twittAuthor = author.innerText;
  const twitterUrl =`https://twitter.com/intent/tweet?text=${twittQuote} - ${twittAuthor}`;
  window.open(twitterUrl,'_blank');
}

btnTwitter.addEventListener('click',tweetQuote);
btnNewQuote.addEventListener('click',getQuote);



getQuote();
