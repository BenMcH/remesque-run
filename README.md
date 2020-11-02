# Remesque Run

This project is my take on [Remix Run](https://remix.run) after watching several videos reading about the features.
I have never worked with Remix directly nor do I have access to the Remix source code.

## Features

Currently, this project is only supporting the loaders piece of functionality provided by remix,
which is accomplished by generating a route map at server start time and matching routes based
on parsing routes under the `loaders` directory and forming URLs based upon those.

I would like to extend this to include a server-rendered react app that automatically pulls from our loaders and
injects them into the page at runtime. If I can get something even slightly polished in the end, I will consider it a success

## Comparison to Remix

I do not intend for this library to become a competitor to remix or for this to take away from the amazing work done by
Ryan Florence and Michael Jackson, but instead to learn how these types of frameworks can be put together.
The simplicity of the components within remix and lack of magic are what make me interested in the project. If you're
interested in this pattern, their project is likely much better suited for your needs and I would suggest that you pay the
licensing fee to get access to it :)

## Contributing

In the early stages of this repo, I am unsure about taking contributions, but I am not opposed to it. All that I ask is that
an issue is created in the repo and we have a discussion prior to a PR being submitted. It is a goal of this project to remain
as lean as possible while allowing flexibility that comes with a framework like Remix.
