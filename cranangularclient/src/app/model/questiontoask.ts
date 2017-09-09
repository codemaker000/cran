import {QuestionOptionToAsk} from './questionoptiontoask';

export class QuestionToAsk {
    public idCourseInstanceQuestion: number;
    public idCourseInstance: number;
    public text: string;
    public explanation: string;
    public numQuestions: number;
    public numQuestionsAsked: number;
    public courseEnded = false;
    public options: QuestionOptionToAsk[] = [];
}