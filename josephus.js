function Node(data) {
  this.data = data;
  this.next = null;
}

function LinkedList() {
  this.head = new Node("Head");

  this.findPrevious = (item) => {
    let currNode = this.head;
    while (currNode.next.data != item) {
      currNode = currNode.next;
    }
    return currNode;
  };

  this.killThird = (currNode) => {
    let i = 3;
    while (i > 0 && currNode != null) {
      currNode = currNode.next;
      if (currNode.data == "Head") i++; //to skip the head from the count
      i--;
    }

    if (i == 0) {
      let previousNode = this.findPrevious(currNode.data);
      if (previousNode.next.data == "Head") { //to avoid the head from getting deleted
        return this.head;
      }
      console.log("Killed", currNode.data);
      previousNode.next = currNode.next;
      currNode.next = null;
      return previousNode;
    }
  };

  this.push = (newItem) => {
    let newNode = new Node(newItem);
    if (this.head.next == null) {
      this.head.next = newNode;
      newNode.next = this.head;
    } else {
      let currNode = this.head;
      while (currNode.next.data != "Head") {
        currNode = currNode.next;
      }
      currNode.next = newNode;
      newNode.next = this.head;
    }
  };

  this.display = () => {
    let currNode = this.head.next;
    while (currNode != null && currNode.data != "Head") {
      console.log(currNode.data);
      currNode = currNode.next;
    }
  };

  this.length = () => {
    let len = 0;
    let currNode = this.head.next;
    while (currNode != null && currNode.data != "Head") {
      currNode = currNode.next;
      len++;
    }
    return len;
  };
}

let josephus = new LinkedList();

for (let i = 1; i < 41; i++) {
  josephus.push(i);
}
josephus.display();


console.log("\nStart Mayhem\n");

let currNode = josephus.head;
while (josephus.length() > 2) {
  currNode = josephus.killThird(currNode);
}

console.log(" \n Josephus and his friend should sit at no: ");
josephus.display();
