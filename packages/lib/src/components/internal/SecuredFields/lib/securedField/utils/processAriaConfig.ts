import { addErrorTranslationsToObject } from '../../../../../../core/Errors/utils';
import addContextTranslationsToObject from '../../utilities/addContextTranslations';
import { AriaConfigObject, AriaConfig, SFInternalConfig } from '../AbstractSecuredField';
import Language from '../../../../../../language/Language';

/**
 * Creates an ariaConfig object with 'iframeTitle' and 'label' properties, whose values are retrieved from the translations object.
 * (These values either come from the translation file or have been overwritten by the merchant in a translations config object.)
 * We then add an error object containing the possible errors for any securedField read from the translation file and stored under error-codes
 */
export function processAriaConfig(configObj: SFInternalConfig, fieldType: string, i18n: Language): AriaConfig {
    // txVariant can be the scheme name (VISA, Mastercard...) so we put all of them under creditCard
    const type = ['ach', 'giftcard'].includes(configObj.txVariant) ? configObj.txVariant : 'creditCard';

    // Get translation for iframeTitle
    const iframeTitle: string = i18n.get(`${type}.${fieldType}.aria.iframeTitle`);

    // Get translation for aria label
    const label: string = i18n.get(`${type}.${fieldType}.aria.label`);

    // Get lang property
    const lang = i18n.locale;

    // Create a new object with the iframeTitle & label values from translation file
    const ariaFieldConfigObj: AriaConfigObject = { iframeTitle, label };

    // Add error translations object
    const ariaFieldConfigWithTranslatedErrors = addErrorTranslationsToObject(ariaFieldConfigObj, i18n, fieldType);

    const ariaFieldConfigWithErrorsAndContext = addContextTranslationsToObject(ariaFieldConfigWithTranslatedErrors, i18n, fieldType);

    // Create a new aria config object keeping the old entries and adding a new one for this field
    // N.B. need to do this deconstruction of the original aria config object to break existing refs & avoid getting an "accumulated" object
    return {
        ...(lang && { lang }),
        [fieldType]: ariaFieldConfigWithErrorsAndContext
    } as AriaConfig;
}
