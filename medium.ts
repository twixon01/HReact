export type DeepPartial<T> = {
    // Перебираем все ключи объекта T
    // Если значение по ключу — объект, то рекурсивно применяем DeepPartial к этому объекту
    // Если это не объект, делаем ключ опциональным
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type MyCapitalize<T extends string> =
// Разбиваем строку на первую букву и остаток строки
    T extends `${infer First}${infer Rest}`
        // Преобразуем первую букву в заглавную и соединяем с остатком строки
        ? `${Uppercase<First>}${Rest}`
        // Если строка пустая или не соответствует шаблону, возвращаем как есть
        : T;

export type DeepMutable<T> = {
    // Убираем модификатор readonly у всех ключей объекта T
    // Если значение по ключу — объект, то применяем DeepMutable рекурсивно
    // Иначе оставляем как есть, убираем readonly
    -readonly [P in keyof T]: T[P] extends object ? DeepMutable<T[P]> : T[P];
};

export type ParseURLParams<S extends string> =
// Если находим параметр, извлекаем его
    S extends `${string}:${infer Param}/${infer Rest}`
        ? Param | ParseURLParams<`/${Rest}`>
        // Если параметр в конце строки, извлекаем его
        : S extends `${string}:${infer Param}`
            ? Param
            // Если параметров больше нет, возвращаем never
            : never;

// tests

type User = {
    name: string;
    phone: number;
    address: {
        city: string;
    };
};

type PUser = DeepPartial<User>;
const pUser: PUser = {
    name: 'Alice',
    address: {
        city: 'Moscow'
    }
};
console.log('PUser:', pUser);

type CapitalizedWord = MyCapitalize<'alice'>;
const capitalized: CapitalizedWord = 'Alice';
console.log('Capitalized Word:', capitalized);

type ReadonlyUser = {
    readonly name: string;
    readonly address: {
        readonly street: string;
    };
};

type MutableUser = DeepMutable<ReadonlyUser>;
const mutableUser: MutableUser = {
    name: 'Alice',
    address: {
        street: 'Shosse',
    }
};
mutableUser.name = 'Ksenia';
mutableUser.address.street = '3mkr';
console.log('Mutable User:', mutableUser);

type Params = ParseURLParams<'/movie/:title/:rating'>;
const urlParams: Params = 'title';
console.log('URL Params:', urlParams);