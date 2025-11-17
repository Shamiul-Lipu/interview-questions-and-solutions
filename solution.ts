{
  // REMOVE

  type Value = string | number | boolean;
  function formatValue(input: Value): Value {
    if (typeof input === "string") {
      return input.toUpperCase();
    } else if (typeof input === "number") {
      return input * 10;
    } else {
      return input === true ? false : true;
    }
  }

  function getLength<T extends string | any[]>(value: T): number {
    if (typeof value === "string") {
      return value.length;
    } else {
      return value.length;
    }
  }

  class Person {
    name: string;
    age: number;
    constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
    }

    getDetails(): string {
      return `Name: ${this.name}, Age: ${this.age}`;
    }
  }

  type Items = { title: string; rating: number };
  function filterByRating(books: Items[]): Items[] {
    return books.filter((book) => book.rating >= 4);
  }

  type User = { id: number; name: string; email: string; isActive: boolean };
  function filterActiveUsers(users: User[]): User[] {
    return users.filter((user) => user.isActive === true);
  }

  interface Book {
    title: string;
    author: string;
    publishedYear: number;
    isAvailable: boolean;
  }

  function printBookDetails(book: Book): string {
    return `Title: ${book.title}, Author: ${book.author}, Published: ${
      book.publishedYear
    }, Available: ${book.isAvailable ? "Yes" : "No"}`;
  }

  type Product = {
    name: string;
    price: number;
    quantity: number;
    discount?: number;
  };
  function calculateTotalPrice(products: Product[]): number {
    return products.reduce((acc, product) => {
      const productTotal =
        product.price * product.quantity * (1 - (product.discount ?? 0) / 100);
      return acc + productTotal;
    }, 0);
  }

  // REMOVE
}
