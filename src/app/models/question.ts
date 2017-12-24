import { Option } from './option';

export class Question {
    id: number;
    name: string;
    questionTypeId: number;
    options: Option[];
    answered: boolean;
    hint: string;
    explanation: string;

    constructor(data: any) {
        data = data || {};
        this.id = data.id;
        this.name = data.name;
        this.questionTypeId = data.questionTypeId;
        this.options = [];
        this.hint = data.hint || undefined;
        this.explanation = data.explanation || undefined;
        data.options.forEach(o => {
            this.options.push(new Option(o));
        });
    }
}
