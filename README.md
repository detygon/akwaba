# Akwaba

A digital data collection system to help organizations optimize the collection, storage, and management of the collected data. Organizations such as non-for-profit organizations need to collect data regularly for their activities. However, most of these organizations still use traditional methods. Their operators must carry around large amount of papers forms. My experience working with a not-for-profit showed me that these methods are time-consuming, costly, and error-prone. The system is an offline-first web application also known as Progressive Web Application (PWA) which will allow mobile workers to collect data even when they do not have access to the Internet. New information that is entered while the operators are offline can be sync up and down anytime they get access to the internet. This project was built as part of my final year project in Business Computing and Information Systems. The goal was to demonstrate how data replications techniques could be used in web applications to improve performance and availibity.

## Live demo

- Link: https://naughty-villani-151fac.netlify.com
- Default credentials: admin/admin

## Requirements

- Node JS 10.x.x and later
- A modern web browser e.g lastest version of Google Chrome

## Installation

Run the following command inside the project directory to install the project dependencies:

```shell
$ npm install
```

Rename the `env_example` file to .env:

```
$ mv env_example .env
```

*Note:* You should update the `.env` file to match your environment. Default values are provided.

Then build the project:

```
$ npm run build 
```

## Usage

Akwaba is a PWA, so it needs to be run with a web server. You can serve the application by running:

```shell
$ npm run start:prod
```

To start the Pouch Server, run:

```shell
$ npm run server
```

*Note:*: An internet connection is required for authentication.
*Note:* You can run the Akwaba API server locally by following the instructions at its repository.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
