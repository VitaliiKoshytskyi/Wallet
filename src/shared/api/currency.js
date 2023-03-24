import axios from "axios";

const currencyInstance = axios.create({
    baseURL:"https://api.monobank.ua/bank/currency"
})

export const getMoney = () => currencyInstance.get('');
