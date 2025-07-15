"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Servico = void 0;
class Servico {
    props;
    constructor(props) {
        this.props = props;
    }
    static create(name, price) {
        return new Servico({
            id: crypto.randomUUID().toString(),
            name,
            price,
            description: null,
            highlight: false,
        });
    }
    static with(props) {
        return new Servico(props);
    }
    updateDetails(description, highlight) {
        if (description !== undefined) {
            this.props.description = description;
        }
        if (highlight !== undefined) {
            this.props.highlight = highlight;
        }
    }
    updatePrice(newPrice) {
        this.props.price = newPrice;
    }
    get id() {
        return this.props.id;
    }
    get name() {
        return this.props.name;
    }
    get price() {
        return this.props.price;
    }
    get description() {
        return this.props.description;
    }
    get highlight() {
        return this.props.highlight;
    }
}
exports.Servico = Servico;
