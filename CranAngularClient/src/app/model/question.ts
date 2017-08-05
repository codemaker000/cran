import {QuestionOption} from './questionoption';
import {Tag} from './tag';

export class Question {
    public id: number;
    public title: string;
    public text: string;
    public explanation: string;
    public options: QuestionOption[] = [];
    public tags: Tag[] = [];
}
