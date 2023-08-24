import { VERBOSE_ERROR, VERBOSE_INFO } from "./env";

class Logging {
    static logger: Logging;

    private verboseInfo: boolean;
    private verboseError: boolean;
    private verboseObjects: boolean;

    constructor(info = true, error = true, objects = false) {
        this.verboseInfo = info;
        this.verboseError = error;
        this.verboseObjects = objects;

        console.log(
            `[Logging]\n\t[Info] ${this.verboseInfo}\n\t[Error] ${this.verboseError}\n\tFull data for [Info] ${this.verboseObjects}\n\n`
        );
    }

    info(text = "", data?: any) {
        if (this.verboseObjects)
            console.log(`[Info]    \t`, text, "  \t", data);
        else if (this.verboseInfo) console.log(`[Info]    \t`, text);
    }

    error(text = "", err?: any) {
        if (this.verboseError) console.error(`[Error]   \t`, text, "  \t", err);
    }

    accessed(path: string) {
        if (this.verboseInfo) console.log(`[Access]  \t`, path);
    }

    posted(path: string) {
        if (this.verboseInfo) console.log(`[Posted]  \t`, path);
    }
}

const getLogger = () => {
    if (!Logging.logger) {
        Logging.logger = new Logging(VERBOSE_INFO, VERBOSE_ERROR);
    }
    return Logging.logger;
};

export const logger = getLogger();
