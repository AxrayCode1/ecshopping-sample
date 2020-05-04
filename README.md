# express-typescript-template

## Project setup

1.project initialize
```
yarn init
```

2.install typescript to devDependencies (use for typescript transpiler)
```
yarn add typescript -D
```

3.install type definitions for Node.js
```
yarn add @types/node -D
```

4.create typescript config ("tsc command" is installed in step 2)
```
tsc -init
```

5.edit tsconfig.json in project root, key: "rootDirs" is for "*.ts" you put the typescript source file,
key: "outDir" is for which path you want to put the "*.js" file that be transpiled from typescript.

6.enjoy coding with type in javascript! You can test typescript by:
```
yarn start
```