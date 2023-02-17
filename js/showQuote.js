const showQuote = options => {
  const changeQuoteBtn = document.querySelector('.change-quote');
  const quoteTextField = document.querySelector('.quote');
  const quoteAuthorField = document.querySelector('.author');

  const {language, anonimValue} = options;
  let isLoading = false;

  const setQuote = ({quoteText, quoteAuthor}) => {
    quoteTextField.textContent = quoteText;
    quoteAuthorField.textContent = quoteAuthor || anonimValue;
  };

  const getQuote = async function(language) {
    const getApiUrl = language => `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=${language}`;

    const fetchQuote = async function(url) {
      const resp = await fetch(url);
      const data = await resp.json();
      return data;
    };

    const getSavedQuote = async function(language) {
      const url = `./js/data/quotes_${language}.json`;
      const quote = await fetchQuote(url);
      return quote[Math.floor(Math.random() * quote.length)];
    };

    const translate = async function(text) {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=ru&tl=uk&dt=t&q=${encodeURI(text)}`;
      const resp = await fetch(url);
      const data = await resp.json();
      return data[0][0][0];
    };

    try {
      isLoading = true;
      if (language === 'uk') {
        const quote = await fetchQuote(getApiUrl('ru'));
        const quoteText = await translate(quote.quoteText);
        const quoteAuthor = quote.quoteAuthor ? await translate(quote.quoteAuthor) : '';
        return {quoteText, quoteAuthor};
      } else {
        const quote = await fetchQuote(getApiUrl(language));
        return quote;
      }
    } catch(e) {
      console.log(e);
      const quote = await getSavedQuote(language);
      return quote;
    } finally {
      isLoading = false;
    }
  };

  getQuote(language).then(setQuote);

  changeQuoteBtn.addEventListener('click', () => {
    if (!isLoading) getQuote(language).then(setQuote);
  });
};

export default showQuote;