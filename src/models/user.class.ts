export class User {
    firstName: string;
    lastName: string;
    birthDate;
    street: string;
    zipCode: number;
    city: string;
    email: string;
    phone: number;
    gender: string;
    notes: any;
    contracts: [];

    constructor(obj?: any) {
        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.birthDate = obj ? obj.birthDate : '';
        this.street = obj ? obj.street : '';
        this.zipCode = obj ? obj.zipCode : '';
        this.city = obj ? obj.city : '';
        this.email = obj ? obj.email : '';
        this.phone = obj ? obj.phone : '';
        this.gender = obj ? obj.gender : '';
        this.notes = obj ? obj.notes: [];
        this.contracts = obj ? obj.contracts: [];


    }

    public toJson() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            birthDate: this.birthDate,
            street: this.street,
            zipCode: this.zipCode,
            city: this.city,
            email: this.email,
            phone: this.phone,
            gender: this.gender,
            notes: this.notes,
            contracts: this.contracts

        }


    }
}