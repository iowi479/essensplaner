import { VERBOSE_ERROR, VERBOSE_INFO } from "./env";

export const getLogger = () => {
    if (!Logging.logger) {
        Logging.logger = new Logging(VERBOSE_INFO, VERBOSE_ERROR);
    }
    return Logging.logger;
};

class Logging {
    static logger: Logging;

    private verboseInfo: boolean;
    private verboseError: boolean;

    constructor(info: boolean, error: boolean) {
        this.verboseInfo = info;
        this.verboseError = error;
    }

    info(text = "", data?: any) {
        if (this.verboseInfo) console.log(`[Info]\t`, text, "  \t", data);
    }

    error(err: any) {
        if (this.verboseError) console.error(`[Error]\t`, err);
    }
}
