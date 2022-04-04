## DAMAN - Delivery Automated Medical Appointment Notifier


### Setting up twilio for customer
1. An admin or owner must be signed in.
2. Traverse to the subaccount page.
3. Add a new subaccount that represents that customer
4. 

#### Testing
This tool was tested with mockaroo.

#### Components
**API**: Our API communicates with Twilio to receive messages that have been sent and received and stores this data in a message DB

**Message DB**: This Message DB stores the messages that have been sent/received from twilio.

**UI Platform**: The UI is an electron application that is used to allow a user to get information from the API and also from the Medical Database.

**Medical Database**: This database contains all the patient and appointment data that our UI needs access too.

#### Order of Operations
When we start up the tool it needs to happen like this:
* [Initialize] Start up the DAMAN Database
* [Initialize] Start up the DAMAN API. API will initialize the DB with the following data
  - Messages
  - MessageTemplates
  - ApiKeys
* [Initialize] Start up the UI Platform
  1. [Account] APIKey Functions
    - Load the API Key from Local Storage
    - Verify with the API that the API key is valid
  2. [Load] Message Template Loading
    - Check if the cache has message templates
    - If not, then Request to the API all the message templates for the account (key)
    - Load these message templates into the Vuex Cache
  3. [Load] Address Book Loading
    - Check if the cache has address book
    - If not, then make request to API to confirm API key, set the header. (We can only check the DB if we have a valid API Key)
    - Check if cache has Patient lists
    -[Medical] If not, then make an "API" request with the ApiPatientService for list of patients
      + This checks the environment for what type of Medical DB service to use
      + Uses that DB service to get list of patients
      + Return the list of patients from the DB
  4. [Load] Message Loading
    - Request to the API all the messages received for the account (key). API receives messages from Twilio
    - Request to the API all the messages sent by the account (key). API receives messages from Twilio
    - Map the message with the phone number of a medical client in the Address Book
    - Load these messages into the Vuex Cache
  5. Message Template Loading
    - Request to the API all the message templates for the account (key)
    - Load these message templates into the Vuex Cache