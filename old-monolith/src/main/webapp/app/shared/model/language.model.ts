export interface ILanguage {
    id?: number;
    englishName?: string;
}

export class Language implements ILanguage {
    constructor(public id?: number, public englishName?: string) {}
}
