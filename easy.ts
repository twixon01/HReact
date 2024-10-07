export type MyPick<T, K extends keyof T> = {
    // Перебираем ключи из K (они должны быть ключами объекта T)
    // Для каждого ключа берём его значение из T
    [P in K]: T[P];
};

export type NOfArray<ArrayObj extends any[], N extends number> =
// Говорим, что ArrayObj — это массив, выбираем N-й элемент этого массива
    ArrayObj[N];

export type Unshift<ArrayType extends any[], Elem> =
// Создаем новый массив, где первым идет Elem, затем все элементы из ArrayType
    [Elem, ...ArrayType];

export type MyExclude<T, U> =
// Если T является частью (подтипом) U, то возвращаем never (исключаем)
// Если не является, то оставляем T
    T extends U ? never : T;

// tests

type User = { id: number; name: string; age: number };
type UserIdName = MyPick<User, 'id' | 'name'>;
const userPick: UserIdName = { id: 19, name: 'Ksenya' };
console.log('User Pick:', userPick);

type Array = [string, number, boolean];
type SecondElement = NOfArray<Array, 1>;
const secondElement: SecondElement = 19;
console.log('Second Element:', secondElement);

type NewArray = Unshift<[number, string], boolean>;
const newArray: NewArray = [true, 19, 'twix'];
console.log('New Array:', newArray);

type Union = 'a' | 'b' | 'c';
type Excluded = MyExclude<Union, 'a' | 'b'>;
const excluded: Excluded = 'c';
console.log('Excluded:', excluded);