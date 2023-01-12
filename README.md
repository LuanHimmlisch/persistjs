# Zero-fat, lightweight and vanilla-flavored 🍦 temporary input form storage library

A simple javascript library with no dependencies, to simply remember your user's inputs.

## Installation:

Add script at the end of `<body>`:

```html
    <!-- content... -->
    <script type="text/javascript" src="YOURTPATH/dist/persist.js"></script>
</body>
```

## Usage:

Just add the `data-persist` attribute to the form input tag you want to remember

```html
<input type="text"
    name="my-input"
    id="my-input-id"
    data-persist>
```

Persist saves the data using the `id` parameter, so follow web standards and use each id once per page.

Alternatively, you can use a `data-persist-id` attribute.

```html
<input type="text" 
    name="my-input" 
    id="my-input-id" 
    data-persist 
    data-persist-id="the-real-id">
```

In this case, Persist will save the data of the input as `the-real-id`.

### Custom Expire Time

You can set a custom expiration time in milliseconds using `data-persist-expires`.

```html
<input type="text" 
    name="my-input" 
    id="my-input-id" 
    data-persist 
    data-persist-expires="86400000">
```

In this case, the input will be saved one entire day.

**By default, the expiration date is 5 minutes.**

### Livewire support

Persist does support Livewire. Enable livewire using `data-persist="livewire"`.

Example of Blade component:

```html
<x-molecule.input-group 
    name="team.phone" 
    label="Phone" 
    data-persist="livewire" 
    wire:model.debounce.250ms="team.phone" />
```

## Credits:

Made by [Luan Himmlisch](https://luanhimmlisch.github.io) under the [MIT license](/LICENSE).