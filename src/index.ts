import { Dexie } from "dexie"
import { DbEntity, Repository } from "sample-repository-pattern"

class InfoItem extends DbEntity {
    public Id :number;
    public FirstName: string;
    public LastName: string;
    constructor() {
        super();
    };
}

class InfoDb extends Dexie{

    Info: Repository<InfoItem, number>;

    constructor(){
        super("InfoDb");
        this.version(1).stores({
            infoItem: '++Id, FirstName, LastName'
        });

        this.Info = new Repository<InfoItem, number>(this, "infoItem");
    }
}

let db = new InfoDb();
let infoItem = new InfoItem();
infoItem.FirstName = "Mahdi";
infoItem.LastName = "Yousefi";
await db.Info.Add(infoItem);

var allItems = await db.Info.GetAll();
console.table(allItems,["FirstName","LastName", "Id"]);

