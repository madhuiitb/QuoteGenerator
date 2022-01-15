const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const prevQuoteBtn = document.getElementById('prev-quote');
const newQuoteBtn = document.getElementById('new-quote');
const nextQuoteBtn = document.getElementById('next-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];
let indexQuote=0; 
let quote = "";
//Show Loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//Show  Previous Quote
function prevQuote(){
    loading();
    
    indexQuote = indexQuote - 1;
  //  console.log(indexQuote);
    quote = apiQuotes[indexQuote];
    quoteAlignment();
    complete();
}



//Show  New Quote
function newQuote(){
    loading();
    //Pick a Randow Quote from apiQuotes array
    indexQuote = Math.floor(Math.random()*apiQuotes.length);
  //  console.log(indexQuote);
    quote = apiQuotes[indexQuote];
   // console.log(quote);
   // Check if author field is blank and replace it with unknown
   quoteAlignment();
   complete();
}

//Show  Next Quote
function nextQuote(){
    loading();
    indexQuote = indexQuote + 1;
   // console.log(indexQuote);
    quote = apiQuotes[indexQuote];
    quoteAlignment();
    complete();
}

function quoteAlignment(){
    if(!quote.author){
        authorText.textContent = 'Unknown';
    }else{
     authorText.textContent = quote.author;
    }
 
    //Check Quote  length to determine styling
    if(quote.text.length >120){
        quoteText.classList.add('long-quote');
    }else{
     quoteText.classList.remove('long-quote');
    }
    // Set Quote, Hide Loader
    quoteText.textContent = quote.text;
}

// Get Quotes FROM API
async function getQuotes(){
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const respone = await fetch(apiUrl);
        apiQuotes = await respone.json();
       // console.log(apiQuotes[12]);
       newQuote();
    } catch (error) {
        // Catch Error here
    }
}

//Tweet a Quote
function TweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//Event Listeners for previous, new/random, next quotes
prevQuoteBtn.addEventListener('click', prevQuote);
newQuoteBtn.addEventListener('click', newQuote);
nextQuoteBtn.addEventListener('click', nextQuote);
//On Load
getQuotes();