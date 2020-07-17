# Plugin

Plugin is a way to extend functionality of the basic annotation functions. It can be used to display custom view of certian type of annotations and manipulate data. A plugin is consist of a name, a react component and an enable function to determine when this function is enabled by the the datapack.

In the current intial design, plugin can access the datapack and any state in Stave. Plugin can also edit any data using provided redux actions. And the plugin is displayed in the fixed area in Stave.

In the future, there is plan in discussion about

- allow customized layout of the Stave, including the plugin
- install plugin with certian command from local folder, or even npm
- more structure way to access and modify data

## Create plugin

create a tsx file at [this folder](https://github.com/asyml/stave/tree/master/src/plugins) that export a object that looks like this:

```ts
const plugin = {
  name: 'Group', // plugin name
  component: HelloPlugin, // plugin UI component
  enabled: enabledFn, // enable function
};
```

### Plugin name

just a simple string indicating the name

### Plugin UI component

A react component that take a prop like this;

```ts
interface PluginComponenProp {
  dispatch: Dispatch; // used to dispatch redux event to edit the state
  appState: State; // the entire stave app state, include the textpack and ontology
}
```

a simple example:

```tsx
function HelloPlugin(props: PluginComponenProp) {
  return <div>Hello world</div>;
}
```

### Enable function

a function to determind if the plugin can be enable for the current textpack, a simple example:

```ts
function enabledFn(state: State) {
  return true; // always enabled
}
```

## Use plugin

To use this plugin, import and add the plugin [here](https://github.com/asyml/stave/blob/76a44bdf1b53ee6dbbb4a1547cc9c8e4b56ffc0b/src/app/App.tsx#L70). (this can be automated with some command in the future)
