// import * as RNLocalize from "react-native-localize";

class Translator {
    constructor() {
        // this.locale = Localization.locale.split('-')[0];
        this.translations = {};
        this.fallbacks=true
        this.defaultLocale = 'en';
    }

    setTranslations(translations) {
    
        this.translations = translations;
    }

    setLocale(locale) {
        if(this.fallbacks)
        {this.locale = locale.split('-')[0]}
        this.locale = locale;


    }

    // Search for translation in the given locale, then in default locale.
    // Return null if translation is not found.
    findTranslation(key) {
        return this.translations[this.locale]?.[key] || this.translations[this.defaultLocale]?.[key] || null;
    }

    t(key) {
        return this.findTranslation(key, this.locale);
    }
}
const translator = new Translator();
 
import * as Localization from 'expo-localization';

const locales = Localization.locale;

let curr_locale='pl'
// check if any locales were found
if (Array.isArray(locales) && locales.length > 0) {
    // get the first preferred locale
    const { languageTag } = locales[0];
    curr_locale = languageTag.split('-')[0];
} else {
    // fall back to default locale
    curr_locale = locales.split('-')[0];
  
}

translator.setLocale(curr_locale)

//Translations on the delay page
let delay_page = {
    en: {
        location: 'Location',
        delayTime: 'Expected Delay Time:',
        enterTime: 'Enter Time',
        reason: 'Reason:',
        enterYourMessage: 'Enter Your Message',
        sendMessage: 'Send Message'

        //Delay page
    },
    pl: {

        //Delay page
        location: 'Lokalizacja',
        delayTime: 'Oczekiwany czas opóźnienia:',
        enterTime: 'Wprowadź czas',
        reason: 'Powód:',
        enterYourMessage: 'Wprowadź swoją wiadomość',
        sendMessage: 'Wyślij wiadomość'

        //Delay page End
    },
    es:{

            //Delay page
            location: 'Ubicación',
            delayTime: 'Tiempo de Retraso:',
            enterTime: 'Ingrese la Hora',
            reason: 'Razón:',
            enterYourMessage: 'Ingrese su Mensaje',
            sendMessage: 'Enviar Mensaje'    
            //Delay page End
        

    }
};

let login_page = {
    en: {
        PhoneLogin: 'Phone',
        TruckPlatesLogin:'Truck Plates'
        //Login page
    },
    pl: {

        //Login page
        PhoneLogin: 'Telefon',
        TruckPlatesLogin:'Tablice Rejestracyjne'

        //Login page End
    },
    es:{

        //Login page
        
        PhoneLogin: 'Teléfono',
        TruckPlatesLogin: 'Placas del camión'
    
            
        //Login page End
        

    }
};

let hello_page={
    en: {
        location: 'Location',
        welcomeUser: 'Welcome User',
        route: 'Route'
    },
    pl: {
        location: 'Lokalizacja',
        welcomeUser: 'Witaj Użytkowniku',
        route: 'Trasa'
    },
};

let main_page = {
    en: {
        MAIN_loaded: 'Loaded',
        MAIN_unloaded: 'Unloaded',
        MAIN_uploadCMR: 'Upload CMR',
        MAIN_delayed: 'Delayed',
        MAIN_reset: 'X',
        MAIN_status: 'Status'
    },
    pl: {

        MAIN_loaded: 'Załadowany',
        MAIN_unloaded: 'Rozładowany',
        MAIN_uploadCMR: 'Prześlij CMR',
        MAIN_delayed: 'Opóźniony',
        MAIN_reset: 'X', // You may want to replace it with a specific translation for 'reset' if needed
        MAIN_status: 'Status' // Adjust if there is a specific Polish translation for 'Status'
    },
};

let confirm_loading={
    en: {
        confirmLoading: 'Confirm loading?',

    },
    pl: {
        confirmLoading: 'Potwierdź odbiór?',

    },

}

let confirm_unloading={
    en: {
        confirmUnloading: 'Confirm unloading?',

    },
    pl: {
        confirmUnloading: 'Potwierdź zdanie?',

    },

}

let confirm_upload={
    en: {
        FinishTakingPhotos: 'Finish Taking Photos',

    },
    pl: {
        FinishTakingPhotos: 'Zakończ robienie zdjęć',

    },

}
let camera_shot={
    en: {
        uploadCMR: 'Upload CMR',
        FlipCamera:'FlipCamera',
        SnapPhoto: 'Take Photo',
        sendMessagePhoto:'Send the CMR',
        showMessagePhoto:'Show the documents',
        hideMessagePhoto:'Hide the documents'
    },
    pl: {
        uploadCMR: 'Wgraj zdjęcia CMR',
        FlipCamera:'Obróć kamerę',
        SnapPhoto: 'Zrób zdjęcie',
        sendMessagePhoto:'Wyślij zdjęcia dokumentów',
        showMessagePhoto:'Pokaż zdjęcia dokumentów',
        hideMessagePhoto:'Hide the documents'
    },

}


function mergeDictionaries(dictionaries, languages) {
    let merged = {};
  
    // Iterate over each language
    for (let lang of languages) {
      merged[lang] = {};
  
      // Iterate over each dictionary
      for (let dict of dictionaries) {
        // Merge the current dictionary's translations for this language into the result
        Object.assign(merged[lang], dict[lang]);
      }
    }
  
    return merged;
}

  
  
  // Usage:
  let dictionaries = [
    delay_page, 
    login_page,
    hello_page, 
    main_page, 
    confirm_loading, 
    confirm_unloading,
    confirm_upload, 
    camera_shot
];
  let languages = ['en', 'pl', 'es'];
//   I18n.translations = mergeDictionaries(dictionaries, languages);
  
    translator.setTranslations(mergeDictionaries(dictionaries, languages))

    export default translator;