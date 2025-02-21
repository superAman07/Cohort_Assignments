# React + TypeScript + Vite



# main cheez is code me dekhne ka ye hai ki... 
----> signin.tsx me jo submit button me
{
  withCredentials: true, // ye cheeze extra hai yaha jisko cross-origin ki vajah se use karna pad rha...
}
 iski jagah hum pahle header:{
  authorization : Bearer+ token <----karte the uski jagah ye kar rhe...lakin 
 }
# when we work with next js things will change...

# ek cool cheez ki...ek hi port pe dono (FE and BE) chala sakte hai...react me uske liye...backend me jo index.ts hai usme dekho...
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../src/index.html"))   // <---- ye raha jiski help se hum react ka FE and BE ek hi port pe run kar sakte hai...
})
 you will see something like  this and with this we can do that...on same port...but still it is not as same as next js (because nextjs is react+backend and this is non-react + backend)








This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
