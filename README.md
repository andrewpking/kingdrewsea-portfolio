# Drew's Portfolio

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## About

This is a personal portfolio developed in Next.js to showcase my experience with UX Engineering and data analytics. The homepage and GUI components are written in typescript with React. Each project is an MDX page found in the `src/app` directory inside of the subdirectory of each project and the file is named `page.mdx`.

This project use the Next.js built in Router and is compiled with Turbopack. The resulting project is a website deployed to vercel. You can use the live site at [kingdrewsea.vercel.app](https://kingdrewsea.vercel.app).

## Run Locally

This project requires Node 20 or higher to run. If you use multiple versions of Node, please use **Node Version Manager**.

If you use Brew as a package manager you can run the following command:

```bash
brew install nvm
```

Otherwise, you will need to follow the [install instructions in the NVM repository](https://github.com/nvm-sh/nvm).

Once you have installed Node Version Manager, ensure you have Node 20 installed:

```bash
nvm install 20
```

Once it has been installed, use this version (or higher) to run the project:

```bash
nvm use 20
```

Install all dependencies (ensure this command is run from the root of the project directory):

```bash
npm i
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
