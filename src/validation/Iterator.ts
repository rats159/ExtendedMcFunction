export default class Iterator<T> {
   private readonly items: T[];
   private index: number = 0;

   private done: boolean = false;

   constructor(chars: T[]) {
      this.items = chars;
   }

   public skipAny(chars: T[]) {
      while (chars.includes(this.current())) {
         this.next();
      }
   }

   public readUpTo(upTo: T, multiline = false) {
      let value = "";
      while (
         this.current() != upTo &&
         !this.isDone() &&
         (this.current() != "\n" || multiline)
      ) {
         value += this.current();
         this.next();
      }
      return value;
   }

   public readUpToAny(options: T[], multiline = false) {
      let value = "";
      while (
         !options.includes(this.current()) &&
         !this.isDone() &&
         (this.current() != "\n" || multiline)
      ) {
         value += this.current();
         this.next();
      }
      return value;
   }

   public isDone(): boolean {
      return this.done;
   }

   public getIndex() {
      return this.index;
   }

   public next(): T {
      if (this.index + 1 == this.items.length) {
         this.done = true;
      }
      return this.items[this.index++];
   }

   public prev(): T {
      return this.items[this.index--];
   }

   public peek(amount: number = 1): T {
      return this.items[this.index + amount];
   }

   public current(): T {
      return this.items[this.index];
   }

   public peekBack(): T {
      return this.items[this.index - 1];
   }
}
