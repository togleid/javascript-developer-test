const { httpGet } = require('./mock-http-interface');

/**
 * @param {GetArnieQuotesInput} urls
 * @returns {ArnieQuoteResponse}
 */
const getArnieQuotes = async (urls) => {
  return Promise.all(
    urls.map( async url => {
      try {
        const result = await httpGet(url);
        if (result.status === 200){
          return {"Arnie Quote": JSON.parse(result.body).message};
        }else if (result.status === 500){
          return {"FAILURE": JSON.parse(result.body).message};
        }else{
          return {"FAILURE": "Unexpected status code"};
        }
      } catch ( error ){
        return {"FAILURE": error.message};
      }
    })
  );
};

module.exports = {
  getArnieQuotes,
};
