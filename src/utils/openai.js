import OPENAI from 'openai'
import { OPENAI_KEY } from './constants'


export const openai = new OPENAI({
    apiKey: OPENAI_KEY,
    dangerouslyAllowBrowser: true
});
