import { SheetsRegistry } from 'jss';
import { createMuiTheme, createGenerateClassName } from '@material-ui/core/styles';
import pTheme from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';


const toolbarHeights = {
    mobilePortrait: 56,
    mobileLandscape: 48,
    tabletDesktop: 56,
};
// A theme with custom primary and secondary color.
// It's optional.
var theme = createMuiTheme({
    palette: {
        primary: {
            // light: pTheme[300],
            // main: pTheme[500],
            // dark: pTheme[700],

            light: '#77aedd',
            main: '#3d8bce',
            dark: '#2f78c2',

            //
            // light: '#ffffff',
            // main: '#ffffff',
            // dark: '#ffffff',
            contrastText: '#fff',
        },
        secondary: {
            light: pink[300],
            main: pink[500],
            dark: pink[700],
        },
    },
    typography: {
      //  fontFamily: "Product Sans",
        useNextVariants: true,
    }
});


function createPageContext() {
    return {
        theme,
        // This is needed in order to deduplicate the injection of CSS in the page.
        sheetsManager: new Map(),
        // This is needed in order to inject the critical CSS.
        sheetsRegistry: new SheetsRegistry(),
        // The standard class name generator.
        generateClassName: createGenerateClassName(),
    };
}

export default function getPageContext() {
    // Make sure to create a new context for every server-side request so that data
    // isn't shared between connections (which would be bad).
    if (!process.browser) {
        return createPageContext();
    }

    // Reuse context on the client-side.
    if (!global.__INIT_MATERIAL_UI__) {
        global.__INIT_MATERIAL_UI__ = createPageContext();
    }

    return global.__INIT_MATERIAL_UI__;
}