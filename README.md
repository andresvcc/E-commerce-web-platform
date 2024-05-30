XXX-NAME-XXX platform
===============

# Welcome to the XXX-NAME-XXX Platform Turborepo!

The XXX-NAME-XXX Platform is an open-source project that provides a comprehensive suite of software tools and libraries for the web-shop and accounting system. It includes front-end and back-end applications, along with shared packages and utilities for data modeling, user management, and UI component development.

With the Platform Turborepo, developers and enthusiasts have access to a wide range of front-end and back-end applications, along with essential packages for programming, data modeling, and UI component development. The Turborepo follows a monorepo architecture, enabling seamless collaboration and code sharing between different parts of the project.

# Documentation

Before diving into the installation process, we highly recommend visiting the [Thymio Platform Documentation](https://mobsya.github.io/thymio-platform/?path=/docs/introduction--page). This comprehensive documentation will provide you with detailed information about the XXX-NAME-XXX , its features, and how to utilize its capabilities effectively.


# Getting Started with XXX-NAME-XXX  Turborepo

<br />

Welcome to XXX-NAME-XXX  Turborepo! This guide will help you get started with the installation and basic usage of the monorepo, including an overview of the packages, web apps, and utilities available in the project.

A monorepo is a software development approach where multiple related projects or packages are managed within a single repository. Turborepo is a tool that helps streamline the development process in a monorepo by providing various features and utilities.

1. **Single Repository**: All the related projects and packages are stored in a single repository. This allows for easier code sharing, centralized version control, and streamlined collaboration between different teams or developers.

2. **Shared Dependencies**: In a monorepo, multiple projects can share dependencies, reducing duplication and ensuring consistency across the codebase. Turborepo manages these shared dependencies efficiently, making it easier to update and maintain them.

3. **Common Configuration**: Turborepo allows you to define common configurations and scripts that apply to multiple projects or packages within the monorepo. This helps maintain consistency in development practices and simplifies the setup process for new projects.

<br />

## What's Inside?

The XXX-NAME-XXX  Turborepo consists of the following packages and apps:

<br />

### Front-End Apps

- `web-shop`: This front-end application provides an intuitive and user-friendly interface for customers to browse products, place orders, and manage their accounts. It offers a seamless shopping experience with features such as product search, category navigation, and order tracking.

- `web-admin`: This front-end application is designed for administrators to manage the web-shop, including product listings, inventory management, and order processing. It provides a comprehensive set of tools and features to streamline the e-commerce operations and enhance the user experience.

<br />

### Back-End Apps

- `MS-User`: This microservice manages user-related operations, including authentication, authorization, and user management. It ensures secure access to the system and allows users to personalize their experience.
- `BFF Users`: This BFF (Backend for Front-End) service serves as an interface proxy, connecting the user interface of the User actor to the microservices.
- `health-check`: This microservice provides health check endpoints for monitoring the system's status and ensuring its availability. It helps detect and resolve issues proactively, ensuring a smooth user experience.

<br />

### Packages

- `helpers`: A programming tool that follows the [SOLID](https://en.wikipedia.org/wiki/SOLID) principles, leveraging an implementation framework based on [Domain-Driven Design (DDD)](https://learn.microsoft.com/en-us/archive/msdn-magazine/2009/february/best-practice-an-introduction-to-domain-driven-design) and formalized through the design of inter-service contracts. This package provides a solid foundation for building robust and maintainable applications.

- `data-model`: This package provides the definitions of classes, types, and contracts that are shared across different applications within the XXX-NAME-XXX. It promotes code reusability and consistency in data modeling.

- `ui-ux`: A [React Native](https://reactnative.dev/) component library that is shared between the `web` and `native` applications. It provides a set of reusable UI components with a consistent and visually appealing design.

- `tsconfig`: The `tsconfig.json` file used throughout the monorepo, ensuring consistent TypeScript configurations and compiler options across all packages and apps.

Each package and app in this monorepo is written in 100% TypeScript, providing static type checking and enhanced developer experience.

<br />

## Installation

To get started, make sure you have Node.js and Yarn installed on your machine. If you haven't installed them yet, you can download Node.js from the official website (https://nodejs.org) and Yarn from their official website (https://yarnpkg.com).

Once you have Node.js and Yarn installed, navigate to the root directory of the project in your terminal and run the following command to install the required dependencies:

```shell
yarn install
yarn build
```

This command will fetch and install all the necessary packages and dependencies for XXX-NAME-XXX.
<br />

## Start in development mode

This script launches the development environment, including Storybook and the test runner, in an interactive watch mode. It runs concurrently, leveraging parallel processing for improved performance. This command is useful during development as it automatically reloads the app and reruns tests whenever changes are detected.

```shell
yarn dev
yarn storybook
```

## Available Scripts

- `yarn format`: This script formats the codebase using Prettier, a popular code formatter. It automatically adjusts the code's style and formatting, promoting a unified and consistent codebase across the entire project.

- `yarn clean`: This script cleans the project by removing generated files and dependencies, preparing it for a fresh build. Use this command when you want to start with a clean slate and eliminate any unnecessary artifacts or dependencies.

- `yarn build`: This script builds the project for production. It includes separate build commands for specific packages, such as `helpers` and `data-model`, as well as the apps. Running this command generates optimized production-ready assets in the `dist` folder, ready for deployment.

- `yarn test`: This script runs the test runner to execute tests in the project, excluding the `backend` directory. It ensures that your code behaves as expected and meets the defined specifications. Writing and running tests help maintain code reliability and catch potential issues early on.

- `yarn posttest`: This script is executed after running the tests. It performs additional tasks, such as merging test results and generating reports. It consolidates the test results generated by the test runner into a single XML file and converts it into a human-readable format for easier analysis.

- `yarn mergeTest`: This script merges the test results generated by the test runner and generates a combined XML file. Additionally, it runs a parser to convert the XML file into a more readable format, facilitating comprehensive test result analysis.

- `yarn report`: This script generates an HTML report from the merged test results, providing a visual representation of the test coverage. The report gives you an overview of the test outcomes and helps identify areas that require further attention or improvement.

- `yarn test:watch`: This script launches the test runner in an interactive watch mode, allowing tests to be automatically rerun whenever file changes are detected. It provides a convenient way to continuously monitor and validate code changes during development.

- `yarn storybook`: This script launches Storybook, a UI component development environment, for the documentation section of the project. It allows you to view and interact with the project's UI components individually,

## Next Steps

Now that you have XXX-NAME-XXX  Turborepo installed and familiarized yourself with the available scripts, you can start exploring the various packages, apps, and utilities included in the monorepo. Dive into the codebase, experiment with different configurations, and leverage the shared dependencies to build robust and scalable applications.
