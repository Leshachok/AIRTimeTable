
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
    public link_icon = ""
    public timestamp = 0

    public repeat: string | null = null

    constructor(subject: string, room: string, time: string, lecturers: string[], id: number, type: string, link: string, timestamp: number){
        this.subject = subject, this.room = room, this.time = time, this.id = id, this.type = type, this.lecturers = lecturers, this.link = link, this.timestamp = timestamp
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
