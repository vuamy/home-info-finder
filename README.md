# Home Information Finder

## Overview
Simple program that accepts a home address as input and retrives property information such as an property details, nearby schools, and neighborhood features. Utilizes OpenAI and Google APIs.

### Built With

<table>
<tr><td>

| Tech Stack |
| ----- | 
| [React](https://react.dev/) |
| [Next.js](https://nextjs.org/docs) |
| [Typescript](https://www.typescriptlang.org/docs/) |
| [Tailwind CSS](https://v2.tailwindcss.com/docs) |

</td><td>

| APIs |
| ----- | 
| [Google Address Verification](https://developers.google.com/maps/documentation/address-validation/overview) |
| [Google Places (New)](https://developers.google.com/maps/documentation/places/web-service/op-overview)| 
| [Google Street View Static](https://developers.google.com/maps/documentation/streetview/overview) |
| [Google Maps Javascript](https://developers.google.com/maps/documentation/javascript) |
| [OpenAI GPT-4o-mini](https://platform.openai.com/docs/models) |

</td></tr> </table>

### Assumptions
* All addresses entered are within the United States
* Information provided by ChatGPT-4o-Mini is an accurate estimation of property and location details

## Getting Started

Use git to clone this repository into your local device.
```
git clone https://github.com/vuamy/home-info-finder.git
```

This program uses OpenAI and Google APIs and requires the user to have an API key for both. Navigate to these websites and follow the directions to obtain an API key:

[Google API Key](https://developers.google.com/maps/documentation/javascript/get-api-key)

[OpenAI API Key](https://platform.openai.com/docs/quickstart)

### Prerequisites

Once you have received your API key, create a `.env` file in the root of the project and copy-paste this code snippet, filling out the brackets with your API key.

```
REACT_APP_GOOGLE_API_KEY={INSERT YOUR GOOGLE API KEY}
REACT_APP_OPENAI_API_KEY={INSERT YOUR OPENAI API KEY}
```

### Run Locally

Run this program by navigating to the root directory and typing this command into the terminal:

```
npm run dev
```

Simply enter the home address information on the first page. If the address is validated using Google Address Validator API, the information and location of that home address will be displayed. Otherwise an error will be shown.

## Tests

TBA

### Future Work
* Include global home addresses
* Provide more accurate property information via specialized APIs
* Create additional check that location must be home address and not a public address

## Authors

Amy Vu, Graduate Student at the University of California, Davis. Entry-level Software Developer.
