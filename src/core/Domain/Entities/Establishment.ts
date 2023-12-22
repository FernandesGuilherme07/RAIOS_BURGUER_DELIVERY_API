import { Account } from "./Account";
import { Address } from "./Address";

export class Establishment extends Account {
    readonly slug: string;
    readonly document: string;
    readonly openHour: string;
    readonly closeHour: string;
    readonly locality: Address;
    readonly viewsQuantity: number;
    readonly LogoUrl: string;
    readonly mainColor: string;
    readonly secondColor: string;
    constructor(
        name: string,
        email: string,
        password: string,
        slug: string,
        document: string,
        openHour: string,
        closeHour: string,
        locality: Address,
        viewsQuantity: number,
        LogoUrl: string,
        mainColor: string,
        secondColor: string
    ) {
        super(name, email, password, "admin")
        this.slug = slug
        this.document = document
        this.openHour = openHour
        this.closeHour = closeHour
        this.locality = locality
        this.viewsQuantity = viewsQuantity
        this.LogoUrl = LogoUrl
        this.mainColor = mainColor
        this.secondColor = secondColor
    }

}