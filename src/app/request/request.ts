
export class PairResponse {
    public code: number = 0
    public message: string = ""
    public data: Day[] = []
    
}

export class Day{
    public weekday: string = ""
    public pairs: Pair[] = []
}

export class Pair{
    public subject: string = ""
    public room: string = ""
    public time: string = ""
    public lecturers: string[] = []
    public id: number = 0
    public type: string = ""
    public link: string = ""

    constructor(subject: string, room: string, time: string, lecturers: string[], id: number, type: string, link: string){
        this.subject = subject, this.room = room, this.time = time, this.id = id, this.type = type, this.lecturers = lecturers, this.link = link
    }

    
}

export class EditGroupResponse{
    public code: number = 0
    public message: string = ""
    public data: Group = new Group()
}

export class Group{
    public group: string = ''
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