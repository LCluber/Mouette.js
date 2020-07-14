## Version 2.3.0 (July 14th 2020)

- New options parameter with 'level', 'maxlength' and 'displayConsole' parameters at logger and group levels
- Add time level to log timings and measure elapsed time between to actions.
- Send logs to the server with http post requests using sendLogs() method

## [2.2.1](https://github.com/LCluber/Mouette.js/compare/v2.2.0...v2.2.1) (2019-09-25)

### Bug Fixes

- **console:** fix console interface definition ([02f7e04](https://github.com/LCluber/Mouette.js/commit/02f7e04))

# [2.2.0](https://github.com/LCluber/Mouette.js/compare/v2.1.0...v2.2.0) (2019-09-25)

### Features

- **level:** set log level at group level ([cbb5c50](https://github.com/LCluber/Mouette.js/commit/cbb5c50))

# [2.1.0](https://github.com/LCluber/Mouette.js/compare/v2.0.6...v2.1.0) (2019-08-16)

### Bug Fixes

- **declarations:** fix declarations file ([1677e94](https://github.com/LCluber/Mouette.js/commit/1677e94))

### Features

- **prettierignore:** added prettierignore file ([6d5979f](https://github.com/LCluber/Mouette.js/commit/6d5979f))
- **setlevel:** setLevel() method now returns level name ([3991665](https://github.com/LCluber/Mouette.js/commit/3991665))

## Version 0.3.2 (June 29th 2019)

- setLevel() method now returns level name
- Updated README.md

## Version 0.3.1 (June 27th 2019)

- Changed default level to error

## Version 0.3.0 (April 09th 2019)

- Added Group class to set different levels if needed
- Added Date to messages

## Version 0.2.12 (April 07th 2019)

- Updated README.md with Yarn install command

## Version 0.2.11 (March 30th 2019)

- Improved typings
- Updated README.md with usage examples

## Version 0.2.10 (March 16th 2019)

- Improved typings
- Lighter Library

## Version 0.2.9 (February 22nd 2019)

- Added color to levels.

## Version 0.2.8 (December 06th 2018)

- Dropped Wee.js dependency.

## Version 0.2.7 (October 06th 2018)

- Mouette.js published on NPM at @lcluber/mouettejs.
- Updated README.md with NPM installation procedure.

## Version 0.2.6 (September 05th 2018)

- Fixed iife library console.

## Version 0.2.5 (August 23th 2018)

- Logs into browser console by default

## Version 0.2.4 (July 14th 2018)

- Improved modules resolution with the use of absolute paths

## Version 0.2.3 (July 08th 2018)

- Documentation automatically generated in /doc folder
- Typedoc and grunt-typedoc added in devDependencies
- New "typedoc" task in Gruntfile.js
- Typescript upgraded to version 2.9.2

## Version 0.2.2 (June 25th 2018)

- Library exported as ES6 and IIFE modules instead of UMD.
- MOUETTE namespace becomes Mouette

## Version 0.2.1 (March 18th 2018)

- Added TypeScript Declaration File
- New colors

## Version 0.2.0 (March 17th 2018)

- Mouette.js is now static. No instantiation needed. One logger for the entire project. even if dependencies use it.

## Version 0.1.0 (December 24th 2017)

- initial version
