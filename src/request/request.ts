
export class Division {
    public name: string = ""
    public course: number = 0
    public id: string = ""
}

export class Day{
    public weekday: string = ""
    public pairs: (Pair | null)[] = []

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
    public link: string = ""
    public icon: string = ""
    public id: "" = ""
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
export class WeekTimetableResponse{
    public week: number = 0
    public lessons: Pair[] = []
}

export class Account{
    public accessGroups: string[] = []
    public division: string = ""
    public id: string = ""
}

export class LoginResponse{
    public accessToken: string = ""
    public refreshToken: string = ""
    public account: Account | undefined
}
