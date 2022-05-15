let name = 'aaa';
let price = 10000;

let course = {
    name,
    price,
    getName () {
        return this.name;
    }

}