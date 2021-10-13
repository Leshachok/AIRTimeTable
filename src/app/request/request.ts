export class PairResponse {
    private code: number = 0
    private message: string = ""
    private data: Pair[] = []
    
}

export class Pair{
    private subject: string = ""
    private room: string = ""
    private time: number = 0
    private lecturers: string[] = []
}