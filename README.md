# Star Wars App
This is a simple web app that displays a list of the Star Wars characters and their detailed information
<br>
Please, keep in mind that's a draft implementation, hence not all corner cases are handled, UX/UI isn't ideal and so on :)

## Getting started

### Prerequisites
1. Install **Node.js** which includes **Node Package Manager**.

### Setting Up a Project
1. Install dependencies:
```
npm install
```
2. Run app:
```
npm run start // localhost:4200
```
3. Run unit tests:
```
npm run test
```

### Pages
1. `/` - redirects to the **Welcome** page
2. `/welcome` - **Welcome** page with *See Characters list* button
2. `/characters` - **Characters** list page
3. `/characters/:uid` - **Character** details is displayed on the right side

### Details
- characters list is paginated and displayed on the left side. Current active page is stored in the query parameters
- when user selects some character, character details are displayed on the right side, as a separate route (`/:uid` path parameter)
- deep linking works fine. Correct page with selected character can be opened because active page and selected character are stored in the URL
- NgRx is used for storing and caching data. No duplicate requests
- standalone components are used instead of NgModules
- unit tests are written with Jest framework - see [here](src/app/features/characters/state/characters.effect.spec.ts)
- UX/UI is responsive and friendly. Details page is going below the list for mobile screens, loader is displayed when paginated list is loaded, etc
