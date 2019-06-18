# Akwaba

A digital data collection system to help organizations optimize the collection, storage, and management of the collected data. Organizations such as non-for-profit organizations need to collect data regularly for their activities. However, most of these organizations still use traditional methods. Their operators must carry around large amount of papers forms. My experience working with a not-for-profit showed me that these methods are time-consuming, costly, and error-prone. The system is an offline-first web application also known as Progressive Web Application (PWA) which will allow mobile workers to collect data even when they do not have access to the Internet. New information that is entered while the operators are offline can be sync up and down anytime they get access to the internet. This project was built as part of my final year project in Business Computing and Information Systems. The goal was to demonstrate how data replications techniques could be used in web applications to improve performance and availibity.

## Live demo

The project is a PWA, so it works best when served using `https`. Check out the hosted version at:

- Link: https://naughty-villani-151fac.netlify.com
- Default credentials: admin/password

## Requirements

- Node JS 10.x.x and later ([Installation instructions](https://nodejs.org/en/download/package-manager/))
- A modern web browser e.g lastest version of Google Chrome

## Installation

Open your operating system command-line interface, go to the project folder and run:

```shell
$ npm install # install the project dependencies
```

Rename the `env_example` file to .env:

You can use your file explorer or if your are on a unix like system you can use:

```shell
$ mv env_example .env
```

_Note:_ You should update the `.env` file to match your environment. Default values are provided.

Then build the project:

```shell
$ npm run build
```

## Usage

You can serve the application by running:

```shell
$ npm run start:prod
```

To use the database server locally, update the value of `VUE_APP_SYNC_URL` in the .env file to `http://localhost:5984`, rebuild the application and run the following command:

```shell
$ npm run server
```

- _Note:_: An internet connection is required for authentication.
- _Note:_ You can run the Akwaba API server locally by following the instructions at its repository.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. Please make sure to update tests as appropriate.

## License

<a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/"><img alt="Creative Commons Licence" style="border-width:0" src="https://i.creativecommons.org/l/by-nc/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/">Creative Commons Attribution-NonCommercial 4.0 International License</a>
