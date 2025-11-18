### interview-questions

# **What are some differences between interfaces and types in TypeScript?**

TypeScript নিয়ে কাজ করতে গেলে খুব দ্রুতই একটা প্রশ্ন সামনে আসে "Interface আর Type এর মধ্যে আসলে পার্থক্য কী?"
বেশিরভাগ ডেভেলপারের মতো আমিও শুরুতে ভাবতাম দুটোই একই জিনিস। কিন্তু conceptually similar হলেও এদের ব্যবহার, flexibility, আর কিছু subtle behavior পার্থক্য আছে।

## **Interface:**

`Interface` TypeScript feature যা দিয়ে আপনি কোনো object-এর structure define করতে পারেন। এটি basically একটি contract মানে, যদি কোনো object একটি particular interface অনুসরণ করে, তবে সেটির মধ্যে কিছু নির্দিষ্ট properties বা methods থাকতে হবে।
`Interface` হলো TypeScript-এ কোনো object এর shape বা contract define করার সবচেয়ে default উপায়।

আমি সাধারণত Interface ব্যবহার করি যখন

- কোনো object structure স্পষ্টভাবে define করতে চাই
- class-based design এ implement করতে চাই
- extend/merge হওয়ার দরকার আছে

**Interfaces are extendable, mergeable এবং বেশি readable একটা API contract define করার মতো।**

#### **Interface Example**

```ts
interface User {
  id: number;
  name: string;
  isAdmin?: boolean;
}

const u: User = {
  id: 1,
  name: "Rahim",
};
```

এখানে User interface-টা একটা চুক্তির মতো, যেখানে কোন কোন property থাকবে সেটা ঠিক করে দিলাম। isAdmin optional, তাই না দিলেও চলবে।

**কেন Interface ব্যবহার করবেন?**

- Extending: আপনি interface extend করতে পারেন, যাতে আপনার কোড আরও modular হয়।
- Declaration Merging: একাধিকবার একই interface define করলে সেগুলো একত্রিত হয়ে যাবে।
- Best for OOP: Object-oriented programming (OOP) স্টাইলে কোড লেখার সময় interface খুবই useful।

**কখন Interface ব্যবহার করবেন?**

- আপনি একটি object এর structure define করতে চান এবং সেই structure future এ extend করতে চান।
- যদি আপনি OOP ডিজাইন বা class-based architecture follow করেন।
- declaration merging চান, অর্থাৎ একই interface কয়েকবার declare করা এবং একত্রিত হওয়া।


## **Type:**

`Type alias` হলো TypeScript-এর generalized typing tool

Type alias দিয়ে শুধু objects নয় union types, function types, mapped types, utility types সব কিছু define করা যায়।

Types are more flexible এবং advanced type composition করতে পারে।

#### **Type Example**

```ts
type ApiResponse =
  | { status: "success"; data: string }
  | { status: "error"; error: string };
```

দেখুন, এখানে object structure তো আছেই, কিন্তু সাথে সাথে union type তৈরি করেছি, যা interface দিয়ে এভাবে clean করা কঠিন।

```ts
type User = {
  id: number;
  name: string;
  email: string;
};

type Admin = User & {
  role: string;
};

const admin: Admin = {
  id: 1,
  name: "Jane Doe",
  email: "jane.doe@example.com",
  role: "Admin",
};
```

এখানে, Admin টাইপটি User টাইপের সাথে intersection (&) ব্যবহার করে নতুন একটি role প্রপার্টি যুক্ত করেছে। Admin টাইপে User এর সব প্রপার্টি থাকা বাধ্যতামূলক এবং তার সাথে role থাকতে হবে।

**কেন Type ব্যবহার করবেন?**

- Union Types: একাধিক টাইপকে একটি টাইপে combine করা (যেমন User | Admin)।
- Intersection Types: একাধিক টাইপকে combine করে একটি নতুন টাইপ তৈরি করা।
- Flexible: type অনেক বেশি flexible এবং complex টাইপ create করতে সাহায্য করে।

**কখন Type ব্যবহার করবেন?**

- আপনাকে complex types তৈরি করতে হবে, যেমন union types (User | Admin), intersection types (User & Admin), বা অন্যান্য advanced types।
- যদি আপনি flexibility চান, যেমন, types কে combine করে নতুন structure তৈরি করা।
- একাধিক types combine করতে চান একসাথে।
- mapped types, utility type apply করতে চাই

**Interface vs Type** এর comparison table দেওয়া হলো:

| Feature                     | **Interface**                             | **Type**                                                     |
| --------------------------- | ----------------------------------------- | ------------------------------------------------------------ |
| **ব্যবহার**                 | Objects-এর structure define করতে          | Complex types (Union, Intersection, etc.)                    |
| **Extend করা যায়**          | হ্যাঁ, interface extend করা যায়           | `&` operator দিয়ে extend করা যায়                             |
| **Declaration Merging**     | হ্যাঁ, একাধিক `interface` একত্রিত করা যায় | না, একবার `type` define করলে সেটি পরবর্তীতে merge করা যায় না |
| **কোনটা কখন ব্যবহার করবেন** | Object structure বা OOP ডিজাইনের জন্য     | Complex টাইপ বা flexibile টাইপ তৈরি করতে                     |
| **Flexibility**             | কম, শুধু basic object structure           | বেশি, complex types combine করা যায়                          |


