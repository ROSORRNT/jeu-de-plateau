class Helpers {
    static getAllElementsWithAttribute(attribute) {
      let matchingElements = [];
      let allElements = document.getElementsByTagName("td");
      for (let i = 0, n = allElements.length; i < n; i++) {
        if (allElements[i].getAttribute(attribute) !== null) {
          matchingElements.push(allElements[i]);
        }
      }
      return matchingElements;
    }
  }
  