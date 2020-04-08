export const environment = {
  production: true,
  graphql: {
    url: 'https://api.weclimb.it/graphql',
  },
  rest: {
    url: 'https://api.weclimb.it/s',
  },
  i18n: {
    defaultLang: 'en',
    availableLangs: ['it', 'en'],
    availableLangsLabels: ['Italiano', 'English'],
  },
  mapbox: {
    // Don't worry, referrers are white-listed ;-)
    token: 'pk.eyJ1Ijoid2VjbGltYml0IiwiYSI6ImNrOGtlZ2lvdzAwdW8zZ25vbjUxbHIycnAifQ.lwM-V6-SoRqiTWLWMEWDzw',
    style: 'mapbox://styles/weclimbit/ck76qiur612ur1imof17kauyo',
  },
};
