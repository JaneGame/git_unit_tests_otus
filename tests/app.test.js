import {nameIsValid, fullTrim, getTotal} from '../src/app';

describe ('Валидность наименования',()=>{
    it('Валидное имя', () => {
        const result =  nameIsValid('valid');
        expect(result).toBe(true);
    });
})

describe ('Удаление пробелов',()=>{
    it('Текст с пробелами', () => {
        const result =  fullTrim('Привет, я учусь в Otus');
        expect(result).toBe('Привет,яучусьвOtus');
    });
})

describe ('Подсчет суммы заказа',()=>{
    it.each`
    items|discount|summ|text
    ${[{ price: 10, quantity: 10 }]}|${10}|${90}|${""}
    ${[{ price: 10, quantity: 10 }]}|${-1}|${'error'}|${"Процент скидки не может быть отрицательным"}
    ${[{ price: 10, quantity: 10 }]}|${110}|${'error'}|${"Процент скидки не может быть больше 100"}
    ${[{ price: 10, quantity: 10 }]}|${'Привет'}|${'error'}|${"Скидка должна быть числом"}
    `
    ('%items, %discount = %summ', ({items, discount, summ, text}) => {
        if(summ === 'error'){
            // eslint-disable-next-line jest/no-conditional-expect
            expect(()=>getTotal(items, discount)).toThrow(text);
        } else {
            const result =  getTotal(items, discount);
            // eslint-disable-next-line jest/no-conditional-expect
            expect(result).toBe(90);
        }
        
    });
})