### **Real-World Backend Use Case**

---

ধরুন, আপনি Node.js + TypeScript backend-এ কাজ করছেন।

একটা API আছে `/users/:id` যেখানে response হতে পারে success বা error

**Interface দিয়ে User model define করলাম, কারণ এটা stable এবং reusable:**

```ts
interface User {
  id: number;
  email: string;
  role: "user" | "admin";
}
```

**এখন API response-এর জন্য Type alias ব্যবহার করলাম, কারণ এটা union:**

```ts
type UserResponse =
  | { status: "ok"; user: User }
  | { status: "error"; message: string };
```

- User হলো একটি solid model → interface
- UserResponse হলো একটি union → type alias
  `এই combinationটা backend-এ খুব common এবং clean`

---

### **Common Pitfalls**

- Thinking interface and type are identical → আসলে না
- Trying to use interface for union → possible না
- Interface আর Type এর ব্যবহারে বিভ্রান্তি: যদি শুধু object structure define করতে চান, তবে Interface ব্যবহার করুন। যদি complex types বা union/intersection types প্রয়োজন হয়, তবে Type ব্যবহার করুন।
- Overusing type যেখানে simple interface যথেষ্ট
- type এর মধ্যে declaration merging সম্ভব নয়, তাই যদি মর্জিংয়ের প্রয়োজন হয়, interface ব্যবহার করবেন।

আমি সাধারণত এইভাবে approach করি, যখনই কোনো entity বা model define করতে হয়, আমি interface দিয়ে শুরু করি।
আর যখন logic-driven, condition-based, বা union-heavy typed structure লাগে, আমি type alias ব্যবহার করি।

---

---

# **What is the use of the keyof keyword in TypeScript? Provide an example.**

`keyof` হলো TypeScript এর একটি বিশেষ keyword যা কোনো object বা type এর সমস্ত key এর টাইপ দেয়। আপনি যখন `keyof` ব্যবহার করেন, এটি সেই object এর সব key গুলোর union type রিটার্ন করবে। সোজা ভাষায় বললে, `keyof` দিয়ে আপনি যেকোনো object বা type এর key গুলোকে একসাথে এক ধরনের union হিসেবে পেতে পারেন।

ধরা যাক, আমাদের একটা object আছে:

```typescript
const user = {
  name: "John",
  age: 30,
  isAdmin: true,
};
```

এখন, যদি আপনি `keyof` ব্যবহার করেন, তাহলে TypeScript এই object এর key গুলোর টাইপ হিসেবে `name`, `age`, এবং `isAdmin` এর union type রিটার্ন করবে।

### Example

ধরি, আমরা একটা `User` টাইপ ডিফাইন করেছি:

```typescript
type User = {
  name: string;
  age: number;
  isAdmin: boolean;
};

type UserKeys = keyof User; // "name" | "age" | "isAdmin"
```

এখানে `UserKeys` এর মান হবে `"name" | "age" | "isAdmin"`। অর্থাৎ, আপনি `User` টাইপের যে কোনো key এর সাথে কাজ করতে পারবেন। যেটি code base এ typo বা ভুল key ব্যবহার থেকে আপনাকে রক্ষা করবে।

এখন, আসুন দেখি কিভাবে `keyof` ব্যবহার করে আমরা সঠিক key চেক করতে পারি:

```typescript
let key: UserKeys;

key = "name"; // ঠিক আছে
key = "age"; // ঠিক আছে
key = "email"; // Error! "email" এই key "User" টাইপে নেই
```

এখানে TypeScript নিশ্চিত করেছে যে আপনি কেবলমাত্র `User` টাইপের বৈধ key গুলিই ব্যবহার করছেন। "email" এড করে দিলে TypeScript সরাসরি error দিবে।


**কেন `keyof` ব্যবহার করবেন?**

1. **Type Safety:** `keyof` ব্যবহার করলে আপনার কোডের সব ধরনের key একসাথে union type হিসেবে আসবে, ফলে আপনি ভুল key ব্যবহার করতে পারবেন না। এটি কোডকে আরও safe এবং reliable করে।

2. **Refactoring:** যখন object বা type এর key গুলো পরিবর্তন হবে, তখন `keyof` ব্যবহার করলে আপনার কোডটি self-updating হবে। TypeScript আপনার কোডে কোথায় কোথায় পরিবর্তন দরকার তা ধরিয়ে দেবে, এবং আপনি ভুল key ব্যবহার করবেন না।

3. **Dynamic Key Access:** অনেক সময় dynamic key access করতে হয়, যেমন যখন কোনো key এর উপর ভিত্তি করে কিছু operation করতে হয়। `keyof` ব্যবহার করে আপনি এটা খুব সহজেই করতে পারেন।

**কিভাবে `keyof` ব্যবহার করবেন?**

