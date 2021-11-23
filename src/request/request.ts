
export class Division {
    public name: string = ""
    public course: number = 0
    public id: string = ""
}

export class Day{
    public weekday: string = ""
    public pairs: Pair[] = []

    constructor(weekday: string, pairs: Pair[]){
        this.weekday = weekday
        this.pairs = pairs
    }
}

export class Pair{

    public lecturers: Lecturer[] = []
    public divisions: Division[] = []
    public subject: Subject = new Subject
    public repeat: string = ""
    public room: string = ""
    public type: string = ""
    public number: number = 0
    public day: number = 0
    public start: string = ""
    public end: string = ""

}

export class Lecturer {
    public firstname: string = ""
    public lastname: string = ""
    public patronymic: string = ""
    public mail: string = ""
    public lecturerData: LecturerData = new LecturerData()
}   

export class LecturerData {
    public position: string = ""
    public _id: string = ""
}

export class Subject {
    public name: string = ""
    public id: string = ""
}

export class Group{
    public group: string = ''
}

export class EditGroupResponse{
    public code: number = 0
    public message: string = ""
    public data: Group = new Group()
}
export class Response{
    public code: number = 0
    public message: string = ""
    public data = []
}

export class NewPair{
    
    constructor(
        public lecturers: string[],
        public divisions: string[], 
        public subject: string, 
        public room:string,
        public weeks: number[],
        public day: number,
        public lesson_num: number,
        public type: string,
        public link: string
        ) { }
}