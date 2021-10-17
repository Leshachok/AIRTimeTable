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
}

export class EditGroupResponse{
    public code: number = 0
    public message: string = ""
    public data: Group = new Group()
}

export class Group{
    public group: string = ''
}