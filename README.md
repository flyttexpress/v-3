# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

### Generate SSL Certificates for HTTPS

Then, generate SSL certificates for local development (into `./certifcates`). This is required to run the Next.js app with HTTPS, which is required to embed the application in Storyblok:

```bash
brew install mkcert
mkcert -key-file certificates/localhost-key.pem -cert-file certificates/localhost.pem localhost
```

### Set up environment variables

Copy and rename the `.env.example` file to `.env` in the root directory, then set your environment variables as needed.

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## About the codebase

Here follows a brief overview of the codebase:

## How to add a new component

To add a new component, you need to do three things:

1. Update the content model, which describes the structure of the content with TypeScript types; see `src/content/content-model.ts`.
2. Create a component that renders the content; see `src/storyblok/`.

## Validation/Parsing

This project has TypeScript types that describe the content model; however, by default, this content is not validated. To parse the content, find the comment that says `// Parsing: ` and uncomment the lines below.

You can use any validation library you prefer—this project uses [PureParse](https://pureparse.dev/) because this library allows you to [type check the parser](https://pureparse.dev/guide/why-pure-parse.html#why-pureparse).

In this case, when you add a new component, you will also need to update the parsing logic.

## General

For issues related to the Business blueprint, please open issues at the corresponding template repository:

- Nextjs: https://github.com/storyblok/blueprint-business-nextjs/issues
- Nuxt: https://github.com/storyblok/blueprint-business-nuxt/issues
