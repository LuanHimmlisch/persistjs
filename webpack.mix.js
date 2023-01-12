let mix = require('laravel-mix');
let prefix = "";

if (mix.inProduction()) {
    prefix = ".min";
}
mix.setPublicPath('dist')
    .js('src/js/persist.js', `persist${prefix}.js`)
    .version();
