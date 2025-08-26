import {faker, fakerEN_IN, PersonDefinition, simpleFaker} from '@faker-js/faker'

export class FakerData{

    static getPhoneNumber(): string{
        return fakerEN_IN.phone.number();
    }
 
    static getBirthDateTime(): Date{
        return faker.date.birthdate();
    }

    static getCurrentTime(): string{
        let timestamp = new Date().toTimeString().split(' ')[0]
        return timestamp
    }

    static getCurrentDate(): string{
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); 
        const yyyy = today.getFullYear();
        const date = mm + '/' + dd + '/' + yyyy;
        return date;
    }

    static getAddress(): string{
        const address = `${fakerEN_IN.location.streetAddress()} ${fakerEN_IN.location.city()} ${fakerEN_IN.location.state()} ${fakerEN_IN.location.zipCode()} ${"India"}`
        return address
    }

    static getPersonFirstName(): string{
        return faker.person.firstName();
    }

    static getPersonLastName(): string{
        return faker.person.lastName();
    }

    static getEmailAddress(): string{
        return fakerEN_IN.internet.email();
    }

    static getPrice(): string{
        return faker.commerce.price();
    }

    static getDescription(): string {
        const description = faker.lorem.paragraph();
        return description;
    }

    static getSalutationMale(): string{
        return faker.person.prefix('male');
    }

    static getSalutationFemale(): string{
        return faker.person.prefix('female');
    }

    static getDefinitions(): PersonDefinition{
        return fakerEN_IN.definitions;
    }

    static getAmountNumber(): Number{
        return faker.number.int({min: 50, max: 5000});
    }

    static getAirline(): any{
        console.log( "Check the return type: "  + typeof faker.airline.airline() );
        return faker.airline.airline().name
    }

    static getAirplane(){
        return faker.airline.airplane().iataTypeCode
    }

    static getFlightNumber(){
        const flightCode = faker.airline.airline().iataCode 
        const flightNumber = faker.airline.flightNumber({ addLeadingZeros: true })
        return (flightCode + flightNumber)
    }

    static getDeparture_Arrival(){
        return faker.airline.airport().name;
    }

    static getDepartureDate(){
        const departureDate = faker.date.soon({ days: 10 });
        return departureDate
    }

    static getArrivalDate(){
        const departureDate = faker.date.soon({ days: 10 });
        const arrivalDate = new Date(departureDate.getTime() + faker.number.int({ min: 60, max: 500 }) * 60 * 1000);
        return arrivalDate;
    }

}
