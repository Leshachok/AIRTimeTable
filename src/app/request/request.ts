export class PairResponse {
    private code: number = 0
    private message: string = ""
    private data: Pair[] = []
    
}

export class Pair{
     
    constructor(public subject: string, public room: string, public time: number, public lecturers: string[] ){

    }
    
}