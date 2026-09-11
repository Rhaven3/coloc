import type {Roommate} from "#/lib/coloc-data.ts";
import * as fs from "node:fs";

export const roommateService = {
    getRoommates: ():Roommate[]  => {
        // const filePath = path.join('./', 'src', 'assets', 'roommates.json');
        const content = fs.readFileSync("./src/assets/roommates.json", "utf8")
        return JSON.parse(content)
    }
        // fetch('http://localhost:3000/assets/roommate.json')
        //     .then((res) => res.json())
        //     .then((data) => {setRoommate(data as Roommate[])}),
}