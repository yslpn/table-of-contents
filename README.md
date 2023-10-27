# Table of Contents

## Structure

I utilized [Feature-Sliced Design](https://feature-sliced.design/), an architectural methodology tailored for frontend projects.

```
.
├── pages
│   ├── home
│   │   └── ui
│   │       └── HomePage.tsx
│   └── index.ts
├── shared
│   ├── api
│   │   └── fetcher.ts
│   ├── index.ts
│   ├── types
│   │   └── toc-data.ts
│   └── ui
│       ├── main-layout
│       │   ├── MainLayout.tsx
│       │   └── index.module.css
│       └── spinner
│           ├── Spinner.tsx
│           └── index.module.css
└── widgets
    ├── header
    │   ├── assets
    │   │   └── home.svg
    │   └── ui
    │       ├── Header.tsx
    │       └── index.module.css
    ├── index.ts
    └── table-of-contents
        ├── assets
        │   └── arrow.svg
        ├── lib
        │   ├── helpers.ts
        │   └── hooks.ts
        └── ui
            ├── item
            │   ├── Item.tsx
            │   └── index.module.css
            ├── active-path-provider
            │   └── ActivePathProvider.tsx
            ├── animated-wrapper
            │   └── AnimatedWrapper.tsx
            ├── recursive-tree-renderer
            │   ├── RecursiveTreeRenderer.tsx
            │   └── index.module.css
            ├── search-term-input
            │   ├── SearchTermInput.tsx
            │   └── index.module.css
            ├── search-term-provider
            │   └── SearchTermProvider.tsx
            └── table-of-contents
                ├── TableOfContents.tsx
                └── index.module.css
```

## Available Scripts

In the project directory, you can run the following scripts:

`npm run dev`

Runs the app in the development mode by starting the Vite dev server.

`npm run build`

Builds the app for production to the dist folder. It compiles TypeScript and optimizes the build for the best performance using Vite.

`npm run lint`

Runs ESLint to perform a static code analysis for code quality, bugs, and style issues.

`npm run lint:fix`

Similar to npm run lint, but also attempts to automatically fix code style issues and other minor problems.

`npm run stylelint`

Runs Stylelint on all .css files to identify and report on patterns found in CSS code, which can be considered mistakes or violate certain style guidelines.

`npm run stylelint:fix`

Similar to npm run stylelint, but also fixes style issues in CSS automatically.

`npm run format`

Runs Prettier, which is a code formatter that ensures consistent code style across the project.

`npm run format:fix`

Runs Prettier with write mode, which changes the files in place. Handy for fixing all formatting issues before committing.

`npm run preview`

Serves the production build locally for previewing. This is useful for checking the production build before deployment.

`npm run prepare`

Sets up Husky for the project. Husky improves your commits and more with 'hooks' you can use to lint commit messages, run tests, lint code, etc.
