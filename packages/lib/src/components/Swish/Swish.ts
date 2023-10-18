import QRLoaderContainer from '../helpers/QRLoaderContainer';
import { TxVariants } from '../tx-variants';

class SwishElement extends QRLoaderContainer {
    public static type = TxVariants.swish;

    formatProps(props) {
        return {
            delay: 2000, // ms
            countdownTime: 3, // min
            instructions: 'swish.pendingMessage',
            ...super.formatProps(props)
        };
    }
}

export default SwishElement;
