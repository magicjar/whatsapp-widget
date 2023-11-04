import { babel } from '@rollup/plugin-babel';

const path = require('node:path');
const package_ = require(path.resolve(__dirname, 'package.json'));
const copyleft = `/*!
  * WhatsApp Widget v${package_.version} (c) 2020 - ${package_.author.name}
  * Contributors (https://github.com/agraris/whatsapp-widget/graphs/contributors)
  * Licensed under MIT (https://github.com/agraris/whatsapp-widget/blob/master/LICENSE)
  * WhatsApp Widget does not affiliate with WhatsApp Inc. in any way.
  */`;

export default {
  input: path.resolve(__dirname, 'src/index.js'),
  output: [
    {
      file: `dist/js/whatsapp-widget.js`,
      format: 'umd',
      banner: copyleft,
      name: 'WhatsAppWidget',
      sourcemap: false,
    },
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
    }),
  ],
};