`keyof` মূলত কোনো type বা object এর key গুলোকে union type হিসেবে নিয়ে আসে। আপনি যখন type-safe generic function লিখবেন, তখন `keyof` এর ব্যবহার বেশ কার্যকর। আসুন দেখি এমন একটি উদাহরণ:

```typescript
// Generic function with keyof
function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = {
  name: "Alice",
  age: 28,
  isAdmin: false,
};

const userName = getValue(user, "name"); // Alice
const userAge = getValue(user, "age"); // 28
```

এখানে, `getValue` ফাংশনে `T` হলো generic টাইপ, এবং `K extends keyof T` মানে `K` অবশ্যই `T` টাইপের কোনো key হতে হবে। ফলে `getValue` ফাংশনটি কেবলমাত্র valid key গ্রহণ করবে।

#### `keyof` Example

ধরা যাক, আপনি একটি backend service তৈরি করছেন যেখানে আপনি বিভিন্ন `User` ডেটা manage করছেন। আপনার `User` entity-এর structure মাঝে মাঝে পরিবর্তন হতে পারে। এর মধ্যে `keyof` ব্যবহার করে আপনি যেকোনো ক্ষেত্রেই কোডটিকে safe রাখতে পারবেন।

একটি API endpoint যেখানে আমরা user এর তথ্য update করতে চাই:

```typescript
interface User {
  name: string;
  email: string;
  role: string;
}

function updateUser<T, K extends keyof T>(user: T, key: K, value: T[K]): T {
  return { ...user, [key]: value };
}

const user = {
  name: "John",
  email: "john@example.com",
  role: "admin",
};

// Correct usage
const updatedUser = updateUser(user, "role", "superadmin");

// Error if trying to update invalid key
const invalidUpdate = updateUser(user, "address", "123 Street"); // Error!
```

এখানে, `updateUser` ফাংশনটি `keyof` ব্যবহার করে যেকোনো valid key পরিবর্তন করতে দেয় এবং invalid key দিলে TypeScript সরাসরি error দিয়ে দিবে। এতে করে আপনি নিশ্চিত হতে পারেন যে ভুল key এর কারণে কোনো runtime error হবে না।

**কোথায় `keyof` ব্যবহার করবেন?**

- **যখন আপনি object এর key গুলোর সাথে কাজ করবেন** এবং সেগুলোকে dynamic ভাবে access করতে হবে।
- **যখন generic functions লিখবেন**, যেখানে object টাইপের key গুলোর উপর নির্ভরশীল টাইপের হিসাব রাখতে হবে।
- **যখন code refactoring করবেন**, এবং object এর key গুলো যদি পরিবর্তিত হয়, TypeScript এর মাধ্যমে আপনি নিশ্চিত হতে পারবেন যে আপনি সঠিক key ব্যবহার করছেন।

### `keyof`-কে **Type Guard** হিসেবে ব্যবহার করা

Type guard এর মাধ্যমে আপনি নিশ্চিত হতে পারেন যে, কোনো key valid কিনা। `keyof` ব্যবহার করে এটি সহজেই করা যায়। ধরুন, আমাদের একটি object আছে এবং আমরা চাচ্ছি একটি key আছে কিনা সেটা চেক করতে।

```typescript
function hasKey<T>(obj: T, key: any): key is keyof T {
  return key in obj;
}

const user = { name: "John", age: 30 };

const key = "name";

if (hasKey(user, key)) {
  console.log(user[key]); // Valid key
} else {
  console.log(`${key} is not a valid key.`);
}
```

এখানে `hasKey` একটি **type guard** function, যা নিশ্চিত করে যে `key`টি `user` object এর valid key, এর ফলে, আপনি `key` ব্যবহার করে safely value access করতে পারেন।

ধরা যাক, আমরা একটি API endpoint তৈরি করছি, যেখানে user profile update করতে হবে। আমরা নিশ্চিত করতে চাই যে শুধুমাত্র valid key-ই update হবে:

```typescript
function updateUser<T>(user: T, key: keyof T, value: T[keyof T]): T {
  return { ...user, [key]: value };
}

const user = { name: "Alice", age: 25 };
updateUser(user, "name", "Bob"); // Valid update
updateUser(user, "email", "bob@example.com"); // Error! "email" is not a key of User
```

এখানে `keyof` নিশ্চিত করে যে শুধুমাত্র `name` বা `age` টাইপের key গুলো update হবে, অন্য কোনো key দিয়ে error হবে।

TypeScript এর `keyof` keyword আপনাকে object বা type এর key গুলোর উপর নির্ভরশীল কার্যকর এবং type-safe কোড লিখতে সাহায্য করে। এটি object এর key গুলোকে union type হিসেবে প্রকাশ করে, যার ফলে ভুল key ব্যবহারের সম্ভাবনা কমে যায়। `keyof` এর ব্যবহার কোডকে more maintainable এবং refactor-friendly করে তোলে

`keyof` একটি অত্যন্ত শক্তিশালী tool TypeScript-এ, যা আমাদের কোডকে **safe**, **flexible**, এবং **error-free** রাখে। যখন আপনি **dynamic key access** করতে চান বা **type-safe generic functions** লিখছেন, `keyof` আপনাকে বড় ধরনের সাহায্য করবে।
