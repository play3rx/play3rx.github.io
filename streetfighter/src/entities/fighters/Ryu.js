import { Fighter } from "./Fighter.js";

export class Ryu extends Fighter {
    constructor(x, y, velocity) {
        super('Ryu', x, y, velocity);

    this.image = document.querySelector('img[alt="ryu"]');
    
    this.frames = new Map([
        ['forwards-1', [9, 136, 53, 83]],
        ['forwards-2', [78, 131, 60, 88]],
        ['forwards-3', [152, 128, 64, 90]],
        ['forwards-4', [229, 130, 63, 89]],
        ['forwards-5', [307, 128, 54, 89]],
        ['forwards-6', [371, 128, 50, 89]],
    ]);
    
   //this.frame = [7, 14, 59, 90];
    }
}