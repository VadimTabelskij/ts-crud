# TypeScript - CRUD Atsiskaitymas

## Needed programs

- Node.js v16.\* or above
- Eslint Plugin.

## Dependency installation

Open terminal in current folder and run command:

```
npm install (library for node_modules)

npm install uuid (library for unique id)

npm install --save-dev @types/uuid (added devDependencies for TypeScript)

```

## Project initialization

Open terminal in current folder and run command:

##### development build:

```
npm run start 
```

##### production build:

```
npm run build
```

### File structure

- **components/** - aplankas skirtas komponentams - klasėms, kurios naudojamos atvaizduoti elementams DOM'e

- **data/** - duomenų failai

- **helpers/** - Pagalibinės funkcijos ir klasės, skirtos kodo švarinimui ir perpanaudojimui

- **types/** - bendrai naudojami tipai