import jss from 'jss';
import preset from 'jss-preset-default';
import { create as createInjectSheet } from 'react-jss';


jss.setup(preset());

export default createInjectSheet(jss);


// global variables
export const fontFamily = '"Segoe UI", Helvetica, Arial, sans-serif';
export const fontSize = '14px';
export const primaryColor = '#00bcd4';
export const headerHeight = '42px';
