This is a demo project following mostly the React course by Maximilian Schwarzmüller at Udemy.

Add config.js with at src/config folder with an exported baseUrl to firebase applikation database and an apiKey.

firebase database setting should be:

{
  "rules": {
  	"ingredients": {
    	".read": "true",
    	".write": "true"
  	},
    "orders": {
    	".read": "auth != null",
    	".write": "auth != null",
      ".indexOn": ["userId"]
    }
  }
}

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.