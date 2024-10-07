export type Camelize<T> = T extends object
    ? {
        // Для каждого ключа объекта T проверяем, является ли он строкой
        // Если это строка, преобразуем её из snake_case в camelCase с помощью CamelCase
        [K in keyof T as K extends string
            ? CamelCase<K>
            : K]:
        // Если значение по ключу — это объект, применяем Camelize рекурсивно
        T[K] extends object ? Camelize<T[K]> : T[K];
    }
    : T;

// Преобразует строку из snake_case в camelCase
type CamelCase<S extends string> = S extends `${infer First}_${infer Rest}`
    // Берем первую часть строки и делаем её в нижнем регистре
    // Остальную часть строки (после '_') делаем с заглавной буквы и продолжаем рекурсивно
    ? `${Lowercase<First>}${Capitalize<CamelCase<Rest>>}`
    // Если символов '_' больше нет, возвращаем как есть
    : S;

export type DeepPick<T, P> = P extends `${infer K}.${infer Rest}`
    // Если P — это строка 'key.keys', выбираем первый ключ и продолжаем рекурсивно
    ? K extends keyof T
        ? { [Key in K]: DeepPick<T[K], Rest> }
        : never
    // Если P — это ключ без вложенности, возвращаем значение по этому ключу
    : P extends keyof T
        ? { [K in P]: T[K] }
        : never;

// tests

type ExampleObject = {
    user: {
        name: string;
        phone: number;
        address: {
            city: string;
        };
    };
};

type CamelizedEx = Camelize<ExampleObject>;
const camelizedEx: CamelizedEx = {
    user: {
        name: 'Alice',
        phone: 9291,
        address: {
            city: 'Moscow'
        }
    }
};
console.log('Camelized Example:', camelizedEx);

type PickedUserCity = DeepPick<ExampleObject, 'user.address.city'>;
const pickedUserCity: PickedUserCity = {
    user: {
        address: {
            city: 'Moscow'
        }
    }
};

console.log('Picked User City:', pickedUserCity);