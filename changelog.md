# Changelog

## v2.2.0

### New

- Added unit tests for internal functions

### Improved

- Added my Kyanite Library to make use of utilities
- Fixed current linter issues
- Removed slow `for in` loop for getting the card type
- Made expired functionality no longer statically use `20` if only 2 digits are passed in for a year
- Heavy optimizations to `cvn` functionality
  - Removed unneeded processing
  - Cleaned up code base
  - Removed unneeded code
- Optimizations to `match` functionality
- Tweaked Luhn Algorithm for easier catch on non-number cards
- Code optimizations within the number validation function
- Re wrote card type functionality from the ground up, improving performance
- Rebuilt validation flow taking advantage of the Kyanite library
- Re structured the flow of the expired functionality
- Updated all dev dependencies
- Better sanitization of data, cleaning up non-digits from data strings

## v2.1.2

- Hot fix for documentation bug

## v2.1.1

### Improved

- Added a category tag to the documentation
- Tweaked the automated scripts to make sure the main documentation site stays up to date a lot faster and easier

## v2.1.0

**Note this is mainly a huge architecture upgrade so the library will still work the same**

- Converted linter to `standardjs` instead of `eslint`
- Flattened out the files so src is a folder of js files now with internals being a folder of internal js files
- Moved tests into their own folder at root level
- Enhanced backend automation scripts for better performance
- Brought all dev dependencies up to date
- Swapped out `webpack` in favor of `rollup`
- Added a `simple-card.js` which can be used in dev instances to get better error logs

## v2.0.1

- Fixed all unit tests to actually get full year
- Fixed expired functionality to be able to handle invalid dates

## v2.0.0

#### Breaking Changes

- Removed the ability to send single strings into the main function (call the individual functions)
- Removed the ability to send partial objects to the main function
- Changed the expected card object property name from `expire` to `date`

#### New

- `number` which can be used to validate a credit card number
- `cvn` which can be used to validate a credit card cvn/security code
- `expired` which can be used to validate a credit cards expiration date
- `matches` which can be used to see if a cvn and a card number match (the cvn length matches the card type)
- `validation` which is the core functionality and only accepts an object
- A match property was added to the results that says if it failed by a rule or if it failed matching
- Type Errors have been added when the correct type of value isn't provided (String or Number)
- Converted to a webpack build along with automation scripts for docs, and building files
- README has been updated with all the needed changes

#### Fixes

- Improved the overall structure of the code which allowed removal of a lot of internals
- Cleaner organization now that the module isn't supporting so many different types

## v1.4.0

- Added: Defaults for most validation methods
- Added: Type Checks for each validation method
   - **Note:** Type errors will be thrown if invalid types are passed through (Arrays, Objects, etc.)
- Added: Some better documentation to methods
- Added: Tests for all of these main changes
- Changed: Re organized some internal methods to live where they are being used since they are not being re used
- Changed: Updated all Dev dependencies
- Fixed: Tests to no longer use hardcoded dates (Unless its a test on expired dates)
- Fixed: Code to meet new ESlint version linting errors
- Fixed: Rollup config for new version


## v1.3.2

- Fix: Better IE support dates should build out properly now (specifically IE 10 and 11)
   - These would use past years when only given a XX/XX string so `1/19` brokedown to `Janurary of 1919`
- Changed: Switched out testing suite to ava
- Added: Seperate tests for internals
- Added: Support for more date seperators instead of just `/`
- Readded: Automatic uglify of the module

## v1.3.1

- Fix: Expiration should no longer mark the current month & year as expired
- Fix: Validating a CVN should no longer trigger a card number error when it exceeds 4 digits
- Changed: How validation works as a whole making the system more simple overall on my end
- Changed: You can now validate a cardtype and cvn when just using those two.
- Changed: Npm ignore so src files are no longer packed

## v1.3.0

- Improved the card type functionality, to go through a list of digit arrays to find the card type
- Allowed me to clean up the validation functionality a bit

## v1.2.1

- Numbers passed in will now be sanatized to an ugly string before validation
- CVNs passed in will now be sanatized to an ugly string before validation
- Each validation method now has a default param to help avoid bad feedback
- Debug mode has been removed as it is no longer needed
- Updated some dev dependencies

## v1.2.0

- Added validation for if the cvn entered does not match the card type, send back a falsey value
  - Note: This will only work if you send in the full object, validating a single cvn string will not trigger it to validate against a card type
- Some code tweaks for flow control

## v1.1.0

- Added a Debug mode to allow for dev development along side the module

## v1.0.0

- Initial Release
