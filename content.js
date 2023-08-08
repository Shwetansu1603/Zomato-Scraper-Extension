// Function to scrape the data from the web page
function scrapeData() {
  const trackerDivs = Array.from(document.querySelectorAll('div.jumbo-tracker'));

  if (trackerDivs.length === 0) {
    return null;
  }

  const data = trackerDivs.map((trackerDiv) => {
    const aTags = Array.from(trackerDiv.querySelectorAll('a'));

    if (aTags.length >= 2) {
      const secondATag = aTags[1];

      const firstDiv = secondATag.querySelector('div');
      const h4Tag = firstDiv?.querySelector('h4');
      const restaurantName = h4Tag ? h4Tag.textContent.trim() : 'N/A';

      const pTags = Array.from(secondATag.querySelectorAll('p'));
      const typeOfRestaurant = pTags[0]?.textContent.trim() || 'N/A';
      const cost = pTags[1]?.textContent.trim() || 'N/A';
      const location = pTags[2]?.textContent.trim() || 'N/A';

      const ratingsDiv = trackerDiv.querySelector('div.sc-1q7bklc-1.cILgox');
      const ratings = ratingsDiv ? ratingsDiv.textContent.trim() : 'N/A';

      return {
        'Name': restaurantName,
        'Type of Restaurant': typeOfRestaurant,
        'Cost': cost,
        'Location': location,
        'Ratings': ratings,
      };
    }

    return null;
  }).filter(Boolean);

  return data;
}

// Send the scraped data to the popup script
chrome.runtime.sendMessage({ data: scrapeData() });





